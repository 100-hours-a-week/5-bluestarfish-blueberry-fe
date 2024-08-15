import React, { useState } from 'react';

const TabBar = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const tabs = [
        { name: '스터디 룸 멤버 찾기', icon: `${process.env.PUBLIC_URL}/assets/images/member-icon-blue.png` },
        { name: '스터디 룸 찾기', icon: `${process.env.PUBLIC_URL}/assets/images/room-icon-blue.png` },
    ];

    const handleTabClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <div className="flex justify-center items-center">
            <div className="flex justify-center items-center bg-white p-6 rounded-b-3xl relative w-[60%] gap-x-10">
                {/* 밑줄 요소 */}
                <div
                    className="absolute bottom-0 h-[1.5px] bg-[#4659AA] transition-all duration-500 ease-in-out"
                    style={{
                        width: '100px',
                        left: `calc(${activeIndex * 50}% + ${activeIndex === 0 ? '95px' : '95px'})`,
                    }}
                ></div>


                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        className={`flex flex-grow justify-center items-center cursor-pointer transition-all duration-500 ease-in-out ${activeIndex === index ? 'text-[#4659AA] scale-110' : 'text-gray-500 scale-100'
                            }`}
                        onClick={() => handleTabClick(index)}
                        style={{ transform: activeIndex === index ? 'scale(1.1)' : 'scale(1.0)' }}
                    >
                        <div className="flex items-center transition-all duration-500 ease-in-out">
                            <img
                                src={tab.icon}
                                className="w-9 h-9 transition-transform duration-500 ease-in-out"
                                style={{ transform: activeIndex === index ? 'translateX(-10px) scale(1.1)' : 'translateX(0) scale(1.0)' }}
                            />
                            <span
                                className={`ml-2 font-bold relative transition-opacity duration-800 ease-in-out ${activeIndex === index ? 'text-[#4659AA]' : ''
                                    }`}
                            >
                                {tab.name}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TabBar;
