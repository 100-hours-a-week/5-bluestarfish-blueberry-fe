import axiosInstance from "./axiosInstance";
import { useNavigate } from "react-router-dom";
import { useLoginedUserStore } from "../store/store";

//사용자 정보 호출하는 커스텀 훅
export const useSetUserInfo = () => {
  const { setUserId, setNickname, setProfileImage } = useLoginedUserStore();
  const navigate = useNavigate();

  const setUserInfo = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/v1/users/whoami`
      );
      if (response.status === 200) {
        console.log(response.data.nickname);
        console.log(response.data.nickname === null);
        if (response.data.nickname === null) {
          alert("닉네임 설정을 위한 페이지로 이동합니다!");
          navigate("/setnickname");
        } else {
          setUserId(response.data.data.id);
          setNickname(response.data.data.nickname);
          setProfileImage(response.data.data.profile_image);
        }
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

//사용자 정보 호출 및 인가 처리
export const useAuthCheck = () => {
  const navigate = useNavigate();
  const { setUserId, setNickname, setProfileImage } = useLoginedUserStore();

  const authCheck = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/v1/users/whoami`
      );
      if (response.status === 200) {
        if (response.data.nickname === null) {
          alert("닉네임 설정을 위한 페이지로 이동합니다!");
          navigate("/setnickname");
        } else {
          setUserId(response.data.data.id);
          setNickname(response.data.data.nickname);
          setProfileImage(response.data.data.profile_image);
        }
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
      alert("로그인이 필요한 서비스입니다!");
      navigate("/");
    }
  };

  return { authCheck };
};

//사용자 정보 호출 및 인가 처리
export const useLoginCheck = () => {
  const loginCheck = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/v1/users/whoami`
      );
      if (response.status === 200) {
        return true;
      }
    } catch (error: any) {
      return false;
    }
  };

  return { loginCheck };
};
