import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useLoginedUserStore } from "../../store/store";
import { useParams } from "react-router-dom";

interface InviteUserModalProps {
  closeModal: () => void;
}

interface User {
  id: number;
  profileImage: string;
  nickname: string;
  time: string;
  isFriend: boolean;
}

const InviteUserModal: React.FC<InviteUserModalProps> = ({ closeModal }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inviteUserNickname, setInviteUserNickname] = useState<string>("");
  const [inviteUserId, setInviteUserId] = useState<number>(0);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const { userId } = useLoginedUserStore();
  const { roomId } = useParams<{ roomId: string }>();

  const handleFriendNicknameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const nickname = e.target.value.trim();
    setInviteUserNickname(nickname);
    searchUsers(nickname);
    setInviteUserId(0);
  };

  const searchUsers = async (nickname: string) => {
    if (nickname === "") {
      setSearchResults([]);
      return;
    }
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/v1/users?keyword=${nickname}`
      );
      if (response.status === 200) {
        setSearchResults(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const inviteFriend = async () => {
    if (isLoading || !inviteUserId) return;

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/api/v1/friends/invite`,
        {
          room_id: roomId,
          sender_id: userId,
          receiver_id: inviteUserId,
          status: "PENDING",
        }
      );
      if (response.status === 201) {
        alert("초대 요청이 성공하였습니다!");
        setInviteUserId(0);
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error inviting friend:", error);
      // 에러 처리
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  const handleUserClick = (user: User) => {
    setInviteUserId(user.id);
    setSearchResults([]);
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
        <p className="text-center text-[14px] m-1">
          초대할 유저의 닉네임을 입력해주세요.
        </p>
        <input
          id="friendNickname"
          type="text"
          maxLength={15}
          value={inviteUserNickname}
          onChange={handleFriendNicknameChange}
          className="w-full h-[30px] rounded-[14px] my-4 p-2 text-[12px]"
        ></input>
        {/* 검색 결과 리스트 */}
        {searchResults.length > 0 && (
          <div className="max-h-[150px] overflow-auto bg-white p-2 rounded-lg shadow-inner">
            {searchResults.map((user) => (
              <div
                key={user.id}
                className="flex items-center p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleUserClick(user)}
              >
                <img
                  src={
                    user.profileImage ||
                    `${process.env.PUBLIC_URL}/assets/images/profile-default-image.png`
                  }
                  alt={user.nickname}
                  className="h-6 w-6 rounded-full mr-2"
                />
                <div>
                  <p className="text-sm font-semibold">{user.nickname}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <button
          className={`block mx-auto mt-4 py-1 px-3 rounded-[15px] ${
            inviteUserId
              ? "bg-[#4659AA] text-white" // 활성화 상태
              : "bg-gray-300 text-gray-500 cursor-not-allowed" // 비활성화 상태
          }`}
          onClick={inviteFriend}
          disabled={!inviteUserId}
        >
          {isLoading ? "응답 대기중..." : "초대하기"}
        </button>
      </div>
    </div>
  );
};

export default InviteUserModal;
