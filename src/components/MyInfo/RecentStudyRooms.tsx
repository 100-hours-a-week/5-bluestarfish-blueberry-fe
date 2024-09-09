import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import StudyroomMTN from "../rooms/StudyroomMTN";

interface StudyRoom {
    id: number;
    title: string;
    needPassword: boolean;
    maxUsers: number;
    camEnabled: boolean;
    thumbnail: string;
    memberNumber: number;
    createdAt: string;
}

const RecentAndMyStudyRooms: React.FC = () => {
    const [myStudyRooms, setMyStudyRooms] = useState<StudyRoom[]>([]);
    const [recentStudyRooms, setRecentStudyRooms] = useState<StudyRoom[]>([]);
    const [clickedRoomId, setClickedRoomId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/users/whoami`);
                const userId = response.data.data.id;
                setCurrentUserId(userId);

                if (userId) {
                    fetchMyStudyRooms(userId);
                    fetchRecentStudyRooms();
                }
            } catch (error) {
                console.error("사용자 정보를 가져오는 데 실패했습니다:", error);
            }
        };

        fetchCurrentUser();
    }, []);

    // 내가 만든 스터디룸을 가져오는 함수
    const fetchMyStudyRooms = async (userId: number) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get(
                `${process.env.REACT_APP_API_URL}/api/v1/rooms/my/${userId}`
            );

            // 응답 받은 데이터 배열에서 최신순으로 정렬 후 상위 10개만 추출
            const sortedRooms = response.data.data
                .sort((a: StudyRoom, b: StudyRoom) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // 최신순 정렬
                .slice(0, 10); // 최대 10개만 추출

            setMyStudyRooms(sortedRooms);
        } catch (error) {
            setError("내가 만든 스터디룸을 가져오는 데 실패했습니다.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };



    // 최근 방문한 스터디룸을 최대 10개 가져오는 함수
    const fetchRecentStudyRooms = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/rooms`);

            // response.data가 배열이므로 최대 10개만 slice로 가져오기
            const recentRooms = response.data.slice(0, 10);
            setRecentStudyRooms(recentRooms);
        } catch (error) {
            setError("최근 방문한 스터디룸을 가져오는 데 실패했습니다.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const openQnAModal = () => {
        console.log("모달을 열었습니다.");
    };

    return (
        <div className="container mx-auto my-4 mt-20">
            {isLoading && <p>로딩 중...</p>}
            {error && <p>{error}</p>}

            {/* 내가 만든 스터디룸 */}
            <h2 className="text-lg mb-4">내가 만든 스터디룸</h2>
            <div className="my-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
                {myStudyRooms.length > 0 ? (
                    myStudyRooms.map((room) => (
                        <StudyroomMTN
                            key={room.id}
                            id={room.id}
                            title={room.title}
                            needPassword={room.needPassword}
                            camEnabled={room.camEnabled}
                            currentUsers={room.memberNumber}
                            maxUsers={room.maxUsers}
                            thumbnail={
                                room.thumbnail ||
                                `${process.env.PUBLIC_URL}/assets/images/study-thumbnail-1.png`
                            }
                            isSelected={false}
                            openModal={openQnAModal}
                            setClickedRoomId={setClickedRoomId}
                        />
                    ))
                ) : (
                    <p className="w-full whitespace-nowrap">내가 만든 스터디룸이 없습니다.</p>
                )}
            </div>

            {/* 최근 방문한 스터디룸 */}
            <h2 className="text-lg mt-10 mb-4">최근 방문한 스터디룸</h2>
            <div className="my-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
                {recentStudyRooms.length > 0 ? (
                    recentStudyRooms.map((room) => (
                        <StudyroomMTN
                            key={room.id}
                            id={room.id}
                            title={room.title}
                            needPassword={room.needPassword}
                            camEnabled={room.camEnabled}
                            currentUsers={room.memberNumber}
                            maxUsers={room.maxUsers}
                            thumbnail={
                                room.thumbnail ||
                                `${process.env.PUBLIC_URL}/assets/images/study-thumbnail-1.png`
                            }
                            isSelected={false}
                            openModal={openQnAModal}
                            setClickedRoomId={setClickedRoomId}
                        />
                    ))
                ) : (
                    <p className="w-full whitespace-nowrap">최근 방문한 스터디룸이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default RecentAndMyStudyRooms;
