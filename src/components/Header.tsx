import React, { useState } from "react";

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
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
            alt="Logo"
            className="h-8 w-8"
          />
          <span className="text-xl font-bold text-[#6D81D5]">blueberry</span>
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
            className="h-8 w-8 rounded-full cursor-pointer mr-4"
            onClick={toggleNotificationModal}
          />
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/profile-default-image.png`}
            alt="Profile"
            className="h-8 w-8 rounded-full cursor-pointer"
            onClick={togglePersonalModal}
          />
          {isPersonalModalOpen && (
            <div className="absolute left-12 mt-8 w-48 bg-white text-black rounded-lg shadow-lg p-4">
              <p>Personal Information</p>
            </div>
          )}
          {isNotificationModalOpen && (
            <div className="absolute right--16 mt-8 w-48 bg-white text-black rounded-lg shadow-lg p-4">
              <p>Notifications</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
