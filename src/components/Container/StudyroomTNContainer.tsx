import React, { useState, useEffect } from "react";
import StudyroomHeader from "../rooms/StudyroomHeader";
import StudyroomTN from "../rooms/StudyroomTN";
import StudyroomFooter from "../rooms/StudyroomFooter";
import dummyStudyRooms from "../../data/studyRooms";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

import beDomain from "../../utils/constants";

interface StudyRoom {
  id: number;
  title: string;
  camEnabled: boolean;
  users: { id: number; name: string }[];
  maxUsers: number;
  thumbnail: string;
}

const StudyroomTNContainer: React.FC = () => {
  const [studyRooms, setStudyRooms] = useState<StudyRoom[]>([]);
  const [filteredData, setFilteredData] = useState<StudyRoom[]>([]);
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

  useEffect(() => {
    setFilteredData(studyRooms);
  }, [studyRooms]);

  useEffect(() => {
    setFilteredData(
      studyRooms.filter((item) => {
        const matchesCategory =
          selectedCategory === "전체보기" ||
          (item.camEnabled === true && selectedCategory === "캠켜공") ||
          (item.camEnabled === false && selectedCategory === "캠끄공");
        return matchesCategory;
      })
    );
  }, [selectedCategory]);

  useEffect(() => {
    const filterData = () => {
      const filtered = studyRooms.filter((item) => {
        const matchesCategory =
          selectedCategory === "전체보기" ||
          (item.camEnabled === true && selectedCategory === "캠켜공") ||
          (item.camEnabled === false && selectedCategory === "캠끄공");
        return matchesCategory;
      });
      setFilteredData(filtered);
    };

    filterData(); // 필터링 함수 호출
  }, [studyRooms, selectedCategory]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const fetchStudyRooms = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`${beDomain}/api/v1/rooms`);
      setStudyRooms(
        Array.isArray(response.data.data.content)
          ? response.data.data.content
          : []
      );
    } catch (error) {
      console.error("스터디룸 목록을 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  const makeStudyroom = async () => {
    try {
      const response = await axiosInstance.post(`${beDomain}/api/v1/rooms`, {
        title: "모각공",
        maxUsers: 5,
        camEnabled: true,
        thumbnail: "s3 url",
        password: "qlalsfqjsgh12!@",
        description: "asdasdasdasdasdadadasda",
      });

      if (response.status === 200) {
        alert("스터디룸 생성 성공!");
      }
    } catch (error) {
      console.log(error);
      alert("생성 실패!");
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
        {filteredData.length > 0 ? (
          filteredData.map((room) => (
            <div key={room.id} className="cursor-pointer flex-grow">
              <StudyroomTN
                id={room.id}
                title={room.title}
                camEnabled={room.camEnabled}
                currentUsers={1}
                maxUsers={room.maxUsers}
                thumbnail={`${process.env.PUBLIC_URL}/assets/images/study-thumbnail-1.png`}
                isSelected={false}
              />
            </div>
          ))
        ) : (
          <div className="cursor-pointer flex-grow">
            <div className="w-[187px] h-[171px]"></div>
          </div>
        )}
      </div>
      <button onClick={makeStudyroom}>스터디룸 임시 생성</button>
      <StudyroomFooter />{" "}
    </div>
  );
};

export default StudyroomTNContainer;
