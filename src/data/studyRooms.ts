const studyRooms = [
  {
    id: 1,
    title: "정처기 뿌시기",
    maxUsers: 5,
    cam_enabled: true,
    thumbnail: "/assets/images/study-thumbnail-1.png",
    users: [
      { id: 1, nickname: "Ian" },
      { id: 3, nickname: "Andy" },
      { id: 2, nickname: "Ariel" },
    ],
  },
  {
    id: 2,
    title: "공시준비생",
    maxUsers: 5,
    cam_enabled: false,
    thumbnail: "/assets/images/study-thumbnail-2.png",
    users: [{ id: 1, nickname: "Ian" }],
  },
  {
    id: 3,
    title: "캠을 켜세요들",
    maxUsers: 5,
    cam_enabled: true,
    thumbnail: "/assets/images/study-thumbnail-3.png",
    users: [
      { id: 1, nickname: "Ian" },
      { id: 2, nickname: "Ariel" },
    ],
  },
  {
    id: 4,
    title: "개발자 커몬",
    maxUsers: 5,
    cam_enabled: true,
    thumbnail: "/assets/images/study-thumbnail-4.png",
    users: [
      { id: 1, nickname: "Ian" },
      { id: 2, nickname: "Ariel" },
      { id: 4, nickname: "Kanuda" },
      { id: 3, nickname: "Andy" },
    ],
  },
  {
    id: 5,
    title: "대학생방",
    maxUsers: 3,
    cam_enabled: false,
    thumbnail: "/assets/images/study-thumbnail-5.png",
    users: [
      { id: 4, nickname: "Kanuda" },
      { id: 5, nickname: "Hailey" },
    ],
  },
  {
    id: 6,
    title: "취준생방",
    maxUsers: 3,
    cam_enabled: false,
    thumbnail: "/assets/images/study-thumbnail-6.png",
    users: [{ id: 4, nickname: "Kanuda" }],
  },
];

export default studyRooms;
