import React from 'react';

interface CategorySelectorProps {
  selectedCategory: string;
  selectedType: string;
  categories: { name: string; icon: string }[];
  types: { name: string; icon: string }[];
  handleCategoryClick: (category: string) => void;
  handleTypeClick: (type: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  selectedType,
  categories,
  types,
  handleCategoryClick,
  handleTypeClick,
}) => {
  return (
    <div className="flex space-x-2 md:space-x-4 mb-6 overflow-x-auto pb-[10px]">
      {/* 카테고리 목록을 순회하며 버튼 렌더링 */}
      {categories.map((category) => (
        <button
          key={category.name}
          className={`flex items-center space-x-2 px-2 md:px-4 py-2 rounded-full shadow-md hover:bg-[#6D81D5] hover:text-white transition duration-300 
          ${selectedCategory === category.name ? 'bg-[#6D81D5] text-white' : 'bg-[#E0E7FF] text-[#4659AA]'}
          text-sm md:text-base`}
          onClick={() => handleCategoryClick(category.name)}
        >
          <img src={`${process.env.PUBLIC_URL}/assets/images/${category.icon}`} alt={category.name} className="h-4 w-4 md:h-5 md:w-5" />
          <span>{category.name}</span>
        </button>
      ))}

      {/* 타입 목록을 순회하며 버튼 렌더링 */}
      {types.map((type) => (
        <button
          key={type.name}
          className={`flex items-center space-x-2 px-2 md:px-4 py-2 rounded-full shadow-md hover:bg-[#DCA4FF] hover:text-white transition duration-300 
          ${selectedType === type.name ? 'bg-[#DCA4FF] text-white' : 'bg-[#EED3FF] text-[#4659AA]'}
          text-sm md:text-base`}
          onClick={() => handleTypeClick(type.name)}
        >
          <img src={`${process.env.PUBLIC_URL}/assets/images/${type.icon}`} alt={type.name} className="h-4 w-4 md:h-5 md:w-5" />
          <span>{type.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
