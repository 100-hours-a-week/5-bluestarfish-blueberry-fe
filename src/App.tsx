import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StudyroomWaitPage from "./pages/StudyroomWaitPage";
import StudyroomPage from "./pages/StudyroomPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/wait" element={<StudyroomWaitPage />} />
        <Route path="/studyroom/:roomId" element={<StudyroomPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
