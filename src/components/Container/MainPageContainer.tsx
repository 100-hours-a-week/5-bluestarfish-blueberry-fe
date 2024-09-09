import React, { useEffect, useState } from "react";
import Carousel from "../common/Carousel";
import StudyroomTNContainer from "./StudyroomTNContainer";
import QnAModal from "../Modal/QnAModal";
import ToastNotification from "../common/ToastNotification";
import RankingSlider from "../users/RankingSlider";
import { useLoginedUserStore } from "../../store/store";
import axiosInstance from "../../utils/axiosInstance";

interface Rank {
  rank: number;
  nickname: string;
  time: string;
}

const MainPageContainer: React.FC = () => {
  const [isQnAModalOpen, setQnAModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [rankingData, setRankingData] = useState<Rank[]>([]);
  const { userId } = useLoginedUserStore();

  const closeQnAModal = () => {
    setQnAModalOpen(false);
  };

  const openQnAModal = () => {
    setQnAModalOpen(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const getUserRankingInfo = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/v1/users/${userId}/ranks`
      );
      if (response.status === 200) {
        console.log("200 OK");
        setRankingData(response.data.data);
        console.log(response.data.data);
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 404) {
          console.error(
            "404 오류: ",
            error.response.data.message || "로그인된 유저를 찾을 수 없습니다."
          );
        } else {
          console.error(
            `오류 발생 (${error.response.status}):`,
            error.response.data.message || "서버 오류가 발생했습니다."
          );
        }
      } else {
        console.error("랭킹 정보를 가져오는 중 오류 발생:", error.message);
      }
    }
  };

  // 모달이 열릴 때 배경 스크롤 막기
  useEffect(() => {
    if (isQnAModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isQnAModalOpen]);

  useEffect(() => {
    getUserRankingInfo();
  }, [userId]);

  return (
    <div className="flex flex-col mt-[80px] items-center w-full bg-white">
      <Carousel />
      <div className="w-full max-w-[1024px] px-4">
        {rankingData.length && <RankingSlider rankingData={rankingData} />}
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
