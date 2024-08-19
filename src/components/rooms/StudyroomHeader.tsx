import React, { useState } from "react";

const StudyroomHeader: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="flex items-center justify-between m-[3px] h-[40px] mx-auto">
      <div className="flex items-center space-x-[12px]">
        <button className="flex items-center justify-center gap-2 w-[130px] h-[40px] rounded-[10px] bg-[#4b89dc] text-white font-bold text-[16px]">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/all.png`}
            alt="all"
            className="h-[11.25px]"
          />
          <p>전체보기</p>
        </button>
        <button className="flex items-center justify-center gap-3 w-[130px] h-[40px] rounded-[10px] bg-[#98BBEB] text-white font-bold text-[16px]">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/camera-on.png`}
            alt="all"
            className="h-[20px]"
          />
          캠켜공
        </button>
        <button className="flex items-center justify-center w-[130px] gap-3 h-[40px] rounded-[10px] bg-[#98BBEB] text-white font-bold text-[16px]">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/camera-off.png`}
            alt="all"
            className="h-[20px]"
          />
          캠끄공
        </button>
      </div>
      <div className="flex gap-4 font-bold">
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
