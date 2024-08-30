import React, { useState, useEffect, useRef } from "react";
import StudyroomHeader from "../rooms/StudyroomHeader";
import StudyroomMTN from "../rooms/StudyroomMTN";
import StudyroomFooter from "../rooms/StudyroomFooter";
import axiosInstance from "../../utils/axiosInstance";

interface StudyRoom {
  id: number;
  title: string;
  maxUsers: number;
  camEnabled: boolean;
  thumbnail: string;
  memberNumber: number;
  users?: any[];
}

interface StudyroomTNContainerProps {
  isStudyRoomPage?: boolean;
}

const StudyroomTNContainer: React.FC<StudyroomTNContainerProps> = ({
  isStudyRoomPage = false,
}) => {
  const [studyRoomsData, setStudyRoomsData] = useState<StudyRoom[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("전체보기");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // roomsPerPage는 isStudyRoomPage에 따라 15 또는 10으로 설정
  const roomsPerPage = isStudyRoomPage ? 15 : 10;

  const fetchStudyRooms = async (reset: boolean = false): Promise<void> => {
    try {
      setIsLoading(true);

      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/v1/rooms`,
        {
          params: {
            page: reset ? 0 : currentPage, // 초기 로드 시 0페이지부터
            size: roomsPerPage, // 페이지당 방의 수
            category: selectedCategory !== "전체보기" ? selectedCategory : undefined,
          },
        }
      );

      const roomsData = response.data.data.content;
      setTotalPages(response.data.data.totalPages);

      if (reset) {
        setStudyRoomsData(roomsData);
        setCurrentPage(1); // 초기화 후 다음 페이지는 1부터 시작
      } else {
        setStudyRoomsData((prevRooms) => [...prevRooms, ...roomsData]);
        setCurrentPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("스터디룸 목록을 불러오지 못했습니다:", error);
      if (reset) {
        setStudyRoomsData([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudyRooms(true); // 초기 로드 시 데이터 초기화
  }, [selectedCategory]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    fetchStudyRooms(true); // 카테고리 변경 시 데이터 초기화
  };

  const loadMoreRooms = async (): Promise<void> => {
    if (currentPage < totalPages && !isLoading) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500)); // 지연 시간 추가 (0.5초)
      await fetchStudyRooms();
    }
  };

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!isStudyRoomPage) return;

    if (observer.current) observer.current.disconnect();

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !isLoading) {
        loadMoreRooms();
      }
    };

    observer.current = new IntersectionObserver(handleObserver, {
      threshold: 1,
    });

    const loadMoreTriggerElement = document.querySelector("#load-more-trigger");

    if (loadMoreTriggerElement) {
      observer.current.observe(loadMoreTriggerElement);
    }

    // 강제 트리거: 스크롤이 충분하지 않을 경우 데이터 추가 로드
    if (document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
      loadMoreRooms();
    }

    return () => observer.current?.disconnect();
  }, [isLoading, currentPage, totalPages]);

  return (
    <div className="container mx-auto my-4 max-w-[1024px]">
      <StudyroomHeader
        selectedCategory={selectedCategory}
        categories={[
          { name: "전체보기", icon: "all.png" },
          { name: "캠켜공", icon: "camera-on.png" },
          { name: "캠끄공", icon: "camera-off.png" },
        ]}
        handleCategoryClick={handleCategoryClick}
        isStudyRoomPage={isStudyRoomPage}
      />
      <div className="my-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
        {studyRoomsData.length > 0 ? (
          studyRoomsData.map((room) => (
            <div key={room.id} className="flex justify-center">
              <StudyroomMTN
                id={room.id}
                title={room.title}
                camEnabled={room.camEnabled}
                currentUsers={room.memberNumber}
                maxUsers={room.maxUsers}
                thumbnail={
                  room.thumbnail ||
                  `${process.env.PUBLIC_URL}/assets/images/study-thumbnail-1.png`
                }
                isSelected={false}
              />
            </div>
          ))
        ) : (
          <div className="flex justify-center">
            <div className="w-[187px] h-[171px]"></div>
          </div>
        )}
      </div>
      {isStudyRoomPage && currentPage < totalPages && (
        <div
          id="load-more-trigger"
          className="h-10 flex justify-center items-center"
        >
          {isLoading ? "Loading..." : "Scroll to load more"}
        </div>
      )}
      {!isStudyRoomPage && <StudyroomFooter />}
    </div>
  );
};

export default StudyroomTNContainer;
