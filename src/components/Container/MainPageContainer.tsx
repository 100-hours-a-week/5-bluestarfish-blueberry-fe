import React, { useEffect, useState } from "react";
import Carousel from "../common/Carousel";
import StudyroomTNContainer from "./StudyroomTNContainer";
import QnAModal from "../Modal/QnAModal";
import ToastNotification from "../common/ToastNotification";

const MainPageContainer: React.FC = () => {
  const [isQnAModalOpen, setQnAModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const closeQnAModal = () => {
    setQnAModalOpen(false);
  };

  const openQnAModal = () => {
    setQnAModalOpen(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  // 모달이 열릴 때 배경 스크롤 막기
  useEffect(() => {
    if (isQnAModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isQnAModalOpen]);

  return (
    <div className="flex flex-col mt-[80px] items-center w-full bg-white">
      <Carousel />
      <div className="w-full max-w-[1024px] px-4">
        <StudyroomTNContainer />
      </div>
      <div className="fixed right-4 bottom-4 p-4">
        <button
          onClick={openQnAModal}
          className="flex items-center justify-center w-[50px] h-[50px] bg-[#E0E7FF] hover:bg-[#C6CFFF] rounded-full shadow-lg transition-transform transform hover:scale-105"
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/operator.png`}
            alt="Operator"
            className="h-6 w-6"
          />
        </button>
      </div>

      {isQnAModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 모달 배경 */}
          <div className="fixed inset-0 bg-black bg-opacity-50 pointer-events-none" />
          {/* 모달 내용 */}
          <div className="relative z-50">
            <QnAModal closeModal={closeQnAModal} setShowToast={setShowToast} />
          </div>
        </div>
      )}
      {showToast && (
        <ToastNotification
          message="피드백 제출 완료!"
          isSuccess={true}
          onClose={handleCloseToast}
        />
      )}
    </div>
  );
};

export default MainPageContainer;
