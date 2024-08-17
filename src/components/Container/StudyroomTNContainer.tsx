import StudyroomHeader from "../StudyroomHeader";
import StudyroomTN from "../StudyroomTN";
import StudyroomFooter from "../StudyroomFooter";
import studyRooms from "../../data/studyRooms";

const StudyroomTNContainer: React.FC = () => {
  return (
    <div className="my-4">
      <StudyroomHeader />
      {/* <div className="my-5  flex flex-wrap gap-x-5 gap-y-16">
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
      </div> */}
      <div className="my-5  flex flex-wrap gap-x-5 gap-y-16">
        {studyRooms.map((room) => (
          <div
            key={room.id}
            className="cursor-pointer"
          >
            <StudyroomTN
              title={room.title}
              camEnabled={room.camEnabled}
              currentUsers={room.users.length}
              maxUsers={room.maxUsers}
              thumbnail={room.thumbnail}
              isSelected={false}
            />
          </div>
        ))}
      </div>
      <StudyroomFooter />{" "}
    </div>
  );
};

export default StudyroomTNContainer;
