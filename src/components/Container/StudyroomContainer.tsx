import React from 'react';
import StudyroomHeader from "../StudyroomHeader";
import StudyroomTN from "../StudyroomTN";
import StudyroomFooter from "../StudyroomFooter";
import studyRooms from "../../data/studyRooms"
import { useNavigate } from 'react-router-dom';

const StudyroomContainer: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/studyroom");
  };
  return (
    <div className="my-4">
      <StudyroomHeader />
      <div className="my-5 flex flex-wrap gap-x-5 gap-y-16">
        {studyRooms.map((room) => (
          <StudyroomTN
            key={room.id}
            title={room.title}
            camEnabled={room.camEnabled}
            currentUsers={room.users.length}
            maxUsers={room.maxUsers}
            thumbnail={room.thumbnail}
            isSelected={false}
          />
        ))}
      </div>
    </div>
  );
};

export default StudyroomContainer;
