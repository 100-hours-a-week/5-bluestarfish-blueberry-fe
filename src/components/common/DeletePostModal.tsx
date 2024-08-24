import React from 'react';

type DeletePostModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

const DeletePostModal: React.FC<DeletePostModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-[400px] relative">
        <button className="absolute top-3 right-3" onClick={onCancel}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <h2 className="text-center font-bold mb-6">게시글을 삭제하시겠습니까?</h2>
        <div className="flex justify-between">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-full w-[48%]"
            onClick={onCancel}
          >
            취소
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-full w-[48%]"
            onClick={onConfirm}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePostModal;
