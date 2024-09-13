import { useState, useEffect, useRef } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useLoginedUserStore } from "../../store/store";
import { useTimeStore } from "../../store/timeStore";
import { addOneSecondToTime } from "../../utils/time";

type TimerProps = {};

const Timer: React.FC<TimerProps> = () => {
  const { userId } = useLoginedUserStore();
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const { time, goaltime, isRunning, setTime, setGoaltime, toggleIsRunning } =
    useTimeStore();
  const timeRef = useRef(time); // time을 Ref로 관리

  useEffect(() => {
    timeRef.current = time;
  }, [time]);

  const startTimer = () => {
    const timerId = setInterval(() => {
      const newTime = addOneSecondToTime(timeRef.current); // 현재 시간을 기반으로 1초 더하기
      setTime(newTime); // 계산된 시간을 문자열로 전달
    }, 1000);

    setIntervalId(timerId);
  };

  const stopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const handleTimerToggle = () => {
    if (isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
    toggleIsRunning();
  };

  return (
    <div className="text-black">
      <div className="flex gap-2 mx-4">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/timer-black.png`}
          alt="Timer"
          className="w-[25px]"
        />
        <p className="text-[20px] font-bold">타이머</p>
      </div>
      <div className="flex mt-4 mx-4 items-center">
        <p className="text-[12px] font-bold w-[140px]">현재 공부 시간</p>
        <p className="flex flex-row text-[14px] font-light w-[60px]">{time}</p>
        <button className="w-[125px]">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/reset.png`}
            alt="reset"
            className="w-[18px]"
          />
        </button>
        <div
          onClick={handleTimerToggle} // 버튼 클릭 시 타이머 토글
          className="flex rounded-full bg-[#4659aa] w-[30px] h-[30px] items-center justify-center shadow-lg cursor-pointer"
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/${
              isRunning ? "pause" : "play"
            }.png`}
            alt="Profile"
            className="w-[9px] h-[12px]"
          />
        </div>
      </div>
      <div className="flex mt-1 mx-4 items-center">
        <p className="text-[12px] font-bold w-[140px]">목표 시간</p>
        <p className="text-[14px] font-light w-[185px]">{goaltime}</p>
        <div className="flex rounded-full bg-[#4659aa] w-[30px] h-[30px] items-center justify-center shadow-lg">
          <div className="text-[10px] font-bold text-white">적용</div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Timer;
