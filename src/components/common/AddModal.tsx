import React from 'react';

type DeletePostModalProps = {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const DeleteModal: React.FC<DeletePostModalProps> = ({
  title,
  description,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="group select-none w-[300px] flex flex-col p-6 relative items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-2xl w-[27%]">
        <div className="text-center p-3 flex-auto justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-12 h-12 text-green-500 mx-auto"
          >
            <path
              fillRule="evenodd"
              d="M12 4a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H5a1 1 0 110-2h6V5a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>

          <h2 className="text-xl font-bold py-4 text-gray-200">{title}</h2>
          <p className="font-bold text-sm text-gray-500 px-2">
            {description}
          </p>
        </div>
        <div className="p-2 mt-2 text-center space-x-5 md:block">
          <button
            className="mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
            onClick={onCancel}
          >
            취소
          </button>
          <button
            className="bg-red-500 hover:bg-transparent px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-white hover:text-red-500 rounded-full transition ease-in duration-300"
            onClick={onConfirm}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
