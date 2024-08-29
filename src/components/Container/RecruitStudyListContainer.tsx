import React, { useState, useEffect } from "react";
import "../../global.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import CategorySelector from "../rooms/CategorySelector";
import RecruitPostList from "../posts/RecruitPostList";

interface Post {
  id: number;
  title: string;
  type: string;
  userResponse: {
    nickname: string;
    profileImage?: string | null;
  };
  postCamEnabled: boolean;
  room?: number | null;
  recruited: boolean;
}

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
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0); // 페이지 상태 추가
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
    fetchPosts();
  }, [selectedCategory, selectedType, page]);
  // fetchPosts() 두 번 호출

  const fetchPosts = async () => {
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
      setPosts(postsData);
    } catch (error) {
      console.error("게시글 목록을 불러오지 못했습니다:", error);
      setPosts([]); // 에러 발생 시 빈 배열로 설정
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setPage(0); // 카테고리 변경 시 페이지 초기화
  };

  const handleTypeClick = (type: string) => {
    setSelectedType(selectedType === type ? "" : type);
    setPage(0); // 타입 변경 시 페이지 초기화
  };

  const handlePostClick = async (postId: number) => {
    try {
      // 게시글 존재 여부를 확인하기 위해 서버에 GET 요청
      const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/posts/${postId}`);
      
      // 게시글이 존재하면 상세 페이지로 이동
      if (response.status === 200) {
        navigate(`/recruit/${postId}`);
      }
    } catch (error: any) { // 여기서 'any'로 캐스팅
      // 404 에러 처리: 게시글이 존재하지 않을 경우
      if (error.response && error.response.status === 404) {
        alert("해당 게시글을 찾을 수 없습니다.");
      } else {
        // 다른 에러 처리: 서버 에러 등
        console.error("게시글 조회 중 오류가 발생했습니다:", error);
        alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };
  


  const handleCreatePostClick = async () => {
    navigate("/recruit/create");
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

        {/* 모집 공고 글 목록 */}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <RecruitPostList posts={posts} onPostClick={handlePostClick} />
        )}
      </div>
    </div>
  );
};

export default StudyRecruitListContainer;
