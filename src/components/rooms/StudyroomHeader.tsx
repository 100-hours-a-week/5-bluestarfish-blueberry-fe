import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import studyRooms from "../../data/studyRooms";

interface StudyroomHeaderProps {
  selectedCategory: string;
  categories: { name: string; icon: string }[];
  handleCategoryClick: (category: string) => void;
  isStudyRoomPage?: boolean; // 새로운 props 추가
}

const StudyroomHeader: React.FC<StudyroomHeaderProps> = ({
  selectedCategory,
  categories,
  handleCategoryClick,
  isStudyRoomPage = false, // 기본값은 false
}) => {
  const navigate = useNavigate();

  const enterRecruitStudyListPage = () => {
    navigate("/recruit/list");
  };

  const enterRecruitStudyCreatePage = () => {
    navigate("/studyroom/create");
  };

  return (
    <div className="flex items-center justify-between m-[3px] h-[40px] mx-auto">
      <div className="flex items-center space-x-[12px]">
        {categories.map((category) => (
          <button
            key={category.name}
            className={`flex items-center justify-center w-[130px] gap-3 h-[40px] rounded-[10px] font-bold text-[16px] hover:bg-[#6D81D5] hover:text-white transition duration-300 ${
              selectedCategory === category.name
                ? "bg-[#6D81D5] text-white"
                : "bg-[#E0E7FF] text-[#4659AA]"
            }`}
            onClick={() => handleCategoryClick(category.name)}
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/${category.icon}`}
              alt={category.name}
              className="h-5 w-5"
            />
            <span>{category.name}</span>
          </button>
        ))}
      </div>
      <div className="flex gap-4 font-bold">
        {!isStudyRoomPage && (
          <button
            className="w-[143px] h-[46px] rounded-[10px] bg-[#150C39] text-white"
            onClick={enterRecruitStudyListPage}
          >
            스터디 모집 게시판
          </button>
        )}
        <button
          className="w-[143px] h-[46px] rounded-[10px] bg-[#150C39] text-white"
          onClick={enterRecruitStudyCreatePage}
        >
          스터디 룸 만들기
        </button>
      </div>
    </div>
  );
};

export default StudyroomHeader;
