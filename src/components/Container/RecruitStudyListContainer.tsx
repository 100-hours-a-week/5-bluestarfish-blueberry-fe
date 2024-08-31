import React, { useState, useEffect } from "react";
import "../../global.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import CategorySelector from "../rooms/CategorySelector";
import RecruitPostList from "../posts/RecruitPostList";
import { Post } from "../../types";

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
  const [allPosts, setAllPosts] = useState<Array<Post>>([]); // 모든 게시글을 저장
  const [filteredPosts, setFilteredPosts] = useState<Array<Post>>([]); // 필터링된 게시글을 저장
  const [isLoading, setIsLoading] = useState(false);
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
    const fetchInitialPosts = async () => {
      await fetchPosts(true);
    };

    fetchInitialPosts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedCategory, selectedType, allPosts]);

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
            page, // 페이지네이션을 위한 페이지 번호
          },
        }
      );
      const postsData = response.data.data.content;

      if (reset) {
        setAllPosts(postsData); // 모든 게시글 저장
        setPage(1); // 페이지 초기화
      } else {
        setAllPosts((prevPosts) => [...prevPosts, ...postsData]); // 기존 게시글에 추가
        setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
      }

      setTotalPages(response.data.data.totalPages); // 총 페이지 수 업데이트
    } catch (error) {
      console.error("게시글 목록을 불러오지 못했습니다:", error);
      setAllPosts([]);
      setFilteredPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...allPosts];

    if (selectedCategory === "모집 중") {
      filtered = filtered.filter((post) => post.recruited);
    }

    if (selectedType) {
      filtered = filtered.filter((post) =>
        selectedType === "스터디 멤버 찾기"
          ? post.type === "FINDING_MEMBERS"
          : post.type === "FINDING_ROOMS"
      );
    }

    setFilteredPosts(filtered);
  };

  const handleCategoryClick = (category: string) => { 
    setSelectedCategory(category);                                                                                                                                                    
  };

  const handleTypeClick = (type: string) => {
    setSelectedType(selectedType === type ? "" : type);
  };

  const handlePostClick = async (postId: number) => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/v1/posts/${postId}`
      );
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
    if (page < totalPages && !isLoading) {
      await fetchPosts(); // 추가 게시글 로드
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

        {isLoading && filteredPosts.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <RecruitPostList
            posts={filteredPosts}
            onPostClick={handlePostClick}
            fetchMorePosts={fetchMorePosts} // 여기에서 fetchMorePosts 전달
          />
        )}
      </div>
    </div>
  );
};

export default StudyRecruitListContainer;
