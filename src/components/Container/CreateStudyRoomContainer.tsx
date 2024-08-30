import React, { useState } from "react";
import StudyRoomForm from "../posts/StudyRoomForm";
import {

  validateStudyRoomName, // 스터디룸 이름의 유효성을 검사하는 함수
  validateMaxUsers,      // 최대 사용자 수의 유효성을 검사하는 함수
  validateThumbnail,     // 썸네일 이미지의 유효성을 검사하는 함수
  validatePassword       // 비밀번호의 유효성을 검사하는 함수
} from '../../utils/validation';

// 스터디룸 생성 컨테이너 컴포넌트
const CreateStudyRoomContainer: React.FC = () => {
  const [studyRoomName, setStudyRoomName] = useState("");
  const [maxUsers, setMaxUsers] = useState<number | null>(null);
  // 상태 관리: 선택된 카테고리
  const [category, setCategory] = useState<string | null>(null);
  // 상태 관리: 썸네일 이미지 파일
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");

  const [studyRoomNameError, setStudyRoomNameError] = useState("* 헬퍼텍스트");
  const [maxUsersError, setMaxUsersError] = useState("* 헬퍼텍스트");
  const [thumbnailError, setThumbnailError] = useState("* 선택 사항");
  const [passwordError, setPasswordError] = useState("* 선택 사항");

  const handleStudyRoomNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = e.target.value;
    setStudyRoomName(name); // 스터디룸 이름 업데이트
    setStudyRoomNameError(validateStudyRoomName(name)); // 이름 유효성 검사 후 에러 메시지 업데이트
  };

  // 썸네일 이미지 변경 핸들러
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null; // 선택된 파일
    setThumbnail(file); // 썸네일 업데이트
    setThumbnailError(validateThumbnail(file)); // 썸네일 유효성 검사 후 에러 메시지 업데이트
  };

  // 비밀번호 변경 핸들러
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pw = e.target.value;
    setPassword(pw); // 비밀번호 업데이트
    setPasswordError(validatePassword(pw)); // 비밀번호 유효성 검사 후 에러 메시지 업데이트
  };

  // 폼 유효성 검사 함수
  const validateForm = () => {
    const isStudyRoomNameValid = validateStudyRoomName(studyRoomName); // 스터디룸 이름 유효성 검사
    const isMaxUsersValid = validateMaxUsers(maxUsers); // 최대 사용자 수 유효성 검사
    const isThumbnailValid = validateThumbnail(thumbnail); // 썸네일 유효성 검사
    const isPasswordValid = validatePassword(password); // 비밀번호 유효성 검사

    // 유효성 검사 결과에 따라 에러 메시지 업데이트
    setStudyRoomNameError(isStudyRoomNameValid);
    setMaxUsersError(isMaxUsersValid);
    setThumbnailError(isThumbnailValid);
    setPasswordError(isPasswordValid);

    // 모든 필드가 유효한지 확인하여 true/false 반환
    return (
      isStudyRoomNameValid === "통과" &&
      isMaxUsersValid === "통과" &&
      (thumbnailError === "* 선택 사항" || thumbnailError === "통과") &&
      (passwordError === "* 선택 사항" || passwordError === "통과")
    );
  };

  // 폼 제출 핸들러
  const handleSubmit = () => {
    if (validateForm()) {
      console.log("스터디룸 생성 성공");
    }
  };

  // 최대 사용자 수 선택 핸들러
  const handleMaxUsersClick = (selectedMaxUsers: number) => {
    if (maxUsers === selectedMaxUsers) {
      setMaxUsers(null); // 이미 선택된 사용자 수를 다시 클릭하면 선택 해제
      setMaxUsersError('최대 인원을 선택해주세요.');
    } else {
      setMaxUsers(selectedMaxUsers); // 선택된 사용자 수로 업데이트
      setMaxUsersError('통과'); // 에러 메시지 업데이트
    }
  };

  // 카테고리 선택 핸들러
  const handleCategoryClick = (selectedCategory: string) => {
    if (category === selectedCategory) {
      setCategory(null); // 이미 선택된 카테고리를 다시 클릭하면 선택 해제
    } else {
      setCategory(selectedCategory); // 선택된 카테고리로 업데이트
    }
  };

  // 컴포넌트 렌더링
  return (
    <div className="container mx-auto flex flex-col items-center bg-[#EEEEFF] mt-[100px] mb-[30px] w-[60%] pt-[30px] pb-[30px] rounded-lg">
      <h1 className="text-2xl font-bold mt-4 mb-20 text-black">
        📚 스터디룸 만들기 📚
      </h1>
      <StudyRoomForm
        studyRoomName={studyRoomName}
        maxUsers={maxUsers}
        category={category}
        thumbnail={thumbnail}
        password={password}
        description={description}
        studyRoomNameError={studyRoomNameError}
        maxUsersError={maxUsersError}
        thumbnailError={thumbnailError}
        passwordError={passwordError}
        handleStudyRoomNameChange={handleStudyRoomNameChange}
        handleMaxUsersClick={handleMaxUsersClick}
        handleCategoryClick={handleCategoryClick}
        handleThumbnailChange={handleThumbnailChange}
        handlePasswordChange={handlePasswordChange}
        handleDescriptionChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
};

export default CreateStudyRoomContainer;
