import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { validateInputs } from '../utils/validation';  // validation.ts에서 가져오기

const testEmail = "test@naver.com";
const testPassword = "Test1234*";

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [helperText, setHelperText] = useState<string>('');
    const [helperTextColor, setHelperTextColor] = useState<string>('red');
    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        checkInputs();
    }, [email, password]);

    const checkInputs = () => {
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
        const validationMessage = validateInputs(trimmedEmail, trimmedPassword);

        if (validationMessage === '') {
            setIsValid(true);
            setHelperText('*');
            setHelperTextColor("[#EEEEFF]");
        } else {
            setIsValid(false);
            setHelperText(`* ${validationMessage}`);
            setHelperTextColor('red-500');
        }
    };

    const redirectToPostListPage = (): void => {
        window.location.href = "/";
    };

    const loginUser = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        // 폼 제출 전 유효성 검사
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
        const validationMessage = validateInputs(trimmedEmail, trimmedPassword);

        if (validationMessage !== '') {
            setIsValid(false);
            setHelperText(`* ${validationMessage}`);
            setHelperTextColor('red-500');
            return;
        }

        // 임의의 이메일과 비밀번호 확인
        if (trimmedEmail === testEmail && trimmedPassword === testPassword) {
            setHelperText('* 로그인에 성공했습니다.');
            setHelperTextColor('blue-500');
            setTimeout(() => {
                redirectToPostListPage();
            }, 3000);
        } else {
            setHelperText('* 이메일 또는 비밀번호를 다시 확인해주세요.');
            setHelperTextColor('red-500');
        }
    };

    return (
        <div className="md:w-1/2 p-8 bg-[#EEEEFF] flex flex-col justify-center items-center">
            <h2 className="text-[25px] font-bold text-gray-800 mb-6 text-center">로그인</h2>
            <form className="w-[300px] h-[200px] mb-20" onSubmit={loginUser}>
                <div className="relative mb-4 mt-10">
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        className="peer w-full h-12 p-3 text-gray-700 border-b border-gray-300 rounded-lg focus:outline-none focus:border-[#4558A9] placeholder-transparent hover:border-[#4558A9]"
                        placeholder="email"
                    />
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
                <div className="relative mb-6 mt-6">
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        className="peer w-full h-12 p-3 text-gray-700 border-b border-gray-300 rounded-lg focus:outline-none focus:border-[#4558A9] placeholder-transparent hover:border-[#4558A9]"
                        placeholder="password"
                    />
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
                    <p className={`text-${helperTextColor} text-xs italic`}>{helperText}</p>
                </div>
                <div className="flex justify-center">
                    <button className={`relative h-[40px] ${isValid ? 'bg-[#4659AA] hover:bg-[#1A349D]' : 'bg-gray-400 cursor-not-allowed'} text-white font-bold py-3 px-6 rounded-full w-[70%] flex items-center justify-center text-center mb-3`} disabled={!isValid}>
                        <span className="absolute transform transition-transform duration-300">로그인</span>
                    </button>
                </div>
                <div className="flex justify-center">
                    <button className={`relative h-[40px] bg-[#EEEEFF] hover:bg-[#C6CFFF] text-[#777676] font-bold py-3 px-6 rounded-full w-[70%] flex items-center justify-center text-center`}>
                        <span className="absolute transform transition-transform duration-300">회원가입</span>
                    </button>
                </div>
            </form>
            <hr className="my-6 border-gray-300 w-[60%]" />
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
