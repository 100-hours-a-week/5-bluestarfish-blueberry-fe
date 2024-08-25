import { useNavigate } from "react-router-dom";
import { useSetUserInfo } from "../utils/auth";
import { useEffect } from "react";

import StudyroomWaitContainer from "../components/Container/StudyroomWaitContainer";

const StudyroomWaitPage: React.FC = () => {
  const { setUserInfo } = useSetUserInfo();
  useEffect(() => {
    setUserInfo();
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
