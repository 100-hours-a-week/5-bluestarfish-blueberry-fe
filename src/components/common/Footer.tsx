type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="flex items-center justify-center w-full h-[130px] bg-[#444655] text-white text-[14px] mt-auto">
      <div className="w-[1024px] mb-[-15px]">
        <div className="flex flex-row start-1 gap-1 my-[-2px]">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/team-logo.png`}
            alt="Team Logo"
            className="h-8 w-8 relative top-[-5px]"
          />
          <p>BlueStarFish</p>
        </div>
        <div className="flex flex-row start-1 gap-3 my-[-2px]">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/email.png`}
            alt="Team Email"
            className="h-5 w-5 relative top-[-2px] left-[5px] mr-[4px]"
          />
          <p>bluestarfish246@gmail.com</p>
        </div>
        <div className="flex flex-row start-1 gap-3 my-[10px]">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/tool.png`}
            alt="Team Info"
            className="h-5 w-5 relative top-[-2px] left-[5px] mr-[4px]"
          />
          <p>ian hailey ariel andy kanuda</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
