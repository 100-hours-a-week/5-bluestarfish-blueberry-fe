import TNHeader from "./TNHeader";

type StudyroomTNProps = {};

const StudyroomTN: React.FC<StudyroomTNProps> = () => {
  return (
    <div className="w-[187px] h-[171px] bg-studyroom bg-cover bg-center">
      <TNHeader />
      <div className="h-[145px] flex justify-center">
        <div className="mt-[42px]">방제</div>
      </div>
    </div>
  );
};

export default StudyroomTN;
