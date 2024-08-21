import React, { useState, useEffect } from "react";
import axios from "axios";
import StudyroomHeader from "../rooms/StudyroomHeader";
import StudyroomTN from "../rooms/StudyroomTN";
import StudyroomFooter from "../rooms/StudyroomFooter";
import dummyStudyRooms from "../../data/studyRooms";
import studyRooms from "../../data/studyRooms";
import { useNavigate, useParams } from "react-router-dom";

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
  const [selectedCategory, setSelectedCategory] = useState("전체보기");
  const navigate = useNavigate();

  const categories = [
    { name: "전체보기", icon: "all.png" },
    { name: "캠켜공", icon: "camera-on.png" },
    { name: "캠끄공", icon: "camera-off.png" },
  ];
  useEffect(() => {
    fetchStudyRooms();
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredData = dummyStudyRooms.filter((item) => {
    const matchesCategory =
      selectedCategory === "전체보기" ||
      (item.cam_enabled === true && selectedCategory === "캠켜공") ||
      (item.cam_enabled === false && selectedCategory === "캠끄공");
    return matchesCategory;
  });

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
    <div className="my-4 max-w-[1024px]">
      <StudyroomHeader
        selectedCategory={selectedCategory}
        categories={categories}
        handleCategoryClick={handleCategoryClick}
      />
      <div className="my-5 mx-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-x-[22px] gap-y-[22px] w-full">
        {filteredData.map((room) => (
          <div key={room.id} className="cursor-pointer flex-grow">
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
