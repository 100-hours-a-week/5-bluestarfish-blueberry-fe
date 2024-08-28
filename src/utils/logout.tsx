import { useLoginedUserStore } from "../store/store";

export const logout = () => {
  const { setUserId, setNickname, setProfileImage } = useLoginedUserStore();

  setUserId(0);
  setNickname("");
  setProfileImage("");
  //   localStorage.removeItem("accessToken");
};
