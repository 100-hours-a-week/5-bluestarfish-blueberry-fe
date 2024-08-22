import React from 'react';

interface SubmitButtonProps {
  isFormValid: boolean;
  handleClick: () => void;
  text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isFormValid, handleClick, text }) => {
  return (
    <div className="flex justify-center mt-10 mb-20">
      <button
        onClick={handleClick}
        disabled={!isFormValid}
        className={`btn w-[50%] h-[50px] py-2 rounded-full transition duration-200 flex justify-center items-center gap-3 ${
          isFormValid
            ? 'cursor-pointer'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        <svg
          height="24"
          width="24"
          fill="#FFFFFF"
          viewBox="0 0 24 24"
          data-name="Layer 1"
          className="sparkle"
        >
          <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
        </svg>
        <span className="text">{text}</span>
      </button>
    </div>
  );
};

export default SubmitButton;
