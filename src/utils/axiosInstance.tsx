import axios from "axios";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  withCredentials: true, // withCredentials 옵션을 true로 설정
});

export default axiosInstance;
