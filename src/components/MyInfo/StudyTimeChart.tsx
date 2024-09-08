import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// 주간 데이터
const weeklyData = [
    { name: '1', 시간: 5 },
    { name: '2', 시간: 10 },
    { name: '3', 시간: 7 },
    { name: '4', 시간: 15 },
    { name: '5', 시간: 12 },
    { name: '6', 시간: 3 },
    { name: '7', 시간: 8 },
];

// 월간 데이터
const monthlyData = [
    { name: '1', 시간: 80 },
    { name: '2', 시간: 65 },
    { name: '3', 시간: 40 },
    { name: '4', 시간: 100 },
    { name: '5', 시간: 72 },
    { name: '6', 시간: 80 },
    { name: '7', 시간: 120 },
    { name: '8', 시간: 160 },
    { name: '9', 시간: 96 },
    { name: '10', 시간: 132 },
    { name: '11', 시간: 208 },
    { name: '12', 시간: 136 },
];

// 커스텀 배경을 렌더링하는 컴포넌트
const CustomBackground = (props: any) => {
    const { x, y, width, height } = props;

    return (
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill="#eee"
            rx={7}
            ry={7}
        />
    );
};

const StudyTimeChart = () => {
    const [isWeekly, setIsWeekly] = useState(false); // 주간/월간 데이터 선택 상태

    // 데이터 선택 핸들러
    const handleDataChange = (isWeeklySelected: boolean) => {
        setIsWeekly(isWeeklySelected);
    };

    return (
        <div className="flex flex-col items-center w-full my-4">
            {/* 차트 제목 */}
            <h2 className="text-lg mb-4 w-full text-left">나의 스터디 시간</h2>

            {/* 차트 */}
            <div className="w-full max-w-3xl pt-10 shadow-lg rounded-lg">
                <div className="pl-10 pr-10">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={isWeekly ? weeklyData : monthlyData} // 주간 또는 월간 데이터
                            barCategoryGap="30%" // 막대 간 간격 조정
                        >
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                                dataKey="시간"
                                fill="#C6CFFF"
                                radius={[20, 20, 0, 0]}
                                barSize={15} // 막대 두께 조정
                                background={<CustomBackground />}
                            />
                        </BarChart>
                    </ResponsiveContainer>

                    {/* 하단 설명 텍스트 */}
                    <div className="text-left -mt-5">
                        {isWeekly ?
                            <p className="text-sm text-gray-500">시간 / 주</p>
                            : <p className="text-sm text-gray-500">시간 / 월</p>
                        }

                    </div>
                </div>

                {/* 주간 / 월간 선택 버튼 */}
                <div className="flex w-full mt-10 justify-center">
                    <button
                        onClick={() => handleDataChange(true)}
                        className={`flex-grow px-4 py-2 rounded-bl-lg ${isWeekly ? 'bg-[#C6CFFF] text-gray-600' : 'bg-[#EBEEFF] text-gray-400'}`}
                    >
                        주간 누적시간
                    </button>
                    <button
                        onClick={() => handleDataChange(false)}
                        className={`flex-grow px-4 py-2 rounded-br-lg ${!isWeekly ? 'bg-[#C6CFFF] text-gray-600' : 'bg-[#EBEEFF] text-gray-400'}`}
                    >
                        월간 누적시간
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudyTimeChart;
