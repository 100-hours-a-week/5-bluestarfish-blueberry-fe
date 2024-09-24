import React, { useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

export const usePreventRefresh = () => {
  const preventClose = (e: any) => {
    e.preventDefault();
    e.returnValue = "";
    // 새로고침 취소시에 발생하는 동작
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
