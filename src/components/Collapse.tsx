import React, { useState, useEffect } from "react";
import axios from "axios";

type CollapseProps = {};

interface RankingData {
  rank: number;
  nickname: string;
  time: string;
}

const mockRankingData: RankingData[] = [
  { rank: 1, nickname: "ian", time: "23:59:59" },
  { rank: 2, nickname: "ian", time: "23:59:59" },
  { rank: 3, nickname: "ian", time: "23:59:59" },
  { rank: 4, nickname: "ian", time: "23:59:59" },
  { rank: 5, nickname: "ian", time: "23:59:59" },
  { rank: 6, nickname: "ian", time: "23:59:59" },
  { rank: 7, nickname: "ian", time: "23:59:59" },
  { rank: 8, nickname: "ian", time: "23:59:59" },
  { rank: 9, nickname: "ian", time: "23:59:59" },
  { rank: 10, nickname: "ian", time: "23:59:59" },
  { rank: 32, nickname: "나", time: "23:59:58" },
];

const Collapse: React.FC<CollapseProps> = () => {
  const [rankings, setRankings] = useState<RankingData[]>([]); // 랭킹 데이터 상태
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태

  // // 랭킹 데이터를 가져오는 함수
  // const fetchRankings = async () => {
  //   try {
  //     const response = await axios.get("/api/v1/rankings");
  //     if (response.status === 200) {
  //       setRankings(response.data.data); // API에서 받은 랭킹 데이터를 상태에 저장
  //     }
  //   } catch (error) {
  //     console.error("랭킹 데이터를 가져오는 중 오류 발생:", error);
  //   } finally {
  //     setLoading(false); // 로딩 상태 종료
  //   }
  // };

  // useEffect(() => {
  //   fetchRankings(); // 컴포넌트가 마운트될 때 랭킹 데이터 가져옴
  // }, []);

  // 목업 데이터를 사용하여 랭킹 데이터를 설정
  useEffect(() => {
    setLoading(true);
    // 1초 후 목업 데이터를 설정하는 예시 (실제 API 대체)
    setTimeout(() => {
      setRankings(mockRankingData); // 목업 데이터를 상태로 설정
      setLoading(false); // 로딩 종료
    }, 1000); // 1초 후 목업 데이터 적용 (시뮬레이션)
  }, []);

  // 로딩 중일 때 로딩 표시
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow m-[3px] rounded-[10px] my-[50px] bg-white border text-[#000] text-[18px] font-medium shadow-lg z-1"
    >
      <div className="flex items-center space-x-4 collapse-title">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/trophy-star 1.png`}
          alt="intro"
          className="w-[40px] h-[40px] mx-10"
        />
        {/* 1위 랭킹 데이터 렌더링 */}
        {rankings[0] && (
          <>
            <div>{rankings[0].rank}위</div>
            <div>{rankings[0].nickname}</div>
            <div>{rankings[0].time}</div>
          </>
        )}
      </div>
      <div className="collapse-content ml-[120px]">
        {rankings.slice(1).map((ranking) => (
          <div key={ranking.rank} className="flex items-center space-x-4">
            <div>{ranking.rank}위</div>
            <div>{ranking.nickname}</div>
            <div>{ranking.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collapse;
