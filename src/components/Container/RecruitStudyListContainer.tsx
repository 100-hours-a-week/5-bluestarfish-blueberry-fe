import React, { useState, useEffect } from "react";
import "../../global.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import CategorySelector from "../rooms/CategorySelector";
import RecruitPostList from "../posts/RecruitPostList";
import { Post } from "../../types"; // 공통 타입 가져오기

interface ApiResponse {
  data: {
    content: Array<Post>;
    totalPages: number;
    totalElements: number;
  };
}

const StudyRecruitListContainer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체보기");
  const [selectedType, setSelectedType] = useState("");
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [isLoading, setIsLoading] = useState(false); // 초기값 false로 변경
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const categories = [
    { name: "전체보기", icon: "list-icon.png" },
    { name: "모집 중", icon: "recruit-icon.png" },
  ];

  const types = [
    { name: "스터디 멤버 찾기", icon: "member-icon.png" },
    { name: "스터디 룸 찾기", icon: "room-icon.png" },
  ];

  useEffect(() => {
    fetchPosts(true);
  }, [selectedCategory, selectedType]);

  const fetchPosts = async (reset: boolean = false): Promise<void> => {
    try {
      setIsLoading(true);

      const recruited = selectedCategory === "모집 중";
      const type =
        selectedType === "스터디 멤버 찾기"
          ? "FINDING_MEMBERS"
          : selectedType === "스터디 룸 찾기"
          ? "FINDING_ROOMS"
          : "";

      const response = await axiosInstance.get<ApiResponse>(
        `${process.env.REACT_APP_API_URL}/api/v1/posts`,
        {
          params: {
            page,
            type,
            recruited,
          },
        }
      );

      const postsData = response.data.data.content;
      setTotalPages(response.data.data.totalPages);

      if (reset) {
        setPosts(postsData);
        setPage(1); // 초기화 후 페이지를 1로 설정
      } else {
        setPosts((prevPosts) => [...prevPosts, ...postsData]);
        setPage((prevPage) => prevPage + 1); // 무한 스크롤 시 페이지를 증가시킴
      }
    } catch (error) {
      console.error("게시글 목록을 불러오지 못했습니다:", error);
      if (reset) {
        setPosts([]);
      }
    } finally {
      setIsLoading(false); // 로딩 상태 해제
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    fetchPosts(true);
  };

  const handleTypeClick = (type: string) => {
    setSelectedType(selectedType === type ? "" : type);
    fetchPosts(true);
  };

  const handlePostClick = async (postId: number) => {
    try {
      const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/posts/${postId}`);
      if (response.status === 200) {
        navigate(`/recruit/${postId}`);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        alert("해당 게시글을 찾을 수 없습니다.");
      } else {
        console.error("게시글 조회 중 오류가 발생했습니다:", error);
        alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const handleCreatePostClick = async () => {
    navigate("/recruit/create");
  };

  const fetchMorePosts = async (): Promise<void> => {
    if (page < totalPages && !isLoading) { // 페이지가 끝나지 않았고 로딩 중이 아닐 때만 실행
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500)); // 지연 시간 추가 (0.5초)
      await fetchPosts();
    }
  };

  return (
    <div className="flex flex-col items-center w-full bg-white mb-10">
      <div className="relative w-full mt-[80px]">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/recruitment-banner.png`}
          alt="intro"
          className="w-full"
        />
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/create-post-button.png`}
          alt="create post"
          className="absolute top-12 right-64 w-[130px] h-[30px]"
          onClick={handleCreatePostClick}
        />
      </div>

      <div className="w-[1030px] mt-8 overflow-auto scrollbar-hide">
        <CategorySelector
          selectedCategory={selectedCategory}
          selectedType={selectedType}
          categories={categories}
          types={types}
          handleCategoryClick={handleCategoryClick}
          handleTypeClick={handleTypeClick}
        />

        {isLoading && posts.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <RecruitPostList
            posts={posts}
            onPostClick={handlePostClick}
            fetchMorePosts={fetchMorePosts}
          />
        )}
      </div>
    </div>
  );
};

export default StudyRecruitListContainer;
