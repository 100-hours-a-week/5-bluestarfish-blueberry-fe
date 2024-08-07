import StudyroomHeader from "../StudyroomHeader";
import Studyroom from "../Studyroom";

const StudyroomContainer: React.FC = () => {
  return (
    <div>
      <StudyroomHeader />
      <div className="flex flex-wrap">
        <Studyroom />
        <Studyroom />
        <Studyroom />
        <Studyroom />
        <Studyroom />
        <Studyroom />
        <Studyroom />
        <Studyroom />
        <Studyroom />
        <Studyroom />
      </div>
    </div>
  );
};

export default StudyroomContainer;
