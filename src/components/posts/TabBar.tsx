import React from 'react';

interface TabBarProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  tabs: { name: string; icon: string }[]; // 탭 데이터를 외부에서 전달받음
  pageType: string; // 페이지 구분을 위함
}

const TabBar: React.FC<TabBarProps> = ({ activeIndex, setActiveIndex, tabs, pageType }) => {
  // 탭 클릭 시 호출되는 함수: 클릭된 탭의 인덱스를 activeIndex 상태로 설정
  const handleTabClick = (index: number) => {
    setActiveIndex(index);
  };

  // 페이지별 밑줄 위치 계산 함수
  const getUnderlineLeftPosition = () => {
    switch (pageType) {
      case 'myInfo':
        return `calc(${activeIndex * 50}% + 87px)`; // 마이 페이지에서 밑줄 위치
      case 'post':
        return `calc(${activeIndex * 50}% + ${activeIndex === 0 ? '95px' : '95px'})`; // 게시글 페이지에서 밑줄 위치
      default:
        return `calc(${activeIndex * 50}% + ${activeIndex === 0 ? '95px' : '95px'})`; // 기본 위치
    }
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
            left: getUnderlineLeftPosition(),
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
                <span>{tab.name}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabBar;
