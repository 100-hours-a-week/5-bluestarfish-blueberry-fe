import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../common/DeleteModal";

type Friend = {
    id: number;
    name: string;
    profileImage: string;
    studyTime: string;
};

const FriendListContainer: React.FC = () => {
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false); // 삭제 모달 표시 여부
    const [selectedFriendId, setSelectedFriendId] = useState<number | null>(null); // 선택된 친구의 ID
    const [friends, setFriends] = useState<Friend[]>([
        {
            id: 1,
            name: "붕어빵 말티즈",
            profileImage: `${process.env.PUBLIC_URL}/assets/images/profile1.png`,
            studyTime: "10:45:20",
        },
        {
            id: 2,
            name: "루돌프 몰티즈",
            profileImage: `${process.env.PUBLIC_URL}/assets/images/profile2.png`,
            studyTime: "12:08:00",
        },
        {
            id: 3,
            name: "그냥 기요밍",
            profileImage: `${process.env.PUBLIC_URL}/assets/images/profile3.png`,
            studyTime: "10:45:20",
        },
        {
            id: 4,
            name: "생일 축하추카포",
            profileImage: `${process.env.PUBLIC_URL}/assets/images/profile4.png`,
            studyTime: "08:32:14",
        },
        {
            id: 5,
            name: "붕어빵 땡긴다",
            profileImage: `${process.env.PUBLIC_URL}/assets/images/profile1.png`,
            studyTime: "08:32:14",
        },
    ]);

    const handleDeleteFriend = (id: number) => {
        setSelectedFriendId(id); // 삭제할 친구 ID 설정
        setShowDeleteModal(true); // 모달 표시
    };

    // 삭제 확정 함수 (모달에서 확인 버튼 클릭 시)
    const handleDeleteConfirm = () => {
        if (selectedFriendId !== null) {
            setFriends((prevFriends) =>
                prevFriends.filter((friend) => friend.id !== selectedFriendId)
            );
            setShowDeleteModal(false); // 모달 닫기
        }
    };

    const handleFindNewFriends = () => {
        navigate("/friends/search"); // 친구 검색 페이지로 이동
    };

    return (
        <div className="container mx-auto my-8 px-4 mt-32 w-[70%]">
            {/* 친구 목록 상단: 제목과 새로운 친구 찾기 */}
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
                {friends.length > 0 ? (
                    friends.map((friend) => (
                        <div
                            key={friend.id}
                            className="relative bg-[#F8F8FF] shadow-lg rounded-lg overflow-hidden h-[300px] w-full transform transition-transform duration-300 hover:scale-105 group z-0 hover:z-10"
                        >
                            {/* 프로필 사진과 이름 */}
                            <div className="p-4 flex flex-col items-center group-hover:hidden">
                                <img
                                    src={friend.profileImage}
                                    alt={friend.name}
                                    className="w-20 h-20 rounded-full mt-12 mb-20"
                                />
                                <h2 className="text-lg font-bold text-gray-700">{friend.name}</h2>
                            </div>
                            {/* 마우스 호버 시 나타나는 정보 */}
                            <div className="absolute inset-0 bg-white p-4 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h2 className="text-lg font-bold text-gray-700 mb-2">{friend.name}</h2>
                                <p className="text-gray-500 mb-4">스터디 시간: {friend.studyTime}</p>
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
                    onConfirm={handleDeleteConfirm} // 함수 참조 전달
                    onCancel={() => setShowDeleteModal(false)} // 모달 닫기
                />
            )}
        </div>
    );
};

export default FriendListContainer;
