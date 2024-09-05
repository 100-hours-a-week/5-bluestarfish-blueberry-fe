import { useLocation, useNavigate } from "react-router-dom";
import { useAuthCheck } from "../utils/auth";
import { useEffect } from "react";

import StudyroomWaitContainer from "../components/Container/StudyroomWaitContainer";

const StudyroomWaitPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authCheck } = useAuthCheck();

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
  }, [location, navigate]);

  return (
    <div>
      <StudyroomWaitContainer />
    </div>
  );
};

export default StudyroomWaitPage;
