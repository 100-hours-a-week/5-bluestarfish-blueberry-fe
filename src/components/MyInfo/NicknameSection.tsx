import React, { ChangeEvent } from "react";

interface NicknameSectionProps {
  nickname: string;
  handleNicknameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  nicknameError: string;
  nicknameHelperTextColor: string;
  nicknameHelperText: string;
  handleIsNicknameAvailableButtonClick: () => void;
  isEditing: boolean;
  currentUser: any;
}

const NicknameSection: React.FC<NicknameSectionProps> = ({
  nickname,
  handleNicknameChange,
  nicknameError,
  nicknameHelperTextColor,
  nicknameHelperText,
  handleIsNicknameAvailableButtonClick,
  isEditing,
  currentUser,
}) => {
  return (
    <div className="mb-8 w-full">
      <div className="w-full text-left mb-2">
        <span className="text-[#4659AA] bg-[#EEEEFF] px-3 py-1 rounded-full shadow-md">
          닉네임
        </span>
      </div>
      {isEditing ? (
        <div className="relative">
          <input
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            className="w-full h-12 p-3 pr-24 text-gray-700 border-b border-gray-300 rounded-lg focus:outline-none focus:border-[#4558A9] hover:border-[#4558A9]"
            placeholder="새 닉네임을 입력하세요"
          />
          <p
            className={`absolute text-xs italic mt-2 ${nicknameError === "사용 가능한 닉네임입니다." ||
                nicknameError === "기존 닉네임과 동일한 닉네임입니다."
                ? "text-blue-500"
                : "text-red-500"
              }`}
          >
            {nicknameError}
          </p>
          <button
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 font-bold py-1 px-2 rounded-full focus:outline-none ${nicknameError === "" ||
                nicknameError === "* 닉네임 중복 검사를 진행해주세요."
                ? "text-[#6D81D5] hover:text-[#4659AA] cursor-pointer"
                : "text-gray-400 cursor-not-allowed"
              }`}
            type="button"
            onClick={handleIsNicknameAvailableButtonClick}
            disabled={
              !(
                nicknameError === "" ||
                nicknameError === "* 닉네임 중복 검사를 진행해주세요."
              )
            }
          >
            중복확인
          </button>

          <p className={`${nicknameHelperTextColor} text-xs italic mt-2`}>
            {nicknameHelperText}
          </p>
        </div>
      ) : (
        <span className="text-black">{currentUser.nickname}</span>
      )}
    </div>
  );
};

export default NicknameSection;
