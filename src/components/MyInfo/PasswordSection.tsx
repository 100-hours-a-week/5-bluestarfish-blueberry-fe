// components/PasswordSection.tsx
import React, { ChangeEvent } from "react";

interface PasswordSectionProps {
    password: string;
    confirmPassword: string;
    handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleConfirmPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
    passwordError: string;
    confirmPasswordError: string;
    isEditing: boolean;
}

const PasswordSection: React.FC<PasswordSectionProps> = ({
    password,
    confirmPassword,
    handlePasswordChange,
    handleConfirmPasswordChange,
    passwordError,
    confirmPasswordError,
    isEditing,
}) => {
    if (!isEditing) return null;

    return (
        <>
            <div className="mb-8 w-full">
                <div className="w-full text-left mb-2">
                    <span className="text-[#4659AA] bg-[#EEEEFF] px-3 py-1 rounded-full shadow-md">
                        비밀번호
                    </span>
                </div>
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full h-12 p-3 pr-24 text-gray-700 border-b border-gray-300 rounded-lg focus:outline-none focus:border-[#4558A9] hover:border-[#4558A9]"
                    placeholder="8~16자, 영문, 숫자, 특수문자 포함"
                />
                <p className={`absolute text-xs italic mt-2 ${passwordError ? "text-red-500" : "text-blue-500"}`}>
                    {passwordError}
                </p>
            </div>

            <div className="mb-8 w-full">
                <div className="w-full text-left mb-2">
                    <span className="text-[#4659AA] bg-[#EEEEFF] px-3 py-1 rounded-full shadow-md">
                        비밀번호 확인
                    </span>
                </div>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className="w-full h-12 p-3 pr-24 text-gray-700 border-b border-gray-300 rounded-lg focus:outline-none focus:border-[#4558A9] hover:border-[#4558A9]"
                    placeholder="비밀번호를 한 번 더 입력하세요"
                />
                <p className={`absolute text-xs italic mt-2 ${confirmPasswordError ? "text-red-500" : "text-blue-500"}`}>
                    {confirmPasswordError}
                </p>
            </div>
        </>
    );
};

export default PasswordSection;
