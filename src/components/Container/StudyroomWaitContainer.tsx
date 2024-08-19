import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LargeUserDisplay from "../LargeUserDisplay";

type StudyroomWaitContainerProps = {};

const StudyroomWaitContainer: React.FC = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>(); // URL에서 roomId를 가져옴
  const userId = 1;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = () => {
    enterStudyRoom();
  };

  const enterStudyRoom = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/v1/rooms/${roomId}/users/${userId}`,
        {
          isActive: "True",
        }
      );
      if (response.status === 200) {
        console.log("200 OK");
        navigate(`/studyroom/${roomId}`);
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 204) {
          console.error("204: ", "No Content");
        } else if (error.response.status === 404) {
          console.error("404: ", "Not Found");
        } else {
          console.error(
            `오류 발생 (${error.response.status}):`,
            error.response.data.message || "서버 오류가 발생했습니다."
          );
        }
      } else {
        console.error("스터디룸 정보를 가져오는 중 오류 발생:", error.message);
      }
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <p className="text-[25px] font-bold text-shadow-sm text-black mb-3">
        스터디 룸 대기실
      </p>
      <LargeUserDisplay
        backgroundImage={`${process.env.PUBLIC_URL}/assets/images/user-display-default.png`}
      />
      <div className="w-[800px] mt-2 ml-12">
        <p className="text-[14px]">현재 영상은 다른 사람이 볼 수 없습니다.</p>
      </div>
      <div className="mt-10 flex flex-row gap-5">
        <button>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/camera.png`}
            alt="all"
            className="h-[23px]"
          />
        </button>
        <button>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/mic.png`}
            alt="all"
            className="h-[28px]"
          />
        </button>
        <button>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/speaker.png`}
            alt="all"
            className="h-[26px]"
          />
        </button>
      </div>
      <p className="mt-4 text-gray-500 text-[14px]">
        스터디 룸에 입장하기 전에 필요한 설정을 확인하세요 !
      </p>
      <button
        className="mt-10 rounded-[20px] w-[86px] h-[46px] bg-[#4659aa] text-white text-[20px] shadow-2xl"
        onClick={handleClick}
      >
        입장
      </button>
    </div>
  );
};

export default StudyroomWaitContainer;
