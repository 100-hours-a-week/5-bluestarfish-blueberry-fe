import React from "react";
import StudyroomTN from "../rooms/StudyroomTN";
import DefaultThumbnail from "../../images/study-thumbnail-3.png";

interface StudyRoomLinkProps {
  studyRoom: {
    id: number;
    title: string;
    camEnabled: boolean;
    memberNumber: number;
    maxUsers: number;
    thumbnail: string | null;
  } | null;
  isRecruited: boolean;
  handleNavigateToRoom: () => void;
}

const StudyRoomLink: React.FC<StudyRoomLinkProps> = ({
  studyRoom,
  isRecruited,
  handleNavigateToRoom,
}) => {
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
        onClick={isRecruited ? handleNavigateToRoom : undefined}
      >
        <div className="relative">
          <StudyroomTN
            id={studyRoom.id}
            title={studyRoom.title}
            camEnabled={studyRoom.camEnabled}
            currentUsers={studyRoom.memberNumber}
            maxUsers={studyRoom.maxUsers}
            thumbnail={studyRoom.thumbnail || DefaultThumbnail}
            isSelected={false}
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
        </div>
      </div>
    </div>
  );
};

export default StudyRoomLink;
