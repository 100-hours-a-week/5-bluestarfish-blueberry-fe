import React, { useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
import BasicHeader from "../components/common/BasicHeader";
import SetAuthNicknameForm from "../components/users/SetAuthNicknameForm";
import { useSetUserInfo } from "../utils/auth";

const SetAuthNicknamePage: React.FC = () => {
  const { setUserInfo } = useSetUserInfo();
  useEffect(() => {
    setUserInfo();
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BasicHeader />
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-md w-full h-[590px]">
          <SetAuthNicknameForm />
        </div>
      </div>
    </div>
  );
};

export default SetAuthNicknamePage;
