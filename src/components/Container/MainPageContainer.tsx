import { useState } from "react";
import RankingSlider from "../RankingSlider";
import StudyroomTNContainer from "./StudyroomTNContainer";
import QnAModal from "../Modal/QnAModal";

const MainPageContainer: React.FC = () => {
  const [isQnAModalOpen, setQnAModalOpen] = useState(false);

  const closeQnAModal = () => {
    setQnAModalOpen(false);
  };

  const openQnAModal = () => {
    setQnAModalOpen(true);
  };

  return (
    <body className="flex flex-col mt-[80px] items-center w-full bg-white">
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/intro-1.png`}
        alt="intro"
        className="w-full"
      />
      <div className="w-full]">
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
    </body>
  );
};

export default MainPageContainer;
