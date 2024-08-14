const studyRecruitData = [
    {
        id: 1,
        user: {
            id: 1,
            email: "test@test.com",
            nickname: "쥐포",
            profileImage: `${process.env.PUBLIC_URL}/assets/images/user1.png`,
        },
        roomId: 3,
        title: "쥐가 네 마리 모이면?",
        content: "찍찍",
        type: "FINDING_MEMBERS",
        isRecruited: true,
        isCamOn: true,
        createdAt: "2024/08/10 03:00:12"
    },
    {
        id: 2,
        user: {
            id: 1,
            email: "test2@test.com",
            nickname: "열받아",
            profileImage: `${process.env.PUBLIC_URL}/assets/images/user2.png`,
        },
        roomId: 1,
        title: "세상에서 가장 뜨거운 바다는?",
        content: "앗뜨거",
        type: "FINDING_ROOMS",
        isRecruited: false,
        isCamOn: false,
        createdAt: "2024/08/10 03:00:12"
    },
    {
        id: 3,
        user: {
            id: 3,
            email: "test3@test.com",
            nickname: "최저임금",
            profileImage: `${process.env.PUBLIC_URL}/assets/images/user3.png`,
        },
        roomId: 1,
        title: "세상에서 가장 가난한 왕은?",
        content: "가난뱅이",
        type: "FINDING_ROOMS",
        isRecruited: true,
        isCamOn: true,
        createdAt: "2024/08/10 03:00:27"
    },
    {
        id: 4,
        user: {
            id: 4,
            email: "test4@test.com",
            nickname: "다이소",
            profileImage: `${process.env.PUBLIC_URL}/assets/images/user4.png`,
        },
        roomId: 5,
        title: "소가 죽으면?",
        content: "주겄소",
        type: "FINDING_ROOMS",
        isRecruited: false,
        isCamOn: true,
        createdAt: "2024/08/10 03:00:30"
    },
    {
        id: 5,
        user: {
            id: 5,
            email: "test5@test.com",
            nickname: "철푸덕",
            profileImage: `${process.env.PUBLIC_URL}/assets/images/user5.png`,
        },
        roomId: 5,
        title: "오리가 넘어지면?",
        content: "아프겠지",
        type: "FINDING_MEMBERS",
        isRecruited: false,
        isCamOn: false,
        createdAt: "2024/08/10 04:00:30"
    },
    {
        id: 6,
        user: {
            id: 6,
            email: "test6@test.com",
            nickname: "카놀라유",
            profileImage: `${process.env.PUBLIC_URL}/assets/images/user6.png`,
        },
        roomId: 6,
        title: "차를 발로 차면?",
        content: "경찰서",
        type: "FINDING_MEMBERS",
        isRecruited: true,
        isCamOn: false,
        createdAt: "2024/08/10 04:00:30"
    },
    {
        id: 7,
        user: {
            id: 7,
            email: "test7@test.com",
            nickname: "로딩중",
            profileImage: `${process.env.PUBLIC_URL}/assets/images/user7.png`,
        },
        roomId: 7,
        title: "세상에서 가장 지루한 학교 이름은?",
        content: "지루티비",
        type: "FINDING_ROOMS",
        isRecruited: true,
        isCamOn: false,
        createdAt: "2024/08/10 04:01:30"
    },
];

export default studyRecruitData;
