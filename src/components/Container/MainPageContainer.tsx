import React from "react";
import { useState } from "react";
import Carousel from "../common/Carousel";
import RankingSlider from "../users/RankingSlider";
import StudyroomTNContainer from "./StudyroomTNContainer";
import QnAModal from "../Modal/QnAModal";
import { useEffect } from "react";
import { useLoginedUserStore } from "../../store/store";

const MainPageContainer: React.FC = () => {
  const [isQnAModalOpen, setQnAModalOpen] = useState(false);

  const { userId, nickname, profileImage } = useLoginedUserStore();

  const closeQnAModal = () => {
    setQnAModalOpen(false);
  };

  const openQnAModal = () => {
    setQnAModalOpen(true);
  };

  useEffect(() => {
    console.log(
      `userId = ${userId}, nickname = ${nickname}, image = ${profileImage}`
    );
  }, [userId]);

  return (
    <div className="flex flex-col mt-[80px] items-center w-full bg-white">
      <Carousel />
      <div className="">
        <RankingSlider />
        <StudyroomTNContainer />
      </div>
      <div className="w-full flex justify-end  p-4">
        <div className="flex rounded-full border-[1px] border-[#a5a5a5] bg-[#BAC0D8] w-[40px] h-[40px] items-center justify-center shadow-lg">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/operator.png`}
            alt="Profile"
            className="h-8 w-8 rounded-full cursor-pointer"
            onClick={openQnAModal}
          />
        </div>
      </div>
      {isQnAModalOpen && <QnAModal closeModal={closeQnAModal} />}
    </div>
  );
};

export default MainPageContainer;
