import React, { useState } from "react";
import TabBar from "../posts/TabBar";

const tabData = [
    { name: '나의 정보', icon: `${process.env.PUBLIC_URL}/assets/images/info-icon.png` },
    { name: '나의 스터디', icon: `${process.env.PUBLIC_URL}/assets/images/timer-icon.png` },
];

const MyInfoContainer: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);

    return (
        <div className="container mx-auto flex flex-col items-center mt-24">
            <div className="w-full max-w-3xl">
                <TabBar activeIndex={activeTab} setActiveIndex={setActiveTab} tabs={tabData} pageType="myInfo"/>
            </div>
            {/* 프로필 섹션 */}
            <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-md">
                <div className="flex flex-col items-center">
                    {/* 프로필 사진 */}
                    <div className="mb-4">
                        <div className="bg-gray-100 rounded-full p-2 shadow-md">
                            <img
                                src="/path/to/profile-image.jpg" // 실제 프로필 이미지 경로로 대체
                                alt="프로필사진"
                                className="w-32 h-32 rounded-full object-cover"
                            />
                        </div>
                    </div>
                    
                    {/* 닉네임 */}
                    <div className="flex items-center mb-2">
                        <span className="text-gray-500 text-sm px-3 py-1 rounded-lg bg-gray-100 shadow-md mr-2">닉네임</span>
                        <span className="text-gray-800 text-lg">뚱이</span>
                    </div>

                    {/* 이메일 */}
                    <div className="flex items-center mb-2">
                        <span className="text-gray-500 text-sm px-3 py-1 rounded-lg bg-gray-100 shadow-md mr-2">이메일</span>
                        <span className="text-black text-lg underline">bluestar@bluestar.com</span>
                    </div>

                    {/* 스터디 누적 시간 */}
                    <div className="flex items-center mb-8">
                        <span className="text-gray-500 text-sm px-3 py-1 rounded-lg bg-gray-100 shadow-md mr-2">스터디 누적 시간</span>
                        <span className="text-gray-800 text-lg">24시간 53분</span>
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
