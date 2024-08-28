import React, { useEffect } from "react";
import Header from "../components/common/Header";
import RecruitStudyListContainer from "../components/Container/RecruitStudyListContainer";
import Footer from "../components/common/Footer";
import { useSetUserInfo } from "../utils/auth";

type RecruitStudyListPageProps = {};

const RecruitStudyListPage: React.FC<RecruitStudyListPageProps> = () => {
  const { setUserInfo } = useSetUserInfo();
  useEffect(() => {
    setUserInfo();
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Header /> {/* 헤더 */}
      <RecruitStudyListContainer />
      <Footer />
    </div>
  );
};

export default RecruitStudyListPage;
