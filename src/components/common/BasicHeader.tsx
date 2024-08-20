import React from "react";
import { Link } from "react-router-dom";

const BasicHeader: React.FC = () => {
  return (
    <header className="w-full bg-[#EBEEFF]">
      <div className="flex items-center justify-start w-full h-[80px] px-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
              alt="Logo"
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-[#6D81D5]">blueberry</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default BasicHeader;
