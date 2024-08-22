import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import studyRooms from "../../data/studyRooms";

// 컴포넌트가 받을 props의 타입 정의
interface StudyroomHeaderProps {
  selectedCategory: string;
  categories: { name: string; icon: string }[];
  handleCategoryClick: (category: string) => void;
}

const StudyroomHeader: React.FC<StudyroomHeaderProps> = ({
  selectedCategory, // 현재 선택된 카테고리
  categories, // 카테고리 목록
  handleCategoryClick, // 카테고리 클릭 핸들러
}) => {
  const navigate = useNavigate();
  // const studyRoomsSortedData = studyRooms.sort();

  const enterRecruitStudyListPage = () => {
    navigate("/recruit/list");
  };

  const enterRecruitStudyCreatePage = () => {
    navigate("/studyroom/create");
  };

  const filteredData = studyRooms.filter((item) => {
    const matchesCategory =
      selectedCategory === "전체보기" ||
      (item.camEnabled === true && selectedCategory === "캠켜공") ||
      (item.camEnabled === false && selectedCategory === "캠끄공");
    return matchesCategory;
  });

  return (
    <div className="flex items-center justify-between m-[3px] h-[40px] mx-auto">
      <div className="flex items-center space-x-[12px]">
        {categories.map((category) => (
          <button
            key={category.name} // 각 버튼에 고유한 키 부여 (카테고리 이름 사용)
            className={`flex items-center justify-center w-[130px] gap-3 h-[40px] rounded-[10px] font-bold text-[16px] hover:bg-[#6D81D5] hover:text-white transition duration-300 ${
              selectedCategory === category.name
                ? "bg-[#6D81D5] text-white"
                : "bg-[#E0E7FF] text-[#4659AA]"
            }`} // 선택된 카테고리와 일치하면 스타일 적용
            onClick={() => handleCategoryClick(category.name)} // 카테고리 클릭 시 해당 이름을 부모 컴포넌트로 전달
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
        <button
          className="w-[143px] h-[46px] rounded-[10px] bg-[#150C39] text-white"
          onClick={enterRecruitStudyListPage}
        >
          스터디 모집 게시판
        </button>
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
