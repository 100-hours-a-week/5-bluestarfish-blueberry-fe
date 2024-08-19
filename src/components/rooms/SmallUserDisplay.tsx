type SmallUserDisplayProps = {
  backgroundImage: string;
};

const SmallUserDisplay: React.FC<SmallUserDisplayProps> = ({
  backgroundImage,
}) => {
  return (
    <div
      className="w-[400px] h-[230px] bg-cover rounded-[20px] shadow-lg"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="top-0 left-0 w-full h-full flex items-end justify-between p-3">
        <p className="text-[16px]">닉네임</p>
        <button>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/speaker-off.png`}
            alt="speaker"
            className="h-[23px]"
          />
        </button>
      </div>
    </div>
  );
};

export default SmallUserDisplay;
