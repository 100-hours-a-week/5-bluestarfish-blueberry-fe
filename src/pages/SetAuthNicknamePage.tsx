import React, { useEffect } from "react";
import BasicHeader from "../components/common/BasicHeader";
import SetAuthNicknameForm from "../components/users/SetAuthNicknameForm";
import { useOAuthSetUserInfo } from "../utils/auth";

const SetAuthNicknamePage: React.FC = () => {
  const { oAuthSetUserInfo } = useOAuthSetUserInfo();
  useEffect(() => {
    oAuthSetUserInfo();
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BasicHeader />
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-md w-full h-[490px]">
          <SetAuthNicknameForm />
        </div>
      </div>
    </div>
  );
};

export default SetAuthNicknamePage;
