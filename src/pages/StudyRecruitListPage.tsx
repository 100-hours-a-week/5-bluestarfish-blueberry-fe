import React from 'react';
import Header from '../components/common/Header';
import RecruitStudyListContainer from '../components/Container/RecruitStudyListContainer'
import Footer from "../components/common/Footer";

type RecruitStudyListPageProps = {};

const RecruitStudyListPage: React.FC<RecruitStudyListPageProps> = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header /> {/* 헤더 */}
      <RecruitStudyListContainer />
      <Footer />
    </div>
  );
};

export default RecruitStudyListPage;