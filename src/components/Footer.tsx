type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="flex items-center justify-center w-full h-[130px] bg-[#444655]">
      <div className="w-[1024px]">
        <div className="flex flex-row start-1">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/team-logo.png`}
            alt="Team Logo"
            className="h-8 w-8"
          />
          <p>BlueStarFish</p>
        </div>
        <div className="flex flex-row start-1">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/email.png`}
            alt="Logo"
            className="h-6 w-6"
          />
          <p>bluestarfish246@gmail.com</p>
        </div>
        <div className="flex flex-row start-1">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/tool.png`}
            alt="Logo"
            className="h-6 w-6"
          />
          <p>ian hailey ariel andy kanuda</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
