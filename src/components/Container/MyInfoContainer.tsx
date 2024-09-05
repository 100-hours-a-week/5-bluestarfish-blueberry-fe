import React, { useState, useEffect } from "react";
import TabBar from "../posts/TabBar";
import axiosInstance from "../../utils/axiosInstance";

const tabData = [
    { name: '나의 정보', icon: `${process.env.PUBLIC_URL}/assets/images/info-icon.png` },
    { name: '나의 스터디', icon: `${process.env.PUBLIC_URL}/assets/images/timer-icon.png` },
];

function getErrorMessage(error: unknown): string {
    try {
        if (error instanceof Error) {
            return error.message;
        }
        return String(error);
    } catch (e) {
        return 'Unknown error';
    }
}

const MyInfoContainer: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [currentUser, setCurrentUser] = useState<any | null>(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axiosInstance.get(
                    `${process.env.REACT_APP_API_URL}/api/v1/users/whoami`
                );
                setCurrentUser(response.data.data);
                console.log(response.data.data);
            } catch (error: unknown) {
                console.error("사용자 정보를 가져오는 데 실패했습니다:", getErrorMessage(error));
            }
        };

        fetchCurrentUser();
    }, []);

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto flex flex-col items-center mt-24">
            <div className="w-full max-w-3xl">
                <TabBar activeIndex={activeTab} setActiveIndex={setActiveTab} tabs={tabData} pageType="myInfo" />
            </div>
            {/* 프로필 섹션 */}
            <div className="w-full max-w-3xl p-8 rounded-lg flex flex-col items-center justify-center">
                <div className="w-[50%] flex flex-col items-center">
                    {/* 프로필 사진 */}
                    <div className="flex flex-col items-center mb-8 w-full">
                        <div className="w-full text-left mb-2">
                            <span className="text-[#4659AA] bg-[#EEEEFF] px-3 py-1 rounded-lg shadow-md">
                                프로필사진
                            </span>
                        </div>
                        <div className="bg-gray-100 rounded-full shadow-md">
                            <img
                                src={currentUser?.profileImage ? currentUser.profileImage : `${process.env.PUBLIC_URL}/assets/images/gunssakdo.png`}
                                alt="프로필사진"
                                className="w-32 h-32 rounded-full object-fit"
                            />
                        </div>
                    </div>

                    {/* 닉네임 */}
                    <div className="mb-8 w-full">
                        <div className="w-full text-left mb-2">
                            <span className="text-[#4659AA] bg-[#EEEEFF] px-3 py-1 rounded-lg shadow-md">
                                닉네임
                            </span>
                        </div>
                        <span className="text-black">{currentUser.nickname}</span>
                    </div>

                    {/* 이메일 */}
                    <div className="mb-8 w-full">
                        <div className="w-full text-left mb-2">
                            <span className="text-[#4659AA] bg-[#EEEEFF] px-3 py-1 rounded-lg shadow-md">
                                이메일
                            </span>
                        </div>
                        <span className="text-black underline">
                            {currentUser.email}
                        </span>
                    </div>

                    {/* 스터디 누적 시간 */}
                    <div className="mb-8 w-full mb-[50px]">
                        <div className="w-full text-left mb-2">
                            <span className="text-[#4659AA] bg-[#EEEEFF] px-3 py-1 rounded-lg shadow-md">
                                스터디 누적 시간
                            </span>
                        </div>
                        <span className="text-black">
                            24시간 53분
                        </span>
                    </div>

                    {/* 정보 수정 버튼 */}
                    <button className="bg-[#4659AA] text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-[#3b4a99]">
                        정보 수정
                    </button>
                </div>

            </div>
        </div>
    );
};

export default MyInfoContainer;
