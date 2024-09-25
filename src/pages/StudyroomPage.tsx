import React, { useState, useEffect, useRef } from "react";
import StudyroomContainer from "../components/Container/StudyroomContainer";
import Sidebar from "../components/rooms/Sidebar";
import { useAuthCheck } from "../utils/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { usePreventRefresh } from "../utils/usePreventRefresh";
import { useLoginedUserStore } from "../store/store";
import { useRoomStore } from "../store/roomStore";
import { useTimeStore } from "../store/timeStore";
import { addOneSecondToTime } from "../utils/time";
import axiosInstance from "../utils/axiosInstance";

const StudyroomPage: React.FC = () => {
  usePreventRefresh();
  const { authCheck } = useAuthCheck();
  const location = useLocation();
  const navigate = useNavigate();
  const { title } = useRoomStore();
  const { time, goaltime, isRunning, setTime } = useTimeStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { userId } = useLoginedUserStore();
  const timeRef = useRef(time); // time을 Ref로 관리

  useEffect(() => {
    timeRef.current = time;
  }, [time]);

  useEffect(() => {
    authCheck();
    return () => {
      updateUserTime();
    };
  }, []);

  useEffect(() => {
    const handleUnload = () => {
      stopTimer();
      updateUserTime();
    };

    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("unload", handleUnload);
    };
  }, []);

  useEffect(() => {
    if (isRunning) {
      startTimer();
    } else {
      stopTimer();
    }
  }, [isRunning]);

  useEffect(() => {
    const authorizedInStorage = sessionStorage.getItem("authorized");

    if (location.state?.authorized) {
      // 사용자가 인가된 경우, sessionStorage에 인가 상태 저장
      sessionStorage.setItem("authorized", "true");
    } else if (!authorizedInStorage) {
      // 새로고침이 아닌 도메인 직접 접근 시 (location.state가 없고, 인가되지 않은 경우)
      alert("인가되지 않은 접근입니다.");
      navigate("/");
    }
    // 새로고침 시에는 authorizedInStorage가 true로 남아 있으므로 경고가 뜨지 않음
  }, [location]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const startTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setTime((prevTime) => addOneSecondToTime(prevTime));
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
  };

  const updateUserTime = () => {
    if (userId == 0) return;
    const requestBody = {
      time: timeRef.current,
    };
    axiosInstance.patch(
      `${process.env.REACT_APP_API_URL}/api/v1/users/${userId}/time`,
      requestBody
    );
  };

  return (
    <div className="bg-black min-h-screen">
      <div
        className={`flex-grow transition-all duration-300 ${
          isSidebarOpen ? "mr-[400px]" : "mr-0"
        }`}
      >
        <div className="grid grid-cols-3 items-center p-[15px]">
          <div className="justify-self-start rounded-[8px] w-[172px] h-[51px] bg-[#6d81d5] text-white text-[18px] font-bold flex items-center justify-center">
            {title}
          </div>
          <div className="justify-self-center flex flex-row items-center gap-2">
            {/* <img
              src={`${process.env.PUBLIC_URL}/assets/images/timer.png`}
              alt="Timer"
              className="w-[40px] cursor-pointer"
            /> */}
            <div className="flex flex-col items-center">
              <p className="text-[#999999] text-[13px] font-bold">
                {/* 공부 시간 / 목표 시간 */}
                나의 공부 시간
              </p>
              <p className="text-white text-[20px] font-bold">
                {/* {time} / {goaltime} */}
                {time}
              </p>
            </div>
            {/* <img
              src={`${process.env.PUBLIC_URL}/assets/images/connected.png`}
              alt="Connected"
              className="w-[26px] h-[26px] cursor-pointer"
            /> */}
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
        <StudyroomContainer stopTimer={stopTimer} />
      </div>
      {isSidebarOpen && <Sidebar toggleSidebar={toggleSidebar}></Sidebar>}
    </div>
  );
};

export default StudyroomPage;
