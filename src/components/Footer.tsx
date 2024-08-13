type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="flex items-center justify-center w-full h-[130px] bg-[#444655] text-white text-[14px]">
      <div className="w-[1024px]">
        <div className="flex flex-row start-1 gap-1 my-2">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/team-logo.png`}
            alt="Team Logo"
            className="h-5 w-5"
          />
          <p>BlueStarFish</p>
        </div>
        <div className="flex flex-row start-1 gap-1 my-2">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/email.png`}
            alt="Logo"
            className="h-5 w-5"
          />
          <p>bluestarfish246@gmail.com</p>
        </div>
        <div className="flex flex-row start-1 gap-1 my-2">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/tool.png`}
            alt="Logo"
            className="h-5 w-5"
          />
          <p>ian hailey ariel andy kanuda</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
