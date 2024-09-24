import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useLoginedUserStore } from "../../store/store";
import { useParams } from "react-router-dom";

interface Friend {
  id: number;
  nickname: string;
  profileImage: string | null;
}

interface InviteUserModalProps {
  closeModal: () => void;
}

const InviteUserModal: React.FC<InviteUserModalProps> = ({ closeModal }) => {
  const [inviteUserNickname, setInviteUserNickname] = useState<string>(""); // 입력한 닉네임
  const [filteredFriends, setFilteredFriends] = useState<Friend[]>([]); // 검색 결과 친구 목록
  const [friends, setFriends] = useState<Friend[]>([]); // 전체 친구 목록
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태
  const { userId } = useLoginedUserStore();
  const { roomId } = useParams<{ roomId: string }>();

  // 친구 목록 불러오기
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/v1/users/friends/${userId}`
        );
        const friendsList = response.data.data;
        setFriends(friendsList); // 친구 목록 설정
        setFilteredFriends(friendsList); // 처음에 전체 친구 목록을 보여주기 위해 추가
      } catch (error) {
        console.error("친구 목록을 불러오는 데 실패했습니다.", error);
      }
    };
    fetchFriends();
  }, [userId]);


  // 입력된 닉네임에 따라 친구 검색
  const handleFriendNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nickname = e.target.value.trim();
    setInviteUserNickname(nickname);

    // 닉네임을 포함한 친구 필터링
    const filtered = friends.filter((friend) =>
      friend.nickname.toLowerCase().includes(nickname.toLowerCase())
    );
    setFilteredFriends(filtered);
  };

  // 친구 초대 요청
  const inviteFriend = async (friendId: number) => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      // 초대 알림 전송
      const requestBody = {
        receiverId: friendId,
        notiType: "ROOM",
        notiStatus: "PENDING",
        commentId: null,
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
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative z-50 w-[500px] h-[600px] bg-white text-black rounded-lg shadow-2xl p-6">
        <button onClick={closeModal} className="absolute top-4 right-4">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/close.png`}
            alt="Close"
            className="h-4 w-4 cursor-pointer"
          />
        </button>
        <h2 className="text-center text-2xl font-semibold mb-4">
          친구 초대
        </h2>
        <div className="flex justify-center items-center mb-10">
          {/* 검색 바 */}
          <div className="mt-[20px] p-5 overflow-hidden w-[60px] h-[60px] hover:w-[80%] bg-[#A8B4E5] shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300">
            <div className="flex items-center justify-center fill-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path
                  d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="초대할 친구의 닉네임을 입력하세요"
              value={inviteUserNickname}
              onChange={handleFriendNicknameChange}
              className="outline-none text-[17px] bg-transparent w-full text-white font-normal px-4 placeholder-white"
            />
          </div>
        </div>

        {/* 친구 목록 */}
        <div className="overflow-y-auto max-h-[350px]"> {/* 스크롤 추가 */}
          {filteredFriends.length > 0 ? (
            <ul>
              {filteredFriends.map((friend) => (
                <li
                  key={friend.id}
                  className="flex items-center justify-between py-4 px-4 bg-[#F8F8FF] hover:bg-[#ebf0ff] transition-colors mb-2 rounded-lg"
                >
                  <div className="flex items-center">
                    <img
                      src={friend.profileImage || `${process.env.PUBLIC_URL}/assets/images/profile1.png`}
                      alt={friend.nickname}
                      className="w-10 h-10 rounded-full mr-4"
                      onError={(e) => { e.currentTarget.src = `${process.env.PUBLIC_URL}/assets/images/profile1.png`; }}
                    />
                    <span className="font-medium">{friend.nickname}</span>
                  </div>
                  <button
                    className="bg-[#4659AA] text-white px-4 py-1 rounded-full hover:bg-[#3b4a89] transition"
                    onClick={() => inviteFriend(friend.id)}
                    disabled={isLoading}
                  >
                    초대
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InviteUserModal;
