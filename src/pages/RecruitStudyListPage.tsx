import React from 'react';
import Header from '../components/Header';
import RecruitStudyListContainer from '../components/Container/RecruitStudyListContainer'
import Footer from "../components/Footer";

type RecruitStudyListPageProps = {};

const RecruitStudyListPage: React.FC<RecruitStudyListPageProps> = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header /> {/* 헤더 */}
      <RecruitStudyListContainer />
      <Footer />
    </div>
  );
};

export default RecruitStudyListPage;
