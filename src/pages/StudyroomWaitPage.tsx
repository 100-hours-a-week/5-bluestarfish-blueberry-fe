import { useLocation, useNavigate } from "react-router-dom";
import { useAuthCheck } from "../utils/auth";
import { useEffect } from "react";
import { useTimeStore } from "../store/timeStore";

import StudyroomWaitContainer from "../components/Container/StudyroomWaitContainer";

const StudyroomWaitPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authCheck } = useAuthCheck();
  const { setIsRunning } = useTimeStore();

  useEffect(() => {
    authCheck();
    setIsRunning(false);
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
