type TNHeaderProps = {};

const TNHeader: React.FC<TNHeaderProps> = () => {
  return (
    <div className="mx-[8px] my-[5px] flex justify-between">
      <div className="flex">
        <button>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/camera-white.png`}
            alt="camera"
            className="w-[25px] h-[25px]"
          />
        </button>
      </div>
      <div className="flex items-start">
        <button>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/person-white.png`}
            alt="person"
            className="w-[25px] h-[25px]"
          />
        </button>
        <div className="text-[14px]">1/5</div>
      </div>
    </div>
  );
};

export default TNHeader;
