import React, { useState } from "react";

const Header: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

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
        <div className="relative">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/profile-default-image.png`}
            alt="Profile"
            className="h-8 w-8 rounded-full cursor-pointer"
            onClick={toggleModal}
          />
          {isModalOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg p-4">
              <p>Personal Information</p>
              {/* Add more content as needed */}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
