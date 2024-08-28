import React from "react";

const UserInfo: React.FC = () => {
  return (
    <div className="flex flex-row items-center w-[390px] h-[50px] rounded-[10px] p-3 bg-[#EBEEFF] justify-between text-black font-bold text-[13px] shadow-lg">
      <div className="flex gap-2">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/user-default-profile.png`}
          alt="user-default-profile"
          className="h-[23px] w-[23px]"
        />
        <p>정민성</p>
      </div>
      <div className="flex gap-4">
        <button className="">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/camera.png`}
            alt="camera"
            className="w-[20px]"
          />
        </button>
        <button className="">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/mic.png`}
            alt="mic"
            className="w-[15.62px] cursor-pointer object-scale-down"
          />
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
