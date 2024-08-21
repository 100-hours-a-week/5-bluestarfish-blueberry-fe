import React, { useState, useEffect } from "react";

interface RankingData {
  rank: number;
  nickname: string;
  time: string;
}

const mockRankingData: RankingData[] = [
  { rank: 1, nickname: "조약돌 중독", time: "23:59:39" },
  { rank: 2, nickname: "돌맹이 광팬", time: "22:45:30" },
  { rank: 3, nickname: "돌멩이 사랑", time: "21:30:20" },
  {
    rank: 4,
    nickname: "이름이긴닉네임사용ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁ자",
    time: "20:15:10",
  },
];

const RankingSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isSliding, setIsSliding] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isExpanded) {
        setIsSliding(true); // 슬라이딩 시작

        setTimeout(() => {
          setCurrentIndex((prevIndex) =>
            prevIndex === mockRankingData.length - 1 ? 0 : prevIndex + 1
          );
          setIsSliding(false); // 슬라이딩 종료
        }, 500); // 0.5초 동안 애니메이션
      }
    }, 3000); // 3초마다 슬라이드

    return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 타이머 정리
  }, [isExpanded]);

  const previousIndex =
    currentIndex === 0 ? mockRankingData.length - 1 : currentIndex - 1;
  const currentRanking = mockRankingData[currentIndex];
  const previousRanking = mockRankingData[previousIndex];

  return (
    <div
      className={`relative m-[3px] rounded-[10px] overflow-hidden text-black bg-white border-[2px] border-black font-bold space-x-4 my-[50px] transition-all duration-500 ease-in-out ${
        isExpanded ? "h-auto" : "h-[100px]"
      }`}
    >
      {!isExpanded && (
        <>
          <div
            className={`absolute top-0 left-0 w-full h-full flex items-center p-4 transition-transform duration-500 ease-in-out ${
              isSliding ? "-translate-y-full" : "translate-y-0"
            }`}
            key={previousIndex}
          >
            <div className="flex items-center w-full">
              {/* 1위일 경우 트로피 이미지, 그렇지 않으면 빈 공간 */}
              {previousRanking.rank === 1 ? (
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/trophy-star 1.png`}
                  alt="trophy"
                  className="w-[40px] h-[40px] flex-shrink-0"
                />
              ) : (
                <div className="w-[40px] h-[40px]" />
              )}
              <div className="w-[50px] text-center flex-shrink-0">
                {previousRanking.rank}위
              </div>
              <div className="w-[150px] truncate text-center">
                {previousRanking.nickname}
              </div>
              <div className="w-[80px] text-center flex-shrink-0">
                {previousRanking.time}
              </div>
            </div>
          </div>
          <div
            className={`absolute top-0 left-0 w-full h-full flex items-center transition-transform duration-500 ease-in-out ${
              isSliding ? "translate-y-0" : "translate-y-full"
            }`}
            key={currentIndex}
          >
            <div className="flex items-center w-full">
              {/* 1위일 경우 트로피 이미지, 그렇지 않으면 빈 공간 */}
              {currentRanking.rank === 1 ? (
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/trophy-star 1.png`}
                  alt="trophy"
                  className="w-[40px] h-[40px] flex-shrink-0"
                />
              ) : (
                <div className="w-[40px] h-[40px]" />
              )}
              <div className="w-[50px] text-center flex-shrink-0">
                {currentRanking.rank}위
              </div>
              <div className="w-[150px] truncate text-center">
                {currentRanking.nickname}
              </div>
              <div className="w-[80px] text-center flex-shrink-0">
                {currentRanking.time}
              </div>
            </div>
          </div>
        </>
      )}

      {/* 확장 상태일 때 전체 데이터 렌더링 */}
      {isExpanded && (
        <div className="p-4">
          {mockRankingData.map((ranking, index) => (
            <div key={index} className="flex items-center w-full my-6">
              {/* 1위일 경우 트로피 이미지, 그렇지 않으면 빈 공간 */}
              {ranking.rank === 1 ? (
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/trophy-star 1.png`}
                  alt="trophy"
                  className="w-[40px] h-[40px] flex-shrink-0"
                />
              ) : (
                <div className="w-[40px] h-[40px]" />
              )}
              <div className="w-[50px] text-center flex-shrink-0">
                {ranking.rank}위
              </div>
              <div className="w-[150px] truncate text-center">
                {ranking.nickname}
              </div>
              <div className="w-[80px] text-center flex-shrink-0">
                {ranking.time}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 확장/축소 버튼 */}
      <button
        className="absolute right-6 top-[50px] transform -translate-y-1/2"
        onClick={() => setIsExpanded(!isExpanded)} // 버튼 클릭 시 확장 상태 토글
      >
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/vector.png`}
          alt="Expand/Collapse"
          className="h-8 w-6 rounded-full cursor-pointer object-scale-down"
        />
      </button>
    </div>
  );
};

export default RankingSlider;
