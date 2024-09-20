import { useNavigate } from "react-router-dom";

type StudyroomTNProps = {
  id: number;
  title: string;
  camEnabled: boolean;
  currentUsers: number;
  maxUsers: number;
  thumbnail: string;
  isSelected: boolean;
};

const StudyroomTN: React.FC<StudyroomTNProps> = ({
  id,
  title,
  camEnabled,
  currentUsers,
  maxUsers,
  thumbnail,
  isSelected,
}) => {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅
  const enterStudyRoom = () => {
    navigate(`/wait/${id}`);
  };

  return (
    <div className="relative w-[187px] h-[171px]">
      <div
        className={`w-full h-full rounded-lg bg-cover bg-center bg-blend-darken bg-black bg-opacity-50 ${
          isSelected ? "blur-[1.5px] opacity-70" : ""
        }`}
        style={{ backgroundImage: `url(${thumbnail})` }}
      >
        {/* 카메라 아이콘 */}
        <div className="absolute top-1 left-2">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/${
              camEnabled ? "cam-on-icon.png" : "cam-off-icon.png"
            }`}
            alt="cam-icon"
            className="w-[20px]"
          />
        </div>

        {/* 방 제목 */}
        <div className="h-full flex justify-center items-center">
          <div className="text-white text-sm font-semibold">{title}</div>
        </div>

        {/* 인원 수 */}
        <div className="absolute top-2 right-2 flex items-center space-x-1">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/person-white.png`}
            alt="person-icon"
            className="w-[23px]"
          />
          <div className="text-gray-300 text-[14px] font-bold -mt-2">
            {currentUsers} / {maxUsers}
          </div>
        </div>
      </div>

      {/* 체크 마크 (선택 표시) */}
      {isSelected && (
        <div className="absolute inset-0 flex justify-center items-center">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/check.png`}
            alt="check-icon"
            className="w-10 h-10"
          />
        </div>
      )}
    </div>
  );
};

export default StudyroomTN;
