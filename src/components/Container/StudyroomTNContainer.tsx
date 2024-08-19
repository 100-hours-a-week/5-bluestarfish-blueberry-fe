import React, { useState, useEffect } from "react";
import axios from "axios";
import StudyroomHeader from "../StudyroomHeader";
import StudyroomTN from "../StudyroomTN";
import StudyroomFooter from "../StudyroomFooter";
import dummyStudyRooms from "../../data/studyRooms";

interface StudyRoom {
  id: number;
  title: string;
  cam_enabled: boolean;
  users: { id: number; name: string }[];
  maxUsers: number;
  thumbnail: string;
}

const StudyroomTNContainer: React.FC = () => {
  const [studyRooms, setStudyRooms] = useState<StudyRoom[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchStudyRooms();
  }, []);

  const fetchStudyRooms = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const response = await axios.get("/api/v1/rooms");
      setStudyRooms(response.data);
    } catch (error) {
      console.error("스터디룸 목록을 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  return (
    <div className="my-4">
      <StudyroomHeader />
      <div className="my-5 mx-0 flex flex-wrap gap-x-[23px] gap-y-[23px]">
        {dummyStudyRooms.map((room) => (
          <div key={room.id} className="cursor-pointer">
            <StudyroomTN
              title={room.title}
              cam_enabled={room.cam_enabled}
              currentUsers={room.users.length}
              maxUsers={room.maxUsers}
              thumbnail={room.thumbnail}
              isSelected={false}
            />
          </div>
        ))}
      </div>
      <StudyroomFooter />{" "}
    </div>
  );
};

export default StudyroomTNContainer;
