import React, { useState } from "react";
import HeaderModal from "./Modal/HeaderModal";
import AlarmModal from "./Modal/AlarmModal";

const Header: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAlarmModalOpen, setAlarmModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const toggleAlarmModal = () => {
    setAlarmModalOpen(!isAlarmModalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const closeAlarmModal = () => {
    setAlarmModalOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-white z-50">
      <div className="flex items-center justify-between w-[1024px] h-[80px] mx-auto relative">
        <div className="flex items-center space-x-4">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
            alt="Logo"
            className="h-8 w-8"
          />
          <span className="text-xl font-bold text-[#6D81D5] text-sh">
            blueberry
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-[740px] h-[44px] p-2 border-b-2 border-gray-300 bg-white"
          />
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/magnifier.png`}
            className="absolute right-[130px]"
          ></img>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <div className="flex rounded-full border-[1px] border-[#a5a5a5] w-[40px] h-[40px] items-center justify-center shadow-lg">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/bell.png`}
              alt="Profile"
              className="h-[21px] rounded-full cursor-pointer"
              onClick={toggleAlarmModal}
            />
          </div>
          <div className="flex rounded-full border-[1px] border-[#a5a5a5] w-[40px] h-[40px] items-center justify-center shadow-lg">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/profile-default-image.png`}
              alt="Profile"
              className="h-8 w-8 rounded-full cursor-pointer"
              onClick={toggleModal}
            />
          </div>
        </div>
      </div>
      {isModalOpen && <HeaderModal closeModal={closeModal} />}
      {isAlarmModalOpen && <AlarmModal closeModal={closeAlarmModal} />}
    </header>
  );
};

export default Header;
