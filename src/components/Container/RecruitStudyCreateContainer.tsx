import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../global.css';
import StudyroomTN from '../../components/StudyroomTN';
import studyRooms from "../../data/studyRooms";
import StudyForm from '../../components/RecruitStudyForm';
import { validateStudyFormInputs } from '../../utils/validation';
import ToastNotification from '../ToastNotification';

const RecruitStudyCreateContainer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedStudy, setSelectedStudy] = useState<number | null>(null);
  const [categoryHelperText, setCategoryHelperText] = useState<string>('* 헬퍼텍스트');
  const [titleHelperText, setTitleHelperText] = useState<string>('* 헬퍼텍스트');
  const [contentHelperText, setContentHelperText] = useState<string>('* 헬퍼텍스트');
  const [studyHelperText, setStudyHelperText] = useState<string>('* 헬퍼텍스트');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();  // 페이지 이동을 위한 useNavigate 훅

  const categories = [
    { name: '캠켜공', icon: 'cam-on-icon.png' },
    { name: '캠끄공', icon: 'cam-off-icon.png' },
  ];

  useEffect(() => {
    // 유효성 검사 함수 호출
    const { categoryHelperText, titleHelperText, contentHelperText, studyHelperText } = validateStudyFormInputs(
      selectedCategory, title, content, selectedStudy
    );

    setCategoryHelperText(categoryHelperText);
    setTitleHelperText(titleHelperText);
    setContentHelperText(contentHelperText);
    setStudyHelperText(studyHelperText);

    // 폼 전체의 유효성 상태를 업데이트
    setIsFormValid(
      categoryHelperText === '* 통과' &&
      titleHelperText === '* 통과' &&
      contentHelperText === '* 통과' &&
      studyHelperText === '* 통과'
    );
  }, [selectedCategory, title, content, selectedStudy]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(selectedCategory === category ? '' : category);
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
      console.log('Form submitted:', { selectedCategory, title, content, selectedStudy });
    } else {
      alert('모든 필드를 채워주세요.');
    }
  };

  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
    navigate('/recruit/list');  // 토스트가 닫힐 때 페이지 이동
  };

  return (
    <div className="container mx-auto flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-8">✍🏻 게시글 작성 ✍🏻</h1>
      <div className="w-full max-w-3xl">
        <StudyForm
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
          <p className={`text-${selectedStudy !== null ? 'blue' : 'red'}-500 text-xs italic mt-3`}>
            {studyHelperText}
          </p>
        </div>

        <div className="flex justify-center mt-10 mb-20">
          <button
            onClick={handleShowToast}
            disabled={!isFormValid}
            className={`w-[50%] py-2 rounded-full transition duration-200 ${isFormValid ? 'bg-[#E0E7FF] text-[#4659AA] hover:bg-[#6D81D5] hover:text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            게시글 등록
          </button>
          {showToast && (
            <ToastNotification message="등록 완료!" onClose={handleCloseToast} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruitStudyCreateContainer;
