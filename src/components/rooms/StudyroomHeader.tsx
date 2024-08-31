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
    <div className="flex flex-col md:flex-row items-center justify-between m-[3px] mx-auto">
  <div className="flex flex-wrap items-center justify-center space-x-[12px] mb-4 md:mb-0 w-full md:w-auto">
    {categories.map((category) => (
      <button
        key={category.name}
        className={`flex items-center justify-center w-[110px] h-[32px] sm:w-[120px] sm:h-[36px] md:w-[130px] md:h-[40px] gap-3 rounded-[10px] font-bold text-[12px] sm:text-[14px] md:text-[16px] hover:bg-[#6D81D5] hover:text-white transition duration-300 ${
          selectedCategory === category.name
            ? "bg-[#6D81D5] text-white"
            : "bg-[#E0E7FF] text-[#4659AA]"
        }`}
        onClick={() => handleCategoryClick(category.name)}
      >
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/${category.icon}`}
          alt={category.name}
          className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5"
        />
        <span>{category.name}</span>
      </button>
    ))}
  </div>
  <div className="flex justify-center md:justify-end w-full md:w-auto">
    <div className="flex gap-4 font-bold w-full md:w-auto items-center justify-center">
      {!isStudyRoomPage && (
        <button
          className="md:w-[143px] h-[38px] sm:h-[42px] md:h-[46px] rounded-[10px] bg-[#150C39] text-white text-[12px] sm:text-[14px] md:text-[16px] pl-[10px] pr-[10px]"
          onClick={enterRecruitStudyListPage}
        >
          스터디 모집 게시판
        </button>
      )}
      <button
        className="md:w-[143px] h-[38px] sm:h-[42px] md:h-[46px] rounded-[10px] bg-[#150C39] text-white text-[12px] sm:text-[14px] md:text-[16px] pl-[10px] pr-[10px]"
        onClick={enterRecruitStudyCreatePage}
      >
        스터디 룸 만들기
      </button>
    </div>
  </div>
</div>


  );
};

export default StudyroomHeader;
