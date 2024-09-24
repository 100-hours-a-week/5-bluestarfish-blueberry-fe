import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useLoginedUserStore } from "../../store/store";
import { useParams } from "react-router-dom";

interface Friend {
  id: number;
  nickname: string;
}

interface InviteUserModalProps {
  closeModal: () => void;
}

const InviteUserModal: React.FC<InviteUserModalProps> = ({ closeModal }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inviteUserNickname, setInviteUserNickname] = useState<string>("");
  const [friends, setFriends] = useState<Friend[]>([]);
  const { userId } = useLoginedUserStore();
  const { roomId } = useParams<{ roomId: string }>();

  // 1. 친구 목록 불러오기
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/v1/users/friends/${userId}`
        );
        setFriends(response.data.data);
      } catch (error) {
        console.error("친구 목록을 불러오는 데 실패했습니다.", error);
      }
    };
    fetchFriends();
  }, [userId]);

  const handleFriendNicknameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const nickname = e.target.value.trim();
    setInviteUserNickname(nickname);
  };

  const inviteFriend = async () => {
    if (isLoading) return;

    // 2. 초대할 친구가 목록에 있는지 확인
    const friend = friends.find(
      (f) => f.nickname === inviteUserNickname
    );

    if (!friend) {
      alert("해당 닉네임을 가진 친구가 없습니다. 친구 목록에서 초대할 수 있습니다.");
      return;
    }

    try {
      setIsLoading(true);

      // 3. 초대 알림을 보내기 위한 API 호출 (친구 ID를 사용)
      const requestBody = {
        receiverId: friend.id,   // 초대할 친구의 ID
        notiType : "ROOM",
        notiStatus: "PENDING",
        commentId : null,
        roomId: roomId,
      };

      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/api/v1/users/${userId}/notifications`,
        requestBody
      );

      if (response.status === 201) {
        alert("초대 요청이 성공하였습니다!");
      }
    } catch (error) {
      console.error("초대 요청 실패:", error);
      alert("초대 요청을 보내는 데 실패했습니다.");
    } finally {
      setIsLoading(false); // 로딩 상태 종료
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
          disabled={isLoading}
        >
          초대하기
        </button>
      </div>
    </div>
  );
};

export default InviteUserModal;
