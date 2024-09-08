import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import StudyroomMTN from "../rooms/StudyroomMTN";

interface StudyRoom {
    id: number;
    title: string;
    needPassword: boolean;
    camEnabled: boolean;
    maxUsers: number;
    memberNumber: number;
    thumbnail?: string;
}

const RecentStudyRooms: React.FC = () => {
    const [studyRooms, setStudyRooms] = useState<StudyRoom[]>([]);
    const [clickedRoomId, setClickedRoomId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStudyRooms = async () => {
        try {
            const response = await axiosInstance.get(
                `${process.env.REACT_APP_API_URL}/api/v1/rooms?page=0&size=10`
            );
            setStudyRooms(response.data.data.content); // 데이터 형식에 맞게 처리
            setIsLoading(false);
        } catch (error) {
            console.error("스터디룸 목록을 불러오는 데 실패했습니다:", error);
            setError("스터디룸 목록을 불러오는 데 실패했습니다.");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStudyRooms();
    }, []);

    const openQnAModal = () => {
        // 모달을 열기 위한 로직
        console.log("모달을 열었습니다.");
    };

    return (
        <div className="container mx-auto my-4 mt-20 max-w-[1024px]">
            <h2 className="text-lg mb-4">최근 방문한 스터디룸</h2>
            {isLoading && <p>로딩 중...</p>}
            {error && <p>{error}</p>}
            {!isLoading && !error && (
                <div className="my-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
                    {studyRooms.map((room) => (
                        <div key={room.id} className="flex justify-center">
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
                        </div>
                    ))}
                </div>
            )}
        </div>


    );
};

export default RecentStudyRooms;
