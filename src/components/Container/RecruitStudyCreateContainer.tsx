import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../global.css";
import StudyroomTN from "../rooms/StudyroomTN";
import studyRooms from "../../data/studyRooms";
import RecruitStudyForm from "../posts/RecruitStudyForm";
import { validateStudyFormInputs } from "../../utils/validation";
import TabBar from "../posts/TabBar";
import ToastNotification from "../common/ToastNotification";
import SubmitButton from "../common/SubmitButton"; // SubmitButton 컴포넌트 가져오기

const RecruitStudyCreateContainer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedStudy, setSelectedStudy] = useState<number | null>(null);
  const [categoryHelperText, setCategoryHelperText] =
    useState<string>("* 헬퍼텍스트");
  const [titleHelperText, setTitleHelperText] =
    useState<string>("* 헬퍼텍스트");
  const [contentHelperText, setContentHelperText] =
    useState<string>("* 헬퍼텍스트");
  const [studyHelperText, setStudyHelperText] =
    useState<string>("* 헬퍼텍스트");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0); // 현재 활성화된 탭의 인덱스 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

  const categories = [
    { name: "캠켜공", icon: "cam-on-icon.png" },
    { name: "캠끄공", icon: "cam-off-icon.png" },
  ];

  useEffect(() => {
    // 유효성 검사 함수 호출
    const {
      categoryHelperText,
      titleHelperText,
      contentHelperText,
      studyHelperText,
    } = validateStudyFormInputs(
      selectedCategory,
      title,
      content,
      selectedStudy
    );

    setCategoryHelperText(categoryHelperText);
    setTitleHelperText(titleHelperText);
    setContentHelperText(contentHelperText);
    setStudyHelperText(studyHelperText);

    // 스터디 룸 멤버 찾기(탭 0)와 스터디 룸 찾기(탭 1)에 따른 유효성 검사를 구분
    if (activeTab === 0) {
      setIsFormValid(
        categoryHelperText === "* 통과" &&
          titleHelperText === "* 통과" &&
          contentHelperText === "* 통과" &&
          studyHelperText === "* 통과"
      );
    } else if (activeTab === 1) {
      setIsFormValid(
        categoryHelperText === "* 통과" &&
          titleHelperText === "* 통과" &&
          contentHelperText === "* 통과"
      );
    }
  }, [selectedCategory, title, content, selectedStudy, activeTab]);

  useEffect(() => {
    // 탭이 변경될 때마다 입력값 초기화
    setSelectedCategory("");
    setTitle("");
    setContent("");
    setSelectedStudy(null);
    setCategoryHelperText("* 헬퍼텍스트");
    setTitleHelperText("* 헬퍼텍스트");
    setContentHelperText("* 헬퍼텍스트");
    setStudyHelperText("* 헬퍼텍스트");
    setIsFormValid(false);
  }, [activeTab]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(selectedCategory === category ? "" : category);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleStudySelect = (studyId: number) => {
    setSelectedStudy(selectedStudy === studyId ? null : studyId);
  };

  const handleSubmit = () => {
    if (isFormValid) {
      console.log("Form submitted:", {
        selectedCategory,
        title,
        content,
        selectedStudy,
      });
    } else {
      alert("모든 필드를 채워주세요.");
    }
  };

  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
    navigate("/recruit/list"); // 토스트가 닫힐 때 페이지 이동
  };

  return (
    <div className="container mx-auto flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-8 text-black">✍🏻 게시글 작성 ✍🏻</h1>
      <div className="w-full max-w-3xl">
        {/* 상단 탭 바 컴포넌트 */}
        <TabBar activeIndex={activeTab} setActiveIndex={setActiveTab} />

        {activeTab === 0 ? (
          <>
            <RecruitStudyForm
              selectedCategory={selectedCategory}
              title={title}
              content={content}
              categoryHelperText={categoryHelperText}
              titleHelperText={titleHelperText}
              contentHelperText={contentHelperText}
              categories={categories}
              handleCategorySelect={handleCategorySelect}
              handleTitleChange={handleTitleChange}
              handleContentChange={handleContentChange}
            />

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                나의 스터디
              </label>
              <div className="flex space-x-4 pb-4 overflow-x-auto">
                {studyRooms.map((room) => (
                  <div
                    key={room.id}
                    className="cursor-pointer"
                    onClick={() => handleStudySelect(room.id)}
                  >
                    <StudyroomTN
                      title={room.title}
                      cam_enabled={room.cam_enabled}
                      currentUsers={room.users.length}
                      maxUsers={room.maxUsers}
                      thumbnail={room.thumbnail}
                      isSelected={selectedStudy === room.id}
                    />
                  </div>
                ))}
              </div>
              <p
                className={`text-${
                  selectedStudy !== null ? "blue" : "red"
                }-500 text-xs italic mt-3`}
              >
                {studyHelperText}
              </p>
            </div>
          </>
        ) : (
          <RecruitStudyForm
            selectedCategory={selectedCategory}
            title={title}
            content={content}
            categoryHelperText={categoryHelperText}
            titleHelperText={titleHelperText}
            contentHelperText={contentHelperText}
            categories={categories}
            handleCategorySelect={handleCategorySelect}
            handleTitleChange={handleTitleChange}
            handleContentChange={handleContentChange}
          />
        )}

        {/* SubmitButton 컴포넌트 사용 */}
        <SubmitButton isFormValid={isFormValid} handleClick={handleShowToast} />
        {showToast && (
          <ToastNotification message="등록 완료!" onClose={handleCloseToast} />
        )}
      </div>
    </div>
  );
};

export default RecruitStudyCreateContainer;
