import React, { useEffect } from "react";
import Header from "../components/common/Header";
import StudyRoomsListContainer from "../components/Container/StudyRoomsListContainer";
import Footer from "../components/common/Footer";
import { useSetUserInfo } from "../utils/auth";

const StudyRoomsListPage: React.FC = () => {
  const { setUserInfo } = useSetUserInfo();
  useEffect(() => {
    setUserInfo();
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <StudyRoomsListContainer />
      <Footer />
    </div>
  );
};

export default StudyRoomsListPage;
