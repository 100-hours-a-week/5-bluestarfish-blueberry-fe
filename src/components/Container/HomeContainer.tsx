import Timer from "../rooms/Timer";
import React, { useState } from "react";
import UserInfoContainer from "./UserInfoContainer";

type HomeContainerProps = {};

const HomeContainer: React.FC<HomeContainerProps> = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);
  const openInviteModal = () => {};

  return (
    <div className="m-2 flex flex-col h-full">
      <Timer />
      <div className="flex justify-end mt-4">
        <button
          className="mt-2 mr-2 bg-[#4659AA] text-white font-bold py-1 px-3 rounded-[15px] text-[12px]"
          onClick={openInviteModal}
        >
          초대
        </button>
      </div>
      <UserInfoContainer />
      <div className="w-[400px] bg-[#D9D9D9] fixed bottom-0 right-0">
        <div className="flex items-center justify-start w-full h-[80px] px-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
                alt="Logo"
                className="h-8 w-8"
              />
              <span className="text-xl font-bold text-shadow-sm text-[#6D81D5]">
                blueberry
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContainer;
