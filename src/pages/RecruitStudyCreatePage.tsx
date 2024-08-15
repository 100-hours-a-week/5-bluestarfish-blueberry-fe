import React, { useState } from 'react';
import BasicHeader from '../components/BasicHeader';
import TabBar from '../components/TabBar';
import Footer from '../components/Footer';

const RecruitStudyCreatePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedStudy, setSelectedStudy] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleStudySelect = (studyId: number) => {
    setSelectedStudy(studyId);
  };

  const handleSubmit = () => {
    // 작성 완료 로직
    if (selectedCategory && title && content && selectedStudy !== null) {
      setIsSubmitted(true);
      // 서버로 데이터 전송 로직 추가 가능
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
          <TabBar />
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                제목
              </label>
              <input
                id="title"
                type="text"
                maxLength={20}
                value={title}
                onChange={handleTitleChange}
                placeholder="제목을 입력해주세요."
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                내용
              </label>
              <textarea
                id="content"
                maxLength={200}
                value={content}
                onChange={handleContentChange}
                placeholder="내용을 입력해주세요."
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                나의 스터디
              </label>
              <div className="flex space-x-4 overflow-x-scroll">
                {[1, 2, 3].map((studyId) => (
                  <div
                    key={studyId}
                    className={`cursor-pointer border rounded-lg p-4 flex items-center justify-center ${
                      selectedStudy === studyId ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
                    }`}
                    onClick={() => handleStudySelect(studyId)}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/study-placeholder.png`}
                      alt={`Study ${studyId}`}
                      className="w-16 h-16"
                    />
                    <p className="ml-4">스터디 {studyId}</p>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              게시글 등록
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RecruitStudyCreatePage;


// import React from 'react';
// import BasicHeader from '../components/BasicHeader';
// import RecruitStudyListContainer from '../components/Container/RecruitStudyListContainer';
// import Footer from "../components/Footer";
// import TabBar from '../components/TabBar'; // Import the TabBar component

// const RecruitStudyCreatePage: React.FC = () => {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <BasicHeader /> {/* 헤더 */}
//       <TabBar /> {/* Tab Bar 추가 */}
//       {/* 여기에 컨테이너 추가 예정 */}
//       <Footer />
//     </div>
//   );
// };

// export default RecruitStudyCreatePage;
