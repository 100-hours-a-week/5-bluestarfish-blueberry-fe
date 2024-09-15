import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance"; // axiosInstance 가져오기
import { useLoginedUserStore } from "../../store/store";

type AlarmModalProps = {
  closeModal: () => void;
};

const AlarmModal: React.FC<AlarmModalProps> = ({ closeModal }) => {
  const { userId } = useLoginedUserStore(); // 로그인한 사용자 정보 가져오기
  const [notifications, setNotifications] = useState<any[]>([]); // 알림 데이터를 저장할 상태
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태

  // 알림 데이터를 API로부터 가져오는 함수
  const fetchNotifications = async () => {
    try {
      const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/v1/users/${userId}/notifications`);
      setNotifications(response.data.data); // 가져온 알림 데이터를 상태에 저장
    } catch (error) {
      console.error("알림 데이터를 가져오는 데 실패했습니다:", error);
    } finally {
      setIsLoading(false); // 로딩 완료
    }
  };

  useEffect(() => {
    if (userId) {
      fetchNotifications(); // 모달이 열릴 때 알림 데이터 가져오기
    }
  }, [userId]);

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 모달 안쪽 클릭 시 이벤트 전파 막기
  };

  // ESC 키로 모달 닫기 기능 추가
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeModal]);

  return (
    <div
      className="fixed inset-0 z-50"
      onClick={closeModal} // 모달 밖 클릭 시 닫기
    >
      <div
        className="absolute right-32 mt-[75px] w-[250px] h-[270px] bg-white text-black text-[8px] rounded-[20px] shadow-lg p-2 space-y-1 overflow-y-auto"
        onClick={handleModalClick}
      >
        <div className="flex items-center m-1 space-x-1">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/bell.png`}
            alt="알림 벨"
            aria-label="알림 벨 아이콘"
            className="h-[10px] rounded-full cursor-pointer"
          />
          <div className="text-[10px] font-bold">알림</div>
        </div>

        {isLoading ? (
          <div>로딩 중...</div> // 로딩 중 표시
        ) : notifications.length === 0 ? (
          <div>알림이 없습니다.</div> // 알림이 없는 경우
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex w-full h-[42px] items-center justify-between bg-[#ebeeff] rounded-[10px] p-2"
            >
              <div className="flex items-center space-x-1">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/profile-default-image.png`}
                  alt="프로필 이미지"
                  aria-label="프로필 이미지"
                  className="h-[18.41px] rounded-full cursor-pointer"
                />
                {/* <div>{notification.notiType === 'MENTION' ? `'${notification.sender.nickname}'님이 당신을 멘션했습니다.` : '알림 내용'}</div> */}
                <div>{notification.notiType === 'MENTION' ? '멘션 알림!' : ""}</div>
              </div>
              <div className="space-x-1 text-white text-[6px]">
                <button className="w-[19px] h-[12px] bg-[#6d81d5] rounded-[5px]">
                  수락
                </button>
                <button className="w-[19px] h-[12px] bg-[#eb4c64] rounded-[5px]">
                  거절
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AlarmModal;
