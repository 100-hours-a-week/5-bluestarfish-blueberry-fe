import React from "react";
import Header from "../components/common/Header";
import MainPageContainer from "../components/Container/MainPageContainer";
import Footer from "../components/common/Footer";
import { useSetUserInfo } from "../utils/auth";
import { useEffect } from "react";
import NotificationComponent from "../components/notification/NotificationComponent";

type MainPageProps = {};

const MainPage: React.FC<MainPageProps> = () => {
  const { setUserInfo } = useSetUserInfo();
  useEffect(() => {
    setUserInfo();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <MainPageContainer />
      <Footer />
    </div>
  );
};

export default MainPage;
