import { create } from "zustand";

interface User {
  id: number;
  nickname: string;
  profileImage: string;
  camEnabled: boolean;
  micEnabled: boolean;
  speakerEnabled: boolean;
}

interface UserStore {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (id: number, updatedUser: Partial<User>) => void;
  removeUser: (id: number) => void;
  setUsers: (newUsers: User[]) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [], // 초기값을 반드시 빈 배열로 설정

  addUser: (user: User) =>
    set((state) => ({
      users: [...state.users, user],
    })),

  updateUser: (id: number, updatedUser: Partial<User>) =>
    set((state) => ({
      users: Array.isArray(state.users)
        ? state.users.map((user) =>
            user.id === id ? { ...user, ...updatedUser } : user
          )
        : [], // 배열이 아닌 경우 빈 배열로 반환
    })),

  removeUser: (id: number) =>
    set((state) => ({
      users: Array.isArray(state.users)
        ? state.users.filter((user) => user.id !== id)
        : [], // 배열이 아닌 경우 빈 배열로 반환
    })),

  setUsers: (newUsers: User[]) =>
    set(() => ({
      users: Array.isArray(newUsers) ? newUsers : [], // 배열이 아닌 경우 빈 배열로 설정
    })),
}));
