import React from 'react';
import StudyroomTN from '../rooms/StudyroomTN';

interface StudyRoomLinkProps {
  studyRoom: {
    title: string;
    cam_enabled: boolean;
    currentUsers: number;
    maxUsers: number;
    thumbnail: string;
  } | null;
  isRecruited: boolean;
  handleNavigateToRoom: () => void;
}

const StudyRoomLink: React.FC<StudyRoomLinkProps> = ({ studyRoom, isRecruited, handleNavigateToRoom }) => {
  if (!studyRoom) {
    return <div>스터디 룸 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="mb-8">
      <div className="text-black font-bold mb-3">스터디 룸 바로가기</div>
      <div className="inline-block" onClick={isRecruited ? handleNavigateToRoom : undefined}>
        <div className={`hover:cursor-pointer ${!isRecruited && 'cursor-not-allowed opacity-50'}`}>
          <StudyroomTN
            title={studyRoom.title}
            cam_enabled={studyRoom.cam_enabled}
            currentUsers={studyRoom.currentUsers}
            maxUsers={studyRoom.maxUsers}
            thumbnail={studyRoom.thumbnail}
            isSelected={false}
          />
        </div>
      </div>
    </div>
  );
};

export default StudyRoomLink;
