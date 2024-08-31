import React from "react";
import { useNavigate } from "react-router-dom";
type StudyroomFooterProps = {};

const StudyroomFooter: React.FC<StudyroomFooterProps> = () => {
  const navigate = useNavigate();
  const enterRecruitStudyListPage = () => {
    navigate("/rooms/list");
  };

  return (
    <div className="flex justify-center md:justify-end">
      <button
        className="w-[100px] h-[35px] sm:w-[110px] sm:h-[38px] md:w-[127px] md:h-[40px] rounded-[10px] bg-[#4659AA] text-white text-[16px] sm:text-[18px] md:text-[20px] font-bold"
        onClick={enterRecruitStudyListPage}
      >
        더 보기
      </button>
    </div>
  );
};

export default StudyroomFooter;
