import React from "react";

interface UserInfoProps {
  nickname: string;
  profileImage: string;
  camEnabled: boolean;
  micEnabled: boolean;
}

const UserInfo: React.FC<UserInfoProps> = ({
  nickname,
  profileImage,
  camEnabled,
  micEnabled,
}) => {
  return (
    <div className="flex flex-row items-center w-[390px] h-[50px] rounded-[10px] p-3 bg-[#EBEEFF] justify-between text-black font-bold text-[13px] shadow-lg">
      <div className="flex gap-2">
        <img
          src={
            profileImage ||
            `${process.env.PUBLIC_URL}/assets/images/user-default-profile.png`
          }
          alt="user-profile"
          className="h-[23px] w-[23px]"
        />
        <p>{nickname}</p>
      </div>
      <div className="flex gap-4">
        <button className="">
          {/* 카메라 상태에 따라 camera-on 또는 camera-off 이미지 렌더링 */}
          <img
            src={
              camEnabled
                ? `${process.env.PUBLIC_URL}/assets/images/camera.png`
                : `${process.env.PUBLIC_URL}/assets/images/camera-slash.png`
            }
            alt="camera"
            className="w-[20px]" // 크기 고정
          />
        </button>
        <button className="">
          {/* 마이크 상태에 따라 mic-on 또는 mic-off 이미지 렌더링 */}
          <img
            src={
              micEnabled
                ? `${process.env.PUBLIC_URL}/assets/images/mic.png`
                : `${process.env.PUBLIC_URL}/assets/images/mic-slash.png`
            }
            alt="mic"
            className="w-[15.62px]" // 크기 고정
          />
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
