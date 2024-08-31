import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderModal from "../Modal/HeaderModal";
import AlarmModal from "../Modal/AlarmModal";
import { useLoginedUserStore } from "../../store/store";

const Header: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAlarmModalOpen, setAlarmModalOpen] = useState(false);

  const { userId, profileImage } = useLoginedUserStore();

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
      <div className="flex items-center justify-between w-full max-w-[1024px] h-[80px] mx-auto px-4 md:px-0 relative">
        <div className="flex items-center space-x-4 md:space-x-20">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
              alt="Logo"
              className="h-8 w-8"
            />
            <span className="text-lg md:text-xl font-bold text-[#6D81D5]">blueberry</span>
          </Link>
          <div className="relative w-full max-w-[740px] hidden">
            {/* 검색 바 숨김 처리 */}
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-[44px] p-2 border-b border-black"
            />
            <button className="absolute right-[10px] top-1/2 transform -translate-y-1/2">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/magnifier.png`}
                alt="Search"
                className="w-[15px] cursor-pointer object-scale-down"
              />
            </button>
          </div>
        </div>

        <div className="relative flex">
          {userId !== 0 ? (
            <>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/notification.png`}
                alt="Notifications"
                className="h-9 w-9 rounded-full cursor-pointer mr-4 mt-1 hidden"
                onClick={toggleAlarmModal}
              />
              {/* 알림 아이콘 숨김 처리 */}
              <img
                src={
                  profileImage ||
                  `${process.env.PUBLIC_URL}/assets/images/profile-default-image.png`
                }
                alt="Profile"
                className="h-10 w-8 rounded-full cursor-pointer object-scale-down mr-3"
                onClick={toggleModal}
              />
              {isModalOpen && <HeaderModal closeModal={closeModal} />}
              {isAlarmModalOpen && <AlarmModal closeModal={closeAlarmModal} />}
            </>
          ) : (
            <Link
              to="/login"
              className="text-white bg-[#6D81D5] px-4 py-2 rounded-full"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
