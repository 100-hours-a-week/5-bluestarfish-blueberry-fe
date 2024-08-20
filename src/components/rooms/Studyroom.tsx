type StudyroomProps = {};

const Studyroom: React.FC<StudyroomProps> = () => {
  return (
    <div className="my-[24px] mr-[17px]">
      <div className="w-[187px] h-[171px] rounded-[10px] bg-[#D9D9D9] p-2">
        <div className="flex justify-between">
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
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/person.png`}
          alt="studyroom-thumbnail"
          className="w-[187px] h-[142px]"
        />
      </div>
      <div className="flex items-center justify-center w-[187px] h-[30px] bg-[#D9D9D9] my-2">
        방제
      </div>
    </div>
  );
};

export default Studyroom;
