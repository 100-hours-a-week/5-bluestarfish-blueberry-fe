import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useLoginedUserStore } from "../../store/store";
import { useNavigate, useLocation } from "react-router-dom";
import AlarmToastNotification from "../common/AlarmToastNotification";

type AlarmModalProps = {
  closeModal: () => void;
};

const AlarmModal: React.FC<AlarmModalProps> = ({ closeModal }) => {
  const { userId } = useLoginedUserStore();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showAcceptFriendNotiToast, setShowAcceptFriendNotiToast] = useState(false);
  const [showDeclineFriendNotiToast, setShowDeclineFriendNotiToast] = useState(false);
  const [showAcceptInviteNotiToast, setShowAcceptInviteNotiToast] = useState(false);
  const [acceptFriendMessage, setAcceptFriendMessage] = useState("");
  const [declineFriendMessage, setDeclineFriendMessage] = useState("");
  const navigate = useNavigate(); // useNavigate 사용

  const fetchNotifications = async () => {
    try {
      const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/users/${userId}/notifications`);
      // FRIEND 또는 ROOM 타입이면서 ACCEPTED, DECLINED 상태인 알림을 숨기고 나머지를 표시
      const filteredNotifications = response.data.data.filter(
        (notification: any) =>
          !((notification.notiType === "FRIEND" && notification.notiStatus === "ACCEPTED") || (notification.notiType === "FRIEND" && notification.notiStatus === "DECLINED") || (notification.notiType === "ROOM" && notification.notiStatus === "ACCEPTED") || (notification.notiType === "ROOM" && notification.notiStatus === "DECLINED"))
      );
      setNotifications(filteredNotifications.reverse()); // 최신 알림이 위로 오도록 정렬
    } catch (error) {
      console.error("알림 데이터를 가져오는 데 실패했습니다:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleCloseAcceptFriendNotiToast = () => {
    setShowAcceptFriendNotiToast(false);
  };

  const handleCloseDeclineFriendNotiToast = () => {
    setShowDeclineFriendNotiToast(false);
  };

  const handleCloseAcceptInviteNotiToast = () => {
    setShowAcceptInviteNotiToast(false);
  };

  // ESC 키로 모달 닫기 기능
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeModal]);

  // 알림 클릭 시 게시글로 이동
  const handleNotificationClick = (notification: any) => {
    if (notification.notiType === 'MENTION') {
      navigate(`/recruit/${notification.comment.post.id}#comment-${notification.comment.id}`); // 게시글로 이동하면서 해시를 통해 댓글로 이동
    }
  };

  const handleAcceptFriendRequest = async (notiId: number) => {
    try {
      if (notiId !== null) {
        // 1. 현재 사용자의 알림 리스트를 조회
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/v1/users/${userId}/notifications`
        );

        const notifications = response.data.data;

        // 2. notiId에 해당하는 알림 찾기
        const notification = notifications.find(
          (noti: any) => noti.id === notiId && noti.notiType === "FRIEND" && noti.notiStatus === "PENDING"
        );

        if (!notification) {
          console.error("해당 알림을 찾을 수 없습니다.");
          return;
        }

        const senderId = notification.sender.id; // 친구 요청을 보낸 사용자 ID

        // 3. 친구 요청을 수락하는 API 요청 (수신자의 알림 반영)
        const requestBody = {
          receiverId: senderId, // 요청을 보낸 사용자를 친구로 추가
          notiType: "FRIEND",
          notiStatus: "ACCEPTED",
          commentId: null,
          roomId: null
        };

        // 친구 요청 수락을 PATCH 요청으로 전송 (수신자의 알림 반영)
        await axiosInstance.patch(`${process.env.REACT_APP_API_URL}/api/v1/users/${userId}/notifications/${notiId}`, requestBody);

        // 4. 발신자에게도 ACCEPTED 알림을 반영
        const senderNotificationBody = {
          receiverId: userId, // 발신자에게 수신자의 정보를 전송
          notiType: "FRIEND",
          notiStatus: "ACCEPTED",
          commentId: null,
          roomId: null
        };

        // 발신자에게 수락 알림 POST 전송
        await axiosInstance.patch(`${process.env.REACT_APP_API_URL}/api/v1/users/${senderId}/notifications/${notiId}`, senderNotificationBody);

        // 5. 알림 리스트에서 해당 알림을 제거하여 화면에서 갱신
        fetchNotifications();

        // 6. 친구가 되었다는 메시지를 표시 (수신자 측)
        // setAcceptFriendMessage(notification.sender.nickname + '님과 친구가 되었어요!');
        // setShowAcceptFriendNotiToast(true);

      }
    } catch (error) {
      console.error('친구 요청 수락 실패:', error);
    }
  };

  const handleDeclineFriendRequest = async (notiId: number) => {
    try {
      if (notiId !== null) {
        // 1. 현재 사용자의 알림 리스트를 조회
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/v1/users/${userId}/notifications`
        );

        const notifications = response.data.data;

        // 2. notiId에 해당하는 알림 찾기
        const notification = notifications.find(
          (noti: any) => noti.id === notiId && noti.notiType === "FRIEND" && noti.notiStatus === "PENDING"
        );

        if (!notification) {
          console.error("해당 알림을 찾을 수 없습니다.");
          return;
        }

        const senderId = notification.sender.id; // 친구 요청을 보낸 사용자 ID

        // 3. 친구 요청을 거절하는 API 요청
        const requestBody = {
          receiverId: senderId,
          notiType: "FRIEND",
          notiStatus: "DECLINED",
          commentId: null,
          roomId: null
        };

        // 친구 요청 거절을 PATCH 요청으로 전송
        await axiosInstance.patch(`${process.env.REACT_APP_API_URL}/api/v1/users/${userId}/notifications/${notiId}`, requestBody);

        

        // alert('친구 요청 거절!');
        setDeclineFriendMessage(notification.sender.nickname + '님의 친구 요청을 거절했어요!');
        setShowDeclineFriendNotiToast(true);
      }
    } catch (error) {
      console.error('친구 요청 거절 실패:', error);
    }
  };

  const handleDeleteNotification = async (notiId: number) => {
    try {
      // 알림 삭제 API 요청
      await axiosInstance.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/users/notifications/${notiId}`
      );
  
      // 알림 리스트 갱신
      fetchNotifications();
    } catch (error) {
      console.error("알림 삭제 중 오류 발생:", error);
    }
  };
  // 일단 스터디룸 초대 수락 기능 생략
  // const handleAcceptInviteRequest = async (notiId: number, roomId: number) => {
  //   try {
  //     if (notiId !== null && roomId !== null) {
  //       // 1. 현재 사용자의 알림 리스트를 조회
  //       const response = await axiosInstance.get(
  //         `${process.env.REACT_APP_API_URL}/api/v1/users/${userId}/notifications`
  //       );

  //       const notifications = response.data.data;

  //       // 2. notiId에 해당하는 알림 찾기
  //       const notification = notifications.find(
  //         (noti: any) => noti.id === notiId && noti.notiType === "ROOM" && noti.notiStatus === "PENDING"
  //       );

  //       if (!notification) {
  //         console.error("해당 초대 알림을 찾을 수 없습니다.");
  //         return;
  //       }

  //       // 3. 초대 수락 처리 (ACCEPTED로 상태 변경)
  //       const requestBody = {
  //         receiverId: notification.sender.id,  // 초대를 보낸 사용자
  //         notiType: "ROOM",
  //         notiStatus: "ACCEPTED",
  //         commentId: null,
  //         roomId: roomId,  // 초대받은 스터디룸 ID
  //       };

  //       // 초대 수락을 PATCH 요청으로 전송
  //       await axiosInstance.patch(`${process.env.REACT_APP_API_URL}/api/v1/users/${userId}/notifications/${notiId}`, requestBody);

  //       fetchNotifications();

  //       // 4. 해당 스터디룸 대기 페이지로 이동
  //       navigate(`/wait/${roomId}`, {
  //         state: { authorized: true }
  //       });

  //     }
  //   } catch (error) {
  //     console.error("스터디룸 초대 수락 실패:", error);
  //   }
  // };



  return (
    <div className="fixed inset-0 z-50" onClick={closeModal}>
      <div
        className="absolute sm:right-0 md:right-16 lg:right-40 xl:right-72 mt-[85px] w-[500px] h-[270px] bg-white text-black text-[8px] rounded-[20px] shadow-lg p-2 space-y-1 overflow-y-auto"
        onClick={handleModalClick}
      >
        <div className="flex items-center m-1 space-x-2 mt-2 mb-5">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/bell.png`}
            alt="알림 벨"
            aria-label="알림 벨 아이콘"
            className="h-[17px] rounded-full cursor-pointer"
          />
          <div className="text-[17px] font-bold">알림</div>
        </div>

        {isLoading ? (
          <div>로딩 중...</div>
        ) : notifications.length === 0 ? (
          <div className="text-[14px]">받은 알림이 없습니다.</div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex w-full h-[50px] items-center justify-between bg-[#ebeeff] rounded-[10px] p-2 cursor-pointer"
            >
              <div
                className="flex items-center space-x-1 w-full justify-between"
                onClick={() => handleNotificationClick(notification)} // 알림 클릭 시 게시글 이동
              >
                {notification.notiType === 'MENTION' && (
                  <div className="flex items-center justify-start w-full">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/noti-mention.png`}
                      alt="프로필 이미지"
                      aria-label="프로필 이미지"
                      className="h-[23px] rounded-full cursor-pointer mr-2"
                    />
                    <div className="flex flex-col">
                      <div className="font-semibold text-[13px]">
                        {notification.sender.nickname}님의 멘션
                      </div>
                      <div className="text-[12px]">{notification.comment.content}</div>
                    </div>
                  </div>
                )}

                {notification.notiType === 'FRIEND' && (
                  <>
                    <div className="flex items-center">
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/images/noti-friend.png`}
                        alt="프로필 이미지"
                        aria-label="프로필 이미지"
                        className="h-[23px] rounded-full cursor-pointer mr-2"
                      />
                      <div className="flex flex-col">
                        <div className="font-semibold text-[13px]">친구 요청</div>
                        <div className="text-[12px]">{notification.sender.nickname}님이 친구 요청을 보냈어요!</div>
                      </div>
                    </div>
                    <div className="ml-auto flex space-x-2">
                      <button
                        onClick={() => handleAcceptFriendRequest(notification.id)}
                        className="bg-green-500 text-white px-2 py-1 rounded-md text-xs hover:bg-green-600"
                      >
                        수락
                      </button>
                      <button
                        onClick={() => handleDeclineFriendRequest(notification.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded-md text-xs hover:bg-red-600"
                      >
                        거절
                      </button>
                    </div>
                  </>
                )}

                {notification.notiType === 'ROOM' && (
                  <div className="flex items-center">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/noti-invite.png`}
                      alt="프로필 이미지"
                      aria-label="프로필 이미지"
                      className="h-[23px] rounded-full cursor-pointer mr-2"
                    />
                    <div className="flex flex-col">
                      <div className="font-semibold text-[13px]">스터디룸 초대</div>
                      <div className="text-[12px]">{notification.sender.nickname}님이 {notification.room.title}에서 기다리고 있어요!</div>
                    </div>
                  </div>
                )}
              </div>
              {/* 삭제 아이콘 */}
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/trash-icon.png`}
                alt="삭제"
                className="h-5 w-5 cursor-pointer ml-4"
                onClick={() => handleDeleteNotification(notification.id)}
              />
            </div>
          ))
        )}
      </div>
      {showAcceptFriendNotiToast && (
        <AlarmToastNotification sender="발신자" message={acceptFriendMessage} notiType="FRIEND" onClose={handleCloseAcceptFriendNotiToast} />
      )}
      {showDeclineFriendNotiToast && (
        <AlarmToastNotification sender="발신자" message={declineFriendMessage} notiType="FRIEND" onClose={handleCloseDeclineFriendNotiToast} />
      )}
    </div>
  );

};

export default AlarmModal;
