import React from 'react';
import Header from '../components/Header';
import RecruitStudyListContainer from '../components/Container/RecruitStudyListContainer'

type LoginPageProps = {};

const LoginPage: React.FC<LoginPageProps> = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header /> {/* 헤더 */}
      <RecruitStudyListContainer />
    </div>
  );
};

export default LoginPage;
