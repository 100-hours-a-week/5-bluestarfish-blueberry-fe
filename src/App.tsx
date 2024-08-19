import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StudyroomWaitPage from "./pages/StudyroomWaitPage";
import StudyroomPage from "./pages/StudyroomPage";
import RecruitStudyListPage from "./pages/RecruitStudyListPage";
import RecruitStudyCreatePage from "./pages/RecruitStudyCreatePage";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
