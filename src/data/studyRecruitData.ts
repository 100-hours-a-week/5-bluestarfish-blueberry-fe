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
        createdAt: 1723276812
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
        createdAt: 1723276812
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
        createdAt: 1723276813
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
        createdAt: 1723276813
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
        createdAt: 1723276814
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
        createdAt: 1723276815
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
        createdAt: 1723276816
    },


    {
        id: 8,
        user: {
            id: 1,
            email: "test@test.com",
            nickname: "중고차",
            profileImage: `${process.env.PUBLIC_URL}/assets/images/user1.png`,
        },
        roomId: 3,
        title: "중학생과 고등학생이 타는 차는?",
        content: "TAXI",
        type: "FINDING_MEMBERS",
        isRecruited: true,
        isCamOn: true,
        createdAt: 1723276816
    },
    {
        id: 9,
        user: {
            id: 1,
            email: "test2@test.com",
            nickname: "열받아",
            profileImage: `${process.env.PUBLIC_URL}/assets/images/user2.png`,
        },
        roomId: 1,
        title: "학생들이 가장 싫어하는 피자는?",
        content: "책피자",
        type: "FINDING_ROOMS",
        isRecruited: false,
        isCamOn: false,
        createdAt: 1723276820
    },
    {
        id: 10,
        user: {
            id: 3,
            email: "test3@test.com",
            nickname: "뷰티풀",
            profileImage: `${process.env.PUBLIC_URL}/assets/images/user3.png`,
        },
        roomId: 1,
        title: "세상에서 가장 아름다운 식물은?",
        content: "프리티식물",
        type: "FINDING_ROOMS",
        isRecruited: true,
        isCamOn: true,
        createdAt: 1723276825
    },
    {
        id: 11,
        user: {
            id: 4,
            email: "test4@test.com",
            nickname: "문방구",
            profileImage: `${process.env.PUBLIC_URL}/assets/images/user4.png`,
        },
        roomId: 5,
        title: "달이 방구를 뀌면?",
        content: "뿡",
        type: "FINDING_ROOMS",
        isRecruited: false,
        isCamOn: true,
        createdAt: 1723276827
    },
    {
        id: 12,
        user: {
            id: 5,
            email: "test5@test.com",
            nickname: "십구만",
            profileImage: `${process.env.PUBLIC_URL}/assets/images/user5.png`,
        },
        roomId: 5,
        title: "세상에서 가장 쉬운 숫자는?",
        content: "쏘이지",
        type: "FINDING_MEMBERS",
        isRecruited: false,
        isCamOn: false,
        createdAt: 1723276830
    },
    {
        id: 13,
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
        createdAt: 1723276833
    },
    {
        id: 14,
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
        createdAt: 1723276835
    },
    {
        id: 15,
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
        createdAt: 1723276837
    },
    {
        id: 16,
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
        createdAt: 1723276837
    },
    {
        id: 17,
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
        createdAt: 1723276840
    },
    {
        id: 18,
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
        createdAt: 1723276843
    },
    {
        id: 19,
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
        createdAt: 1723276845
    },


    {
        id: 20,
        user: {
            id: 1,
            email: "test@test.com",
            nickname: "중고차",
            profileImage: `${process.env.PUBLIC_URL}/assets/images/user1.png`,
        },
        roomId: 3,
        title: "중학생과 고등학생이 타는 차는?",
        content: "TAXI",
        type: "FINDING_MEMBERS",
        isRecruited: true,
        isCamOn: true,
        createdAt: 1723276847
    },
    {
        id: 21,
        user: {
            id: 1,
            email: "test2@test.com",
            nickname: "열받아",
            profileImage: `${process.env.PUBLIC_URL}/assets/images/user2.png`,
        },
        roomId: 1,
        title: "학생들이 가장 싫어하는 피자는?",
        content: "책피자",
        type: "FINDING_ROOMS",
        isRecruited: false,
        isCamOn: false,
        createdAt: 1723276850
    },
    {
        id: 22,
        user: {
            id: 3,
            email: "test3@test.com",
            nickname: "뷰티풀",
            profileImage: `${process.env.PUBLIC_URL}/assets/images/user3.png`,
        },
        roomId: 1,
        title: "세상에서 가장 아름다운 식물은?",
        content: "프리티식물",
        type: "FINDING_ROOMS",
        isRecruited: true,
        isCamOn: true,
        createdAt: 1723276850
    },
    {
        id: 23,
        user: {
            id: 4,
            email: "test4@test.com",
            nickname: "문방구",
            profileImage: `${process.env.PUBLIC_URL}/assets/images/user4.png`,
        },
        roomId: 5,
        title: "달이 방구를 뀌면?",
        content: "뿡",
        type: "FINDING_ROOMS",
        isRecruited: false,
        isCamOn: true,
        createdAt: 1723276852
    },
    {
        id: 24,
        user: {
            id: 5,
            email: "test5@test.com",
            nickname: "십구만",
            profileImage: `${process.env.PUBLIC_URL}/assets/images/user5.png`,
        },
        roomId: 5,
        title: "세상에서 가장 쉬운 숫자는?",
        content: "쏘이지",
        type: "FINDING_MEMBERS",
        isRecruited: false,
        isCamOn: false,
        createdAt: 1723276855
    },
];

export default studyRecruitData;
