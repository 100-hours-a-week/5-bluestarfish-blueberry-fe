import React, { useEffect } from "react";
// import { useParams, useNavigate } from 'react-router-dom';
// import studyRecruitData from '../data/studyRecruitData';
import Header from "../components/common/Header";
import RecruitStudyDetailContainer from "../components/Container/RecruitStudyDetailContainer";
import Footer from "../components/common/Footer";
import "../global.css";
import { useSetUserInfo } from "../utils/auth";

const RecruitStudyDetailPage: React.FC = () => {
  const { setUserInfo } = useSetUserInfo();
  useEffect(() => {
    setUserInfo();
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header /> {/* 헤더 */}
      <RecruitStudyDetailContainer />
      <Footer />
    </div>
  );
};

export default RecruitStudyDetailPage;
