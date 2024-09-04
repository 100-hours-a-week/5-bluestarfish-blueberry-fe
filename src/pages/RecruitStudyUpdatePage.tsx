import React, { useEffect } from "react";
import BasicHeader from "../components/common/BasicHeader";
import Footer from "../components/common/Footer";
import RecruitStudyUpdateContainer from "../components/Container/RecruitStudyUpdateContainer";

import { useAuthCheck } from "../utils/auth";
const RecruitStudyUpdatePage: React.FC = () => {
  const { authCheck } = useAuthCheck();
  useEffect(() => {
    authCheck();
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BasicHeader />
      <RecruitStudyUpdateContainer />
      <Footer />
    </div>
  );
};

export default RecruitStudyUpdatePage;
