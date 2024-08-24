import React from "react";
import UserInfo from "../rooms/UserInfo";

const UserInfoContainer: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-2 m-4">
      <UserInfo />
      <UserInfo />
      <UserInfo />
    </div>
  );
};

export default UserInfoContainer;
