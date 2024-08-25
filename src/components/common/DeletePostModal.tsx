import React from 'react';

// DeletePostModalProps 타입 정의: 모달 컴포넌트가 받을 props의 타입을 정의
// onConfirm: 삭제를 확정하는 함수, onCancel: 모달을 취소하는 함수
type DeletePostModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

// DeletePostModal 컴포넌트 정의: 게시글 삭제 확인 모달 창
const DeletePostModal: React.FC<DeletePostModalProps> = ({ onConfirm, onCancel }) => {
  return (
    // 모달을 화면 중앙에 고정시키고, 배경을 어둡게 처리하여 모달 외의 영역은 클릭할 수 없도록 설정
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-[400px] relative">
        {/* 모달 닫기 버튼: X 아이콘 */}
        <button className="absolute top-3 right-3" onClick={onCancel}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        
        {/* 모달 제목: 삭제 확인 메시지 */}
        <h2 className="text-center font-bold mb-6">게시글을 삭제하시겠습니까?</h2>

        {/* 모달의 하단 버튼 영역: 취소와 삭제 버튼 */}
        <div className="flex justify-between">
          {/* 취소 버튼: onCancel 함수를 호출하여 모달을 닫음 */}
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-full w-[48%]"
            onClick={onCancel}
          >
            취소
          </button>
          
          {/* 삭제 버튼: onConfirm 함수를 호출하여 게시글 삭제를 확정함 */}
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
