import React from 'react';
import CategorySelector from '../components/CategorySelector';  // 카테고리 선택 컴포넌트 가져오기

type StudyFormProps = {
  selectedCategory: string;  // 선택된 카테고리
  title: string;  // 입력된 제목
  content: string;  // 입력된 내용
  categoryHelperText: string;  // 카테고리 헬퍼 텍스트
  titleHelperText: string;  // 제목 헬퍼 텍스트
  contentHelperText: string;  // 내용 헬퍼 텍스트
  categories: { name: string; icon: string }[];  // 카테고리 목록
  handleCategorySelect: (category: string) => void;  // 카테고리 선택 핸들러
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;  // 제목 변경 핸들러
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;  // 내용 변경 핸들러
};

// RecruitStudyForm 컴포넌트 정의
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
      {/* 카테고리 선택 컴포넌트 */}
      <CategorySelector
        selectedCategory={selectedCategory}  // 현재 선택된 카테고리 전달
        selectedType={''}  // 타입 선택은 사용하지 않음 (빈 문자열 전달)
        categories={categories}  // 카테고리 목록 전달
        types={[]}  // 타입 목록은 사용하지 않음 (빈 배열 전달)
        handleCategoryClick={handleCategorySelect}  // 카테고리 선택 핸들러 전달
        handleTypeClick={() => {}}  // 타입 선택 핸들러는 사용하지 않음 (빈 함수 전달)
      />

      {/* 카테고리 헬퍼 텍스트 */}
      <p className={`text-${categoryHelperText === '* 통과' ? 'blue-500' : 'red-500'} text-xs italic`}>
        {categoryHelperText}
      </p>

      {/* 폼 입력 영역 */}
      <div className="bg-white rounded-lg mt-5">
        {/* 제목 입력 필드 */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            제목 <span className="text-gray-400 text-xs pl-1">({title.length} / 20)</span>  {/* 제목 길이 표시 */}
          </label>
          <input
            id="title"
            type="text"
            maxLength={20}  // 제목 최대 길이 제한
            value={title}  // 입력된 제목 값
            onChange={handleTitleChange}  // 제목 변경 시 호출될 핸들러
            placeholder="제목을 입력해주세요."  // 입력 필드에 표시될 플레이스홀더
            className="input peer input-alt w-full border-b-[1px] border-none bg-transparent focus:outline-none focus:ring-0 pb-3 mb-3"  // 스타일 클래스
          />
          <span className="absolute bottom-3 left-0 w-0 h-[1.5px] bg-[#A98BFF] transition-all duration-700 ease-in-out peer-focus:w-full mb-3"></span>
          {/* 제목 헬퍼 텍스트 */}
          <p className={`text-${titleHelperText === '* 통과' ? 'blue-500' : 'red-500'} text-xs italic`}>
            {titleHelperText}
          </p>
        </div>

        {/* 내용 입력 필드 */}
        <div className="mb-4 relative form-control">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
            내용 <span className="text-gray-400 text-xs pl-1">({content.length} / 200)</span>  {/* 내용 길이 표시 */}
          </label>
          <textarea
            id="content"
            maxLength={200}  // 내용 최대 길이 제한
            value={content}  // 입력된 내용 값
            onChange={handleContentChange}  // 내용 변경 시 호출될 핸들러
            placeholder="내용을 입력해주세요."  // 입력 필드에 표시될 플레이스홀더
            rows={5}  // textarea의 행 수
            className="input peer input-alt w-full border-b-[1px] border-none bg-transparent focus:outline-none focus:ring-0 resize-none"  // 스타일 클래스
          />
          <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#A98BFF] transition-all duration-700 ease-in-out peer-focus:w-full mb-6"></span>
          {/* 내용 헬퍼 텍스트 */}
          <p className={`text-${contentHelperText === '* 통과' ? 'blue-500' : 'red-500'} text-xs italic`}>
            {contentHelperText}
          </p>
        </div>
      </div>
    </>
  );
};

export default RecruitStudyForm;  // 컴포넌트를 기본 내보내기로 설정
