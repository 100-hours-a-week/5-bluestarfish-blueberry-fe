import React, { useState, useEffect, useRef } from "react";
import StudyroomHeader from "../rooms/StudyroomHeader";
import StudyroomMTN from "../rooms/StudyroomMTN";
import StudyroomFooter from "../rooms/StudyroomFooter";
import studyRooms from "../../data/studyRooms"; // 더미 데이터 임포트

interface StudyRoom {
  id: number;
  title: string;
  camEnabled: boolean;
  users: { id: number; nickname: string }[];
  maxUsers: number;
  thumbnail: string;
}

interface StudyroomTNContainerProps {
  isStudyRoomPage?: boolean;
}

const StudyroomTNContainer: React.FC<StudyroomTNContainerProps> = ({
  isStudyRoomPage = false, // 기본값 설정
}) => {
  const [studyRoomsData, setStudyRoomsData] = useState<StudyRoom[]>(studyRooms); // 더미 데이터를 초기값으로 설정
  const [filteredData, setFilteredData] = useState<StudyRoom[]>([]);
  const [displayedRooms, setDisplayedRooms] = useState<StudyRoom[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("전체보기");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const roomsPerPage = isStudyRoomPage ? 15 : 10;

  useEffect(() => {
    const filterRooms = () => {
      const filtered = studyRoomsData.filter((item) => {
        const matchesCategory =
          selectedCategory === "전체보기" ||
          (item.camEnabled === true && selectedCategory === "캠켜공") ||
          (item.camEnabled === false && selectedCategory === "캠끄공");
        return matchesCategory;
      });
      setFilteredData(filtered);
      setDisplayedRooms(filtered.slice(0, roomsPerPage)); // 처음에 표시할 방 수 설정
    };

    filterRooms();
  }, [studyRoomsData, selectedCategory, isStudyRoomPage]);

  const loadMoreRooms = () => {
    if (isLoading || displayedRooms.length >= filteredData.length) return;
    setIsLoading(true);
    setTimeout(() => {
      setDisplayedRooms((prevRooms) => [
        ...prevRooms,
        ...filteredData.slice(prevRooms.length, prevRooms.length + roomsPerPage),
      ]);
      setIsLoading(false);
    }, 500); // 데이터 로드 시 약간의 지연시간 추가
  };

  useEffect(() => {
    if (!isStudyRoomPage) return;
  
    if (observer.current) observer.current.disconnect();
  
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreRooms();
        }
      },
      { threshold: 1 }
    );
  
    const loadMoreTriggerElement = document.querySelector("#load-more-trigger");
  
    if (loadMoreTriggerElement) {
      observer.current.observe(loadMoreTriggerElement);
    }
  
    return () => observer.current?.disconnect();
  }, [filteredData, displayedRooms]);
  

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="my-4 max-w-[1024px]">
      <StudyroomHeader
        selectedCategory={selectedCategory}
        categories={[
          { name: "전체보기", icon: "all.png" },
          { name: "캠켜공", icon: "camera-on.png" },
          { name: "캠끄공", icon: "camera-off.png" },
        ]}
        handleCategoryClick={handleCategoryClick}
        isStudyRoomPage={isStudyRoomPage} // 스터디룸 페이지 여부를 전달
      />
      <div className="my-5 mx-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-x-[22px] gap-y-[22px] w-full">
        {displayedRooms.length > 0 ? (
          displayedRooms.map((room) => (
            <div key={room.id} className="cursor-pointer flex-grow">
              <StudyroomMTN
                id={room.id}
                title={room.title}
                camEnabled={room.camEnabled}
                currentUsers={room.users.length}
                maxUsers={room.maxUsers}
                thumbnail={room.thumbnail || `${process.env.PUBLIC_URL}/assets/images/study-thumbnail-1.png`}
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
      {isStudyRoomPage && displayedRooms.length < filteredData.length && (
        <div id="load-more-trigger" className="h-10 flex justify-center items-center">
          {isLoading ? "Loading..." : "Scroll to load more"}
        </div>
      )}
      <StudyroomFooter />
    </div>
  );
};

export default StudyroomTNContainer;
