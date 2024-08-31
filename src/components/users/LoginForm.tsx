import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { validateInputs } from "../../utils/validation"; // 입력값을 검증하는 함수 가져오기
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useLoginedUserStore } from "../../store/store";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>(""); // 이메일 입력 상태
  const [password, setPassword] = useState<string>(""); // 비밀번호 입력 상태
  const [helperText, setHelperText] = useState<string>(""); // 헬퍼 텍스트 상태
  const [helperTextColor, setHelperTextColor] = useState<string>("red-500"); // 핼퍼 텍스트 색상 상태
  const [isValid, setIsValid] = useState<boolean>(false); // 입력값의 유효성 상태
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect 훅을 사용해 이메일과 비밀번호가 변경될 때마다 유효성 검사 수행
  useEffect(() => {
    checkInputs(); // 입력값 유효성 검사 함수 호출
  }, [email, password]); // email 또는 password가 변경될 때마다 호출

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

  const navigate = useNavigate();

  // 임시 회원가입 함수
  const signup = () => {
    navigate("/signup");
  };

  // Axios로 로그인 요청 보내는 함수
  const loginUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 폼 제출 기본 동작 방지
    if (isLoading) return;

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const validationMessage = validateInputs(trimmedEmail, trimmedPassword);

    if (validationMessage !== "") {
      setIsValid(false);
      setHelperText(`* ${validationMessage}`);
      setHelperTextColor("red-500");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/login`,
        {
          email: trimmedEmail,
          password: trimmedPassword,
        }
      );

      if (response.status === 200) {
        navigate(`/`);
      } else {
        setHelperText("* 이메일 또는 비밀번호를 다시 확인해주세요.");
        setHelperTextColor("red-500");
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          console.error("401: ", "Unauthorized");
        }
      } else {
        console.error("로그인 응답을 받아오는 중 오류 발생:", error.message);
      }
      console.error(error);
      setHelperText("*이메일 또는 비밀번호가 올바르지 않습니다.");
      setHelperTextColor("red-500");
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  return (
    <div className="md:w-1/2 p-8 bg-[#EEEEFF] flex flex-col justify-center items-center">
      {/* 로그인 폼의 헤더 */}
      <h2 className="text-[25px] font-bold text-gray-800 mb-6 text-center">
        로그인
      </h2>

      {/* 로그인 폼 */}
      <form className="w-[300px] h-[200px] mb-20" onSubmit={loginUser}>
        {/* 이메일 입력 필드 */}
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

        {/* 로그인 버튼 */}
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
              로그인
            </span>
          </button>
        </div>

        {/* 회원가입 버튼 */}
        <div className="flex justify-center">
          <button
            className={`relative h-[40px] bg-[#EEEEFF] hover:bg-[#C6CFFF] text-[#777676] font-bold py-3 px-6 rounded-full w-[70%] flex items-center justify-center text-center`}
            onClick={signup}
          >
            <span className="absolute transform transition-transform duration-300">
              회원가입
            </span>
          </button>
        </div>
      </form>

      {/* 구분선 */}
      <hr className="my-6 border-gray-300 w-[60%]" />

      {/* 카카오 로그인 버튼 */}
      <button
        className="bg-[#FFEB3B] hover:bg-[#FFE500] text-gray-800 py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[70%] rounded-full"
        type="button"
        style={{ display: "none" }}
      >
        <div className="flex items-center space-x-4">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/kakao-talk.png`}
            alt="Logo"
            className="h-5 w-5"
          />
          <span>Kakao 계정 간편 로그인</span>
        </div>
      </button>

      {/* 비밀번호 재설정 링크 */}
      <div className="text-center mt-4" style={{ display: "none" }}>
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

export default LoginForm;
