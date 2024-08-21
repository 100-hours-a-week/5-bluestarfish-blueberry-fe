import { useLoginedUserStore } from "./store"; // zustand 스토어 경로
import axiosInstance from "../utils/axiosInstance";

interface UserResponse {
  data: {
    id: number;
    email: string;
    nickname: string;
    profileImage: string;
    createdAt: string;
    authType: string;
  };
}

// 유저 정보를 가져오는 함수
export const updateUserDataWithAxios = async (
  userId: number
): Promise<void> => {
  const { setLoginedUser } = useLoginedUserStore.getState();

  try {
    const response = await axiosInstance.get<UserResponse>(
      `/api/v1/users/${userId}`
    );

    // 유저 정보를 전역 상태에 저장
    setLoginedUser(response.data.data);
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.error(
        `User with id ${userId} not found: ${error.response.data.message}`
      );
      setLoginedUser(null); // 404 에러인 경우 유저 정보를 null로 설정
    } else if (error.response?.status === 500) {
      console.error("Internal Server Error");
      setLoginedUser(null); // 500 에러 발생 시에도 null 설정
    } else {
      console.error("Unknown error occurred:", error.message);
      setLoginedUser(null);
    }
  }
};
