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
        title: "JavaScript 기초 스터디 멤버 모집",
        content: "JavaScript 기초 문법부터 프로젝트 실습까지 함께 할 멤버를 모집합니다. 초보자 환영!",
        type: "FINDING_ROOMS",
        isRecruited: true,
        isCamOn: true,
        createdAt: 1723276812,
        comments: [
            {
                id: 1,
                user: {
                    id: 2,
                    nickname: "열받아",
                    profileImage: `${process.env.PUBLIC_URL}/assets/images/user2.png`,
                },
                content: "이 스터디 정말 좋네요!",
                createdAt: 1723278612
            },
            {
                id: 2,
                user: {
                    id: 3,
                    nickname: "최저임금",
                    profileImage: `${process.env.PUBLIC_URL}/assets/images/user3.png`,
                },
                content: "참여하고 싶습니다.",
                createdAt: 1723278612
            },
            {
                id: 3,
                user: {
                    id: 4,
                    nickname: "다이소",
                    profileImage: `${process.env.PUBLIC_URL}/assets/images/user4.png`,
                },
                content: "정말 유익한 스터디입니다!",
                createdAt: 1723278612
            },
            {
                id: 4,
                user: {
                    id: 5,
                    nickname: "철푸덕",
                    profileImage: `${process.env.PUBLIC_URL}/assets/images/user5.png`,
                },
                content: "지금 바로 신청했어요.",
                createdAt: 1723278612
            },
            {
                id: 5,
                user: {
                    id: 6,
                    nickname: "카놀라유",
                    profileImage: `${process.env.PUBLIC_URL}/assets/images/user6.png`,
                },
                content: "많은 것을 배울 수 있겠어요.",
                createdAt: 1723278612
            },
            {
                id: 6,
                user: {
                    id: 7,
                    nickname: "로딩중",
                    profileImage: `${process.env.PUBLIC_URL}/assets/images/user7.png`,
                },
                content: "오랜만에 괜찮은 스터디를 찾았네요.",
                createdAt: 1723278612
            },
            {
                id: 7,
                user: {
                    id: 8,
                    nickname: "속도위반",
                    profileImage: `${process.env.PUBLIC_URL}/assets/images/user1.png`,
                },
                content: "모두 열심히 합시다!",
                createdAt: 1723278612
            },
            {
                id: 8,
                user: {
                    id: 9,
                    nickname: "배고파",
                    profileImage: `${process.env.PUBLIC_URL}/assets/images/user2.png`,
                },
                content: "스터디 참여 신청 완료!",
                createdAt: 1723278612
            },
            {
                id: 9,
                user: {
                    id: 10,
                    nickname: "행복해",
                    profileImage: `${process.env.PUBLIC_URL}/assets/images/user3.png`,
                },
                content: "유익한 시간이 될 것 같습니다.",
                createdAt: 1723278612
            },
            {
                id: 10,
                user: {
                    id: 11,
                    nickname: "굿모닝",
                    profileImage: `${process.env.PUBLIC_URL}/assets/images/user4.png`,
                },
                content: "기대가 되네요!",
                createdAt: 1723278612
            },
            {
                id: 11,
                user: {
                    id: 12,
                    nickname: "노트북",
                    profileImage: `${process.env.PUBLIC_URL}/assets/images/user5.png`,
                },
                content: "스터디 일정은 어떻게 되나요?",
                createdAt: 1723278612
            },
            {
                id: 12,
                user: {
                    id: 13,
                    nickname: "고래밥",
                    profileImage: `${process.env.PUBLIC_URL}/assets/images/user6.png`,
                },
                content: "좋은 스터디네요!",
                createdAt: 1723278612
            },
            {
                id: 13,
                user: {
                    id: 14,
                    nickname: "깜찍이",
                    profileImage: `${process.env.PUBLIC_URL}/assets/images/user7.png`,
                },
                content: "정말 좋은 기회네요!",
                createdAt: 1723278612
            },
            {
                id: 14,
                user: {
                    id: 15,
                    nickname: "불사조",
                    profileImage: `${process.env.PUBLIC_URL}/assets/images/user1.png`,
                },
                content: "이 스터디에 참여하고 싶습니다.",
                createdAt: 1723278612
            },
            {
                id: 15,
                user: {
                    id: 16,
                    nickname: "호두과자",
                    profileImage: `${process.env.PUBLIC_URL}/assets/images/user2.png`,
                },
                content: "너무 기대됩니다!",
                createdAt: 1723278612
            },
            {
                id: 16,
                user: {
                    id: 17,
                    nickname: "바나나",
                    profileImage: `${process.env.PUBLIC_URL}/assets/images/user3.png`,
                },
                content: "스터디 일정 공유 부탁드려요.",
                createdAt: 1723278612
            },
            {
                id: 17,
                user: {
                    id: 18,
                    nickname: "우유빵",
                    profileImage: `${process.env.PUBLIC_URL}/assets/images/user4.png`,
                },
                content: "참여 의사 있습니다.",
                createdAt: 1723278612
            },
            {
                id: 18,
                user: {
                    id: 19,
                    nickname: "감자칩",
                    profileImage: `${process.env.PUBLIC_URL}/assets/images/user5.png`,
                },
                content: "스터디 기대됩니다.",
                createdAt: 1723278612
            },
            {
                id: 19,
                user: {
                    id: 20,
                    nickname: "토끼",
                    profileImage: `${process.env.PUBLIC_URL}/assets/images/user6.png`,
                },
                content: "지금 바로 신청하겠습니다!",
                createdAt: 1723278612
            },
            {
                id: 20,
                user: {
                    id: 21,
                    nickname: "고양이",
                    profileImage: `${process.env.PUBLIC_URL}/assets/images/user7.png`,
                },
                content: "잘 부탁드립니다.",
                createdAt: 1723278612
            },
            {
                id: 21,
                user: {
                    id: 22,
                    nickname: "호랑이",
                    profileImage: `${process.env.PUBLIC_URL}/assets/images/user1.png`,
                },
                content: "멋진 스터디가 될 것 같습니다.",
                createdAt: 1723278612
            },
            {
                id: 22,
                user: {
                    id: 23,
                    nickname: "사자",
                    profileImage: `${process.env.PUBLIC_URL}/assets/images/user2.png`,
                },
                content: "기대하겠습니다!",
                createdAt: 1723278612
            }
        ]
        
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
        title: "스터디 룸을 구합니다 (Python 심화)",
        content: "Python 심화 학습을 위한 스터디 룸을 구하고 있습니다. 관심 있는 분들은 연락주세요.",
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
        title: "React 초급 스터디 룸 모집 중",
        content: "React 기본 개념부터 시작하는 초급 스터디 룸입니다. 실습 위주로 진행합니다.",
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
        title: "Node.js 중급 스터디 룸을 찾습니다",
        content: "Node.js 중급 학습을 위한 스터디 룸을 구하고 있습니다. 함께 하실 분 구합니다.",
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
        title: "백엔드 개발 스터디 멤버 모집",
        content: "백엔드 개발 공부를 함께 할 멤버를 찾습니다. Spring Boot와 Django 다룹니다.",
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
        title: "프론트엔드 개발 스터디 멤버 구합니다",
        content: "HTML, CSS, JavaScript부터 React까지 다루는 프론트엔드 스터디입니다. 함께 성장해요.",
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
        title: "DevOps 스터디 룸 모집 중",
        content: "CI/CD 파이프라인 구축과 클라우드 인프라 관리에 관심 있는 분들 모여주세요.",
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
        title: "알고리즘 문제풀이 스터디 멤버 구합니다",
        content: "매주 정해진 알고리즘 문제를 풀고 리뷰하는 스터디입니다. 알고리즘 실력을 쌓고 싶다면 함께해요.",
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
        title: "데이터베이스 설계 스터디 룸 구합니다",
        content: "데이터베이스 설계 및 SQL 쿼리 최적화에 관심 있는 분을 찾습니다. 스터디 룸 구합니다.",
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
        title: "AI 및 머신러닝 스터디 룸 모집",
        content: "머신러닝 모델을 공부하고, 프로젝트를 진행할 스터디 룸을 모집합니다.",
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
        title: "UX/UI 디자인 스터디 룸",
        content: "UX/UI 디자인에 관심 있는 분들과 함께 스터디를 진행할 룸을 구하고 있습니다.",
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
        title: "C++ 프로그래밍 스터디 멤버 모집",
        content: "C++ 프로그래밍을 함께 공부할 스터디 멤버를 찾습니다. 기초부터 심화까지 다룹니다.",
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
        title: "Java 중급 스터디 멤버 모집",
        content: "Java 중급자들을 위한 스터디 멤버를 모집합니다. 매주 코딩 과제를 진행합니다.",
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
        title: "Linux 시스템 관리 스터디 룸",
        content: "Linux 시스템 관리와 쉘 스크립트 작성에 대해 학습하는 스터디 룸을 찾고 있습니다.",
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
        title: "Full Stack 개발자 스터디 룸 모집",
        content: "프론트엔드와 백엔드를 모두 다루는 풀스택 개발자 스터디 룸을 모집합니다.",
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
        title: "네트워크 프로그래밍 스터디 룸 구합니다",
        content: "TCP/IP 및 네트워크 프로그래밍에 관심 있는 분들과 함께 스터디 룸을 구하고 있습니다.",
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
        title: "안드로이드 앱 개발 스터디 멤버 모집",
        content: "Kotlin을 사용한 안드로이드 앱 개발 스터디입니다. 함께 성장할 멤버를 구합니다.",
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
        title: "데이터 분석 스터디 멤버 모집",
        content: "Python과 R을 사용한 데이터 분석 스터디입니다. 데이터 시각화와 통계 분석을 다룹니다.",
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
        title: "게임 개발 스터디 룸 모집",
        content: "Unity와 Unreal Engine을 사용하는 게임 개발 스터디 룸입니다. 관심 있는 분들 연락주세요.",
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
        title: "네트워크 보안 스터디 멤버 구합니다",
        content: "네트워크 보안 이론부터 실습까지 함께 학습할 스터디 멤버를 찾습니다.",
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
        title: "클라우드 컴퓨팅 스터디 룸 구합니다",
        content: "AWS, Azure와 같은 클라우드 플랫폼을 학습하는 스터디 룸을 구하고 있습니다.",
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
        title: "웹 애플리케이션 보안 스터디 룸",
        content: "OWASP Top 10을 다루는 웹 애플리케이션 보안 스터디 룸입니다. 관심 있는 분들 연락주세요.",
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
        title: "IT 프로젝트 관리 스터디 룸 모집",
        content: "Agile, Scrum 등을 중심으로 IT 프로젝트 관리 스터디 룸을 모집합니다.",
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
        title: "iOS 앱 개발 스터디 멤버 구합니다",
        content: "Swift로 iOS 앱을 개발하는 스터디입니다. 함께할 멤버를 모집합니다.",
        type: "FINDING_MEMBERS",
        isRecruited: false,
        isCamOn: false,
        createdAt: 1723276855
    },
];

export default studyRecruitData;
