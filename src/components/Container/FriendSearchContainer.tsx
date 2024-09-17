import React, { useState, useEffect } from "react";
import { friendsData, Friend } from "../../data/friendsData"; // 친구 데이터를 임포트
import AddModal from "../common/AddModal";
import ToastNotification from "../common/ToastNotification";

const FriendSearchContainer: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>(""); // 검색어 상태
    const [filteredFriends, setFilteredFriends] = useState<Friend[]>([]); // 필터링된 친구 목록
    const [friends, setFriends] = useState<Friend[]>(friendsData); // 친구 목록 상태 관리
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [selectedFriendId, setSelectedFriendId] = useState<number | null>(null); // 선택된 친구 ID
    const [showAddFriendToast, setShowAddFriendToast] = useState(false);

    // 친구 추가 핸들러 (버튼 클릭 시 모달 표시)
    const handleAddFriend = (id: number) => {
        setSelectedFriendId(id); // 선택된 친구 ID 설정
        setShowAddModal(true); // 모달 표시
    };

    // 모달에서 추가 버튼을 눌렀을 때 호출되는 함수
    const handleAddConfirm = () => {
        if (selectedFriendId !== null) {
            // 선택된 친구의 isRequestSent 값을 true로 업데이트
            setFriends((prevFriends) =>
                prevFriends.map((friend) =>
                    friend.id === selectedFriendId
                        ? { ...friend, isRequestSent: true }
                        : friend
                )
            );
            setShowAddModal(false); // 모달 닫기
            setShowAddFriendToast(true);
        }
    };

    // 검색어가 변경될 때마다 친구 목록을 필터링
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredFriends([]); // 검색어가 없을 경우
        } else {
            const searchResult = friends.filter((friend) =>
                friend.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredFriends(searchResult); // 필터링 결과 설정
        }
    }, [searchTerm, friends]);

    const handleCloseAddFriendToast = () => {
        setShowAddFriendToast(false);
    };

    return (
        <div className="container mx-auto my-8 px-4 mt-32 w-[70%]">
            <div className="flex justify-center items-center mb-10">
                {/* 검색 바 */}
                <div className="mt-[20px] p-5 overflow-hidden w-[60px] h-[60px] hover:w-[70%] bg-[#A8B4E5] shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300">
                    <div className="flex items-center justify-center fill-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            id="Isolation_Mode"
                            data-name="Isolation Mode"
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                        >
                            <path
                                d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"
                            ></path>
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="닉네임으로 친구를 검색하세요"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="outline-none text-[17px] bg-transparent w-full text-white font-normal px-4 placeholder-white"
                    />
                </div>
            </div>

            {/* 친구 목록 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20 w-full">
                {filteredFriends.length > 0 ? (
                    filteredFriends.map((friend) => (
                        <div
                            key={friend.id}
                            className={`relative bg-[#F8F8FF] shadow-lg rounded-lg overflow-hidden h-[300px] w-full transform transition-transform duration-300 hover:scale-105 group z-0 hover:z-10`}
                        >
                            {/* 친구 표시 (이미 친구인 경우) */}
                            {friend.isFriend && (
                                <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded">
                                    친구
                                </div>
                            )}
                            {friend.isRequestSent && (
                                <div className="absolute top-2 left-2 bg-gray-400 text-white px-2 py-1 text-xs font-semibold rounded">
                                    친구 요청
                                </div>
                            )}
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
                                {friend.isFriend ? (
                                    <label className="bg-[#EBEEFF] text-gray-500 px-4 py-2 rounded-lg">
                                        친구
                                    </label>
                                ) : friend.isRequestSent ? (
                                    <button className="bg-[#6D81D5] text-white px-4 py-2 rounded-lg cursor-default">
                                        친구 요청 완료
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleAddFriend(friend.id)}
                                        className="bg-[#47DB68] text-white px-4 py-2 rounded-lg hover:bg-[#00A324]"
                                    >
                                        친구 추가
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">검색 결과가 없습니다.</p>
                )}
            </div>

            {/* 친구 추가 확인 모달 */}
            {showAddModal && (
                <AddModal
                    title="친구를 추가하시겠습니까?"
                    description="요청을 철회할 수 없습니다."
                    onConfirm={handleAddConfirm} // 모달에서 확인 시 친구 추가
                    onCancel={() => setShowAddModal(false)} // 모달 닫기
                />
            )}
            {showAddFriendToast && (
                <ToastNotification
                    message="친구 요청 성공!"
                    isSuccess={true}
                    onClose={handleCloseAddFriendToast}
                />
            )}
        </div>
    );
};

export default FriendSearchContainer;
