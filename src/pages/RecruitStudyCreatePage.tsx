import React, { useEffect } from "react";
import BasicHeader from "../components/common/BasicHeader";
import Footer from "../components/common/Footer";
import RecruitStudyCreateContainer from "../components/Container/RecruitStudyCreateContainer";
import { useSetUserInfo } from "../utils/auth";

const RecruitStudyCreatePage: React.FC = () => {
  const { setUserInfo } = useSetUserInfo();
  useEffect(() => {
    setUserInfo();
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BasicHeader />
      <RecruitStudyCreateContainer />
      <Footer />
    </div>
  );
};

export default RecruitStudyCreatePage;
