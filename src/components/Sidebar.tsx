import { useState } from "react";
import HomeContainer from "./Container/HomeContainer";
import ChatContainer from "./Container/ChatContainer";

type SidebarProps = {
  toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ toggleSidebar }) => {
  const [activeButton, setActiveButton] = useState<string>("home");
  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="bg-white w-[400px] text-white fixed right-0 top-0 h-full shadow-lg">
      <div className="flex justify-between border-b border-black p-5">
        <button className="" onClick={toggleSidebar}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/close.png`}
            alt="Exit"
            className="w-[20px] cursor-pointer"
          />
        </button>
        <div className="flex items-end gap-1">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/people.png`}
            alt="Exit"
            className="w-[31px] cursor-pointer"
          />
          <p className="text-[20px] text-black font-bold text-shadow-lg">5</p>
        </div>
      </div>
      <div className="mt-12 flex justify-center gap-11">
        <button onClick={() => handleButtonClick("home")}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/home.png`}
            alt="Home"
            className="w-[30px] cursor-pointer"
          />
        </button>
        <button onClick={() => handleButtonClick("chat")}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/chat.png`}
            alt="Chat"
            className="w-[28px] cursor-pointer"
          />
        </button>
      </div>
      <div>
        <div
          className={`mt-[10px] ${
            activeButton === "home" ? "ml-[140px]" : "ml-[212px]"
          } w-[50px] h-[2px] bg-black`}
        ></div>
        <div className="mt-10 w-full">
          {activeButton === "home" && <HomeContainer />}
          {activeButton === "chat" && <ChatContainer />}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
