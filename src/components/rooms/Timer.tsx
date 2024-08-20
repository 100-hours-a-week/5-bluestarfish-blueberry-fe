type TimerProps = {};

const Timer: React.FC<TimerProps> = () => {
  return (
    <div className="text-black text-shadow-lg">
      <div className="flex gap-2 mx-4">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/timer-black.png`}
          alt="Timer"
          className="w-[25px]"
        />
        <p className="text-[20px] font-bold">타이머</p>
      </div>
      <div className="flex mt-4 mx-4 items-center">
        <p className="text-[15px] font-bold">현재 공부 시간</p>
        <p className="text-[20px] font-light ml-12">15:32:25</p>
        <button className="ml-1">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/reset.png`}
            alt="reset"
            className="w-[25px]"
          />
        </button>
        <div className="ml-20 flex rounded-full bg-[#4659aa] w-[30px] h-[30px] items-center justify-center shadow-lg">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/play.png`}
            alt="Profile"
            className="w-[9px] h-[12px]"
          />
        </div>
      </div>

      <div className="flex mt-1 mx-4 items-center">
        <p className="text-[15px] font-bold">목표 시간</p>
        <p className="text-[14px] font-light ml-[77px]">18시간 00분 00초</p>
        <div className="ml-20 flex rounded-full bg-[#4659aa] w-[30px] h-[30px] items-center justify-center shadow-lg">
          <div className="text-[10px] font-bold text-white">적용</div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Timer;
