import React, { useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import FriendSearchContainer from "../components/Container/FriendSearchContainer";

type FriendSearchPageProps = {};

const FriendSearchPage: React.FC<FriendSearchPageProps> = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <FriendSearchContainer />
      <Footer />
    </div>
  );
};

export default FriendSearchPage;
