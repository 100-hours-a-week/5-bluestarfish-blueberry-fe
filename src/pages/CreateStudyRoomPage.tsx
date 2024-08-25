import React, { useEffect } from "react";
import Header from "../components/common/Header";
import CreateStudyRoomContainer from "../components/Container/CreateStudyRoomContainer";
import Footer from "../components/common/Footer";
import { useSetUserInfo } from "../utils/auth";

const CreateStudyRoomPage: React.FC = () => {
  const { setUserInfo } = useSetUserInfo();
  useEffect(() => {
    setUserInfo();
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <CreateStudyRoomContainer />
      <Footer />
    </div>
  );
};

export default CreateStudyRoomPage;
