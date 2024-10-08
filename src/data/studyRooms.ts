const studyRooms = [
  {
    id: 1,
    title: "정처기 뿌시기",
    maxUsers: 5,
    camEnabled: true,
    thumbnail: "/assets/images/study-thumbnail-1.png",
    memberNumber: 3,
  },
  {
    id: 2,
    title: "공시준비생",
    maxUsers: 5,
    camEnabled: false,
    thumbnail: "/assets/images/study-thumbnail-2.png",
    memberNumber: 2,
  },
  {
    id: 3,
    title: "캠을 켜세요들",
    maxUsers: 5,
    camEnabled: true,
    thumbnail: "/assets/images/study-thumbnail-3.png",
    memberNumber: 1,
  },
  {
    id: 4,
    title: "개발자 커몬",
    maxUsers: 5,
    camEnabled: true,
    thumbnail: "/assets/images/study-thumbnail-4.png",
    memberNumber: 1,
  },
  {
    id: 5,
    title: "대학생방",
    maxUsers: 3,
    camEnabled: false,
    thumbnail: "/assets/images/study-thumbnail-5.png",
    memberNumber: 4,
  },
  {
    id: 6,
    title: "취준생방",
    maxUsers: 3,
    camEnabled: false,
    thumbnail: "/assets/images/study-thumbnail-6.png",
    memberNumber: 1,
  },
  // {
  //   id: 7,
  //   title: "정처기 뿌시기",
  //   maxUsers: 5,
  //   camEnabled: true,
  //   thumbnail: "/assets/images/study-thumbnail-1.png",
  //   users: [
  //     { id: 1, nickname: "Ian" },
  //     { id: 3, nickname: "Andy" },
  //     { id: 2, nickname: "Ariel" },
  //   ],
  // },
  {
    id: 8,
    title: "공시준비생",
    maxUsers: 5,
    camEnabled: false,
    thumbnail: "/assets/images/study-thumbnail-2.png",
    memberNumber: 1,
  },
  {
    id: 9,
    title: "캠을 켜세요들",
    maxUsers: 5,
    camEnabled: true,
    thumbnail: "/assets/images/study-thumbnail-3.png",
    memberNumber: 1,
  },
  {
    id: 10,
    title: "개발자 커몬",
    maxUsers: 5,
    camEnabled: true,
    thumbnail: "/assets/images/study-thumbnail-4.png",
    memberNumber: 1,
  },
  {
    id: 11,
    title: "대학생방",
    maxUsers: 3,
    camEnabled: false,
    thumbnail: "/assets/images/study-thumbnail-5.png",
    memberNumber: 1,
  },
  {
    id: 12,
    title: "취준생방",
    maxUsers: 3,
    camEnabled: false,
    thumbnail: "/assets/images/study-thumbnail-6.png",
    memberNumber: 1,
  },
  {
    id: 13,
    title: "정처기 뿌시기",
    maxUsers: 5,
    camEnabled: true,
    thumbnail: "/assets/images/study-thumbnail-1.png",
    memberNumber: 1,
  },
  {
    id: 14,
    title: "공시준비생",
    maxUsers: 5,
    camEnabled: false,
    thumbnail: "/assets/images/study-thumbnail-2.png",
    memberNumber: 1,
  },
  {
    id: 15,
    title: "캠을 켜세요들",
    maxUsers: 5,
    camEnabled: true,
    thumbnail: "/assets/images/study-thumbnail-3.png",
    memberNumber: 1,
  },
  {
    id: 16,
    title: "개발자 커몬",
    maxUsers: 5,
    camEnabled: true,
    thumbnail: "/assets/images/study-thumbnail-4.png",
    memberNumber: 1,
  },
  {
    id: 17,
    title: "대학생방",
    maxUsers: 3,
    camEnabled: false,
    thumbnail: "/assets/images/study-thumbnail-5.png",
    memberNumber: 1,
  },
  {
    id: 18,
    title: "취준생방",
    maxUsers: 3,
    camEnabled: false,
    thumbnail: "/assets/images/study-thumbnail-6.png",
    memberNumber: 1,
  },
];

const doubledStudyRooms = studyRooms.map((room, index) => ({
  ...room,
  id: room.id + studyRooms.length, // 기존 id에 원래 데이터 길이만큼 더함
}));

const studyRoomsDoubled = [...studyRooms, ...doubledStudyRooms];

export default studyRoomsDoubled;
