import React, { useState } from "react";

const Ranking: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="flex items-center h-[100px] rounded-[10px] bg-[#EEEEFF] space-x-4 my-[50px]">
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/trophy-star 1.png`}
        alt="intro"
        className="w-[40px] h-[40px] mx-10"
      />
      <div>1위</div>
      <div>조약돌 중독</div>
      <div>23:59:39</div>
      <button
        onClick={toggleModal}
        className="flex items-center justify-center h-10 w-10 p-2 rounded-full focus:outline-none"
      >
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/vector.png`}
          alt="button"
          className="w-[25px] h-[25px]"
        />
      </button>
    </div>
  );
};

export default Ranking;
