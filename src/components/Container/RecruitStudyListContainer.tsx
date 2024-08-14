import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../global.css";
import studyRecruitData from '../../data/studyRecruitData';

const StudyRecruitListContainer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체보기');
  const [selectedType, setSelectedType] = useState('');
  const navigate = useNavigate();

  const categories = [
    { name: '전체보기', icon: 'list-icon.png' },
    { name: '모집 중', icon: 'recruit-icon.png' },
  ];

  const types = [
    { name: '스터디 멤버 찾기', icon: 'member-icon.png' },
    { name: '스터디 룸 찾기', icon: 'room-icon.png' },
  ];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleTypeClick = (type: string) => {
    setSelectedType(type);
  };

  const handlePostClick = () => {
    navigate('/recruit/list');
  };

  const filteredData = studyRecruitData.filter((item) => {
    const matchesCategory = selectedCategory === '전체보기' || (selectedCategory === '모집 중' && item.isRecruited);
    const matchesType = selectedType === '' || item.type === (selectedType === '스터디 멤버 찾기' ? 'FINDING_MEMBERS' : 'FINDING_ROOMS');
    return matchesCategory && matchesType;
  });

  return (
    <div className="flex flex-col items-center w-full bg-white">
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/recruitment-banner.png`}
        alt="intro"
        className="w-full"
      />
      <div className="w-[1030px] mt-8 overflow-auto scrollbar-hide"> {/* 스크롤바를 숨기기 위한 클래스 추가 */}
        <div className="flex space-x-4 mb-6">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-md ${selectedCategory === category.name ? 'bg-[#6D81D5] text-white' : 'bg-[#E0E7FF] text-[#4659AA]'
                }`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <img src={`${process.env.PUBLIC_URL}/assets/images/${category.icon}`} alt={category.name} className="h-5 w-5" />
              <span>{category.name}</span>
            </button>
          ))}

          {types.map((type) => (
            <button
              key={type.name}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-md ${selectedType === type.name ? 'bg-[#6D81D5] text-white' : 'bg-[#E0E7FF] text-[#4659AA]'
                }`}
              onClick={() => handleTypeClick(type.name)}
            >
              <img src={`${process.env.PUBLIC_URL}/assets/images/${type.icon}`} alt={type.name} className="h-5 w-5" />
              <span>{type.name}</span>
            </button>
          ))}
        </div>

        {/* 모집 공고 글 목록 */}
        <div className="space-y-4">
          {filteredData.map((post) => (
            <div
              key={post.id}
              className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm cursor-pointer"
              onClick={handlePostClick}
            >
              <div>
                <h3 className="text-xl font-bold">{post.title}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
                  <span className={`px-2 py-1 rounded-full ${post.type === 'FINDING_MEMBERS' ? 'bg-purple-200' : 'bg-blue-200'}`}>
                    {post.type === 'FINDING_MEMBERS' ? '멤버 찾기' : '룸 찾기'}
                  </span>
                  <div className="flex items-center space-x-1">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/${post.isCamOn ? 'cam-on-icon.png' : 'cam-off-icon.png'}`}
                      alt={post.isCamOn ? '캠켜공' : '캠끄공'}
                      className="h-5 w-5"
                    />
                    <span>{post.isCamOn ? '캠켜공' : '캠끄공'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <img src={post.user.profileImage} alt={post.user.nickname} className="h-5 w-5 rounded-full" />
                    <span>{post.user.nickname}</span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-white ${post.isRecruited ? 'bg-green-500' : 'bg-gray-400'}`}>
                {post.isRecruited ? '모집 중' : '모집 완료'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyRecruitListContainer;
