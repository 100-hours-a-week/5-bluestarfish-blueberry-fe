import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuthCheck } from "../utils/auth";
import { useEffect } from "react";
import { useTimeStore } from "../store/timeStore";
import { useRoomStore } from "../store/roomStore";
import axiosInstance from "../utils/axiosInstance";

import StudyroomWaitContainer from "../components/Container/StudyroomWaitContainer";

const StudyroomWaitPage: React.FC = () => {
  const location = useLocation();
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { authCheck } = useAuthCheck();
  const { setIsRunning } = useTimeStore();
  const { setRoomCamEnabled } = useRoomStore();

  const fetchStudyRoom = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/v1/rooms/${roomId}`
      );
      if (response.status === 200) {
        setRoomCamEnabled(response.data.data.camEnabled);
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 404) {
          console.error(
            "404 오류: ",
            error.response.data.message || "스터디룸을 찾을 수 없습니다."
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

  useEffect(() => {
    authCheck();
    setIsRunning(false);
    fetchStudyRoom();
  }, []);

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

  return (
    <div>
      <StudyroomWaitContainer />
    </div>
  );
};

export default StudyroomWaitPage;
