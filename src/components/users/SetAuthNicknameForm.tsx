import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { validateNickname } from "../../utils/validation";
import ToastNotification from "../common/ToastNotification";
import { useLoginedUserStore } from "../../store/store";

const SetAuthNicknameForm: React.FC = () => {
  const [nickname, setNickname] = useState<string>("");
  const [nicknameHelperText, setNicknameHelperText] = useState<string>(""); // 헬퍼 텍스트 상태
  const [nicknameHelperTextColor, setNicknameHelperTextColor] =
    useState<string>("red-500"); // 핼퍼 텍스트 색상 상태
  const [isValidNickname, setIsValidNickname] = useState<boolean>(false); // 입력값의 유효성 상태
  const [isValidConfirmNickname, setIsValidConfirmNickname] =
    useState<boolean>(false); // 입력값의 유효성 상태
  const [isValid, setIsValid] = useState<boolean>(false); // 입력값의 유효성 상태
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showNicknameSuccessToast, setShowNicknameSuccessToast] =
    useState(false);
  const [showNicknameErrorToast, setShowNicknameErrorToast] = useState(false);
  const { userId, setUserId } = useLoginedUserStore();

  useEffect(() => {
    checkNickname();
  }, [nickname]);

  useEffect(() => {
    if (isValidNickname && isValidConfirmNickname) setIsValid(true);
    else setIsValid(false);
  }, [isValidNickname, isValidConfirmNickname]);

  const navigate = useNavigate();

  // 닉네임 유효성 검사 함수
  const checkNickname = () => {
    const trimmedNickname = nickname.trim();
    const validationMessage = validateNickname(trimmedNickname); // 유효성 검사

    // 유효성 검사 결과에 따라 상태 업데이트
    if (validationMessage === "사용 가능한 닉네임입니다.") {
      setIsValidNickname(true); // 유효한 입력일 때
      setNicknameHelperText("*"); // 헬퍼 텍스트를 기본값으로 설정
      setNicknameHelperTextColor("[#EBEEFF]"); // 색상을 변경 (비활성화 색상)
    } else {
      setIsValidNickname(false); // 유효하지 않은 입력일 때
      setNicknameHelperText(`* ${validationMessage}`); // 유효성 검사 메시지 표시
      setNicknameHelperTextColor("red-500"); // 색상을 빨간색으로 설정
    }
  };

  const sendNickname = async (trimmedNickname: string) => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/v1/users/nickname?nickname=${trimmedNickname}`
      );

      if (response.status === 200) {
        setIsValidConfirmNickname(true);
        setShowNicknameSuccessToast(true);
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.message);
        setIsValidConfirmNickname(false);
        setShowNicknameErrorToast(true);
      }
    }
  };

  const logout = async () => {
    try {
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/logout`
      );

      if (response.status === 204) {
        console.log(`로그아웃 성공!`);
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          console.error("401: ", "Unauthorized");
        }
      } else {
        console.error("로그아웃 응답을 받아오는 중 오류 발생:", error.message);
      }
      console.error(error);
    }
    setUserId(0);
  };

  const handleClickText = async () => {
    await logout();
    navigate("/");
  };

  const handleNicknameChange = (nickname: string) => {
    setNickname(nickname);
    setIsValidConfirmNickname(false);
  };

  const handleIsNicknameAvailableButtonClick = async () => {
    const trimmedNickname = nickname.trim();
    sendNickname(trimmedNickname);
  };

  const handleCloseNicknameSuccessToast = () => {
    setShowNicknameSuccessToast(false);
  };

  const handleCloseNicknameErrorToast = () => {
    setShowNicknameErrorToast(false);
  };

  // Axios로 로그인 요청 보내는 함수
  const changeUserNickname = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 폼 제출 기본 동작 방지
    if (isLoading) return;

    const trimmedNickname = nickname.trim();

    try {
      setIsLoading(true);
      const formData = new FormData();
      if (nickname) {
        formData.append("nickname", nickname);
      }
      const response = await axiosInstance.patch(
        `${process.env.REACT_APP_API_URL}/api/v1/users/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // FormData 전송을 위한 Content-Type 설정
          },
        }
      );

      if (response.status === 204) {
        navigate(`/`);
      } else {
        setNicknameHelperText("* 닉네임 변경에 실패하였습니다.");
        setNicknameHelperTextColor("red-500");
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 404) {
          console.error("404: ", "Not Found");
          setNicknameHelperText("* 닉네임 변경에 실패하였습니다.");
          setNicknameHelperTextColor("red-500");
        }
      } else {
        console.error("서버 응답을 받아오는 중 오류 발생:", error.message);
      }
      console.error(error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  return (
    <div className="p-8 bg-[#EEEEFF] flex flex-col justify-center items-center">
      <h2 className="text-[25px] font-bold text-gray-800 mb-6 text-center">
        카카오 회원 닉네임 설정
      </h2>
      <hr className="my-6 border-gray-300 w-[60%]" />
      <div className="relative mb-6 mt-6">
        <input
          type="text"
          id="nickname"
          value={nickname}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleNicknameChange(e.target.value)
          } // 닉네임 상태 업데이트
          className="peer w-full h-12 p-3 pr-24 text-gray-700 border-b border-gray-300 rounded-lg focus:outline-none focus:border-[#4558A9] placeholder-transparent hover:border-[#4558A9]"
        />
        <button
          className="absolute right-2 top-6 transform -translate-y-1/2 text-[#6D81D5] hover:text-[#4659AA] font-bold py-2 px-2 rounded-full focus:outline-none"
          type="button"
          onClick={handleIsNicknameAvailableButtonClick}
        >
          중복확인
        </button>
        {/* 닉네임 입력 값이 없을 때 표시되는 라벨 */}
        {nickname === "" && (
          <label
            htmlFor="nickname"
            className="absolute left-3 top-3 text-gray-500 transition-all duration-300 transform origin-left pointer-events-none
                        peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
                        peer-focus:-translate-y-9 peer-hover:-translate-y-9
                        peer-focus:text-[#4558A9] peer-hover:text-[#4558A9]"
          >
            닉네임
          </label>
        )}
        {/* 헬퍼 텍스트 표시 */}
        <p className={`text-${nicknameHelperTextColor} text-xs italic`}>
          {nicknameHelperText}
        </p>
      </div>
      <form className="w-[300px] h-[200px] mb-20" onSubmit={changeUserNickname}>
        {/* 로그인 버튼 */}
        <div className="flex flex-col items-center justify-center gap-5">
          <button
            className={`relative h-[40px] ${
              isValid
                ? "bg-[#4659AA] hover:bg-[#1A349D]"
                : "bg-gray-400 cursor-not-allowed"
            } text-white font-bold py-3 px-6 rounded-full w-[70%] flex items-center justify-center text-center mb-3`}
            disabled={!isValid}
          >
            <span className="absolute transform transition-transform duration-300">
              가입하기
            </span>
          </button>
          <p onClick={handleClickText} className="cursor-pointer">
            메인페이지로 이동하기
          </p>
        </div>
      </form>{" "}
      {showNicknameSuccessToast && (
        <ToastNotification
          message="사용 가능한 닉네임"
          isSuccess={true}
          onClose={handleCloseNicknameSuccessToast}
        />
      )}
      {showNicknameErrorToast && (
        <ToastNotification
          message="사용 불가능한 닉네임"
          isSuccess={false}
          onClose={handleCloseNicknameErrorToast}
        />
      )}
    </div>
  );
};

export default SetAuthNicknameForm;
