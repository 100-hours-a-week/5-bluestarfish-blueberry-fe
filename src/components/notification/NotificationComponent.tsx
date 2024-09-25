import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { EventSourcePolyfill } from "event-source-polyfill";
import AlarmToastNotification from "../common/AlarmToastNotification";

const NotificationComponent: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [showMentionNotiToast, setShowMentionNotiToast] = useState(false);
  const [showFriendNotiToast, setShowFriendNotiToast] = useState(false);
  const [showAcceptFriendNotiToast, setShowAcceptFriendNotiToast] =
    useState(false);
  const [showInviteNotiToast, setShowInviteNotiToast] = useState(false);
  const [mentionMessage, setMentionMessage] = useState("");
  const [mentionSenderNickname, setMentionSenderNickname] = useState("");
  const [inviteSenderNickname, setInviteSenderNickname] = useState("");
  const [friendMessage, setFriendMessage] = useState("");
  const [acceptFriendMessage, setAcceptFriendMessage] = useState("");
  const [inviteMessage, setInviteMessage] = useState("");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/v1/users/whoami`
        );
        setCurrentUser(response.data.data);
      } catch (error: unknown) {
        console.error(
          "사용자 정보를 가져오는 데 실패했습니다:",
          getErrorMessage(error)
        );
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      // const eventSource = new EventSource(`${process.env.REACT_APP_API_URL}/api/v1/users/notification/subscribe/${currentUser.id}`, {
      //     withCredentials: true,
      // });

      const yourToken = localStorage.getItem("Authorization");
      const eventSource = new EventSourcePolyfill(
        `${process.env.REACT_APP_API_URL}/api/v1/users/notifications/subscribe/${currentUser.id}`,
        {
          withCredentials: true,
        }
      );

      // SSE 연결이 열렸을 때 호출
      eventSource.onopen = () => {
        console.log("sse opened!");
      };

      // 'notification' 이벤트 수신 시 호출
      eventSource.addEventListener("notification", (event: any) => {
        console.log("notification 이벤트 수신");
        const data = JSON.parse(event.data);

        if (data.notiType === "MENTION") {
          setMentionMessage(data.comment.content);
          setMentionSenderNickname(data.sender.nickname);
          setShowMentionNotiToast(true);
        } else if (
          data.notiType === "FRIEND" &&
          data.notiStatus === "PENDING"
        ) {
          setFriendMessage(data.sender.nickname + "님이 친구 요청을 보냈어요!");
          setShowFriendNotiToast(true);
        } else if (
          data.notiType === "FRIEND" &&
          data.notiStatus === "ACCEPTED"
        ) {
          // 발신자와 수신자 모두 알림 처리
          if (data.sender.id === currentUser.id) {
            // 발신자일 경우: 친구가 수락했음을 알림
            setAcceptFriendMessage(
              `${data.receiver.nickname}님과 친구가 되었어요!`
            );
          } else {
            // 수신자일 경우: 수락한 알림
            setAcceptFriendMessage(
              `${data.sender.nickname}님과 친구가 되었어요!`
            );
          }
          setShowAcceptFriendNotiToast(true);
        } else if (data.notiType === "ROOM" && data.notiStatus === "PENDING") {
          setInviteMessage(data.room.title + "에서 기다리고 있어요!");
          setInviteSenderNickname(data.sender.nickname);
          setShowInviteNotiToast(true);
        }
      });

      // SSE 연결 상태 및 에러 처리
      eventSource.onerror = (error) => {
        console.error("SSE 에러 발생:", error);
        switch (eventSource.readyState) {
          case EventSource.CONNECTING:
            console.log("SSE 재연결 중...");
            break;
          case EventSource.CLOSED:
            console.log("SSE 연결이 닫혔습니다.");
            break;
          default:
            console.log("알 수 없는 상태", eventSource.readyState);
        }
      };

      // 컴포넌트 언마운트 시 SSE 연결 종료
      return () => {
        eventSource.close();
        console.log("SSE 연결이 닫혔습니다.");
      };
    }
  }, [currentUser]);

  const handleCloseMentionNotiToast = () => {
    setShowMentionNotiToast(false);
  };

  const handleCloseFriendNotiToast = () => {
    setShowFriendNotiToast(false);
  };

  const handleCloseAcceptFriendNotiToast = () => {
    setShowAcceptFriendNotiToast(false);
  };

  const handleCloseInviteNotiToast = () => {
    setShowInviteNotiToast(false);
  };

  return (
    <>
      {showMentionNotiToast && (
        <AlarmToastNotification
          sender={mentionSenderNickname}
          message={mentionMessage}
          notiType="MENTION"
          onClose={handleCloseMentionNotiToast}
        />
      )}
      {showFriendNotiToast && (
        <AlarmToastNotification
          sender="발신자"
          message={friendMessage}
          notiType="FRIEND"
          onClose={handleCloseFriendNotiToast}
        />
      )}
      {showAcceptFriendNotiToast && (
        <AlarmToastNotification
          sender="발신자"
          message={acceptFriendMessage}
          notiType="FRIEND"
          onClose={handleCloseAcceptFriendNotiToast}
        />
      )}
      {showInviteNotiToast && (
        <AlarmToastNotification
          sender={inviteSenderNickname}
          message={inviteMessage}
          notiType="ROOM"
          onClose={handleCloseInviteNotiToast}
        />
      )}
    </>
  );
};

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

export default NotificationComponent;
