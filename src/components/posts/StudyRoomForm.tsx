import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Lottie from 'react-lottie-player';
import ToastNotification from '../common/ToastNotification';
import addPhotoAnimation from '../../animations/add-photo.json'

type StudyRoomFormProps = {
    studyRoomName: string;
    maxUsers: number | null;
    category: string | null;
    thumbnail: File | null;
    password: string;
    description: string;
    studyRoomNameError: string;
    maxUsersError: string;
    thumbnailError: string;
    passwordError: string;
    handleStudyRoomNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleMaxUsersClick: (selectedMaxUsers: number) => void;
    handleCategoryClick: (selectedCategory: string) => void;
    handleThumbnailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleSubmit: () => void;
};

const StudyRoomForm: React.FC<StudyRoomFormProps> = ({
    studyRoomName,
    maxUsers,
    category,
    thumbnail,
    password,
    description,
    studyRoomNameError,
    maxUsersError,
    thumbnailError,
    passwordError,
    handleStudyRoomNameChange,
    handleMaxUsersClick,
    handleCategoryClick,
    handleThumbnailChange,
    handlePasswordChange,
    handleDescriptionChange,
    handleSubmit,
}) => {
    const isFormValid =
        studyRoomNameError === '통과' &&
        maxUsersError === '통과' &&
        (thumbnailError === '* 선택 사항' || thumbnailError === '통과') &&
        (passwordError === '* 선택 사항' || passwordError === '통과');

    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();

    const handleShowToast = () => {
        if (isFormValid) {
            handleSubmit();
            setShowToast(true);
        }
    };

    const handleCloseToast = () => {
        setShowToast(false);
        navigate("/");
    };

    return (
        <div className="w-full max-w-3xl">
            {/* 스터디룸 이름 입력 필드 */}
            <div className="mb-4 relative">
                <div className="flex items-center space-x-2 mb-3">
                    <label className="block text-gray-700 text-m font-bold" htmlFor="studyRoomName">
                        스터디룸 이름
                    </label>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/images/blueberry-icon.png`}
                        className="w-[25px] h-[25px] mt-[-7px]"
                        alt="Icon"
                    />
                    <span className="text-gray-400 text-xs pl-1 font-bold">({studyRoomName.length} / 15)</span>
                </div>

                <div className="relative">
                    <input
                        id="studyRoomName"
                        type="text"
                        maxLength={15}
                        value={studyRoomName}
                        onChange={handleStudyRoomNameChange}
                        placeholder="스터디룸 이름을 입력해주세요."
                        className="input peer input-alt w-full border-none bg-transparent focus:outline-none focus:ring-0 pl-2 bg-white"
                    />
                </div>
                {studyRoomNameError && (
                    <p
                        className={`text-xs italic mt-1 ${studyRoomNameError === '통과' ? 'text-blue-500' : 'text-red-500'}`}
                    >
                        {studyRoomNameError}
                    </p>
                )}
            </div>

            {/* 최대 인원 설정 */}
            <div className="mt-5 mb-5">
                <div className="flex items-center space-x-2">
                    <label className="block text-gray-700 text-m font-bold mb-3">최대 인원 설정</label>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/images/blueberry-icon.png`}
                        className="w-[25px] h-[25px] mt-[-7px] mb-3"
                        alt="Icon"
                    />
                </div>
                <div className="flex space-x-3">
                    {[2, 3, 4, 5].map((num) => (
                        <button
                            key={num}
                            onClick={() => handleMaxUsersClick(num)}
                            className={`flex items-center space-x-2 px-7 py-2 rounded-full shadow-md hover:bg-[#6D81D5] hover:text-white transition duration-300 ${maxUsers === num ? 'bg-[#6D81D5] text-white' : 'bg-[#E0E7FF] text-[#4659AA]'}`}
                        >
                            {num}명
                        </button>
                    ))}
                </div>
                {maxUsersError && (
                    <p
                        className={`text-xs italic mt-1 ${maxUsersError === '통과' ? 'text-blue-500' : 'text-red-500'}`}
                    >
                        {maxUsersError}
                    </p>
                )}
            </div>

            {/* 카테고리 선택 */}
            <div className="mb-5">
                <label className="block text-gray-700 text-m font-bold mb-2">카테고리</label>
                <div className="flex space-x-3">
                    {['캠켜공', '캠끄공'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryClick(cat)}
                            className={`flex items-center space-x-2 px-8 py-2 rounded-full shadow-md hover:bg-[#6D81D5] hover:text-white transition duration-300 ${category === cat ? 'bg-[#6D81D5] text-white' : 'bg-[#E0E7FF] text-[#4659AA]'}`}
                        >
                            <img
                                src={`${process.env.PUBLIC_URL}/assets/images/${cat === '캠켜공' ? 'cam-on-icon.png' : 'cam-off-icon.png'}`}
                                alt={cat}
                                className="w-5 h-5"
                            />
                            <span>{cat}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* 대표 이미지 업로드 */}
            <div className="mb-5 relative">
                <label className="block text-gray-700 text-m font-bold mb-2" htmlFor="thumbnail">
                    대표 이미지
                </label>
                <label htmlFor="thumbnail">
                    {thumbnail ? (
                        <img
                            src={URL.createObjectURL(thumbnail)}
                            alt="thumbnail preview"
                            className="inline-block bg-[#E0E7FF] text-[#4659AA] w-32 h-32 object-cover rounded-full shadow-md cursor-pointer hover:bg-[#6D81D5] hover:text-white transition duration-300"
                        />
                    ) : (
                        <Lottie
                            loop
                            animationData={addPhotoAnimation}
                            play
                            className="inline-block w-32 h-32 rounded-full shadow-md cursor-pointer hover:bg-[#E0E7FF] hover:text-white transition duration-300"
                        />
                    )}
                </label>
                <input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="hidden"
                />
                {thumbnailError && (
                    <p
                        className={`text-xs italic mt-1 ${thumbnailError === '통과' ? 'text-blue-500' : 'text-red-500'}`}
                    >
                        {thumbnailError}
                    </p>
                )}
            </div>

            {/* 암호 설정 */}
            <div className="mb-4 relative">
                <label className="block text-gray-700 text-m font-bold mb-2" htmlFor="password">
                    암호 설정 <span className="text-gray-400 text-xs pl-1">({password.length} / 20)</span>
                </label>
                <input
                    id="password"
                    type="text"
                    maxLength={20}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="스터디룸 암호를 입력해주세요."
                    className="input peer input-alt w-full border-none bg-white focus:outline-none focus:ring-0 pl-2"
                />
                {passwordError && (
                    <p
                        className={`text-xs italic mt-1 ${passwordError === '통과' ? 'text-blue-500' : 'text-red-500'}`}
                    >
                        {passwordError}
                    </p>
                )}
            </div>

            {/* 스터디 소개 */}
            <div className="mb-4 relative">
                <label className="block text-gray-700 text-m font-bold mb-2" htmlFor="description">
                    스터디 소개 <span className="text-gray-400 text-xs pl-1">({description.length} / 100)</span>
                </label>
                <textarea
                    id="description"
                    maxLength={100}
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="스터디룸을 소개해주세요."
                    rows={5}
                    className="input peer input-alt h-full w-full border-none bg-white focus:outline-none focus:ring-0 resize-none text-black pl-2 pt-3"
                />
            </div>

            {/* 스터디룸 생성 버튼 */}
            <div className="flex justify-center mt-10 mb-10 w-full">
                <button
                    onClick={handleShowToast}
                    disabled={!isFormValid}
                    className={`w-[30%] flex justify-center items-center space-x-2 px-4 py-2 rounded-full shadow-md text-center transition duration-300 ${isFormValid ? 'bg-[#6D81D5] text-white hover:bg-[#4659AA]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                    스터디룸 생성
                </button>
                {showToast && (
                    <ToastNotification message="생성 완료!" onClose={handleCloseToast} />
                )}
            </div>
        </div>
    );
};

export default StudyRoomForm;
