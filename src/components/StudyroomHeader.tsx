import React, { useState } from "react";

const StudyroomHeader: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="flex items-center justify-between m-[3px] h-[40px] mx-auto">
      <div className="flex items-center space-x-[12px]">
        <button className="w-[130px] h-[40px] rounded-[10px] bg-[#4b89dc] text-white">
          전체보기
        </button>
        <button className="w-[130px] h-[40px] rounded-[10px] bg-[#98BBEB] text-white">
          캠켜공
        </button>
        <button className="w-[130px] h-[40px] rounded-[10px] bg-[#98BBEB] text-white">
          노래듣공
        </button>
      </div>
      <div className="flex gap-4">
        {" "}
        <button
          className="w-[143px] h-[46px] rounded-[10px] bg-[#150C39] text-white"
          onClick={toggleModal}
        >
          스터디 모집 게시판
        </button>
        <button
          className="w-[143px] h-[46px] rounded-[10px] bg-[#150C39] text-white"
          onClick={toggleModal}
        >
          스터디 룸 만들기
        </button>
        {isModalOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg p-4">
            <p>Personal Information</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyroomHeader;
