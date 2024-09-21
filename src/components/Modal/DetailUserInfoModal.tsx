import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useLoginedUserStore } from "../../store/store";

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

  const addFriend = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/api/v1/friends`,
        {
          sender_id: userId,
          receiver_id: receiverId,
          status: "PENDING",
        }
      );
      if (response.status === 201) {
        alert("요청이 성공하였습니다!");
      }
    } catch (error) {
      // 에러 처리
    } finally {
      setIsLoading(false); // 로딩 종료
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
            `${process.env.PUBLIC_URL}/assets/images/user-default-profile.png`
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
      </div>
    </div>
  );
};

export default DetailUserInfoModal;
