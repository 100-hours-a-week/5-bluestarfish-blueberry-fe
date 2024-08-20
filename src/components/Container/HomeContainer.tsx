import Timer from "../rooms/Timer";

type HomeContainerProps = {};

const HomeContainer: React.FC<HomeContainerProps> = () => {
  return (
    <div className="m-2 flex flex-col h-full">
      <Timer />
      <div></div>
    </div>
  );
};

export default HomeContainer;
