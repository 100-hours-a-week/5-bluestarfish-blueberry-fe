import { useNavigate } from "react-router-dom";
import { useAuthCheck } from "../utils/auth";
import { useEffect } from "react";

import StudyroomWaitContainer from "../components/Container/StudyroomWaitContainer";

const StudyroomWaitPage: React.FC = () => {
  const { authCheck } = useAuthCheck();
  useEffect(() => {
    authCheck();
  }, []);

  const navigate = useNavigate();

  const exitWaitPage = () => {
    navigate("/");
  };

  return (
    <div className="bg-white p-[25px]">
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/exit.png`}
        alt="Exit"
        className="w-[30px] cursor-pointer"
        onClick={exitWaitPage}
      />
      <StudyroomWaitContainer />
    </div>
  );
};

export default StudyroomWaitPage;
