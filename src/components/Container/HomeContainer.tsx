import Timer from "../rooms/Timer";
import UserInfoContainer from "./UserInfoContainer";

type HomeContainerProps = {};

const HomeContainer: React.FC<HomeContainerProps> = () => {
  return (
    <div className="m-2 flex flex-col h-full">
      <Timer />
      <UserInfoContainer />
      <div className="w-[400px] bg-[#D9D9D9] fixed bottom-0 right-0">
        <div className="flex items-center justify-start w-full h-[80px] px-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
                alt="Logo"
                className="h-8 w-8"
              />
              <span className="text-xl font-bold text-shadow-sm text-[#6D81D5]">
                blueberry
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContainer;
