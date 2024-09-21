import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { EventSourcePolyfill } from 'event-source-polyfill';
import AlarmToastNotification from "../common/AlarmToastNotification";

const NotificationComponent: React.FC = () => {
    const [likes, setLikes] = useState<any[]>([]); // 'like' 이벤트 데이터를 저장할 상태
    const [currentUser, setCurrentUser] = useState<any | null>(null);
    const [showMentionNotiToast, setShowMentionNotiToast] = useState(false);
    const [showFriendNotiToast, setShowFriendNotiToast] = useState(false);
    const [mentionMessage, setMentionMessage] = useState("");

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axiosInstance.get(
                    `${process.env.REACT_APP_API_URL}/api/v1/users/whoami`
                );
                setCurrentUser(response.data.data);
            } catch (error: unknown) {
                console.error("사용자 정보를 가져오는 데 실패했습니다:", getErrorMessage(error));
            }
        };

        fetchCurrentUser();
    }, []);

    useEffect(() => {
        if (currentUser && currentUser.id) {
            // const eventSource = new EventSource(`${process.env.REACT_APP_API_URL}/api/v1/users/notification/subscribe/${currentUser.id}`, {
            //     withCredentials: true,
            // });

            const yourToken = localStorage.getItem('Authorization');
            const eventSource = new EventSourcePolyfill(
                `${process.env.REACT_APP_API_URL}/api/v1/users/notifications/subscribe/${currentUser.id}`,
                {
                    withCredentials: true
                }
            );

            // SSE 연결이 열렸을 때 호출
            eventSource.onopen = async () => {
                await console.log("sse opened!")
            }

            // 'notification' 이벤트 수신 시 호출
            eventSource.addEventListener("notification", (event: any) => {
                console.log("notification 이벤트 수신");
                const data = JSON.parse(event.data);
                console.log(data);

                // 데이터의 receiver와 comment가 존재하는지 확인
                if (data.receiver && data.receiver.nickname && data.comment && data.comment.content) {
                    setMentionMessage(data.comment.content);

                    if (data.notiType === "MENTION") {
                        setShowMentionNotiToast(true);
                    } else if (data.notiType === "FRIEND") {
                        setShowFriendNotiToast(true);
                    }
                } else {
                    console.error("Invalid data structure:", data);
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

    return (
        <>
            {showMentionNotiToast && (
                <AlarmToastNotification sender="발신자" message={mentionMessage} notiType="MENTION" onClose={handleCloseMentionNotiToast} />
            )}
            {showFriendNotiToast && (
                <AlarmToastNotification sender="발신자" message="친구 추가 알림!" notiType="FRIEND" onClose={handleCloseFriendNotiToast} />
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
