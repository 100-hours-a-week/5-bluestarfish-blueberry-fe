import React, { useState } from 'react';
import BasicHeader from '../components/BasicHeader';
import TabBar from '../components/TabBar';
import Footer from '../components/Footer';
import CategorySelector from '../components/CategorySelector';
import StudyroomTN from '../components/StudyroomTN';
import studyRooms from "../data/studyRooms"

const RecruitStudyCreatePage: React.FC = () => {
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
    <div className="flex flex-col min-h-screen">
      <BasicHeader /> {/* 헤더 */}
      <div className="container mx-auto flex flex-col items-center mt-10">
        <h1 className="text-2xl font-bold mb-8">✍🏻 게시글 작성 ✍🏻</h1>
        <div className="w-full max-w-3xl">
          <TabBar /> {/* Tab Bar */}
          <CategorySelector
            selectedCategory={selectedCategory}
            selectedType={''}
            categories={categories}
            types={[]}
            handleCategoryClick={handleCategorySelect}
            handleTypeClick={() => { }}
          />
          <p className={`text-${helperTextColor} text-xs italic`}>* 헬퍼텍스트</p>
          <div className="bg-white rounded-lg mt-5">
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                제목 <span className="text-gray-400 text-xs pl-1">({title.length} / 20)</span>
              </label>
              <input
                id="title"
                type="text"
                maxLength={20}
                value={title}
                onChange={handleTitleChange}
                placeholder="제목을 입력해주세요."
                className="input peer input-alt w-full border-b-[1px] border-none bg-transparent focus:outline-none focus:ring-0 pb-3 mb-3"
              />
              <span className="absolute bottom-3 left-0 w-0 h-[1.5px] bg-[#A98BFF] transition-all duration-700 ease-in-out peer-focus:w-full mb-3"></span>
              <p className={`text-${helperTextColor} text-xs italic`}>* 헬퍼텍스트</p>
            </div>

            <div className="mb-4 relative form-control">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                내용 <span className="text-gray-400 text-xs pl-1">({content.length} / 200)</span>
              </label>
              <textarea
                id="content"
                maxLength={200}
                value={content}
                onChange={handleContentChange}
                placeholder="내용을 입력해주세요."
                rows={5}
                className="input peer input-alt w-full border-b-[1px] border-none bg-transparent focus:outline-none focus:ring-0 resize-none"
              />
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#A98BFF] transition-all duration-700 ease-in-out peer-focus:w-full mb-6"></span>
              <p className={`text-${helperTextColor} text-xs italic`}>* 헬퍼텍스트</p>
            </div>

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
      </div>
      <Footer />
    </div>
  );
};

export default RecruitStudyCreatePage;
