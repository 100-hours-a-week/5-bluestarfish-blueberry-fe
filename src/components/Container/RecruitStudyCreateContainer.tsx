import React, { useState } from 'react';
import '../../global.css';
import StudyroomTN from '../../components/StudyroomTN';
import studyRooms from "../../data/studyRooms";
import StudyForm from '../../components/RecruitStudyForm';

const RecruitStudyCreateContainer: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedStudy, setSelectedStudy] = useState<number | null>(null);
  const [helperTextColor, setHelperTextColor] = useState<string>('red-500');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    { name: '캠켜공', icon: 'cam-on-icon.png' },
    { name: '캠끄공', icon: 'cam-off-icon.png' },
  ];

  const handleCategorySelect = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(category);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleStudySelect = (studyId: number) => {
    if (selectedStudy === studyId) {
      setSelectedStudy(null);
    } else {
      setSelectedStudy(studyId);
    }
  };

  const handleSubmit = () => {
    if (selectedCategory && title && content && selectedStudy !== null) {
      setIsSubmitted(true);
      console.log('Form submitted:', { selectedCategory, title, content, selectedStudy });
    } else {
      alert('모든 필드를 채워주세요.');
    }
  };

    return (
        <div className="container mx-auto flex flex-col items-center mt-10">
            <h1 className="text-2xl font-bold mb-8">✍🏻 게시글 작성 ✍🏻</h1>
            <div className="w-full max-w-3xl">
                <StudyForm
                    selectedCategory={selectedCategory}
                    title={title}
                    content={content}
                    helperTextColor={helperTextColor}
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
                    <p className={`text-${helperTextColor} text-xs italic mt-3`}>* 헬퍼텍스트</p>
                </div>

                <div className="flex justify-center mt-10 mb-20">
                    <button
                        onClick={handleSubmit}
                        className="w-[50%] bg-[#E0E7FF] text-[#4659AA] py-2 rounded-full hover:bg-[#6D81D5] hover:text-white transition duration-200"
                    >
                        게시글 등록
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecruitStudyCreateContainer;
