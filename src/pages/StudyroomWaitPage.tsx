import StudyroomWaitContainer from "../components/Container/StudyroomWaitContainer";

const StudyroomWaitPage: React.FC = () => {
  return (
    <div className="bg-white p-[25px]">
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/exit.png`}
        alt="Exit"
        className="w-[30px] cursor-pointer"
      />
      <StudyroomWaitContainer />
    </div>
  );
};

export default StudyroomWaitPage;
