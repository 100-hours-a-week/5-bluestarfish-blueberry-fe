import Ranking from "../Ranking";
import StudyroomContainer from "./StudyroomContainer";

const MainPageContainer: React.FC = () => {
  return (
    <body className="flex flex-col items-center w-full bg-white">
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/intro-1.png`}
        alt="intro"
        className="w-full"
      />
      <div className="w-[1030px]">
        <Ranking />
        <StudyroomContainer />
      </div>
    </body>
  );
};

export default MainPageContainer;
