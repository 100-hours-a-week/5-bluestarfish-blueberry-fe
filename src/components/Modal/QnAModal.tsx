import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";

type QnAModalProps = {
  closeModal: () => void;
};

const QnAModal: React.FC<QnAModalProps> = ({ closeModal }) => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {}, [content]);

  const submitContent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 폼 제출 기본 동작 방지

    const trimmedContent = content.trim();

    try {
      const response = await axios.post("/api/v1/feedback", {
        content: trimmedContent,
      });

      if (response.status === 200) {
      }
    } catch (error) {}
  };

  return (
    <div className="fixed mx-[35%] my-[5%] w-[30%] h-[70%] bg-[#A4AED7] text-black rounded-[15px] shadow-lg p-[10px]">
      <button onClick={closeModal}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/close.png`}
          alt="Close"
          className="h-[20px] w-[20px] cursor-pointer"
        />
      </button>
      <form
        className="m-[25px] text-left text-[14px] font-bold"
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
          required
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          } // 이메일 상태 업데이트
          className="bg-white w-full h-[320px] mt-6 resize-none rounded-[15px] p-3"
        />
        <p className="text-right text-[#676767] text-[12px] font-bold">
          {content.length} / 500 자
        </p>
        <div className="flex justify-center">
          <div className="flex flex-rowflex items-center justify-center bg-[#150C39] gap-2 w-[150px] h-[45px] rounded-[10px] text-white font-bold text-[16px]">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/paper-plane.png`}
              alt="Paper-plane"
              className="mt-1 h-[28px]"
            />
            <p>보내기</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default QnAModal;
