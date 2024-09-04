import React, { useState, useEffect, useRef } from "react";
import StudyroomHeader from "../rooms/StudyroomHeader";
import StudyroomMTN from "../rooms/StudyroomMTN";
import StudyroomFooter from "../rooms/StudyroomFooter";
import axiosInstance from "../../utils/axiosInstance";
import PasswordModal from "../Modal/PasswordModal";
import ToastNotification from "../common/ToastNotification";

interface StudyRoom {
  id: number;
  title: string;
  needPassword: boolean;
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
  const [filteredRooms, setFilteredRooms] = useState<StudyRoom[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [clickedRoomId, setClickedRoomId] = useState<number | null>(null);

  useEffect(() => {
    if (isPasswordModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isPasswordModalOpen]);

  const closeQnAModal = () => {
    setPasswordModalOpen(false);
  };

  const openQnAModal = () => {
    setPasswordModalOpen(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const roomsPerPage = isStudyRoomPage ? 15 : 10;

  const fetchStudyRooms = async (reset: boolean = false): Promise<void> => {
    try {
      setIsLoading(true);

      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/v1/rooms`,
        {
          params: {
            page: reset ? 0 : currentPage,
            size: roomsPerPage,
          },
        }
      );

      const roomsData = response.data.data.content;
      setTotalPages(response.data.data.totalPages);

      if (reset) {
        setStudyRoomsData(roomsData);
        setCurrentPage(1);
      } else {
        setStudyRoomsData((prevRooms) => [...prevRooms, ...roomsData]); // 기존 데이터에 새 데이터 추가
        setCurrentPage((prevPage) => prevPage + 1);
      }

      applyFilters(); // 필터링을 여기서 호출
    } catch (error) {
      console.error("스터디룸 목록을 불러오지 못했습니다:", error);
      if (reset) {
        setStudyRoomsData([]);
        setFilteredRooms([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...studyRoomsData];

    if (selectedCategory === "캠켜공") {
      filtered = filtered.filter((room) => room.camEnabled);
    } else if (selectedCategory === "캠끄공") {
      filtered = filtered.filter((room) => !room.camEnabled);
    }

    setFilteredRooms(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [studyRoomsData, selectedCategory]);

  useEffect(() => {
    setSelectedCategory("전체보기"); // 페이지가 처음 로드될 때 카테고리 설정
    fetchStudyRooms(true);
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const loadMoreRooms = async (): Promise<void> => {
    if (currentPage < totalPages && !isLoading) {
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

    return () => observer.current?.disconnect();
  }, [isLoading, currentPage, totalPages]);

  return (
    <div className="container mx-auto my-4 max-w-[1024px] px-4">
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
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <div key={room.id} className="flex justify-center">
              <StudyroomMTN
                id={room.id}
                title={room.title}
                needPassword={room.needPassword}
                camEnabled={room.camEnabled}
                currentUsers={room.memberNumber}
                maxUsers={room.maxUsers}
                thumbnail={
                  room.thumbnail ||
                  `${process.env.PUBLIC_URL}/assets/images/study-thumbnail-1.png`
                }
                isSelected={false}
                openModal={openQnAModal}
                setClickedRoomId={setClickedRoomId}
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
      {!isStudyRoomPage && <StudyroomFooter />}{" "}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 모달 배경 */}
          <div className="fixed inset-0 bg-black bg-opacity-50 pointer-events-none" />
          {/* 모달 내용 */}
          <div className="relative z-50">
            <PasswordModal
              roomId={clickedRoomId}
              closeModal={closeQnAModal}
              setShowToast={setShowToast}
            />
          </div>
        </div>
      )}
      {showToast && (
        <ToastNotification
          message="비밀번호가 틀렸습니다!"
          isSuccess={false}
          onClose={handleCloseToast}
        />
      )}
    </div>
  );
};

export default StudyroomTNContainer;
