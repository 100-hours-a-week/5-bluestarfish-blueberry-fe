import React, { useState } from 'react';
import BasicHeader from '../components/common/BasicHeader';
import Footer from '../components/common/Footer';
import RecruitStudyCreateContainer from '../components/Container/RecruitStudyCreateContainer';

const RecruitStudyCreatePage: React.FC = () => {

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BasicHeader />
      <RecruitStudyCreateContainer />
      <Footer />
    </div>
  );
};

export default RecruitStudyCreatePage;