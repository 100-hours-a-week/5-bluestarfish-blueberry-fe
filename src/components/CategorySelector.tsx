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
    <div className="flex space-x-4 mb-6">
      {categories.map((category) => (
        <button
          key={category.name}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-md hover:bg-[#6D81D5] hover:text-white transition duration-300 ${
            selectedCategory === category.name ? 'bg-[#6D81D5] text-white' : 'bg-[#E0E7FF] text-[#4659AA]'
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
          className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-md hover:bg-[#6D81D5] hover:text-white transition duration-300 ${
            selectedType === type.name ? 'bg-[#6D81D5] text-white' : 'bg-[#E0E7FF] text-[#4659AA]'
          }`}
          onClick={() => handleTypeClick(type.name)}
        >
          <img src={`${process.env.PUBLIC_URL}/assets/images/${type.icon}`} alt={type.name} className="h-5 w-5" />
          <span>{type.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
