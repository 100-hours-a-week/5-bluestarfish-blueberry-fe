# 🫐 Blueberry

## 📷 프로젝트 소개
실시간 화상채팅 스터디 캠 서비스
- **프로젝트의 목적 & 대상**:
  - 나와 비슷한 목표를 가진 사람들과 함께 동기부여하며 공부하고 싶은 사람들을 위함
  - 장소 제약 없이 스터디에 참여하고 싶은 사람들을 위한 솔루션

- **주요 기능**:
  - **목적에 맞는 스터디룸** 생성 & 참여 가능 (캠켜공 or 캠끄공)
  - **커뮤니티**를 통한 스터디룸 or 스터디원 모집
  - **친구 추가 & 초대** 기능을 통해 지인과 함께 공부
  - 최대 **5명**까지 스터디룸 참여 가능, **화상 채팅** 및 **일반 채팅** 지원
  - **랭킹** 및 **나의 스터디 시간 차트 제공**

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
`UI` `API 연결` `SSE 알림`||

## 🖥️ 서비스 화면
`메인`
|메인|
|--------------|
|<img width="1498" alt="image" src="https://github.com/user-attachments/assets/2b0154a7-7f77-4269-ad8d-f2af6ec74e09">|

`인증`
|로그인|회원가입|
|-----|-----|
|||

`스터디룸`
|스터디룸 목록|스터디룸 생성|
|-----|-----|
|||

|스터디룸 입장 대기|스터디룸 입장|
|-----|-----|
|||

|타이머|친구 초대|채팅|
|-----|-----|-----|
||||

`커뮤니티`
|게시글 목록|게시글 작성|
|-----|-----|
|||

|게시글 상세|게시글 수정|
|-----|-----|
|||

`마이 페이지`
|나의 정보|나의 정보 수정|나의 스터디|
|-----|-----|-----|
||||

`친구 관리`
|친구 목록|친구 검색|
|-----|-----|
|||
