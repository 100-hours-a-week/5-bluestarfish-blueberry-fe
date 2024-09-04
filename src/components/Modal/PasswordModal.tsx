import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useLoginedUserStore } from "../../store/store";
import { useNavigate } from "react-router-dom";

type PasswordModalProps = {
  roomId: number | null;
  closeModal: () => void;
  setShowToast: (arg1: boolean) => void;
};

const PasswordModal: React.FC<PasswordModalProps> = ({
  roomId,
  closeModal,
  setShowToast,
}) => {
  const { userId } = useLoginedUserStore();
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleShowToast = () => {
    setShowToast(true);
  };

  const submitContent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 폼 제출 기본 동작 방지
    event.stopPropagation();
    if (isLoading) return;

    const trimmedContent = content.trim();

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/api/v1/rooms/password`,
        {
          userId: userId,
          roomId: roomId,
          password: trimmedContent,
        }
      );
      if (response.status === 200) {
        navigate(`/wait/${roomId}`, {
          state: { authorized: true, needPassword: false, password: content },
        });
        // 성공 처리
      }
    } catch (error) {
      handleShowToast();
      // 에러 처리
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  useEffect(() => {
    if (userId === 0) {
      setShowToast(true);
      closeModal();
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="fixed inset-0 z-40" />
      <div className="relative z-50 w-[90%] max-w-[500px] bg-white text-black rounded-lg shadow-2xl p-6">
        <button onClick={closeModal} className="absolute top-4 right-4">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/close.png`}
            alt="Close"
            className="h-4 w-4 cursor-pointer"
          />
        </button>
        <form className="text-left" onSubmit={submitContent}>
          <h2 className="text-lg font-bold text-gray-800 mb-2">
            스터디룸 비밀번호를 입력해주세요!
          </h2>
          <p className="text-sm text-gray-600 mb-4">password Helpertext</p>
          <input
            value={content}
            maxLength={10}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setContent(e.target.value)
            }
            className="bg-gray-100 w-full h-10 resize-none rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="flex items-center justify-center bg-[#C6CFFF] hover:bg-[#A7B5FF] w-[150px] h-[45px] rounded-lg text-white font-bold transition-colors duration-300"
            >
              입장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
