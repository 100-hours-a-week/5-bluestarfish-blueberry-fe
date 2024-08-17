import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { validateInputs } from '../utils/validation';  // 입력값을 검증하는 함수 가져오기

// 로그인에 사용할 테스트 이메일과 비밀번호
const testEmail = "test@naver.com";
const testPassword = "Test1234*";

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');  // 이메일 입력 상태
    const [password, setPassword] = useState<string>('');  // 비밀번호 입력 상태
    const [helperText, setHelperText] = useState<string>('');  // 헬퍼 텍스트 상태
    const [helperTextColor, setHelperTextColor] = useState<string>('text-red-500');  // 핼퍼 텍스트 색상 상태
    const [isValid, setIsValid] = useState<boolean>(false);  // 입력값의 유효성 상태

    // useEffect 훅을 사용해 이메일과 비밀번호가 변경될 때마다 유효성 검사 수행
    useEffect(() => {
        checkInputs();  // 입력값 유효성 검사 함수 호출
    }, [email, password]);  // email 또는 password가 변경될 때마다 호출

    // 입력값 유효성 검사 함수
    const checkInputs = () => {
        const trimmedEmail = email.trim();  // 이메일 양끝 공백 제거
        const trimmedPassword = password.trim();  // 비밀번호 양끝 공백 제거
        const validationMessage = validateInputs(trimmedEmail, trimmedPassword);  // 유효성 검사

        // 유효성 검사 결과에 따라 상태 업데이트
        if (validationMessage === '') {
            setIsValid(true);  // 유효한 입력일 때
            setHelperText('*');  // 헬퍼 텍스트를 기본값으로 설정
            setHelperTextColor('[#EBEEFF]');  // 색상을 변경 (비활성화 색상)
        } else {
            setIsValid(false);  // 유효하지 않은 입력일 때
            setHelperText(`* ${validationMessage}`);  // 유효성 검사 메시지 표시
            setHelperTextColor('red-500');  // 색상을 빨간색으로 설정
        }
    };

    // 로그인 후 게시물 목록 페이지로 리다이렉트하는 함수
    const redirectToPostListPage = (): void => {
        window.location.href = "/";  // 루트 페이지로 리다이렉트
    };

    // 폼 제출 시 호출되는 함수
    const loginUser = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();  // 폼 제출 기본 동작 방지

        // 폼 제출 전 유효성 검사
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
        const validationMessage = validateInputs(trimmedEmail, trimmedPassword);

        if (validationMessage !== '') {  // 유효하지 않은 경우
            setIsValid(false);
            setHelperText(`* ${validationMessage}`);  // 에러 메시지 표시
            setHelperTextColor('red-500');  // 에러 메시지 색상 설정
            return;
        }

        // 입력된 이메일과 비밀번호가 테스트 값과 일치하는지 확인
        if (trimmedEmail === testEmail && trimmedPassword === testPassword) {
            setHelperText('* 로그인에 성공했습니다.');  // 성공 메시지 표시
            setHelperTextColor('blue-500');  // 메시지 색상을 파란색으로 설정
            setTimeout(() => {
                redirectToPostListPage();  // 3초 후 리다이렉트
            }, 3000);
        } else {
            setHelperText('* 이메일 또는 비밀번호를 다시 확인해주세요.');  // 에러 메시지 표시
            setHelperTextColor('red-500');  // 메시지 색상을 빨간색으로 설정
        }
    };

    return (
        <div className="md:w-1/2 p-8 bg-[#EEEEFF] flex flex-col justify-center items-center">
            {/* 로그인 폼의 헤더 */}
            <h2 className="text-[25px] font-bold text-gray-800 mb-6 text-center">로그인</h2>
            
            {/* 로그인 폼 */}
            <form className="w-[300px] h-[200px] mb-20" onSubmit={loginUser}>
                {/* 이메일 입력 필드 */}
                <div className="relative mb-4 mt-10">
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}  // 이메일 상태 업데이트
                        className="peer w-full h-12 p-3 text-gray-700 border-b border-gray-300 rounded-lg focus:outline-none focus:border-[#4558A9] placeholder-transparent hover:border-[#4558A9]"
                        placeholder="email"
                    />
                    {/* 이메일 입력 값이 없을 때 표시되는 라벨 */}
                    {email === '' && (
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
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}  // 비밀번호 상태 업데이트
                        className="peer w-full h-12 p-3 text-gray-700 border-b border-gray-300 rounded-lg focus:outline-none focus:border-[#4558A9] placeholder-transparent hover:border-[#4558A9]"
                        placeholder="password"
                    />
                    {/* 비밀번호 입력 값이 없을 때 표시되는 라벨 */}
                    {password === '' && (
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
                    <p className={`text-${helperTextColor} text-xs italic`}>{helperText}</p>
                </div>

                {/* 로그인 버튼 */}
                <div className="flex justify-center">
                    <button className={`relative h-[40px] ${isValid ? 'bg-[#4659AA] hover:bg-[#1A349D]' : 'bg-gray-400 cursor-not-allowed'} text-white font-bold py-3 px-6 rounded-full w-[70%] flex items-center justify-center text-center mb-3`} disabled={!isValid}>
                        <span className="absolute transform transition-transform duration-300">로그인</span>
                    </button>
                </div>

                {/* 회원가입 버튼 */}
                <div className="flex justify-center">
                    <button className={`relative h-[40px] bg-[#EEEEFF] hover:bg-[#C6CFFF] text-[#777676] font-bold py-3 px-6 rounded-full w-[70%] flex items-center justify-center text-center`}>
                        <span className="absolute transform transition-transform duration-300">회원가입</span>
                    </button>
                </div>
            </form>

            {/* 구분선 */}
            <hr className="my-6 border-gray-300 w-[60%]" />

            {/* 카카오 로그인 버튼 */}
            <button
                className="bg-[#FFEB3B] hover:bg-[#FFE500] text-gray-800 py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[70%] rounded-full"
                type="button"
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
            <div className="text-center mt-4">
                <small>비밀번호를 잃어버리셨나요?</small>
                <br />
                <a href="#" className="text-[#4558A9] hover:text-[#334281] font-semibold">
                    비밀번호 재설정
                </a>
            </div>
        </div>
    );
};

export default LoginForm;
