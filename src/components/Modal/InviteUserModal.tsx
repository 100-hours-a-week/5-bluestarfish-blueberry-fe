import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useLoginedUserStore } from "../../store/store";
import { useParams } from "react-router-dom";

interface InviteUserModalProps {
  closeModal: () => void;
}

const InviteUserModal: React.FC<InviteUserModalProps> = ({ closeModal }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inviteUserNickname, setInviteUserNickname] = useState<string>("");
  const { userId } = useLoginedUserStore();
  const { roomId } = useParams<{ roomId: string }>();

  const handleFriendNicknameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const nickname = e.target.value.trim();
    setInviteUserNickname(nickname);
  };

  const inviteFriend = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/api/v1/friends/invite`,
        {
          room_id: roomId,
          sender_id: userId,
          receiver_nickname: inviteUserNickname,
          status: "PENDING",
        }
      );
      if (response.status === 201) {
        alert("초대 요청이 성공하였습니다!");
      }
    } catch (error) {
      // 에러 처리
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative w-[200px] bg-[#EBEEFF] text-black rounded-lg shadow-2xl p-6">
        <button onClick={closeModal} className="absolute top-2 right-2">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/close.png`}
            alt="Close"
            className="h-2 w-2 cursor-pointer"
          />
        </button>
        <p className="text-center text-[14px]">
          초대할 친구의 닉네임을 입력해주세요.
        </p>
        <input
          id="friendNickname"
          type="text"
          maxLength={15}
          value={inviteUserNickname}
          onChange={handleFriendNicknameChange}
          className="w-full h-[30px] rounded-[14px] my-4 p-2 text-[12px]"
        ></input>
        <button
          className="block mx-auto mt-4 bg-[#4659AA] text-white py-1 px-3 rounded-[15px]"
          onClick={inviteFriend}
        >
          초대하기
        </button>
      </div>
    </div>
  );
};

export default InviteUserModal;
