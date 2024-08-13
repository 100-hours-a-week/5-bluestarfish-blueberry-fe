type TNHeaderProps = {};

const TNHeader: React.FC<TNHeaderProps> = () => {
  return (
    <div className="mx-[8px] my-[3px] flex justify-between">
      <div className="flex">
        <button>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/camera.png`}
            alt="camera-button"
            className="w-[25px] h-[25px]"
          />
        </button>
        <button>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/music.png`}
            alt="music-botton"
            className="w-[25px] h-[25px]"
          />
        </button>
      </div>
      <div className="flex">
        <button>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/person.png`}
            alt="music-botton"
            className="w-[25px] h-[25px]"
          />
        </button>
        <div>1/5</div>
      </div>
    </div>
  );
};

export default TNHeader;
