interface UserStatus {
  id: number;
  nickname: string;
  profileImage: string;
  camEnabled: boolean;
  micEnabled: boolean;
  speakerEnabled: boolean;
}

interface SmallUserDisplayProps {
  userStatus: UserStatus;
}

const SmallUserDisplay: React.FC<SmallUserDisplayProps> = ({ userStatus }) => {
  return (
    <div
      className="w-[400px] h-[230px] bg-cover rounded-[20px] shadow-lg"
      style={{ backgroundImage: `url(${userStatus.profileImage})` }}
    >
      <div className="top-0 left-0 w-full h-full flex items-end justify-between p-3">
        <p className="text-[16px]">{userStatus.nickname}</p>
        <button>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/speaker-off.png`}
            alt="speaker"
            className="h-[23px]"
          />
        </button>
      </div>
    </div>
  );
};

export default SmallUserDisplay;
