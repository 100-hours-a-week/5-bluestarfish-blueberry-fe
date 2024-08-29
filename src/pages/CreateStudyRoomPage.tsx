import React, { useEffect } from "react";
import Header from "../components/common/Header";
import CreateStudyRoomContainer from "../components/Container/CreateStudyRoomContainer";
import Footer from "../components/common/Footer";
import { useAuthCheck } from "../utils/auth";

const CreateStudyRoomPage: React.FC = () => {
  const { authCheck } = useAuthCheck();
  useEffect(() => {
    authCheck();
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
