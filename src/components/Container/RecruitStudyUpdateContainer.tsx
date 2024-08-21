import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../global.css";
import StudyroomTN from "../rooms/StudyroomTN";
import studyRooms from "../../data/studyRooms";
import studyRecruitData from "../../data/studyRecruitData";
import RecruitStudyForm from "../posts/RecruitStudyForm";
import { validateStudyFormInputs } from "../../utils/validation";
import TabBar from "../posts/TabBar";
import ToastNotification from "../common/ToastNotification";
import SubmitButton from "../common/SubmitButton";

const RecruitStudyUpdateContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URL에서 id를 가져옴
  const navigate = useNavigate();
  
  // 탭 0 (스터디 룸 멤버 찾기) 관련 상태
  const [tab0SelectedCategory, setTab0SelectedCategory] = useState<string>("");
  const [tab0Title, setTab0Title] = useState("");
  const [tab0Content, setTab0Content] = useState("");
  const [tab0SelectedStudy, setTab0SelectedStudy] = useState<number | null>(null);

  // 탭 1 (스터디 룸 찾기) 관련 상태
  const [tab1SelectedCategory, setTab1SelectedCategory] = useState<string>("");
  const [tab1Title, setTab1Title] = useState("");
  const [tab1Content, setTab1Content] = useState("");

  const [categoryHelperText, setCategoryHelperText] = useState<string>("* 헬퍼텍스트");
  const [titleHelperText, setTitleHelperText] = useState<string>("* 헬퍼텍스트");
  const [contentHelperText, setContentHelperText] = useState<string>("* 헬퍼텍스트");
  const [studyHelperText, setStudyHelperText] = useState<string>("* 헬퍼텍스트");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0);

  const categories = [
    { name: "캠켜공", icon: "cam-on-icon.png" },
    { name: "캠끄공", icon: "cam-off-icon.png" },
  ];

  useEffect(() => {
    const postData = studyRecruitData.find((post) => post.id === Number(id));

    if (postData) {
      console.log("게시글 데이터:", postData);

      if (postData.type === "FINDING_MEMBERS") {
        setActiveTab(0);
        setTab0Title(postData.title);
        setTab0Content(postData.content);
        setTab0SelectedStudy(postData.roomId);
        setTab0SelectedCategory(postData.isCamOn ? "캠켜공" : "캠끄공");
      } else if (postData.type === "FINDING_ROOMS") {
        setActiveTab(1);
        setTab1Title(postData.title);
        setTab1Content(postData.content);
        setTab1SelectedCategory(postData.isCamOn ? "캠켜공" : "캠끄공");
      }
    } else {
      console.log("해당 ID에 해당하는 게시글이 없습니다.");
    }
  }, [id]);

  useEffect(() => {
    const {
      categoryHelperText,
      titleHelperText,
      contentHelperText,
      studyHelperText,
    } = validateStudyFormInputs(
      activeTab === 0 ? tab0SelectedCategory : tab1SelectedCategory,
      activeTab === 0 ? tab0Title : tab1Title,
      activeTab === 0 ? tab0Content : tab1Content,
      activeTab === 0 ? tab0SelectedStudy : null
    );

    setCategoryHelperText(categoryHelperText);
    setTitleHelperText(titleHelperText);
    setContentHelperText(contentHelperText);
    setStudyHelperText(studyHelperText);

    setIsFormValid(
      categoryHelperText === "* 통과" &&
      titleHelperText === "* 통과" &&
      contentHelperText === "* 통과" &&
      (activeTab === 0 ? studyHelperText === "* 통과" : true)
    );
  }, [tab0SelectedCategory, tab0Title, tab0Content, tab0SelectedStudy, tab1SelectedCategory, tab1Title, tab1Content, activeTab]);

  const handleSubmit = () => {
    if (isFormValid) {
      console.log("Form submitted:", {
        tab0SelectedCategory,
        tab0Title,
        tab0Content,
        tab0SelectedStudy,
        tab1SelectedCategory,
        tab1Title,
        tab1Content,
      });
      // 제출 로직 추가
    } else {
      alert("모든 필드를 채워주세요.");
    }
  };

  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
    navigate(`/recruit/${id}`)
  };

  return (
    <div className="container mx-auto flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-8 text-black">✍🏻 게시글 수정 ✍🏻</h1>
      <div className="w-full max-w-3xl">
        <TabBar activeIndex={activeTab} setActiveIndex={setActiveTab} />

        {activeTab === 0 ? (
          <>
            <RecruitStudyForm
              selectedCategory={tab0SelectedCategory}
              title={tab0Title}
              content={tab0Content}
              categoryHelperText={categoryHelperText}
              titleHelperText={titleHelperText}
              contentHelperText={contentHelperText}
              categories={categories}
              handleCategorySelect={(category) => setTab0SelectedCategory(category)}
              handleTitleChange={(e) => setTab0Title(e.target.value)}
              handleContentChange={(e) => setTab0Content(e.target.value)}
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
                    onClick={() => setTab0SelectedStudy(room.id)}
                  >
                    <StudyroomTN
                      title={room.title}
                      camEnabled={room.camEnabled}
                      currentUsers={room.users.length}
                      maxUsers={room.maxUsers}
                      thumbnail={room.thumbnail}
                      isSelected={tab0SelectedStudy === room.id}
                    />
                  </div>
                ))}
              </div>
              <p className={`text-${tab0SelectedStudy !== null ? "blue" : "red"}-500 text-xs italic mt-3`}>
                {studyHelperText}
              </p>
            </div>
          </>
        ) : (
          <RecruitStudyForm
            selectedCategory={tab1SelectedCategory}
            title={tab1Title}
            content={tab1Content}
            categoryHelperText={categoryHelperText}
            titleHelperText={titleHelperText}
            contentHelperText={contentHelperText}
            categories={categories}
            handleCategorySelect={(category) => setTab1SelectedCategory(category)}
            handleTitleChange={(e) => setTab1Title(e.target.value)}
            handleContentChange={(e) => setTab1Content(e.target.value)}
          />
        )}

        <SubmitButton isFormValid={isFormValid} handleClick={handleShowToast} text="수정 완료" />
        {showToast && (
          <ToastNotification message="수정 완료!" onClose={handleCloseToast} />
        )}
      </div>
    </div>
  );
};

export default RecruitStudyUpdateContainer;
