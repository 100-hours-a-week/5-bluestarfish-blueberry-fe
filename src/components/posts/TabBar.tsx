import React from 'react';

interface TabBarProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeIndex, setActiveIndex }) => {
  // 탭 목록 데이터: 각 탭의 이름과 아이콘 경로를 정의
  const tabs = [
    { name: '스터디 룸 멤버 찾기', icon: `${process.env.PUBLIC_URL}/assets/images/member-icon-blue.png` },
    { name: '스터디 룸 찾기', icon: `${process.env.PUBLIC_URL}/assets/images/room-icon-blue.png` },
  ];

  // 탭 클릭 시 호출되는 함수: 클릭된 탭의 인덱스를 activeIndex 상태로 설정
  const handleTabClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="flex justify-center items-center mb-10">
      <div className="flex justify-center items-center bg-white p-3 rounded-b-3xl relative w-[60%] gap-x-5">
        {/* 현재 활성화된 탭 아래에 밑줄을 표시하는 요소 */}
        <div
          className="absolute bottom-0 h-[1.5px] bg-[#4659AA] transition-all duration-500 ease-in-out"
          style={{
            // 밑줄의 너비와 위치를 활성화된 탭에 맞게 설정
            width: '100px',
            left: `calc(${activeIndex * 50}% + ${activeIndex === 0 ? '95px' : '95px'})`,
          }}
        ></div>

        {/* 탭 목록을 순회하며 각 탭을 렌더링 */}
        {tabs.map((tab, index) => (
          <div
            key={index}  // 각 탭에 고유한 키를 부여
            className={`flex flex-grow justify-center items-center cursor-pointer transition-all duration-500 ease-in-out ${
              activeIndex === index ? 'text-[#4659AA] scale-110' : 'text-gray-500 scale-100'
            }`}  // 활성화된 탭은 색상과 크기가 다르게 표시
            onClick={() => handleTabClick(index)}  // 탭 클릭 시 해당 탭의 인덱스를 활성화된 인덱스로 설정
            style={{ transform: activeIndex === index ? 'scale(1.1)' : 'scale(1.0)' }}  // 활성화된 탭은 확대(scale) 효과 적용
          >
            <div className="flex items-center transition-all duration-500 ease-in-out">
              {/* 탭의 아이콘 이미지 */}
              <img
                src={tab.icon}  // 탭 아이콘의 이미지 경로
                className="w-9 h-9 transition-transform duration-500 ease-in-out"
                style={{
                  // 활성화된 탭의 아이콘은 왼쪽으로 약간 이동하고 확대(scale) 효과 적용
                  transform: activeIndex === index ? 'translateX(-10px) scale(1.1)' : 'translateX(0) scale(1.0)'
                }}
              />
              <span
                className={`ml-2 font-bold relative transition-opacity duration-800 ease-in-out ${
                  activeIndex === index ? 'text-[#4659AA]' : ''
                }`}  // 활성화된 탭의 텍스트는 색상이 변경
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

export default TabBar;  // 컴포넌트를 기본 내보내기로 설정
