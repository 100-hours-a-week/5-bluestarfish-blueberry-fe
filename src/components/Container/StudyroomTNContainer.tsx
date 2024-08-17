import StudyroomHeader from "../StudyroomHeader";
import StudyroomTN from "../StudyroomTN";
import StudyroomFooter from "../StudyroomFooter";

const StudyroomTNContainer: React.FC = () => {
  return (
    <div className="my-4">
      <StudyroomHeader />
      <div className="my-5  flex flex-wrap gap-x-5 gap-y-16">
        <StudyroomTN />
        <StudyroomTN />
        <StudyroomTN />
        <StudyroomTN />
        <StudyroomTN />
        <StudyroomTN />
        <StudyroomTN />
        <StudyroomTN />
        <StudyroomTN />
        <StudyroomTN />
      </div>
      <StudyroomFooter />{" "}
    </div>
  );
};

export default StudyroomTNContainer;
