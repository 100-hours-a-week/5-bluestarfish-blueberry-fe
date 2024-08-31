import React, { useState, ChangeEvent, FormEvent } from "react";
import axiosInstance from "../../utils/axiosInstance";

type QnAModalProps = {
  closeModal: () => void;
};

const QnAModal: React.FC<QnAModalProps> = ({ closeModal }) => {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitContent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 폼 제출 기본 동작 방지
    event.stopPropagation();
    if (isLoading) return;

    const trimmedContent = content.trim();

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/api/v1/feedbacks`,
        {
          content: trimmedContent,
        }
      );
      if (response.status === 200) {
        // 성공 처리
      }
    } catch (error) {
      // 에러 처리
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="fixed inset-0 z-40"
      />
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
            서비스 피드백을 남겨주세요  ꒰⍢꒱
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            불편한 사항, 추가 기능, 에러 등 여러분의 의견이 저희 서비스를 만들어나갑니다!
          </p>
          <textarea
            value={content}
            placeholder="내용을 입력해주세요."
            maxLength={500}
            required
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setContent(e.target.value)
            }
            className="bg-gray-100 w-full h-40 resize-none rounded-lg p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-right text-gray-500 text-sm mt-2">
            {content.length} / 500 자
          </p>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="flex items-center justify-center bg-[#C6CFFF] hover:bg-[#A7B5FF] w-[150px] h-[45px] rounded-lg text-white font-bold transition-colors duration-300"
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/paper-plane.png`}
                alt="Paper-plane"
                className="h-5 w-5 mr-3"
              />
              보내기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QnAModal;
