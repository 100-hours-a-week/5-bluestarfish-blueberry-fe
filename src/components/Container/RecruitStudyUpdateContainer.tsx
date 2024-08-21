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
    const [activeTab, setActiveTab] = useState<number>(0);
    const studyId = id ? parseInt(id, 10) : null;
    const study = studyRecruitData.find((item) => item.id === studyId);
    const studyRoom = studyRooms.find((item) => item.id === 1) || null;

    const categories = [
        { name: "캠켜공", icon: "cam-on-icon.png" },
        { name: "캠끄공", icon: "cam-off-icon.png" },
    ];

    useEffect(() => {
        // 해당 id의 게시글 데이터를 가져옴
        const postData = studyRecruitData.find((post) => post.id === Number(id));
        
        if (postData) {
            console.log("게시글 데이터:", postData);
            
            // 게시글 데이터로 폼의 기본값 설정
            setSelectedCategory(postData.type);
            setTitle(postData.title);
            setContent(postData.content);
            setSelectedStudy(postData.roomId);
      
            // type에 따라 activeTab 설정
            if (postData.type === "FINDING_MEMBERS") {
              setActiveTab(0); // 스터디 룸 멤버 찾기
            } else if (postData.type === "FINDING_ROOMS") {
              setActiveTab(1); // 스터디 룸 찾기
            }
          } else {
            console.log("해당 ID에 해당하는 게시글이 없습니다.");
          }
        }, [id]);

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
                                            camEnabled={room.camEnabled}
                                            currentUsers={room.users.length}
                                            maxUsers={room.maxUsers}
                                            thumbnail={room.thumbnail}
                                            isSelected={selectedStudy === room.id}
                                        />
                                    </div>
                                ))}
                            </div>
                            <p
                                className={`text-${selectedStudy !== null ? "blue" : "red"
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

                <SubmitButton isFormValid={isFormValid} handleClick={handleShowToast} text="수정 완료" />
                {showToast && (
                    <ToastNotification message="수정 완료!" onClose={handleCloseToast} />
                )}
            </div>
        </div>
    );
};

export default RecruitStudyUpdateContainer;
