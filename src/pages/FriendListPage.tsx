import React, { useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import FriendListContainer from "../components/Container/FriendListContainer";

type FriendListPageProps = {};

const FriendListPage: React.FC<FriendListPageProps> = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <FriendListContainer />
      <Footer />
    </div>
  );
};

export default FriendListPage;
