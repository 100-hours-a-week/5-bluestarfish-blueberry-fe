import { useNavigate } from "react-router-dom";
import SmallUserDisplay from "../SmallUserDisplay";

type StudyroomContainerProps = {};

const StudyroomContainer: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/studyroom");
  };
  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      <div className="my-12  flex flex-wrap gap-8 justify-center">
        <SmallUserDisplay
          backgroundImage={`${process.env.PUBLIC_URL}/assets/images/user-display-default.png`}
        />
        <SmallUserDisplay
          backgroundImage={`${process.env.PUBLIC_URL}/assets/images/user-display-default.png`}
        />
        <SmallUserDisplay
          backgroundImage={`${process.env.PUBLIC_URL}/assets/images/user-display-default.png`}
        />
        <SmallUserDisplay
          backgroundImage={`${process.env.PUBLIC_URL}/assets/images/user-display-default.png`}
        />
        <SmallUserDisplay
          backgroundImage={`${process.env.PUBLIC_URL}/assets/images/user-display-default.png`}
        />
      </div>
      <div className="mt-10 flex flex-row gap-5">
        <button>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/camera-white.png`}
            alt="camera"
            className="h-[32px]"
          />
        </button>
        <button>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/mic-white.png`}
            alt="mic"
            className="h-[28px]"
          />
        </button>
        <button>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/speaker-white.png`}
            alt="speaker"
            className="h-[26px]"
          />
        </button>{" "}
        <button>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/exit-white.png`}
            alt="speaker"
            className="h-[26px]"
          />
        </button>
      </div>
    </div>
  );
};

export default StudyroomContainer;
