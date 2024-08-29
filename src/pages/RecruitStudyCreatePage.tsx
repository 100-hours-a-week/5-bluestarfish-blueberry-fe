import React, { useEffect } from "react";
import BasicHeader from "../components/common/BasicHeader";
import Footer from "../components/common/Footer";
import RecruitStudyCreateContainer from "../components/Container/RecruitStudyCreateContainer";

import { useAuthCheck } from "../utils/auth";

const RecruitStudyCreatePage: React.FC = () => {
  const { authCheck } = useAuthCheck();
  useEffect(() => {
    authCheck();
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
