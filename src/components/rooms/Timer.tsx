import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useLoginedUserStore } from "../../store/store";

type TimerProps = {};

const Timer: React.FC<TimerProps> = () => {
  const { userId } = useLoginedUserStore();
  const goalTime: string = "12:00:00";
  const [time, setTime] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchUserTime();
  }, []);

  const fetchUserTime = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/v1/users/${userId}/time`
      );
      if (response.status === 200) {
        setTime(response.data.data.time);
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 404) {
          console.error(
            "404 오류: ",
            error.response.data.message || "해당 유저를 찾을 수 없습니다."
          );
        } else {
          console.error(
            `오류 발생 (${error.response.status}):`,
            error.response.data.message || "서버 오류가 발생했습니다."
          );
        }
      } else {
        console.error("스터디룸 정보를 가져오는 중 오류 발생:", error.message);
      }
    }
  };

  const startTimer = () => {
    const timerId = setInterval(() => {
      setTime((prevTime) => {
        const [hours, minutes, seconds] = prevTime.split(":").map(Number);

        let newSeconds = seconds + 1;
        let newMinutes = minutes;
        let newHours = hours;

        if (newSeconds === 60) {
          newSeconds = 0;
          newMinutes += 1;
        }

        if (newMinutes === 60) {
          newMinutes = 0;
          newHours += 1;
        }

        return `${String(newHours).padStart(2, "0")}:${String(
          newMinutes
        ).padStart(2, "0")}:${String(newSeconds).padStart(2, "0")}`;
      });
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
    setIsRunning(!isRunning);
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
        <p className="text-[14px] font-light w-[185px]">{goalTime}</p>
        <div className="flex rounded-full bg-[#4659aa] w-[30px] h-[30px] items-center justify-center shadow-lg">
          <div className="text-[10px] font-bold text-white">적용</div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Timer;
