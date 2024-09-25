import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../common/DeleteModal";
import ToastNotification from "../common/ToastNotification";
import axiosInstance from "../../utils/axiosInstance";
import { useLoginedUserStore } from "../../store/store";
import { useFriendStore } from "../../store/friendStore"; // 친구 스토어 import

type FriendWithTime = {
  id: number;
  profileImage: string;
  nickname: string;
  time: string; // 스터디 시간을 포함
};

const FriendListContainer: React.FC = () => {
  const { userId } = useLoginedUserStore();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedFriendId, setSelectedFriendId] = useState<number | null>(null);
  const [showDeleteFriendToast, setShowDeleteFriendToast] = useState(false);
  
  // Using friend store to manage friends
  const { friends, setFriends } = useFriendStore();
  const [friendsWithTime, setFriendsWithTime] = useState<FriendWithTime[]>([]); // 스터디 시간 포함한 친구 리스트

  // 친구 삭제 핸들러
  const handleDeleteFriend = (id: number) => {
    setSelectedFriendId(id);
    setShowDeleteModal(true);
  };

  // 친구 삭제 확인 로직
  const handleDeleteConfirm = async () => {
    if (selectedFriendId !== null) {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/v1/users/${userId}/notifications`
        );
        const notifications = response.data.data;

        let notification = notifications.find(
          (noti: any) =>
            noti.sender.id === selectedFriendId &&
            noti.notiType === "FRIEND" &&
            noti.notiStatus === "ACCEPTED"
        );

        if (!notification) {
          const friendResponse = await axiosInstance.get(
            `${process.env.REACT_APP_API_URL}/api/v1/users/${selectedFriendId}/notifications`
          );

          const friendNotifications = friendResponse.data.data;
          notification = friendNotifications.find(
            (noti: any) =>
              noti.sender.id === userId &&
              noti.notiType === "FRIEND" &&
              noti.notiStatus === "ACCEPTED"
          );

          if (!notification) {
            console.error("상대방의 알림 리스트에서도 해당 알림을 찾을 수 없습니다.");
            return;
          }
        }

        const requestBody = {
          receiverId: selectedFriendId,
          notiType: "FRIEND",
          notiStatus: "DECLINED",
          commentId: null,
          roomId: null,
        };

        await axiosInstance.patch(
          `${process.env.REACT_APP_API_URL}/api/v1/users/${userId}/notifications/${notification.id}`,
          requestBody
        );

        setFriends(friends.filter((friend) => friend.id !== selectedFriendId));
        setFriendsWithTime(friendsWithTime.filter((friend) => friend.id !== selectedFriendId));

        setShowDeleteModal(false);
        setShowDeleteFriendToast(true);
      } catch (error) {
        console.error("친구 삭제 실패:", error);
      }
    }
  };

  const handleFindNewFriends = () => {
    navigate("/friends/search");
  };

  const handleCloseDeleteFriendToast = () => {
    setShowDeleteFriendToast(false);
  };

  // 각 친구의 스터디 시간을 가져오는 함수
  const fetchStudyTimeForFriends = async (friendId: number) => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/v1/users/${friendId}/time`
      );
      return response.data.data.time || "시간 정보 없음";
    } catch (error) {
      console.error(`스터디 시간을 가져오는 데 실패했습니다: ${friendId}`, error);
      return "시간 정보 없음";
    }
  };

  // 친구 목록과 각 친구의 스터디 시간을 함께 가져오는 함수
  const fetchFriendsWithTime = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/v1/users/friends/${userId}`
      );
      const allFriends = response.data.data;

      // 각 친구의 스터디 시간을 병렬적으로 가져와서 추가
      const friendsWithTimeData = await Promise.all(
        allFriends.map(async (friend: any) => {
          const time = await fetchStudyTimeForFriends(friend.id); // 각 친구의 스터디 시간을 가져옴
          return {
            ...friend,
            time, // 스터디 시간 추가
          };
        })
      );

      setFriendsWithTime(friendsWithTimeData); // 스터디 시간을 포함한 친구 목록 설정
      setFriends(allFriends); // 기존 friends 스토어 업데이트
    } catch (error) {
      console.error("친구 목록을 가져오는 데 실패했습니다:", error);
      setFriendsWithTime([]); // 실패 시 빈 배열로 설정
    }
  };

  useEffect(() => {
    fetchFriendsWithTime(); // 컴포넌트 마운트 시 친구 목록 및 스터디 시간 불러오기
  }, []);

  return (
    <div className="container mx-auto my-8 px-4 mt-32 w-[70%]">
      {/* 친구 목록 상단 */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center ml-3">
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="친구 아이콘"
            className="mr-3 w-8 h-8"
          />
          <h1 className="text-2xl font-semibold text-gray-600">친구</h1>
        </div>
        <button
          onClick={handleFindNewFriends}
          className="text-lg font-semibold flex items-center text-gray-600 px-4 py-2 rounded-lg hover:bg-[#F8F8FF]"
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/magnifier.png`}
            alt="새로운 친구 찾기"
            className="mr-2 w-5 h-5"
          />
          새로운 친구 찾기
        </button>
      </div>

      {/* 친구 목록 카드 디자인 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20">
        {friendsWithTime.length > 0 ? (
          friendsWithTime.map((friend) => (
            <div
              key={friend.id}
              className={`relative bg-[#F8F8FF] shadow-lg rounded-lg overflow-hidden h-[300px] w-full transform transition-transform duration-300 hover:scale-105 group z-0 hover:z-10`}
            >
              {/* 프로필 사진과 이름 */}
              <div className="p-4 flex flex-col items-center group-hover:hidden">
                <img
                  src={friend.profileImage || `${process.env.PUBLIC_URL}/assets/images/profile1.png`}
                  alt={friend.nickname}
                  className="w-20 h-20 rounded-full mt-12 mb-20 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = `${process.env.PUBLIC_URL}/assets/images/profile1.png`;
                  }}
                />
                <h2 className="text-lg font-bold text-gray-700">
                  {friend.nickname}
                </h2>
              </div>
              {/* 마우스 호버 시 나타나는 정보 */}
              <div className="absolute inset-0 bg-white p-4 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-lg font-bold text-gray-700 mb-2">
                  {friend.nickname}
                </h2>
                <p className="text-gray-500 mb-4">스터디 시간: {friend.time}</p>
                <button
                  onClick={() => handleDeleteFriend(friend.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  친구 삭제
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center w-full">친구 목록이 없습니다.</p>
        )}
      </div>

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <DeleteModal
          title="친구를 삭제하시겠습니까?"
          description="삭제된 친구는 복구할 수 없습니다."
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
      {showDeleteFriendToast && (
        <ToastNotification
          message="친구 삭제 성공!"
          isSuccess={true}
          onClose={handleCloseDeleteFriendToast}
        />
      )}
    </div>
  );
};

export default FriendListContainer;
