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
        ...filteredData.slice(
          prevRooms.length,
          prevRooms.length + roomsPerPage
        ),
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
                thumbnail={
                  room.thumbnail ||
                  `${process.env.PUBLIC_URL}/assets/images/study-thumbnail-1.png`
                }
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
        <div
          id="load-more-trigger"
          className="h-10 flex justify-center items-center"
        >
          {isLoading ? "Loading..." : "Scroll to load more"}
        </div>
      )}
      <StudyroomFooter />
    </div>
  );
};

export default StudyroomTNContainer;

// import React, { useState, useEffect } from "react";
// import StudyroomHeader from "../rooms/StudyroomHeader";
// import StudyroomMTN from "../rooms/StudyroomMTN";
// import StudyroomFooter from "../rooms/StudyroomFooter";
// import dummyStudyRooms from "../../data/studyRooms";
// import { useNavigate, useParams } from "react-router-dom";
// import axiosInstance from "../../utils/axiosInstance";

// interface StudyRoom {
//   id: number;
//   title: string;
//   camEnabled: boolean;
//   users: { id: number; name: string }[];
//   maxUsers: number;
//   thumbnail: string;
// }

// const StudyroomTNContainer: React.FC = () => {
//   const [studyRooms, setStudyRooms] = useState<StudyRoom[]>([]);
//   const [filteredData, setFilteredData] = useState<StudyRoom[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [selectedCategory, setSelectedCategory] = useState("전체보기");
//   const navigate = useNavigate();

//   const categories = [
//     { name: "전체보기", icon: "all.png" },
//     { name: "캠켜공", icon: "camera-on.png" },
//     { name: "캠끄공", icon: "camera-off.png" },
//   ];

//   useEffect(() => {
//     fetchStudyRooms();
//   }, []);

//   useEffect(() => {
//     setFilteredData(studyRooms);
//     console.log(studyRooms);
//   }, [studyRooms]);

//   useEffect(() => {
//     setFilteredData(
//       studyRooms.filter((item) => {
//         const matchesCategory =
//           selectedCategory === "전체보기" ||
//           (item.camEnabled === true && selectedCategory === "캠켜공") ||
//           (item.camEnabled === false && selectedCategory === "캠끄공");
//         return matchesCategory;
//       })
//     );
//   }, [selectedCategory]);

//   useEffect(() => {
//     const filterData = () => {
//       const filtered = studyRooms.filter((item) => {
//         const matchesCategory =
//           selectedCategory === "전체보기" ||
//           (item.camEnabled === true && selectedCategory === "캠켜공") ||
//           (item.camEnabled === false && selectedCategory === "캠끄공");
//         return matchesCategory;
//       });
//       setFilteredData(filtered);
//     };

//     filterData(); // 필터링 함수 호출
//   }, [studyRooms, selectedCategory]);

//   const handleCategoryClick = (category: string) => {
//     setSelectedCategory(category);
//   };

//   const fetchStudyRooms = async () => {
//     if (isLoading) return;
//     try {
//       setIsLoading(true);
//       const response = await axiosInstance.get(
//         `${process.env.REACT_APP_API_URL}/api/v1/rooms`
//       );
//       setStudyRooms(
//         Array.isArray(response.data.data.content)
//           ? response.data.data.content
//           : []
//       );
//     } catch (error) {
//       console.error("스터디룸 목록을 가져오는 중 오류 발생:", error);
//     } finally {
//       setIsLoading(false); // 로딩 종료
//     }
//   };

//   const makeStudyroom = async () => {
//     try {
//       const response = await axiosInstance.post(
//         `${process.env.REACT_APP_API_URL}/api/v1/rooms`,
//         {
//           title: "모각공",
//           maxUsers: 5,
//           camEnabled: true,
//           thumbnail: "s3 url",
//           password: "qlalsfqjsgh12!@",
//           description: "asdasdasdasdasdadadasda",
//         }
//       );

//       if (response.status === 200) {
//         alert("스터디룸 생성 성공!");
//       }
//     } catch (error) {
//       console.log(error);
//       alert("생성 실패!");
//     }
//   };

//   return (
//     <div className="my-4 max-w-[1024px]">
//       <StudyroomHeader
//         selectedCategory={selectedCategory}
//         categories={categories}
//         handleCategoryClick={handleCategoryClick}
//       />
//       <div className="my-5 mx-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-x-[22px] gap-y-[22px] w-full">
//         {filteredData.length > 0 ? (
//           filteredData.map((room) => (
//             <div key={room.id} className="cursor-pointer flex-grow">
//               <StudyroomMTN
//                 id={room.id}
//                 title={room.title}
//                 camEnabled={room.camEnabled}
//                 currentUsers={1}
//                 maxUsers={room.maxUsers}
//                 thumbnail={`${process.env.PUBLIC_URL}/assets/images/study-thumbnail-1.png`}
//                 isSelected={false}
//               />
//             </div>
//           ))
//         ) : (
//           <div className="cursor-pointer flex-grow">
//             <div className="w-[187px] h-[171px]"></div>
//           </div>
//         )}
//       </div>
//       <button onClick={makeStudyroom}>스터디룸 임시 생성</button>
//       <StudyroomFooter />{" "}
//     </div>
//   );
// };

// export default StudyroomTNContainer;
