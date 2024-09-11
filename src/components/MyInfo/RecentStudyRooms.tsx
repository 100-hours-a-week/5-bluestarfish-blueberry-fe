import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import StudyroomMTN from "../rooms/StudyroomMTN";
import PasswordModal from "../Modal/PasswordModal";
import ToastNotification from "../common/ToastNotification";
import DeleteModal from "../common/DeleteModal";

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
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // 삭제 모달 상태
    const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null); // 선택된 방 ID
    const navigate = useNavigate();

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
            fetchMyStudyRooms(userId);
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

    const enterRoom = (room: StudyRoom) => {
        if (room.needPassword) {
            setClickedRoomId(room.id);
            setPasswordModalOpen(true);
        } else
            navigate(`/wait/${room.id}`, {
                state: { authorized: true, needPassword: false },
            });
    }

    // 스터디룸 삭제 요청 함수
    const confirmDeleteRoom = async (roomId: number) => {
        try {
            await axiosInstance.delete(`${process.env.REACT_APP_API_URL}/api/v1/rooms/${roomId}`);
            setMyStudyRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId));
        } catch (error) {
            console.error("스터디룸을 삭제하는 데 실패했습니다:", error);
        } finally {
            setDeleteModalOpen(false);
        }
    };

    const deleteRoom = (roomId: number) => {
        setSelectedRoomId(roomId);
        setDeleteModalOpen(true); // 삭제 모달 열기
    };

    return (
        <div className="container mx-auto my-4 mt-20">
            {isLoading && <p>로딩 중...</p>}
            {error && <p>{error}</p>}

            <h2 className="text-lg mb-4">내가 만든 스터디룸</h2>
            <div className="my-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
                {myStudyRooms.length > 0 ? (
                    myStudyRooms.map((room) => (
                        <div
                            key={room.id}
                            className="relative group"
                            onClick={(e) => e.stopPropagation()} // 기본 클릭 방지
                        >
                            {/* StudyroomMTN을 래핑 */}
                            <StudyroomMTN
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

                            {/* 호버 시 보이는 블러 처리 및 버튼 */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-lg">
                                <button
                                    onClick={() => enterRoom(room)}  // 화면 이동 로직
                                    className="bg-[#00A324] hover:bg-transparent px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-[#00A324] hover:border-[#00A324] text-white hover:text-[#00A324] rounded-full transition ease-in duration-300"
                                >
                                    입장
                                </button>
                                <button
                                    onClick={() => deleteRoom(room.id)}
                                    className="bg-red-500 hover:bg-transparent px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-white hover:text-red-500 rounded-full transition ease-in duration-300"
                                >
                                    삭제
                                </button>
                            </div>
                        </div>
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
            {/* 삭제 확인 모달 */}
            {isDeleteModalOpen && selectedRoomId && (
                <DeleteModal
                    title="스터디룸을 삭제하시겠습니까?"
                    description="삭제된 스터디룸은 복구할 수 없습니다."
                    onConfirm={() => confirmDeleteRoom(selectedRoomId)} // 확인 시 삭제
                    onCancel={() => setDeleteModalOpen(false)} // 취소 시 모달 닫기
                />
            )}
        </div>
    );
};

export default RecentAndMyStudyRooms;
