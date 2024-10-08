export type Friend = {
    id: number;
    name: string;
    profileImage: string;
    studyTime: string;
    isFriend: boolean; // 친구 여부
    isRequestSent: boolean; // 친구 요청 여부
};

export const friendsData: Friend[] = [
    {
        id: 1,
        name: "붕어빵 말티즈",
        profileImage: `${process.env.PUBLIC_URL}/assets/images/profile1.png`,
        studyTime: "10:45:20",
        isFriend: true,
        isRequestSent: false,
    },
    {
        id: 2,
        name: "루돌프 몰티즈",
        profileImage: `${process.env.PUBLIC_URL}/assets/images/profile2.png`,
        studyTime: "12:08:00",
        isFriend: true,
        isRequestSent: false,
    },
    {
        id: 3,
        name: "그냥 기요밍",
        profileImage: `${process.env.PUBLIC_URL}/assets/images/profile3.png`,
        studyTime: "10:45:20",
        isFriend: false,
        isRequestSent: false,
    },
    {
        id: 4,
        name: "생일 축하추카포",
        profileImage: `${process.env.PUBLIC_URL}/assets/images/profile4.png`,
        studyTime: "08:32:14",
        isFriend: true,
        isRequestSent: false,
    },
    {
        id: 5,
        name: "붕어빵 땡긴다",
        profileImage: `${process.env.PUBLIC_URL}/assets/images/profile1.png`,
        studyTime: "08:32:14",
        isFriend: false,
        isRequestSent: false,
    },
];
