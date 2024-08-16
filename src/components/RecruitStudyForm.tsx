import React from 'react';
import TabBar from '../components/TabBar';
import CategorySelector from '../components/CategorySelector';

type StudyFormProps = {
  selectedCategory: string;
  title: string;
  content: string;
  categoryHelperText: string;
  titleHelperText: string;
  contentHelperText: string;
  categories: { name: string; icon: string }[];
  handleCategorySelect: (category: string) => void;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const RecruitStudyForm: React.FC<StudyFormProps> = ({
  selectedCategory,
  title,
  content,
  categoryHelperText,
  titleHelperText,
  contentHelperText,
  categories,
  handleCategorySelect,
  handleTitleChange,
  handleContentChange,
}) => {
  return (
    <>
      <TabBar />
      <CategorySelector
        selectedCategory={selectedCategory}
        selectedType={''}
        categories={categories}
        types={[]}
        handleCategoryClick={handleCategorySelect}
        handleTypeClick={() => {}}
      />
      <p className={`text-${categoryHelperText === '* 통과' ? 'blue-500' : 'red-500'} text-xs italic`}>
        {categoryHelperText}
      </p>
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
          <p className={`text-${titleHelperText === '* 통과' ? 'blue-500' : 'red-500'} text-xs italic`}>
            {titleHelperText}
          </p>
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
          <p className={`text-${contentHelperText === '* 통과' ? 'blue-500' : 'red-500'} text-xs italic`}>
            {contentHelperText}
          </p>
        </div>
      </div>
    </>
  );
};

export default RecruitStudyForm;
