import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useLoginedUserStore } from "../../store/store";
import ToastNotification from "../common/ToastNotification";

interface DetailUserInfoModalProps {
  closeModal: () => void;
  nickname: string;
  profileImage: string;
  receiverId: number;
}

const DetailUserInfoModal: React.FC<DetailUserInfoModalProps> = ({
  closeModal,
  nickname,
  profileImage,
  receiverId,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userId } = useLoginedUserStore();
  const [showAddFriendToast, setShowAddFriendToast] = useState(false);

  const handleCloseAddFriendToast = () => {
    setShowAddFriendToast(false);
  };

  // 모달에서 추가 버튼을 눌렀을 때 호출되는 함수
  const addFriend = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      if (receiverId !== null && userId != null) {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/v1/users/${receiverId}/notifications`
        );

        const notifications = response.data.data;
        const existingFriendRequest = notifications.some(
          (notification: any) =>
            notification.sender.id === userId &&
            notification.notiType === "FRIEND" &&
            notification.notiStatus === "PENDING"
        );

        if (existingFriendRequest) {
          alert("이미 친구 요청을 보냈습니다.");
          return;
        }

        const requestBody = {
          receiverId: receiverId,
          notiType: "FRIEND",
          notiStatus: "PENDING",
          commentId: null,
          roomId: null,
        };

        await axiosInstance.post(
          `${process.env.REACT_APP_API_URL}/api/v1/users/${userId}/notifications`,
          requestBody
        );

        setShowAddFriendToast(true); // 토스트 메시지 표시
      }
    } catch (error) {
      console.error("친구 요청 전송 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative w-[140px] bg-[#EBEEFF] text-black rounded-lg shadow-2xl p-6">
        <button onClick={closeModal} className="absolute top-2 right-2">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/close.png`}
            alt="Close"
            className="h-2 w-2 cursor-pointer"
          />
        </button>
        <img
          src={
            profileImage ||
            `${process.env.PUBLIC_URL}/assets/images/profile-default-image.png`
          }
          alt="user-profile"
          className="h-[100px] w-[100px] rounded-full my-1"
        />
        <p className="text-center text-[14px]">{nickname}</p>
        <button
          className="block mx-auto mt-4 bg-[#4659AA] text-white py-1 px-3 rounded-[15px]"
          onClick={addFriend}
        >
          친구추가
        </button>
      </div>{" "}
      {showAddFriendToast && (
        <ToastNotification
          message="친구 요청 성공!"
          isSuccess={true}
          onClose={handleCloseAddFriendToast}
        />
      )}
    </div>
  );
};

export default DetailUserInfoModal;
