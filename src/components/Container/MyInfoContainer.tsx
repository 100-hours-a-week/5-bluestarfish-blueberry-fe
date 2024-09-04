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
        </div>
    );
};

export default MyInfoContainer;
