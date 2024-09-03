import { useNavigate } from "react-router-dom";
import { useAuthCheck } from "../utils/auth";
import { useEffect } from "react";

import StudyroomWaitContainer from "../components/Container/StudyroomWaitContainer";

const StudyroomWaitPage: React.FC = () => {
  const { authCheck } = useAuthCheck();
  useEffect(() => {
    authCheck();
  }, []);
  return (
    <div>
      <StudyroomWaitContainer />
    </div>
  );
};

export default StudyroomWaitPage;
