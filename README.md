# 🫐 Blueberry

## 📷 프로젝트 소개
실시간 화상채팅 스터디 캠 서비스
- **프로젝트의 목적 & 대상**:
  - `비슷한 목표를 가진 사람들`과 함께 `동기부여`하며 공부하고 싶은 사람들을 위함
  - `장소 제약 없이` 스터디에 참여하고 싶은 사람들을 위한 솔루션

- **주요 기능**:
  - `목적에 맞는 스터디룸` 생성 & 참여 가능 (캠켜공 or 캠끄공)
  - `커뮤니티`를 통한 스터디룸 or 스터디원 모집
  - `친구 추가 & 초대` 기능을 통해 지인과 함께 공부
  - 최대 `5명`까지 스터디룸 참여 가능, `화상 채팅` 및 `일반 채팅` 지원
  - `랭킹` 및 `나의 스터디 시간 차트` 제공

## 🏷️ 구조도
![blueberry 구조도](https://github.com/user-attachments/assets/162d72ab-4c2e-45ee-99e4-6fd03719d2cc)

## 🔧 설치 방법

```bash
# 타입스크립트 프로젝트 생성
npx create-react-app 디렉토리명 --template typescript

# Tailwind CSS 설치
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Zustand 설치
npm install zustand

# react-router-dom 설치
npm install react-router-dom

# 최신 버전 Tailwind CSS 설치
npm install tailwindcss@latest postcss@latest autoprefixer@latest
```

## 🔨 실행 방법

```bash
# production 배포 env실행
npm run build

# development 개발 env실행
npm start

# test 개발 env실행
npm run test
````

## 🧑🏻‍💻 프론트엔드 개발자
| 정예지 ([@yeji0214](https://github.com/yeji0214)) | 김성현 ([@boozeal](https://github.com/boozeal))|
|-------|-------|
`API 연결` `UI` `SSE 알림`|| `API 연결` `WebSocket(FE)` `WebRTC(FE)`

## 🖥️ 서비스 화면
`메인`
|메인|
|--------------|
|<img width="1498" alt="image" src="https://github.com/user-attachments/assets/2b0154a7-7f77-4269-ad8d-f2af6ec74e09">|

`인증`
|로그인|회원가입|
|-----|-----|
|<img width="1512" alt="image" src="https://github.com/user-attachments/assets/6da0ce25-1089-41ba-9169-6eee3cff8c92">|<img width="1512" alt="image" src="https://github.com/user-attachments/assets/24d13d55-0da3-4ff4-9ba0-f7bd7f83b01d">|

`스터디룸`
|스터디룸 목록|스터디룸 생성|
|-----|-----|
|<img width="1512" alt="image" src="https://github.com/user-attachments/assets/1f1874d0-d900-4782-af8d-18348d60c00a">|![image](https://github.com/user-attachments/assets/64750d65-eb75-49c4-92d5-fa44d6e0cd5a)|

|스터디룸 입장 대기|스터디룸 입장|
|-----|-----|
|![image](https://github.com/user-attachments/assets/bd85f2e0-0ebc-48ec-98d4-39437f1dfe3b)|![image](https://github.com/user-attachments/assets/72a1f158-23be-4038-8a44-983a8d3b7d7c)|

`스터디룸 내 사이드 바`
|타이머|친구 초대|채팅|
|-----|-----|-----|
|<img width="399" alt="image" src="https://github.com/user-attachments/assets/354d8e4c-d9e5-4d83-9122-f4ac1c019b4a">|<img width="529" alt="image" src="https://github.com/user-attachments/assets/97eeb850-a629-4f01-be5c-a79dae3f8ca1">|<img width="399" alt="image" src="https://github.com/user-attachments/assets/2b22fed2-6efd-4be7-9eb3-ca7751830460">|

`커뮤니티`
|게시글 목록|게시글 작성(멤버 찾기)|게시글 작성(룸 찾기)
|-----|-----|-----|
|<img width="1512" alt="image" src="https://github.com/user-attachments/assets/ca462383-3c2e-4935-806d-58caf5c2cac5">|![image](https://github.com/user-attachments/assets/05fda778-b9d7-4b26-860d-f324ff1e2334)|![image](https://github.com/user-attachments/assets/4ce171cc-dba1-4ac3-9ea7-5bcc866ae26f)|


|게시글 상세|게시글 수정|
|-----|-----|
|![image](https://github.com/user-attachments/assets/76773b4d-053e-416d-816e-89ebbd6e5c1a)|![image](https://github.com/user-attachments/assets/aeeb4368-f9f3-42d1-ace4-6dc25151920c)|

`마이 페이지`
|나의 정보|나의 정보 수정|나의 스터디|
|-----|-----|-----|
|![image](https://github.com/user-attachments/assets/8eb4e5bd-0b1a-4785-b7de-74e3814f2350)|![image](https://github.com/user-attachments/assets/166b402b-bef7-4078-8673-1f75fb794784)|![image](https://github.com/user-attachments/assets/5297bb05-4697-43c9-8d72-af063f315a00)|

`친구 관리`
|친구 목록|친구 검색|
|-----|-----|
|<img width="1512" alt="image" src="https://github.com/user-attachments/assets/e327c4b5-49a6-41a9-b94b-968f99cb1072">|<img width="1512" alt="image" src="https://github.com/user-attachments/assets/62a94bee-a62e-4b29-b5ff-7b72b224617b">|

## 🪐 트러블 슈팅
| 정예지 ([@yeji0214](https://github.com/yeji0214))|
|-------|
[헬퍼텍스트 색상 변경 안 되는 문제 - (Tailwind CSS)](https://devyeji.tistory.com/entry/KTB-%ED%8C%8C%EC%9D%B4%EB%84%90-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85-%ED%97%AC%ED%8D%BC%ED%85%8D%EC%8A%A4%ED%8A%B8-%EC%83%89%EC%83%81-%EB%B3%80%EA%B2%BD-%EC%95%88-%EB%90%98%EB%8A%94-%EB%AC%B8%EC%A0%9C-Tailwind-CSS)|
|[input 포커스 시 밑줄 색상 변경 문제 (Tailwind CSS - peer)](https://devyeji.tistory.com/entry/KTB-%ED%8C%8C%EC%9D%B4%EB%84%90-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85-input-%ED%8F%AC%EC%BB%A4%EC%8A%A4-%EC%8B%9C-%EB%B0%91%EC%A4%84-%EC%83%89%EC%83%81-%EB%B3%80%EA%B2%BD-%EB%AC%B8%EC%A0%9C-Tailwind-CSS-peer)|
