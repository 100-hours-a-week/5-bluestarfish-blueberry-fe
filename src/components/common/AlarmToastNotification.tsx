import React, { useEffect, useState } from 'react';

// ToastNotification 컴포넌트가 받아야 하는 props의 타입을 정의
interface ToastNotificationProps {
    sender: string;  // 발신자
    message: string;  // 알림에 표시될 메시지
    notiType: string; // 알림 유형
    onClose: () => void;  // 알림이 닫힐 때 호출되는 함수
}

// ToastNotification 컴포넌트 정의
const AlarmToastNotification: React.FC<ToastNotificationProps> = ({ sender, message, notiType, onClose }) => {
  // 알림의 진행 상태(퍼센트)를 관리하는 상태
  const [progress, setProgress] = useState(100);  // 초기값은 100 (알림이 처음에 표시될 때)

  // 컴포넌트가 마운트될 때 실행되는 useEffect 훅
  useEffect(() => {
    const totalDuration = 2000; // 2초로 변경
    const progressInterval = totalDuration / 100; // progress가 1%씩 줄어드는 간격
  
    // progress를 감소시키는 타이머 설정
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev > 0) {
          return prev - 1; // progress를 1%씩 감소
        } else {
          clearInterval(timer); // progress가 0이 되면 타이머 중지
          return 0; // progress를 0으로 설정
        }
      });
    }, progressInterval); // 일정한 간격으로 progress 감소
  
    // 2초 후에 알림을 닫는 타이머 설정
    const closeTimeout = setTimeout(() => {
      onClose(); // 토스트 알림 닫기
    }, totalDuration); // 2초 후에 실행
  
    // 컴포넌트가 언마운트되거나 타이머가 끝나면 타이머 정리
    return () => {
      clearInterval(timer);
      clearTimeout(closeTimeout);
    };
  }, [onClose]);
  
  

  return (
    <div className="fixed top-4 right-4 bg-white shadow-lg rounded-lg flex items-center p-4 w-72 z-[200]">
      <div className="flex items-center">
        {/* 멘션 아이콘 */}
        <div className="rounded-full w-8 h-8 flex items-center justify-center mr-3">
            {notiType === "MENTION" &&
                <img src={`${process.env.PUBLIC_URL}/assets/images/noti-mention.png`} alt="Mention" className="w-7 h-7" />
            }
            {notiType === "FRIEND" &&
                <img src={`${process.env.PUBLIC_URL}/assets/images/noti-friend.png`} alt="Friend" className="w-7 h-7" />
            }
          {/* {notiType === "MENTION" ? (
            <img src={`${process.env.PUBLIC_URL}/assets/images/noti-mention.png`} alt="Mention" className="w-7 h-7" />
          ) : (
            <img src={`${process.env.PUBLIC_URL}/assets/images/error-icon.png`} alt="Error" className="w-7 h-7" />
          )} */}
        </div>
        {/* 알림 메시지 */}
        <span className="text-black font-medium">{message}</span>
      </div>
      {/* 닫기 버튼 */}
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        type="button"
        onClick={onClose}  // 클릭 시 알림을 닫음
      >
        &#x2715;  {/* 'x' 문자 */}
      </button>
      {/* 진행 상태 표시 바 */}
      <div className="absolute bottom-0 left-0 w-full h-1 rounded-b-lg overflow-hidden">
        <div
          className="h-full bg-[#6D81D5]"
          style={{ width: `${progress}%`, transition: `width 0.03s linear` }}
        />
      </div>

    </div>
  );
};

export default AlarmToastNotification;  // 컴포넌트를 기본 내보내기로 설정
