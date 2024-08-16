import React, { useState } from 'react';
import '../../global.css';
import { useNavigate } from 'react-router-dom';
import studyRecruitData from '../../data/studyRecruitData';
import CategorySelector from '../../components/CategorySelector';
import RecruitPostList from '../../components/RecruitPostList';

const StudyRecruitListContainer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체보기');
  const [selectedType, setSelectedType] = useState('');
  const navigate = useNavigate();
  const studyRecruitSortedData = studyRecruitData.sort((a, b) => b.createdAt - a.createdAt);

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
    if (selectedType === type) {
      setSelectedType('');
    } else {
      setSelectedType(type);
    }
  };

  const handlePostClick = () => {
    navigate('/recruit/list');
  };

  const handleCreatePostClick = () => {
    navigate('/recruit/create');
  }

  const filteredData = studyRecruitSortedData.filter((item) => {
    const matchesCategory = selectedCategory === '전체보기' || (selectedCategory === '모집 중' && item.isRecruited);
    const matchesType = selectedType === '' || item.type === (selectedType === '스터디 멤버 찾기' ? 'FINDING_MEMBERS' : 'FINDING_ROOMS');
    return matchesCategory && matchesType;
  });

  return (
    <div className="flex flex-col items-center w-full bg-white mb-10">
      <div className="relative w-full">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/recruitment-banner.png`}
          alt="intro"
          className="w-full"
        />
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/create-post-button.png`}
          alt="create post"
          className="absolute top-12 right-64 w-[130px] h-[30px]"
          onClick={handleCreatePostClick}
        />
      </div>

      <div className="w-[1030px] mt-8 overflow-auto scrollbar-hide">
        <CategorySelector
          selectedCategory={selectedCategory}
          selectedType={selectedType}
          categories={categories}
          types={types}
          handleCategoryClick={handleCategoryClick}
          handleTypeClick={handleTypeClick}
        />
        {/* 모집 공고 글 목록 */}
        {/* <RecruitPostList posts={filteredData} handlePostClick={handlePostClick} /> */}
        <RecruitPostList posts={filteredData} handlePostClick={handlePostClick} />
      </div>
    </div>
  );
};

export default StudyRecruitListContainer;
