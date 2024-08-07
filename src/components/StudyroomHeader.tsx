import React, { useState } from "react";

const StudyroomHeader: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <header className="w-full">
      <div className="flex items-center justify-between w-[1024px] h-[40px] mx-auto relative">
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
        <div className="relative">
          <button
            className="w-[130px] h-[40px] rounded-[10px] bg-[#4659AA] text-white"
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
    </header>
  );
};

export default StudyroomHeader;
