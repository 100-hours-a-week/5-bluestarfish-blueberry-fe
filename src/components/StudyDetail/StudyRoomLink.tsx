import React from "react";
import StudyroomTN from "../rooms/StudyroomTN";

// StudyRoomLink 컴포넌트가 받을 props의 타입 정의
interface StudyRoomLinkProps {
  studyRoom: {
    id: number;
    title: string;
    camEnabled: boolean;
    currentUsers: number;
    maxUsers: number;
    thumbnail: string;
  } | null; // 스터디 룸 정보가 없을 수 있으므로 null 허용
  isRecruited: boolean; // 모집 상태 여부
  handleNavigateToRoom: () => void; // 스터디 룸으로 이동하는 함수
}

const StudyRoomLink: React.FC<StudyRoomLinkProps> = ({
  studyRoom, // 스터디 룸 정보
  isRecruited, // 모집 상태
  handleNavigateToRoom, // 스터디 룸으로 이동하는 함수
}) => {
  // studyRoom 정보가 없을 경우 메시지를 표시
  if (!studyRoom) {
    return <div>스터디 룸 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="mb-8">
      {/* 스터디 룸 바로가기 제목 */}
      <div className="text-black font-bold mb-3">스터디 룸 바로가기</div>

      {/* 스터디 룸이 모집 중일 경우에만 클릭 가능하게 설정 */}
      <div
        className="inline-block"
        onClick={isRecruited ? handleNavigateToRoom : undefined} // 모집 중일 때만 handleNavigateToRoom 실행
      >
        <div
          className={`hover:cursor-pointer ${
            !isRecruited && "cursor-not-allowed opacity-50" // 모집 완료된 경우 클릭 불가 상태와 반투명 효과 적용
          }`}
        >
          {/* StudyroomTN 컴포넌트를 사용하여 스터디 룸 정보를 표시 */}
          <StudyroomTN
            id={studyRoom.id}
            title={studyRoom.title}
            camEnabled={studyRoom.camEnabled}
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
