import { useLoginedUserStore } from "../store/store";

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const logout = () => {
  const { setLoginedUser } = useLoginedUserStore.getState();
  setLoginedUser(null);

  deleteCookie("accessToken");
  //   localStorage.removeItem("accessToken");
};
