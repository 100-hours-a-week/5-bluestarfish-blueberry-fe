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
import DefaultThumbnail from "../../images/study-thumbnail-3.png"

const RecruitStudyUpdateContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URL에서 게시글 ID를 가져옴
  const navigate = useNavigate();

  // 탭 0 관련 상태 관리 (스터디 멤버 찾기)
  const [tab0SelectedCategory, setTab0SelectedCategory] = useState<string>("");
  const [tab0Title, setTab0Title] = useState("");
  const [tab0Content, setTab0Content] = useState("");
  const [tab0SelectedStudy, setTab0SelectedStudy] = useState<number | null>(
    null
  );

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

  // 카테고리 데이터
  const categories = [
    { name: "캠켜공", icon: "cam-on-icon.png" },
    { name: "캠끄공", icon: "cam-off-icon.png" },
  ];

  // 스터디룸 상태 추가 (API로부터 데이터를 가져오기 위해 상태 초기화)
  const [studyRooms, setStudyRooms] = useState<any[]>([]);

  // 게시글 데이터를 API로부터 가져와 초기화
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/v1/posts/${id}`
        );
        const postData = response.data.data;

        if (postData.type === "FINDING_MEMBERS") {
          setActiveTab(0);
          setTab0Title(postData.title);
          setTab0Content(postData.content);
          setTab0SelectedStudy(postData.room?.id || null);
          setTab0SelectedCategory(postData.isCamOn ? "캠켜공" : "캠끄공");
        } else if (postData.type === "FINDING_ROOMS") {
          setActiveTab(1);
          setTab1Title(postData.title);
          setTab1Content(postData.content);
          setTab1SelectedCategory(postData.isCamOn ? "캠켜공" : "캠끄공");
        }
      } catch (error) {
        console.error("게시글을 불러오지 못했습니다:", error);
        alert("게시글을 불러오지 못했습니다.");
        navigate("/recruit/list");
      }
    };

    const fetchStudyRooms = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/v1/rooms`
        );
        setStudyRooms(response.data.data.content);
      } catch (error) {
        console.error("스터디룸 데이터를 불러오지 못했습니다:", error);
      }
    };

    fetchPostData();
    fetchStudyRooms();
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
        userId: 1, // 실제로는 로그인한 사용자의 ID를 사용
        roomId: activeTab === 0 ? tab0SelectedStudy : null, // 변경된 스터디룸 ID를 전송
        title: activeTab === 0 ? tab0Title : tab1Title,
        content: activeTab === 0 ? tab0Content : tab1Content,
        type: activeTab === 0 ? "FINDING_MEMBERS" : "FINDING_ROOMS",
        isRecruited: true, // 현재 isRecruited 값을 그대로 넘겨줌
      };
  
      try {
        console.log("전송할 데이터:", requestBody); // 서버로 전송되는 데이터 확인
  
        const response = await axiosInstance.patch(
          `${process.env.REACT_APP_API_URL}/api/v1/posts/${id}`,
          requestBody
        );
  
        console.log("Response status:", response.status); // 서버에서 반환된 응답 상태 출력
  
        // 응답 상태가 200 (성공) 또는 204 (No Content)일 때 처리
        if (response.status === 204 || response.status === 200) {
          console.log("게시글 수정 성공");
          handleShowToast(); // 성공 시 토스트 알림 표시
        } else {
          console.error("게시글 수정 실패: 예상치 못한 응답 상태", response.status);
        }
      } catch (error) {
        console.error("게시글 수정 실패:", error);
        alert("서버 오류가 발생했습니다. 다시 시도해주세요."); // 실패 시 경고 메시지 표시
      }
    } else {
      alert("모든 필드를 채워주세요."); // 폼이 유효하지 않으면 경고 메시지 표시
    }
  };
  
  
  

  const handleShowToast = () => {
    console.log("토스트 알림 표시"); // 토스트 표시 여부 확인
    setShowToast(true);
  };

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
              handleCategorySelect={(category) =>
                setTab0SelectedCategory(category)
              }
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
                      currentUsers={room.memberNumber}
                      maxUsers={room.maxUsers}
                      thumbnail={room.thumbnail || DefaultThumbnail}
                      isSelected={tab0SelectedStudy === room.id} // 선택된 룸인지 여부에 따라 스타일 변경
                    />
                  </div>
                ))}
              </div>
              <p
                className={`text-${tab0SelectedStudy !== null ? "blue" : "red"
                  }-500 text-xs italic mt-3`}
              >
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
          <ToastNotification message="수정 완료!" onClose={handleCloseToast} />
        )}
      </div>
    </div>
  );
}

export default RecruitStudyUpdateContainer;