import React from "react";
import Header from "../components/common/Header";
import MyInfoContainer from "../components/Container/MyInfoContainer";
import Footer from "../components/common/Footer";
import { useSetUserInfo } from "../utils/auth";
import { useEffect } from "react";

type MyInfoPageProps = {};

const MyInfoPage: React.FC<MyInfoPageProps> = () => {
  const { setUserInfo } = useSetUserInfo();
  useEffect(() => {
    setUserInfo();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <MyInfoContainer />
      <Footer />
    </div>
  );
};

export default MyInfoPage;
