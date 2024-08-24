import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../global.css";
import StudyroomTN from "../rooms/StudyroomTN";
import studyRooms from "../../data/studyRooms"; // 더미 데이터로 사용되는 스터디 룸 목록
import studyRecruitData from "../../data/studyRecruitData"; // 더미 데이터로 사용되는 게시글 목록
import RecruitStudyForm from "../posts/RecruitStudyForm"; // 게시글 폼 컴포넌트
import { validateStudyFormInputs } from "../../utils/validation"; // 폼 유효성 검사 함수
import TabBar from "../posts/TabBar"; // 탭 바 컴포넌트
import ToastNotification from "../common/ToastNotification"; // 토스트 알림 컴포넌트
import SubmitButton from "../common/SubmitButton"; // 제출 버튼 컴포넌트
import axiosInstance from "../../utils/axiosInstance"; // Axios 인스턴스

import beDomain from "../../utils/constants"; // 서버 도메인 상수

// 게시글 수정 컨테이너 컴포넌트
const RecruitStudyUpdateContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URL에서 게시글 ID를 가져옴
  const navigate = useNavigate();
  
  // 탭 0 (스터디 룸 멤버 찾기) 관련 상태 관리
  const [tab0SelectedCategory, setTab0SelectedCategory] = useState<string>("");
  const [tab0Title, setTab0Title] = useState("");
  const [tab0Content, setTab0Content] = useState("");
  const [tab0SelectedStudy, setTab0SelectedStudy] = useState<number | null>(null);

  // 탭 1 (스터디 룸 찾기) 관련 상태 관리
  const [tab1SelectedCategory, setTab1SelectedCategory] = useState<string>("");
  const [tab1Title, setTab1Title] = useState("");
  const [tab1Content, setTab1Content] = useState("");

  // 폼 유효성 검사를 위한 상태
  const [categoryHelperText, setCategoryHelperText] = useState<string>("* 헬퍼텍스트");
  const [titleHelperText, setTitleHelperText] = useState<string>("* 헬퍼텍스트");
  const [contentHelperText, setContentHelperText] = useState<string>("* 헬퍼텍스트");                                            
  const [studyHelperText, setStudyHelperText] = useState<string>("* 헬퍼텍스트");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0); // 현재 활성화된 탭 (0: 멤버 찾기, 1: 룸 찾기)

  // 카테고리 데이터
  const categories = [
    { name: "캠켜공", icon: "cam-on-icon.png" },
    { name: "캠끄공", icon: "cam-off-icon.png" },
  ];

  // 컴포넌트가 처음 렌더링될 때, URL에서 받은 id를 이용해 게시글 데이터를 가져와 상태를 초기화
  useEffect(() => {
    const postData = studyRecruitData.find((post) => post.id === Number(id)); // 게시글 데이터 검색

    if (postData) {
      console.log("게시글 데이터:", postData);

      // 게시글의 타입에 따라 탭과 상태를 설정
      if (postData.type === "FINDING_MEMBERS") {
        setActiveTab(0); // 탭 0 활성화
        setTab0Title(postData.title); // 제목 설정
        setTab0Content(postData.content); // 내용 설정
        setTab0SelectedStudy(postData.roomId); // 스터디 룸 ID 설정
        setTab0SelectedCategory(postData.isCamOn ? "캠켜공" : "캠끄공"); // 카메라 설정에 따른 카테고리 설정
      } else if (postData.type === "FINDING_ROOMS") {
        setActiveTab(1); // 탭 1 활성화
        setTab1Title(postData.title); // 제목 설정
        setTab1Content(postData.content); // 내용 설정
        setTab1SelectedCategory(postData.isCamOn ? "캠켜공" : "캠끄공"); // 카메라 설정에 따른 카테고리 설정
      }
    } else {
      console.log("해당 ID에 해당하는 게시글이 없습니다."); // 게시글을 찾지 못했을 때의 처리
    }
  }, [id]); // id가 변경될 때마다 실행

  // 폼 유효성 검사
  useEffect(() => {
    const {
      categoryHelperText,
      titleHelperText,
      contentHelperText,
      studyHelperText,
    } = validateStudyFormInputs(
      activeTab === 0 ? tab0SelectedCategory : tab1SelectedCategory, // 활성화된 탭에 따라 입력된 데이터를 검사
      activeTab === 0 ? tab0Title : tab1Title,
      activeTab === 0 ? tab0Content : tab1Content,
      activeTab === 0 ? tab0SelectedStudy : null
    );

    // 유효성 검사 결과를 상태에 저장
    setCategoryHelperText(categoryHelperText);
    setTitleHelperText(titleHelperText);
    setContentHelperText(contentHelperText);
    setStudyHelperText(studyHelperText);

    // 모든 필드가 통과되었는지 확인하여 폼의 유효성 설정
    setIsFormValid(
      categoryHelperText === "* 통과" &&
      titleHelperText === "* 통과" &&
      contentHelperText === "* 통과" &&
      (activeTab === 0 ? studyHelperText === "* 통과" : true)
    );
  }, [tab0SelectedCategory, tab0Title, tab0Content, tab0SelectedStudy, tab1SelectedCategory, tab1Title, tab1Content, activeTab]);

  // 제출 버튼을 클릭했을 때 실행되는 함수
  const handleSubmit = async () => {
    if (isFormValid) {
      const requestBody = {
        userId: 1,  // 고정된 사용자 ID (실제 애플리케이션에서는 로그인한 사용자 ID를 사용해야 함)
        roomId: activeTab === 0 ? tab0SelectedStudy : null,  // 탭에 따라 선택된 스터디 룸 ID
        title: activeTab === 0 ? tab0Title : tab1Title, // 제목
        content: activeTab === 0 ? tab0Content : tab1Content, // 내용
        postType: activeTab === 0 ? "FINDING_MEMBERS" : "FINDING_ROOMS", // 게시글 타입
        isRecruited: false, // 모집 상태 (여기서는 기본값 false)
      };

      try {
        const response = await axiosInstance.patch(`${beDomain}/api/v1/posts`, requestBody); // 게시글 수정 요청

        if (response.status === 204) {
          console.log("게시글 수정 성공:", response.data);
          handleShowToast(); // 성공 시 토스트 알림 표시
        }
      } catch (error) {
        console.error("게시글 수정 실패:", error);
        alert("서버 오류가 발생했습니다. 다시 시도해주세요."); // 실패 시 경고 메시지 표시
      }
    } else {
      alert("모든 필드를 채워주세요."); // 폼이 유효하지 않으면 경고 메시지 표시
    }
  };

  // 토스트 알림 표시
  const handleShowToast = () => {
    setShowToast(true);
  };

  // 토스트 알림 닫기 및 페이지 이동
  const handleCloseToast = () => {
    setShowToast(false);
    navigate(`/recruit/${id}`); // 수정된 게시글 상세 페이지로 이동
  };

  return (
    <div className="container mx-auto flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-8 text-black">✍🏻 게시글 수정 ✍🏻</h1>
      <div className="w-full max-w-3xl">
        {/* 탭 바 컴포넌트 */}
        <TabBar activeIndex={activeTab} setActiveIndex={setActiveTab} />

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
              handleCategorySelect={(category) => setTab0SelectedCategory(category)}
              handleTitleChange={(e) => setTab0Title(e.target.value)}
              handleContentChange={(e) => setTab0Content(e.target.value)}
            />

            {/* 스터디 룸 선택 */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                나의 스터디
              </label>
              <div className="flex space-x-4 pb-4 overflow-x-auto">
                {/* 스터디 룸 리스트를 보여줌 */}
                {studyRooms.map((room) => (
                  <div
                    key={room.id}
                    className="cursor-pointer"
                    onClick={() => setTab0SelectedStudy(room.id)} // 스터디 룸 선택 시 상태 업데이트
                  >
                    <StudyroomTN
                      id={room.id}
                      title={room.title}
                      camEnabled={room.camEnabled}
                      currentUsers={room.users.length}
                      maxUsers={room.maxUsers}
                      thumbnail={room.thumbnail}
                      isSelected={tab0SelectedStudy === room.id} // 선택된 룸인지 여부에 따라 스타일 변경
                    />
                  </div>
                ))}
              </div>
              {/* 선택된 스터디 룸이 없을 경우 경고 메시지 표시 */}
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

        {/* 수정 완료 버튼 */}
        <SubmitButton isFormValid={isFormValid} handleClick={handleSubmit} text="수정 완료" />
        {/* 토스트 알림 */}
        {showToast && (
          <ToastNotification message="수정 완료!" onClose={handleCloseToast} />
        )}
      </div>
    </div>
  );
};

export default RecruitStudyUpdateContainer;
