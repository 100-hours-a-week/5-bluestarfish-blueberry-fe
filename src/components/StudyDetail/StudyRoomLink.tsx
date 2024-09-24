import React, { useState, useEffect } from "react";
import StudyroomMTN from "../rooms/StudyroomMTN";
import DefaultThumbnail from "../../images/study-thumbnail-3.png";
import PasswordModal from "../Modal/PasswordModal";
import ToastNotification from "../common/ToastNotification";

interface StudyRoomLinkProps {
  studyRoom: {
    id: number;
    title: string;
    needPassword: boolean;
    camEnabled: boolean;
    memberNumber: number;
    maxUsers: number;
    thumbnail: string | null;
  } | null;
  isRecruited: boolean;
}

const StudyRoomLink: React.FC<StudyRoomLinkProps> = ({
  studyRoom,
  isRecruited,
}) => {
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [clickedRoomId, setClickedRoomId] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    console.log(studyRoom);
  });

  const closePasswordModal = () => {
    setPasswordModalOpen(false);
  };

  const openPasswordModal = () => {
    setPasswordModalOpen(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  useEffect(() => {
    if (isPasswordModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isPasswordModalOpen]);

  if (!studyRoom) {
    return <div></div>;
  }

  return (
    <div className="mb-8 relative">
      <div className="text-black font-bold mb-3">스터디 룸 바로가기</div>
      <div
        className={`inline-block relative ${
          !isRecruited
            ? "cursor-not-allowed opacity-50"
            : "hover:cursor-pointer"
        }`}
      >
        <div className="relative">
          <StudyroomMTN
            id={studyRoom.id}
            title={studyRoom.title}
            needPassword={studyRoom.needPassword}
            camEnabled={studyRoom.camEnabled}
            currentUsers={studyRoom.memberNumber}
            maxUsers={studyRoom.maxUsers}
            thumbnail={studyRoom.thumbnail || DefaultThumbnail}
            isSelected={false}
            openModal={openPasswordModal}
            setClickedRoomId={setClickedRoomId}
          />
          {/* 모집 완료 표시 */}
          {!isRecruited && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              {/* 배경 오버레이 */}
              <div className="absolute inset-0 bg-black opacity-70 rounded-md"></div>
              {/* 모집 완료 텍스트 */}
              <span className="relative text-red-300 text-3xl font-extrabold border-4 border-red-300 p-4 rounded-md transform -rotate-[20deg]">
                모집 완료
              </span>
            </div>
          )}
          {isPasswordModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* 모달 배경 */}
              <div className="fixed inset-0 bg-black bg-opacity-50 pointer-events-none" />
              {/* 모달 내용 */}
              <div className="relative z-50">
                <PasswordModal
                  roomId={clickedRoomId}
                  closeModal={closePasswordModal}
                  setShowToast={setShowToast}
                />
              </div>
            </div>
          )}
          {showToast && (
            <ToastNotification
              message="비밀번호가 틀렸습니다!"
              isSuccess={false}
              onClose={handleCloseToast}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyRoomLink;
