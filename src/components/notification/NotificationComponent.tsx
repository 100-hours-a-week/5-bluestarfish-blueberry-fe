import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { EventSourcePolyfill } from 'event-source-polyfill';
import AlarmToastNotification from "../common/AlarmToastNotification";

const NotificationComponent: React.FC = () => {
    const [likes, setLikes] = useState<any[]>([]); // 'like' 이벤트 데이터를 저장할 상태
    const [currentUser, setCurrentUser] = useState<any | null>(null);
    const [showMentionNotiToast, setShowMentionNotiToast] = useState(false);

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
                `${process.env.REACT_APP_API_URL}/api/v1/users/notification/subscribe/${currentUser.id}`,
                {
                    withCredentials: true
                }
            );

            // SSE 연결이 열렸을 때 호출
            eventSource.onopen = async () => {
                await console.log("sse opened!")
            }

            // 'like' 이벤트 수신 시 호출
            eventSource.addEventListener("notification", (event: any) => {
                console.log("notification 이벤트 수신");
                const data = JSON.parse(event.data);
                console.log(data)
                // alert(data.sender.nickname + "님이 댓글에서 당신을 멘션했어요!");
                setShowMentionNotiToast(true);
                // const data = JSON.parse(event.data); // 서버로부터 받은 데이터
                // setLikes((prevLikes) => [...prevLikes, data]); // 받은 데이터를 상태에 추가
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

    return (
        // <div>
        //     <h2>알림 (Likes)</h2>
        //     <ul>
        //         {likes.map((like, index) => (
        //             <li key={index}>{JSON.stringify(like)}</li>
        //         ))}
        //     </ul>
        // </div>
        <>
            {showMentionNotiToast && (
                <AlarmToastNotification sender="발신자" message="멘션 알림!" notiType="MENTION" onClose={handleCloseMentionNotiToast} />
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
