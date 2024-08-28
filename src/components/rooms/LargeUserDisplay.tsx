type LargeUserDisplayProps = {
  backgroundImage: string;
};

const LargeUserDisplay: React.FC<LargeUserDisplayProps> = ({
  backgroundImage,
}) => {
  return (
    <div
      className="w-[800px] h-[450px] bg-cover rounded-[20px] shadow-lg"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="top-0 left-0 w-full h-full flex items-end justify-start">
        <p className="m-5 ml-8 text-[16px]">닉네임</p>
      </div>
    </div>
  );
};

export default LargeUserDisplay;
