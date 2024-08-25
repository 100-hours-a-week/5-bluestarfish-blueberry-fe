import React, { useState, useEffect } from "react";
import "../../global.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import CategorySelector from "../rooms/CategorySelector";
import RecruitPostList from "../posts/RecruitPostList";

interface Post {
  id: number;
  title: string;
  postType: string;
  user: {
    nickname: string;
    profileImage?: string | null;
  };
  room: {
    camEnabled: boolean;
  };
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
  }, [selectedCategory, selectedType]);

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
            page: 0,
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
  };

  const handleTypeClick = (type: string) => {
    setSelectedType(selectedType === type ? "" : type);
  };

  const handleCreatePostClick = () => {
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
        {isLoading ? <div>Loading...</div> : <RecruitPostList posts={posts} />}
      </div>
    </div>
  );
};

export default StudyRecruitListContainer;
