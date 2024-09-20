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
    if (!location.state || !location.state.authorized) {
      alert("인가되지 않은 접근입니다.");
      navigate("/");
    }
  }, [location]);

  return (
    <div>
      <StudyroomWaitContainer />
    </div>
  );
};

export default StudyroomWaitPage;
