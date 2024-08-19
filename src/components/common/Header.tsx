import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderModal from "../Modal/HeaderModal";
import AlarmModal from "../Modal/AlarmModal";

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
    <header className="fixed w-full bg-white z-50">
      <div className="flex items-center justify-between w-[1024px] h-[80px] mx-auto relative">
        <div className="flex items-center space-x-20">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
              alt="Logo"
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-[#6D81D5]">blueberry</span>
          </Link>
          <div className="relative w-[740px]">
            <input
              type="text"
              placeholder="Search..."
              className="w-[600px] h-[44px] p-2 border-b border-black"
            />
            <button className="absolute right-[140px] top-1/2 transform -translate-y-1/2">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/magnifier.png`}
                alt="Profile"
                className="w-[15px] cursor-pointer object-scale-down"
                // onClick={}
              />
            </button>
          </div>
        </div>
        <div className="relative flex">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/notification.png`}
            alt="Profile"
            className="h-9 w-9 rounded-full cursor-pointer mr-4 mt-1"
            onClick={toggleAlarmModal}
          />
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/profile-default-image.png`}
            alt="Profile"
            className="h-10 w-8 rounded-full cursor-pointer object-scale-down"
            onClick={toggleModal}
          />
          {isModalOpen && <HeaderModal closeModal={closeModal} />}
          {isAlarmModalOpen && <AlarmModal closeModal={closeAlarmModal} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
