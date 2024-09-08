import React, { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie-player";
import ToastNotification from "../common/ToastNotification";
import addPhotoAnimation from "../../animations/add-photo.json";
import SubmitButton from "../common/SubmitButton";
import axiosInstance from "../../utils/axiosInstance";
import { useLoginedUserStore } from "../../store/store";

type StudyRoomFormProps = {
  studyRoomName: string;
  maxUsers: number | null;
  category: string | null;
  thumbnail: File | null;
  password: string;
  description: string;
  studyRoomNameError: string;
  maxUsersError: string;
  categoryError: string;
  thumbnailError: string;
  passwordError: string;
  handleStudyRoomNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMaxUsersClick: (selectedMaxUsers: number) => void;
  handleCategoryClick: (selectedCategory: string) => void;
  handleThumbnailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
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
  categoryError,
  thumbnailError,
  passwordError,
  handleStudyRoomNameChange,
  handleMaxUsersClick,
  handleCategoryClick,
  handleThumbnailChange,
  handlePasswordChange,
  handleDescriptionChange,
}) => {
  const { userId } = useLoginedUserStore();
  const isFormValid =
    studyRoomNameError === "통과" &&
    maxUsersError === "통과" &&
    categoryError === "통과" &&
    (thumbnailError === "* 선택 사항" || thumbnailError === "통과") &&
    (passwordError === "* 선택 사항" || passwordError === "통과");

  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCamEnabled, setIsCamEnabled] = useState<boolean>(true);

  useEffect(() => {
    setIsCamEnabled(category !== "캠끄공");
  }, [category]);

  // 토스트 닫기 핸들러를 `useEffect`를 사용하여 안전하게 호출
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
        navigate("/"); // 토스트가 닫힐 때 안전하게 상태 업데이트
      }, 3000); // 3초 후에 토스트를 닫고 페이지 이동

      return () => clearTimeout(timer); // 타이머 클린업
    }
  }, [showToast, navigate]);

  // 스터디룸 생성 요청 함수
  const createStudyRooms = async (): Promise<void> => {
    if (isLoading || !userId) return;
    const trimmedTitle = studyRoomName.trim();
    try {
      setIsLoading(true);

      // FormData 객체 생성
      const formData = new FormData();

      // 일반 데이터 추가
      formData.append("userId", userId.toString()); // 숫자를 문자열로 변환
      formData.append("title", trimmedTitle);
      formData.append("maxUsers", String(maxUsers)); // 숫자는 문자열로 변환하여 전송
      formData.append("camEnabled", String(isCamEnabled)); // Boolean 값도 문자열로 변환
      formData.append("password", password || ""); // 비밀번호 없을 경우 빈 문자열
      formData.append("description", description || ""); // 설명 없을 경우 빈 문자열

      // 파일 추가 (null일 경우 제외)
      if (thumbnail) {
        formData.append("thumbnail", thumbnail); // 파일이 있는 경우에만 추가
      }

      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/api/v1/rooms`,
        formData, // FormData 객체 전송
        {
          headers: {
            "Content-Type": "multipart/form-data", // FormData 전송을 위한 Content-Type 설정
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log("스터디룸 생성 성공");
        setShowToast(true); // 생성 성공 후 토스트 메시지 표시
      } else {
        console.log(`${response.status}: 스터디룸 생성 실패`);
      }
    } catch (error) {
      console.error("스터디룸 생성 중 오류:", error);
    } finally {
      setIsLoading(false); // 로딩 상태 해제
    }
  };

  const handleCloseToast = () => {
    setShowToast(false);
    navigate("/");
  };

  const handleSubmitClick = async (): Promise<void> => {
    await createStudyRooms(); // 비동기 함수 호출
  };

  return (
    <form
      className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmitClick();
      }}
    >
      {/* 스터디룸 이름 입력 필드 */}
      <div className="mb-4 relative px-5">
        <div className="flex items-center space-x-2 mb-2">
          <label
            className="block text-gray-700 text-sm sm:text-base md:text-lg font-bold"
            htmlFor="studyRoomName"
          >
            스터디룸 이름
          </label>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/blueberry-icon.png`}
            className="w-[25px] h-[25px] mt-[-7px]"
            alt="Icon"
          />
          <span className="text-gray-400 text-xs pl-1 font-bold">
            ({Math.min(studyRoomName.length, 15)} / 15)
          </span>
        </div>

        <input
          id="studyRoomName"
          type="text"
          maxLength={15}
          value={studyRoomName}
          onChange={handleStudyRoomNameChange}
          placeholder="스터디룸 이름을 입력해주세요."
          className="input peer input-alt w-full border-none bg-transparent focus:outline-none focus:ring-0 pl-2 bg-white"
        />

        {studyRoomNameError && (
          <p
            className={`text-xs italic mt-1 ${
              studyRoomNameError === "통과" ? "text-blue-500" : "text-red-500"
            }`}
          >
            {studyRoomNameError}
          </p>
        )}
      </div>

      {/* 최대 인원 설정 */}
      <div className="mt-5 mb-5 relative px-5">
        <div className="flex items-center space-x-2 mb-2">
          <label className="block text-gray-700 text-sm sm:text-base md:text-lg font-bold">
            최대 인원 설정
          </label>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/blueberry-icon.png`}
            className="w-[25px] h-[25px] mt-[-7px]"
            alt="Icon"
          />
        </div>
        <div className="flex space-x-3">
          {[2, 3, 4, 5].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleMaxUsersClick(num)}
              className={`flex items-center space-x-2 px-7 py-2 rounded-full shadow-md hover:bg-[#6D81D5] hover:text-white transition duration-300 ${
                maxUsers === num
                  ? "bg-[#6D81D5] text-white"
                  : "bg-[#E0E7FF] text-[#4659AA]"
              }`}
            >
              {num}명
            </button>
          ))}
        </div>
        {maxUsersError && (
          <p
            className={`text-xs italic mt-1 ${
              maxUsersError === "통과" ? "text-blue-500" : "text-red-500"
            }`}
          >
            {maxUsersError}
          </p>
        )}
      </div>

      {/* 카테고리 선택 */}
      <div className="mb-5 relative px-5">
        <label className="block text-gray-700 text-sm sm:text-base md:text-lg font-bold mb-2">
          카테고리
        </label>
        <div className="flex space-x-3">
          {["캠켜공", "캠끄공"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              type="button"
              className={`flex items-center space-x-2 px-8 py-2 rounded-full shadow-md hover:bg-[#6D81D5] hover:text-white transition duration-300 ${
                category === cat
                  ? "bg-[#6D81D5] text-white"
                  : "bg-[#E0E7FF] text-[#4659AA]"
              }`}
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/${
                  cat === "캠켜공" ? "cam-on-icon.png" : "cam-off-icon.png"
                }`}
                alt={cat}
                className="w-5 h-5"
              />
              <span>{cat}</span>
            </button>
          ))}
        </div>
        {categoryError && (
          <p
            className={`text-xs italic mt-1 ${
              categoryError === "통과" ? "text-blue-500" : "text-red-500"
            }`}
          >
            {categoryError}
          </p>
        )}
      </div>

      {/* 대표 이미지 업로드 */}
      <div className="mb-5 relative px-5">
        <label
          className="block text-gray-700 text-sm sm:text-base md:text-lg font-bold mb-2"
          htmlFor="thumbnail"
        >
          대표 이미지
        </label>
        <label htmlFor="thumbnail">
          {thumbnail && thumbnailError === "통과" ? (
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
            className={`text-xs italic mt-1 ${
              thumbnailError === "통과" ? "text-blue-500" : "text-red-500"
            }`}
          >
            {thumbnailError}
          </p>
        )}
      </div>

      {/* 암호 설정 */}
      <div className="mb-4 relative px-5">
        <label
          className="block text-gray-700 text-sm sm:text-base md:text-lg font-bold mb-2"
          htmlFor="password"
        >
          암호 설정{" "}
          <span className="text-gray-400 text-xs pl-1">
            ({Math.min(password.length, 20)} / 20)
          </span>
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
            className={`text-xs italic mt-1 ${
              passwordError === "통과" ? "text-blue-500" : "text-red-500"
            }`}
          >
            {passwordError}
          </p>
        )}
      </div>

      {/* 스터디 소개 */}
      <div className="mb-4 relative px-5">
        <label
          className="block text-gray-700 text-sm sm:text-base md:text-lg font-bold mb-2"
          htmlFor="description"
        >
          스터디 소개
          <span className="text-gray-400 text-xs pl-1">
            ({Math.min(description.length, 100)} / 100)
          </span>
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
        <SubmitButton
          isFormValid={isFormValid}
          handleClick={handleSubmitClick} // 클릭 시 handleSubmitClick 호출
          text="스터디룸 생성"
        />
        {showToast && (
          <ToastNotification
            message="생성 완료!"
            isSuccess={true}
            onClose={handleCloseToast}
          />
        )}
      </div>
    </form>
  );
};

export default StudyRoomForm;
