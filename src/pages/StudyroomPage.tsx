import { useState } from "react";
import StudyroomContainer from "../components/Container/StudyroomContainer";
import Sidebar from "../components/Sidebar";

const StudyroomPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-black min-h-screen flex-">
      <div
        className={`flex-grow transition-all duration-300 ${
          isSidebarOpen ? "mr-[400px]" : "mr-0"
        }`}
      >
        <div className="grid grid-cols-3 items-center p-[15px]">
          <div className="justify-self-start rounded-[20px] w-[172px] h-[51px] bg-[#6d81d5] text-white text-[20px] font-bold flex items-center justify-center">
            방제
          </div>
          <div className="justify-self-center flex flex-row items-center gap-2">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/timer.png`}
              alt="Timer"
              className="w-[40px] cursor-pointer"
            />
            <div className="flex flex-col items-center">
              <p className="text-[#999999] text-[13px] font-bold">
                공부 시간 / 목표 시간
              </p>
              <p className="text-white text-[20px] font-bold">
                15:32:45 / 18:00:00
              </p>
            </div>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/connected.png`}
              alt="Connected"
              className="w-[26px] h-[26px] cursor-pointer"
            />
          </div>
          {!isSidebarOpen && (
            <button className="justify-self-end" onClick={toggleSidebar}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/side.png`}
                alt="Exit"
                className="w-[25px] cursor-pointer"
              />
            </button>
          )}
        </div>
        <StudyroomContainer />
      </div>
      {isSidebarOpen && <Sidebar toggleSidebar={toggleSidebar}></Sidebar>}
    </div>
  );
};

export default StudyroomPage;