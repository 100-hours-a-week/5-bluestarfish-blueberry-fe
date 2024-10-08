import { useLoginedUserStore } from "../../store/store";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

type HeaderModalProps = {
  closeModal: () => void;
};

const HeaderModal: React.FC<HeaderModalProps> = ({ closeModal }) => {
  const { nickname, setUserId, setNickname, setProfileImage } =
    useLoginedUserStore();
  const navigate = useNavigate();

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 모달 안쪽 클릭 시 이벤트 전파 막기
  };

  const logout = async () => {
    try {
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/logout`
      );

      if (response.status === 204) {
        console.log(`로그아웃 성공!`);
        closeModal();
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          console.error("401: ", "Unauthorized");
        }
      } else {
        console.error("로그아웃 응답을 받아오는 중 오류 발생:", error.message);
      }
      console.error(error);
    }
    setUserId(0);
    setNickname("Guest");
    setProfileImage("");
  };

  const mypage = async () => {
    navigate("/mypage");
  };

  const friend = async () => {
    navigate("/friends/list");
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-transparent"
      onClick={closeModal} // 모달 밖 클릭 시 닫기
    >
      <div
        className="absolute right-4 top-16 lg:right-24 w-[90%] max-w-[150px] h-[135px] text-black md:w-[150px] bg-transparent"
        onClick={handleModalClick} // 모달 내부 클릭 시 닫기 방지
      >
        <p className="flex justify-center items-center w-[140px] h-[42px] border-2 rounded-[10px] hover:bg-[#ebeeff] bg-[#ffffff]">
          {nickname}
        </p>
        <button
          className="w-[140px] h-[42px] border-2 rounded-[10px] hover:text-[#eb4c64] hover:bg-[#ebeeff] bg-white"
          onClick={mypage}
        >
          마이페이지
        </button>
        <button
          className="w-[140px] h-[42px] border-2 rounded-[10px] hover:text-[#eb4c64] hover:bg-[#ebeeff] bg-white"
          onClick={friend}
        >
          친구 관리
        </button>
        <button
          className="w-[140px] h-[42px] border-2 rounded-[10px] hover:text-[#eb4c64] hover:bg-[#ebeeff] bg-white"
          onClick={logout}
        >
          로그아웃
        </button>
      </div>
    </div>
    // </div>
  );
};

export default HeaderModal;
