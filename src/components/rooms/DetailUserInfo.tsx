import React from "react";

interface DetailUserInfoProps {
  nickname: string;
  profileImage: string;
}

const DetailUserInfo: React.FC<DetailUserInfoProps> = ({
  nickname,
  profileImage,
}) => {
  const openDetailModal = () => {};
  return (
    <div
      onClick={openDetailModal}
      className="flex flex-row items-center w-[390px] h-[50px] rounded-[10px] p-3 bg-[#EBEEFF] justify-between text-black font-bold text-[13px] shadow-lg"
    >
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
        <button className=""></button>
        <button className=""></button>
      </div>
    </div>
  );
};

export default DetailUserInfo;
