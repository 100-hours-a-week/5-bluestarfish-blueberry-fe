import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import StudyroomMTN from "../rooms/StudyroomMTN";
import PasswordModal from "../Modal/PasswordModal";
import ToastNotification from "../common/ToastNotification";

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
    const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (isPasswordModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isPasswordModalOpen]);

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
            const response = await axiosInstance.get(
                `${process.env.REACT_APP_API_URL}/api/v1/rooms`,
                {
                    params: {
                        page: 0
                    },
                }
            );
            const recentRooms = response.data.data.content;
            setRecentStudyRooms(recentRooms);
        } catch (error) {
            setError("최근 방문한 스터디룸을 가져오는 데 실패했습니다.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const openQnAModal = () => {
        setPasswordModalOpen(true);
    };

    const closeQnAModal = () => {
        setPasswordModalOpen(false);
    };

    const handleCloseToast = () => {
        setShowToast(false);
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
            {isPasswordModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* 모달 배경 */}
                    <div className="fixed inset-0 bg-black bg-opacity-50 pointer-events-none" />
                    {/* 모달 내용 */}
                    <div className="relative z-50">
                        <PasswordModal
                            roomId={clickedRoomId}
                            closeModal={closeQnAModal}
                            setShowToast={setShowToast}
                        />
                    </div>
                </div>
            )}
            {showToast && (
                <ToastNotification
                    message="비밀번호가 틀렸습니다!"
                    isSuccess={false}
                    onClose={handleCloseToast}
                />
            )}
        </div>
    );
};

export default RecentAndMyStudyRooms;
