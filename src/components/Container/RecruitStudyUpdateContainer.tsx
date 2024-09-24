import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../global.css";
import StudyroomTN from "../rooms/StudyroomTN";
import RecruitStudyForm from "../posts/RecruitStudyForm";
import { validateStudyFormInputs } from "../../utils/validation";
import TabBar from "../posts/TabBar";
import ToastNotification from "../common/ToastNotification";
import SubmitButton from "../common/SubmitButton";
import axiosInstance from "../../utils/axiosInstance";
import DefaultThumbnail from "../../images/study-thumbnail-3.png";
import { useLoginedUserStore } from "../../store/store";

const RecruitStudyUpdateContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URL에서 게시글 ID를 가져옴
  const navigate = useNavigate();

  // 탭 0 관련 상태 관리 (스터디 멤버 찾기)
  const [tab0SelectedCategory, setTab0SelectedCategory] = useState<string>("");
  const [tab0Title, setTab0Title] = useState("");
  const [tab0Content, setTab0Content] = useState("");
  const [tab0SelectedStudy, setTab0SelectedStudy] = useState<any | null>(null); // 스터디룸 객체로 저장

  // 탭 1 관련 상태 관리 (스터디 룸 찾기)
  const [tab1SelectedCategory, setTab1SelectedCategory] = useState<string>("");
  const [tab1Title, setTab1Title] = useState("");
  const [tab1Content, setTab1Content] = useState("");

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
  const [activeTab, setActiveTab] = useState<number>(0); // 현재 활성화된 탭
  const { userId } = useLoginedUserStore();

  // 카테고리 데이터
  const categories = [
    { name: "캠켜공", icon: "cam-on-icon.png" },
    { name: "캠끄공", icon: "cam-off-icon.png" },
  ];

  // 게시글 데이터를 API로부터 가져와 초기화
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/v1/posts/${id}`
        );
        const postData = response.data.data;

        // postData.roomResponse 데이터를 사용하여 스터디룸을 저장
        if (postData.type === "FINDING_MEMBERS") {
          setActiveTab(0);
          setTab0Title(postData.title);
          setTab0Content(postData.content);
          setTab0SelectedStudy(postData.roomResponse); // 스터디룸 객체 저장
          setTab0SelectedCategory(
            postData.roomResponse.postCamEnabled ? "캠켜공" : "캠끄공"
          );
        } else if (postData.type === "FINDING_ROOMS") {
          setActiveTab(1);
          setTab1Title(postData.title);
          setTab1Content(postData.content);
          setTab1SelectedCategory(
            postData.roomResponse.postCamEnabled ? "캠켜공" : "캠끄공"
          );
        }
      } catch (error) {
        console.error("게시글을 불러오지 못했습니다:", error);
        alert("게시글을 불러오지 못했습니다.");
        navigate("/recruit/list");
      }
    };

    fetchPostData();
  }, [id, navigate]);

  // 폼 유효성 검사
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
      activeTab === 0 ? tab0SelectedStudy?.id : null // 선택된 스터디룸의 ID만 검증
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
  }, [
    tab0SelectedCategory,
    tab0Title,
    tab0Content,
    tab0SelectedStudy,
    tab1SelectedCategory,
    tab1Title,
    tab1Content,
    activeTab,
  ]);

  // 제출 버튼을 클릭했을 때 실행되는 함수
  const handleSubmit = async () => {
    if (isFormValid) {
      const requestBody = {
        userId: userId,
        roomId: activeTab === 0 ? tab0SelectedStudy?.id : null, // 스터디룸 ID 전송
        title: activeTab === 0 ? tab0Title : tab1Title,
        content: activeTab === 0 ? tab0Content : tab1Content,
        type: activeTab === 0 ? "FINDING_MEMBERS" : "FINDING_ROOMS",
        isRecruited: true,
        postCamEnabled:
          activeTab === 0
            ? tab0SelectedCategory === "캠켜공"
            : tab1SelectedCategory === "캠켜공",
      };

      try {
        const response = await axiosInstance.patch(
          `${process.env.REACT_APP_API_URL}/api/v1/posts/${id}`,
          requestBody
        );
        if (response.status === 204 || response.status === 200) {
          handleShowToast();
        } else {
          console.error(
            "게시글 수정 실패: 예상치 못한 응답 상태",
            response.status
          );
        }
      } catch (error) {
        console.error("게시글 수정 실패:", error);
        alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } else {
      alert("모든 필드를 채워주세요.");
    }
  };

  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
    navigate(`/recruit/${id}`); // 수정된 게시글 상세 페이지로 이동
  };

  const tabData = [
    {
      name: "스터디 룸 멤버 찾기",
      icon: `${process.env.PUBLIC_URL}/assets/images/member-icon-blue.png`,
    },
    {
      name: "스터디 룸 찾기",
      icon: `${process.env.PUBLIC_URL}/assets/images/room-icon-blue.png`,
    },
  ];

  return (
    <div className="container mx-auto flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-8 text-black">✍🏻 게시글 수정 ✍🏻</h1>
      <div className="w-full max-w-3xl">
        {/* 탭 바 컴포넌트 */}
        <TabBar
          activeIndex={activeTab}
          setActiveIndex={setActiveTab}
          tabs={tabData}
          pageType="post"
        />

        {/* 활성화된 탭에 따라 다른 폼을 렌더링 */}
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
              handleCategorySelect={(category) =>
                setTab0SelectedCategory(category)
              }
              handleTitleChange={(e) => setTab0Title(e.target.value)}
              handleContentChange={(e) => setTab0Content(e.target.value)}
            />

            {/* 선택된 스터디룸만 보여줌 */}
            {tab0SelectedStudy && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  선택된 스터디
                </label>
                <div className="flex space-x-4 pb-4">
                  <StudyroomTN
                    id={tab0SelectedStudy.id}
                    title={tab0SelectedStudy.title}
                    camEnabled={tab0SelectedStudy.camEnabled}
                    currentUsers={tab0SelectedStudy.memberNumber}
                    maxUsers={tab0SelectedStudy.maxUsers}
                    thumbnail={tab0SelectedStudy.thumbnail || DefaultThumbnail}
                    isSelected={false} // 선택된 룸으로 표시
                  />
                </div>
              </div>
            )}
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
            handleCategorySelect={(category) =>
              setTab1SelectedCategory(category)
            }
            handleTitleChange={(e) => setTab1Title(e.target.value)}
            handleContentChange={(e) => setTab1Content(e.target.value)}
          />
        )}

        <SubmitButton
          isFormValid={isFormValid}
          handleClick={handleSubmit}
          text="수정 완료"
        />

        {showToast && (
          <ToastNotification
            message="수정 완료!"
            isSuccess={true}
            onClose={handleCloseToast}
          />
        )}
      </div>
    </div>
  );
};

export default RecruitStudyUpdateContainer;
