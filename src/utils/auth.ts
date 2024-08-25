import axiosInstance from "./axiosInstance";
import { useNavigate } from "react-router-dom";
import { useLoginedUserStore } from "../store/store";

// 사용자 정의 Hook으로 변경
export const useSetUserInfo = () => {
  const { setUserId, setNickname, setProfileImage } = useLoginedUserStore();

  const setUserInfo = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/v1/users/whoami`
      );
      if (response.status === 200) {
        await Promise.all([
          setUserId(response.data.data.id),
          setNickname(response.data.data.nickname),
          setProfileImage(response.data.data.profile_image),
        ]);
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 404) {
          console.error("404: ", "Not found");
        }
      } else {
        console.error(
          "로그인 유저 정보를 받아오는 중 오류 발생:",
          error.message
        );
      }
    }
  };

  return { setUserInfo };
};

export const useSetLoginedUserInfo = () => {
  const { setUserId, setNickname, setProfileImage } = useLoginedUserStore();

  const setLoginedUserInfo = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/v1/users/whoami`
      );
      if (response.status === 200) {
        setUserId(response.data.data.id);
        setNickname(response.data.data.nickname);
        setProfileImage(response.data.data.profile_image);
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 404) {
          console.error("404: ", "Not found");
        }
      } else {
        console.error(
          "로그인 유저 정보를 받아오는 중 오류 발생:",
          error.message
        );
      }
    }
  };

  return { setLoginedUserInfo };
};

export const useCheckLogined = () => {
  const navigate = useNavigate();

  const checkLogined = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/v1/users/whoami`
      );
      if (response.status === 200) {
        navigate(`/`);
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 404) {
          console.error("404: ", "Not found");
        }
      } else {
        console.error(
          "로그인 유저 정보를 받아오는 중 오류 발생:",
          error.message
        );
      }
    }
  };

  return { checkLogined };
};
