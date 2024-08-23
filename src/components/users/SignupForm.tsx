import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  validateInputs,
  validateNickname,
  validatePasswordMatch,
} from "../../utils/validation"; // 입력값을 검증하는 함수 가져오기
import axiosInstance from "../../utils/axiosInstance";

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState<string>(""); // 이메일 입력 상태
  const [password, setPassword] = useState<string>(""); // 비밀번호 입력 상태
  const [nickname, setNickname] = useState<string>(""); // 비밀번호 입력 상태
  const [confirmPassword, setConfirmPassword] = useState<string>(""); // 비밀번호 입력 상태
  const [helperText, setHelperText] = useState<string>(""); // 헬퍼 텍스트 상태
  const [helperTextColor, setHelperTextColor] =
    useState<string>("text-red-500"); // 핼퍼 텍스트 색상 상태
  const [nicknameHelperText, setNicknameHelperText] = useState<string>(""); // 헬퍼 텍스트 상태
  const [nicknameHelperTextColor, setNicknameHelperTextColor] =
    useState<string>("text-red-500"); // 핼퍼 텍스트 색상 상태
  const [confirmPasswordhelperText, setConfirmPasswordHelperText] =
    useState<string>(""); // 헬퍼 텍스트 상태
  const [confirmPasswordHelperTextColor, setConfirmPasswordHelperTextColor] =
    useState<string>("text-red-500"); // 핼퍼 텍스트 색상 상태
  const [isValid, setIsValid] = useState<boolean>(false); // 입력값의 유효성 상태
  const [isValidNickname, setIsValidNickname] = useState<boolean>(false); // 입력값의 유효성 상태
  const [isValidConfirmPassword, setIsValidConfirmPassword] =
    useState<boolean>(false); // 입력값의 유효성 상태
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect 훅을 사용해 이메일과 비밀번호가 변경될 때마다 유효성 검사 수행
  useEffect(() => {
    checkInputs(); // 입력값 유효성 검사 함수 호출
  }, [email, password]); // email 또는 password가 변경될 때마다 호출

  useEffect(() => {
    checkNickname();
  }, [nickname]);

  useEffect(() => {
    checkConfirmPassword();
  }, [confirmPassword, password]);

  // 입력값 유효성 검사 함수
  const checkInputs = () => {
    const trimmedEmail = email.trim(); // 이메일 양끝 공백 제거
    const trimmedPassword = password.trim(); // 비밀번호 양끝 공백 제거
    const validationMessage = validateInputs(trimmedEmail, trimmedPassword); // 유효성 검사

    // 유효성 검사 결과에 따라 상태 업데이트
    if (validationMessage === "") {
      setIsValid(true); // 유효한 입력일 때
      setHelperText("*"); // 헬퍼 텍스트를 기본값으로 설정
      setHelperTextColor("[#EBEEFF]"); // 색상을 변경 (비활성화 색상)
    } else {
      setIsValid(false); // 유효하지 않은 입력일 때
      setHelperText(`* ${validationMessage}`); // 유효성 검사 메시지 표시
      setHelperTextColor("red-500"); // 색상을 빨간색으로 설정
    }
  };

  // 닉네임 유효성 검사 함수
  const checkNickname = () => {
    const validationMessage = validateNickname(nickname); // 유효성 검사

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

  // 닉네임 유효성 검사 함수
  const checkConfirmPassword = () => {
    const validationMessage = validatePasswordMatch(password, confirmPassword); // 유효성 검사

    // 유효성 검사 결과에 따라 상태 업데이트
    if (validationMessage === "") {
      setIsValidConfirmPassword(true); // 유효한 입력일 때
      setConfirmPasswordHelperText("*"); // 헬퍼 텍스트를 기본값으로 설정
      setConfirmPasswordHelperTextColor("[#EBEEFF]"); // 색상을 변경 (비활성화 색상)
    } else {
      setIsValidConfirmPassword(false); // 유효하지 않은 입력일 때
      setConfirmPasswordHelperText(`* ${validationMessage}`); // 유효성 검사 메시지 표시
      setConfirmPasswordHelperTextColor("red-500"); // 색상을 빨간색으로 설정
    }
  };

  //유효하지 않은 닉네임입니다.

  // 회원가입 후 게시물 목록 페이지로 리다이렉트하는 함수
  const redirectToPostListPage = (): void => {
    window.location.href = "/"; // 루트 페이지로 리다이렉트
  };

  // 임시 회원가입 함수
  const signupUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 폼 제출 기본 동작 방지
    if (isLoading) return;

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/api/v1/users`,
        {
          email: trimmedEmail,
          nickname: nickname,
          password: trimmedPassword,
        }
      );

      if (response.status === 201) {
        console.log("201: Create, 회원가입 성공!");
        redirectToPostListPage();
      }
    } catch (error) {
      console.log(error);
      alert("회원가입 실패!");
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  return (
    <div className="p-8 bg-[#EEEEFF] rounded-[15px] flex flex-col justify-center items-center">
      <h2 className="text-[25px] font-bold text-gray-800 mb-6 text-center">
        회원가입
      </h2>
      <form className="w-[300px] h-[600px] mb-20" onSubmit={signupUser}>
        <div className="relative mb-4 mt-10">
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            } // 이메일 상태 업데이트
            className="peer w-full h-12 p-3 text-gray-700 border-b border-gray-300 rounded-lg focus:outline-none focus:border-[#4558A9] placeholder-transparent hover:border-[#4558A9]"
            placeholder="email"
          />
          {/* 이메일 입력 값이 없을 때 표시되는 라벨 */}
          {email === "" && (
            <label
              htmlFor="email"
              className="absolute left-3 top-3 text-gray-500 transition-all duration-300 transform origin-left pointer-events-none
                        peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
                        peer-focus:-translate-y-9 peer-hover:-translate-y-9
                        peer-focus:text-[#4558A9] peer-hover:text-[#4558A9]"
            >
              이메일
            </label>
          )}
        </div>

        {/* 닉네임 입력 필드 */}
        <div className="relative mb-6 mt-6">
          <input
            type="nickname"
            id="nickname"
            value={nickname}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNickname(e.target.value)
            } // 닉네임 상태 업데이트
            className="peer w-full h-12 p-3 text-gray-700 border-b border-gray-300 rounded-lg focus:outline-none focus:border-[#4558A9] placeholder-transparent hover:border-[#4558A9]"
            placeholder="10자 이하, 영어, 한글, 숫자만 가능합니다."
          />
          {/* 닉네임 입력 값이 없을 때 표시되는 라벨 */}
          {password === "" && (
            <label
              htmlFor="password"
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

        {/* 비밀번호 입력 필드 */}
        <div className="relative mb-6 mt-6">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            } // 비밀번호 상태 업데이트
            className="peer w-full h-12 p-3 text-gray-700 border-b border-gray-300 rounded-lg focus:outline-none focus:border-[#4558A9] placeholder-transparent hover:border-[#4558A9]"
            placeholder="password"
          />
          {/* 비밀번호 입력 값이 없을 때 표시되는 라벨 */}
          {password === "" && (
            <label
              htmlFor="password"
              className="absolute left-3 top-3 text-gray-500 transition-all duration-300 transform origin-left pointer-events-none
                        peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
                        peer-focus:-translate-y-9 peer-hover:-translate-y-9
                        peer-focus:text-[#4558A9] peer-hover:text-[#4558A9]"
            >
              비밀번호
            </label>
          )}
          {/* 헬퍼 텍스트 표시 */}
          <p className={`text-${helperTextColor} text-xs italic`}>
            {helperText}
          </p>
        </div>

        {/* 비밀번호 확인 입력 필드 */}
        <div className="relative mb-6 mt-6">
          <input
            type="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            } // 비밀번호 상태 업데이트
            className="peer w-full h-12 p-3 text-gray-700 border-b border-gray-300 rounded-lg focus:outline-none focus:border-[#4558A9] placeholder-transparent hover:border-[#4558A9]"
            placeholder="confirmPassword"
          />
          {/* 비밀번호 입력 값이 없을 때 표시되는 라벨 */}
          {confirmPassword === "" && (
            <label
              htmlFor="confirmPassword"
              className="absolute left-3 top-3 text-gray-500 transition-all duration-300 transform origin-left pointer-events-none
                        peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
                        peer-focus:-translate-y-9 peer-hover:-translate-y-9
                        peer-focus:text-[#4558A9] peer-hover:text-[#4558A9]"
            >
              비밀번호 확인
            </label>
          )}
          {/* 헬퍼 텍스트 표시 */}
          <p
            className={`text-${confirmPasswordHelperTextColor} text-xs italic`}
          >
            {confirmPasswordhelperText}
          </p>
        </div>

        {/* 회원가입 버튼 */}
        <div className="flex justify-center">
          <button
            className={`relative h-[40px] ${
              isValid
                ? "bg-[#4659AA] hover:bg-[#1A349D]"
                : "bg-gray-400 cursor-not-allowed"
            } text-white font-bold py-3 px-6 rounded-full w-[70%] flex items-center justify-center text-center mb-3`}
            disabled={!isValid}
          >
            <span className="absolute transform transition-transform duration-300">
              회원가입
            </span>
          </button>
        </div>

        {/* 회원가입 버튼 */}
        <div className="flex justify-center">
          <button
            className={`relative h-[40px] bg-[#EEEEFF] hover:bg-[#C6CFFF] text-[#777676] font-bold py-3 px-6 rounded-full w-[70%] flex items-center justify-center text-center`}
          >
            <span className="absolute transform transition-transform duration-300">
              회원가입
            </span>
          </button>
        </div>
      </form>

      {/* 구분선 */}
      <hr className="my-6 border-gray-300 w-[60%]" />

      {/* 카카오 버튼 */}
      <button
        className="bg-[#FFEB3B] hover:bg-[#FFE500] text-gray-800 py-2 px-4 focus:outline-none focus:shadow-outline w-[70%] rounded-full"
        type="button"
      >
        <div className="flex items-center space-x-4">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/kakao-talk.png`}
            alt="Logo"
            className="h-5 w-5"
          />
          <span>Kakao</span>
        </div>
      </button>

      {/* 비밀번호 재설정 링크 */}
      <div className="text-center mt-4">
        <small>비밀번호를 잃어버리셨나요?</small>
        <br />
        <a
          href="#"
          className="text-[#4558A9] hover:text-[#334281] font-semibold"
        >
          비밀번호 재설정
        </a>
      </div>
    </div>
  );
};

export default SignupForm;
