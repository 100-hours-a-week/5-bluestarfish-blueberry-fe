import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StudyroomWaitPage from "./pages/StudyroomWaitPage";
import StudyroomPage from "./pages/StudyroomPage";
import RecruitStudyListPage from "./pages/RecruitStudyListPage";
import RecruitStudyCreatePage from "./pages/RecruitStudyCreatePage";
import RecruitStudyDetailPage from "./pages/RecruitStudyDetailPage";
import CreateStudyRoomPage from "./pages/CreateStudyRoomPage";
import RecruitStudyUpdatePage from "./pages/RecruitStudyUpdatePage";
import StudyRoomsListPage from "./pages/StudyRoomsListPage";
import SetAuthNicknamePage from "./pages/SetAuthNicknamePage";
import MyInfoPage from "./pages/MyInfoPage";
import FriendListPage from "./pages/FriendListPage";
import FriendSearchPage from "./pages/FriendSearchPage";
import NotificationComponent from "./components/notification/NotificationComponent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/wait/:roomId" element={<StudyroomWaitPage />} />
        <Route path="/studyroom/:roomId" element={<StudyroomPage />} />
        <Route path="/recruit/list" element={<RecruitStudyListPage />} />
        <Route path="/recruit/create" element={<RecruitStudyCreatePage />} />
        <Route path="/recruit/:id" element={<RecruitStudyDetailPage />} />
        <Route path="/studyroom/create" element={<CreateStudyRoomPage />} />
        <Route path="/mypage" element={<MyInfoPage />} />
        <Route
          path="/recruit/update/:id"
          element={<RecruitStudyUpdatePage />}
        />
        <Route path="/setnickname" element={<SetAuthNicknamePage />} />
        <Route path="/rooms/list" element={<StudyRoomsListPage />} />
        <Route path="/friends/list" element={<FriendListPage />} />
        <Route path="/friends/search" element={<FriendSearchPage />} />
      </Routes>
      <NotificationComponent />
    </BrowserRouter>
  );
}

export default App;
