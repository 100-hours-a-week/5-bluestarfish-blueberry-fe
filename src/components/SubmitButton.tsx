import React from 'react';

interface SubmitButtonProps {
  isFormValid: boolean;
  handleClick: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isFormValid, handleClick }) => {
  return (
    <div className="flex justify-center mt-10 mb-20">
      <button
        onClick={handleClick}
        disabled={!isFormValid}
        className={`w-[50%] py-2 rounded-full transition duration-200 ${
          isFormValid
            ? 'bg-[#E0E7FF] text-[#4659AA] hover:bg-[#6D81D5] hover:text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        게시글 등록
      </button>
    </div>
  );
};

export default SubmitButton;