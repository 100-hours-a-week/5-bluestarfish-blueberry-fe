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

  addUser: (newUser: User) =>
    set((state) => {
      const userExists = state.users.some((user) => user.id === newUser.id);

      // 중복된 id가 없을 때만 사용자 추가
      if (!userExists) {
        return {
          users: [...state.users, newUser],
        };
      }

      // 중복된 경우 기존 상태 반환
      return state;
    }),

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
