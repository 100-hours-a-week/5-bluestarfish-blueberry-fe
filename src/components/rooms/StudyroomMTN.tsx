import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginedUserStore } from "../../store/store";
import axiosInstance from "../../utils/axiosInstance";

type StudyroomMTNProps = {
  id: number;
  title: string;
  needPassword: boolean;
  camEnabled: boolean;
  currentUsers: number;
  maxUsers: number;
  thumbnail: string;
  isSelected: boolean;
  openModal: () => void;
  setClickedRoomId: (id: number) => void;
};

const StudyroomMTN: React.FC<StudyroomMTNProps> = ({
  id,
  title,
  needPassword,
  camEnabled,
  currentUsers,
  maxUsers,
  thumbnail,
  isSelected,
  openModal,
  setClickedRoomId,
}) => {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userId } = useLoginedUserStore();
  const enterEnabledRef = useRef<boolean>(false);
  const enterStudyRoom = async () => {
    await fetchStudyRooms();
    if (userId == 0) {
      alert("로그인이 필요한 서비스입니다!");
      return;
    }
    if (!enterEnabledRef.current) {
      alert(
        "스터디룸 정원이 모두 가득 찼습니다. 다른 스터디룸을 이용해주세요."
      );
      return;
    }
    if (needPassword) {
      setClickedRoomId(id);
      openModal();
    } else
      navigate(`/wait/${id}`, {
        state: { authorized: true, needPassword: false },
      });
  };

  const fetchStudyRooms = async (reset: boolean = false): Promise<void> => {
    if (isLoading) return;
    try {
      setIsLoading(true);

      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/v1/rooms/${id}`
      );
      const roomData = response.data.data;
      if (roomData.maxUsers > roomData.userRooms.length) {
        enterEnabledRef.current = true;
      } else {
        enterEnabledRef.current = false;
      }
    } catch (error) {
      console.error("스터디룸 목록을 불러오지 못했습니다:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative w-[187px] h-[171px] cursor-pointer"
      onClick={enterStudyRoom}
    >
      <div
        className={`w-full h-full rounded-lg bg-cover bg-center bg-blend-darken bg-black bg-opacity-50 ${
          isSelected ? "blur-[1.5px] opacity-70" : ""
        }`}
        style={{ backgroundImage: `url(${thumbnail})` }}
      >
        {/* 카메라 아이콘 */}
        <div className="absolute top-1 left-2">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/${
              camEnabled ? "cam-on-icon.png" : "cam-off-icon.png"
            }`}
            alt="cam-icon"
            className="w-[20px]"
          />
        </div>

        {/* 방 제목 */}
        <div className="h-full flex justify-center items-center">
          <div className="text-white text-sm font-semibold">{title}</div>
        </div>

        {/* 인원 수 */}
        <div className="absolute top-2 right-2 flex items-center space-x-1">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/person-white.png`}
            alt="person-icon"
            className="w-[23px]"
          />
          <div className="text-gray-300 text-[14px] font-bold -mt-2">
            {currentUsers} / {maxUsers}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyroomMTN;
