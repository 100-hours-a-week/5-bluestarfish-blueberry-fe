import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import StudyroomContainer from "../components/Container/StudyroomContainer";
import Sidebar from "../components/rooms/Sidebar";
import { useAuthCheck } from "../utils/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { usePreventRefresh } from "../utils/usePreventRefresh";

const StudyroomPage: React.FC = () => {
  usePreventRefresh();
  const { authCheck } = useAuthCheck();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    authCheck();
  }, []);

  useEffect(() => {
    // state: { authorized: true, needPassword: false, password: content },
    // 인가 여부 확인
    if (!location.state || !location.state.authorized) {
      alert("인가되지 않은 접근입니다.");
      navigate("/");
    }
  }, [location]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const { roomId } = useParams<{ roomId: string }>(); // URL에서 roomId를 가져옴

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-black min-h-screen">
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
                alt="Sidebar"
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
