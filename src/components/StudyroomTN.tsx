import TNHeader from "./TNHeader";

type StudyroomTNProps = {};

const StudyroomTN: React.FC<StudyroomTNProps> = () => {
  return (
    <div className="relative w-[187px] h-[171px] text-[#000]">
      <div className="absolute inset-0 bg-studyroom bg-cover bg-center filter brightness-50"></div>
      <div className="relative z-1 text-white">
        <TNHeader />
        <div className="h-[145px] flex justify-center">
          <div className="mt-[42px]">방제</div>
        </div>
      </div>
    </div>
  );
};

export default StudyroomTN;
