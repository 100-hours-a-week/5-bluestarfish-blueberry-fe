import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
type StudyroomFooterProps = {};

const StudyroomFooter: React.FC<StudyroomFooterProps> = () => {
  const navigate = useNavigate();
  const enterRecruitStudyListPage = () => {
    navigate("/rooms/list");
  };

  return (
    <div className="flex justify-end">
      <button
        className="w-[127px] h-[40px] rounded-[10px] bg-[#4659AA] text-white text-[20px] font-bold"
        onClick={enterRecruitStudyListPage}>
        더 보기
      </button>
    </div>
  );
};

export default StudyroomFooter;
