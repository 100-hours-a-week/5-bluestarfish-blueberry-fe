import React from "react";
import StudyroomTNContainer from "./StudyroomTNContainer";

const StudyRoomsListContainer: React.FC = () => {
  return (
    <div className="flex flex-col mt-[120px] items-center w-full bg-white">
      <div className="w-full">
        <StudyroomTNContainer isStudyRoomPage={true} />
      </div>
    </div>
  );
};

export default StudyRoomsListContainer;
