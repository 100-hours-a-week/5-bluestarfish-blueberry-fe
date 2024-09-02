import React, { useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

export const usePreventRefresh = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const preventClose = (e: any) => {
    e.preventDefault();
    e.returnValue = "";
    navigate(`/wait/${roomId}`);
  };

  // 브라우저에 렌더링 시 한 번만 실행하는 코드
  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();

    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  });
};
