import React, { useState } from 'react';
import Header from '../components/Header';
import CreateStudyRoomContainer from '../components/Container/CreateStudyRoomContainer'
import Footer from '../components/Footer';

const CreateStudyRoomPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <CreateStudyRoomContainer />
      <Footer />
    </div>
  );
};

export default CreateStudyRoomPage;
