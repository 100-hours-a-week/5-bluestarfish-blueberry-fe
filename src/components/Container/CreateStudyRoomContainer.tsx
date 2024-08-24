import React, { useState } from "react";
import StudyRoomForm from "../posts/StudyRoomForm";
import {
  validateStudyRoomName,
  validateMaxUsers,
  validateThumbnail,
  validatePassword,
} from "../../utils/validation";

const CreateStudyRoomContainer: React.FC = () => {
  const [studyRoomName, setStudyRoomName] = useState("");
  const [maxUsers, setMaxUsers] = useState<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);
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
    setStudyRoomName(name);
    setStudyRoomNameError(validateStudyRoomName(name));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setThumbnail(file);
    setThumbnailError(validateThumbnail(file));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pw = e.target.value;
    setPassword(pw);
    setPasswordError(validatePassword(pw));
  };

  const validateForm = () => {
    const isStudyRoomNameValid = validateStudyRoomName(studyRoomName);
    const isMaxUsersValid = validateMaxUsers(maxUsers);
    const isThumbnailValid = validateThumbnail(thumbnail);
    const isPasswordValid = validatePassword(password);

    setStudyRoomNameError(isStudyRoomNameValid);
    setMaxUsersError(isMaxUsersValid);
    setThumbnailError(isThumbnailValid);
    setPasswordError(isPasswordValid);

    return (
      isStudyRoomNameValid === "통과" &&
      isMaxUsersValid === "통과" &&
      (thumbnailError === "* 선택 사항" || thumbnailError === "통과") &&
      (passwordError === "* 선택 사항" || passwordError === "통과")
    );
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("스터디룸 생성 성공");
    }
  };

  const handleMaxUsersClick = (selectedMaxUsers: number) => {
    if (maxUsers === selectedMaxUsers) {
      setMaxUsers(null);
      setMaxUsersError("최대 인원을 선택해주세요.");
    } else {
      setMaxUsers(selectedMaxUsers);
      setMaxUsersError("통과");
    }
  };

  const handleCategoryClick = (selectedCategory: string) => {
    if (category === selectedCategory) {
      setCategory(null);
    } else {
      setCategory(selectedCategory);
    }
  };

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
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateStudyRoomContainer;
