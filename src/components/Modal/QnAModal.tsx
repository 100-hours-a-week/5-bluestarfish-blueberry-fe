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
    if (isLoading) return;

    const trimmedContent = content.trim();

    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/api/v1/feedback", {
        content: trimmedContent,
      });
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
    <div className="fixed inset-x-0 mt-[2%] mx-auto w-[90%] max-w-[500px] h-[80%] bg-[#A4AED7] text-black rounded-[15px] shadow-lg p-[10px]">
      <button onClick={closeModal}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/close.png`}
          alt="Close"
          className="h-[20px] w-[20px] cursor-pointer"
        />
      </button>
      <form
        className="m-[15px] text-left text-[14px] font-bold h-[90%] flex flex-col"
        onSubmit={submitContent}
      >
        <span className="block">
          불편한 사항, 추가 기능, 에러 등등 서비스에 대한 피드백을 남겨주세요!
        </span>
        <span className="block">
          여러분의 의견이 저희 서비스를 만들어나갑니다.
        </span>
        <textarea
          value={content}
          placeholder="내용을 입력해주세요."
          maxLength={500}
          required
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
          className="bg-white w-full flex-grow resize-none rounded-[15px] p-3 mt-6"
        />
        <p className="text-right text-[#676767] text-[12px] font-bold mt-2">
          {content.length} / 500 자
        </p>
        <div className="flex justify-center mt-2">
          <button
            type="submit"
            className="flex items-center justify-center bg-[#150C39] gap-2 w-full sm:w-[150px] h-[45px] rounded-[10px] text-white font-bold text-[16px]"
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/paper-plane.png`}
              alt="Paper-plane"
              className="mt-1 h-[28px]"
            />
            <p>보내기</p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default QnAModal;
