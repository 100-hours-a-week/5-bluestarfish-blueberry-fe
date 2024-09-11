import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../common/DeleteModal";
import { friendsData, Friend } from "../../data/friendsData"; // 분리된 데이터 임포트

const FriendListContainer: React.FC = () => {
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [selectedFriendId, setSelectedFriendId] = useState<number | null>(null);
    // 친구 데이터에서 isFriend가 true인 친구만 필터링
    const [friends, setFriends] = useState<Friend[]>(
        friendsData.filter((friend) => friend.isFriend)
    );

    const handleDeleteFriend = (id: number) => {
        setSelectedFriendId(id);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        if (selectedFriendId !== null) {
            setFriends((prevFriends) =>
                prevFriends.filter((friend) => friend.id !== selectedFriendId)
            );
            setShowDeleteModal(false);
        }
    };

    const handleFindNewFriends = () => {
        navigate("/friends/search");
    };

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
                {friends.length > 0 ? (
                    friends.map((friend) => (
                        <div
                            key={friend.id}
                            className={`relative bg-[#F8F8FF] shadow-lg rounded-lg overflow-hidden h-[300px] w-full transform transition-transform duration-300 hover:scale-105 group z-0 hover:z-10`}
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
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setShowDeleteModal(false)}
                />
            )}
        </div>
    );
};

export default FriendListContainer;
