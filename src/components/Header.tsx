import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isPersonalModalOpen, setPersonalModalOpen] = useState(false);
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);

  const togglePersonalModal = () => {
    setPersonalModalOpen(!isPersonalModalOpen);
  };

  const toggleNotificationModal = () => {
    setNotificationModalOpen(!isNotificationModalOpen)
  }

  return (
    <header className="w-full bg-white">
      <div className="flex items-center justify-between w-[1024px] h-[80px] mx-auto relative">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
              alt="Logo"
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-[#6D81D5]">blueberry</span>
          </Link>
          <input
            type="text"
            placeholder="Search..."
            className="w-[740px] h-[44px] p-2 rounded-lg border border-gray-300 bg-[#EEEEFF]"
          />
        </div>
        <div className="relative flex">
        <img
            src={`${process.env.PUBLIC_URL}/assets/images/notification.png`}
            alt="Profile"
            className="h-9 w-9 rounded-full cursor-pointer mr-4 mt-1"
            onClick={toggleNotificationModal}
          />
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/profile-default-image.png`}
            alt="Profile"
            className="h-10 w-8 rounded-full cursor-pointer object-scale-down"
            onClick={togglePersonalModal}
          />
          {isPersonalModalOpen && (
            <div className="absolute left-12 mt-9 w-48 bg-white text-black rounded-lg shadow-lg p-4 z-10">
              <p>Personal Information</p>
            </div>
          )}
          {isNotificationModalOpen && (
            <div className="absolute right--16 mt-9 w-48 bg-white text-black rounded-lg shadow-lg p-4 z-10">
              <p>Notifications</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
