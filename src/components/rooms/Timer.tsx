import { useTimeStore } from "../../store/timeStore";

type TimerProps = {};

const Timer: React.FC<TimerProps> = () => {
  const { time, goaltime, isRunning, setTime, toggleIsRunning } =
    useTimeStore();

  const handleTimerToggle = () => {
    toggleIsRunning();
  };

  const resetTime = () => {
    setTime(() => "00:00:00");
    if (isRunning) toggleIsRunning();
  };

  return (
    <div className="w-[390px] text-black">
      <div className="flex gap-2 mx-4">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/timer-black.png`}
          alt="Timer"
          className="w-[25px]"
        />
        <p className="text-[18px] font-bold">타이머</p>
      </div>
      <div className="flex my-2 items-center  rounded-[10px] p-3 bg-[#EBEEFF] shadow-lg">
        <p className="text-[13px] font-bold w-[150px]">현재 공부 시간</p>
        <p className="flex flex-row text-[13px] font-bold w-[160px]">{time}</p>
        <button
          className="flex rounded-full bg-[#4659aa] w-[30px] h-[30px] items-center justify-center shadow-lg cursor-pointer"
          onClick={resetTime}
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/reset-white.png`}
            alt="reset"
            className="w-[12px]"
          />
        </button>
        <div
          onClick={handleTimerToggle} // 버튼 클릭 시 타이머 토글
          className="flex rounded-full ml-2 bg-[#4659aa] w-[30px] h-[30px] items-center justify-center shadow-lg cursor-pointer"
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
      {/* <div className="flex mt-1 mx-4 items-center">
        <p className="text-[12px] font-bold w-[140px]">목표 시간</p>
        <p className="text-[14px] font-light w-[185px]">{goaltime}</p>
        <div className="flex rounded-full bg-[#4659aa] w-[30px] h-[30px] items-center justify-center shadow-lg">
          <div className="text-[10px] font-bold text-white">적용</div>
        </div>
      </div> */}
    </div>
  );
};

export default Timer;
