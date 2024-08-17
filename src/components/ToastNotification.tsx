import React, { useEffect, useState } from 'react';

// ToastNotification 컴포넌트가 받아야 하는 props의 타입을 정의
interface ToastNotificationProps {
  message: string;  // 알림에 표시될 메시지
  onClose: () => void;  // 알림이 닫힐 때 호출되는 함수
}

// ToastNotification 컴포넌트 정의
const ToastNotification: React.FC<ToastNotificationProps> = ({ message, onClose }) => {
  // 알림의 진행 상태(퍼센트)를 관리하는 상태
  const [progress, setProgress] = useState(100);  // 초기값은 100 (알림이 처음에 표시될 때)

  // 컴포넌트가 마운트될 때 실행되는 useEffect 훅
  useEffect(() => {
    // 30ms마다 실행되는 타이머 설정
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev > 0) {
          return prev - 1;  // progress를 1씩 감소시킴
        } else {
          clearInterval(timer);  // progress가 0이 되면 타이머를 중지
          onClose();  // onClose 콜백 함수를 호출하여 알림을 닫음
          return 0;  // progress를 0으로 설정
        }
      });
    }, 30);  // 30ms 간격으로 타이머 실행

    // 컴포넌트가 언마운트되거나 progress가 0이 되면 타이머를 정리
    return () => clearInterval(timer);
  }, [onClose]);  // onClose가 변경될 때마다 useEffect 재실행

  return (
    <div className="fixed top-4 right-4 bg-white shadow-lg rounded-lg flex items-center p-4 w-72">
      <div className="flex items-center">
        {/* 체크 아이콘 */}
        <div className="rounded-full w-8 h-8 flex items-center justify-center mr-3">
          <img src={`${process.env.PUBLIC_URL}/assets/images/check-icon.png`} alt="check" className="w-7 h-7" />
        </div>
        {/* 알림 메시지 */}
        <span className="text-black font-medium">{message}</span>
      </div>
      {/* 닫기 버튼 */}
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        onClick={onClose}  // 클릭 시 알림을 닫음
      >
        &#x2715;  {/* 'x' 문자 */}
      </button>
      {/* 진행 상태 표시 바 */}
      <div className="absolute bottom-0 left-0 w-full h-1 rounded-b-lg overflow-hidden">
        <div
          className="bg-[#BDBDFF] h-full"
          style={{ width: `${progress}%`, transition: `width 0.03s linear` }}  // progress에 따라 너비가 줄어듦
        />
      </div>
    </div>
  );
};

export default ToastNotification;  // 컴포넌트를 기본 내보내기로 설정
