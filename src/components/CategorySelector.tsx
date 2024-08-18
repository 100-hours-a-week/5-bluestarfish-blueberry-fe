import React from 'react';

// 컴포넌트가 받을 props의 타입 정의
interface CategorySelectorProps {
  selectedCategory: string;  // 현재 선택된 카테고리 이름
  selectedType: string;  // 현재 선택된 타입 이름
  categories: { name: string; icon: string }[];  // 카테고리 목록 (이름과 아이콘 포함)
  types: { name: string; icon: string }[];  // 타입 목록 (이름과 아이콘 포함)
  handleCategoryClick: (category: string) => void;  // 카테고리 클릭 시 호출될 함수
  handleTypeClick: (type: string) => void;  // 타입 클릭 시 호출될 함수
}

// CategorySelector 컴포넌트 정의
const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,  // 현재 선택된 카테고리
  selectedType,  // 현재 선택된 타입
  categories,  // 카테고리 목록
  types,  // 타입 목록
  handleCategoryClick,  // 카테고리 클릭 핸들러
  handleTypeClick,  // 타입 클릭 핸들러
}) => {
  return (
    <div className="flex space-x-4 mb-6">
      {/* 카테고리 목록을 순회하며 버튼 렌더링 */}
      {categories.map((category) => (
        <button
          key={category.name}  // 각 버튼에 고유한 키 부여 (카테고리 이름 사용)
          className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-md hover:bg-[#6D81D5] hover:text-white transition duration-300 ${
            selectedCategory === category.name ? 'bg-[#6D81D5] text-white' : 'bg-[#E0E7FF] text-[#4659AA]'
          }`}  // 선택된 카테고리와 일치하면 스타일 적용
          onClick={() => handleCategoryClick(category.name)}  // 카테고리 클릭 시 해당 이름을 부모 컴포넌트로 전달
        >
          <img src={`${process.env.PUBLIC_URL}/assets/images/${category.icon}`} alt={category.name} className="h-5 w-5" />
          <span>{category.name}</span>
        </button>
      ))}

      {/* 타입 목록을 순회하며 버튼 렌더링 */}
      {types.map((type) => (
        <button
          key={type.name}  // 각 버튼에 고유한 키 부여 (타입 이름 사용)
          className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-md hover:bg-[#6D81D5] hover:text-white transition duration-300 ${
            selectedType === type.name ? 'bg-[#6D81D5] text-white' : 'bg-[#E0E7FF] text-[#4659AA]'
          }`}  // 선택된 타입과 일치하면 스타일 적용
          onClick={() => handleTypeClick(type.name)}  // 타입 클릭 시 해당 이름을 부모 컴포넌트로 전달
        >
          <img src={`${process.env.PUBLIC_URL}/assets/images/${type.icon}`} alt={type.name} className="h-5 w-5" />
          <span>{type.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
