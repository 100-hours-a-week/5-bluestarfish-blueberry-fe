import create from "zustand";

// User 인터페이스 정의
interface User {
  id: number;
  nickname: string;
  profileImage: string;
  camEnabled: boolean;
  micEnabled: boolean;
  speakerEnabled: boolean;
}

// Zustand 스토어 인터페이스 정의
interface UserStore {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (id: number, updatedUser: Partial<User>) => void;
  removeUser: (id: number) => void;
  setUsers: (newUsers: User[]) => void;
}

// Zustand 스토어 생성
export const useUserStore = create<UserStore>((set) => ({
  users: [], // 초기 상태는 빈 배열

  // 유저 추가 함수
  addUser: (user: User) =>
    set((state) => ({
      users: [...state.users, user],
    })),

  // 유저 업데이트 함수
  updateUser: (id: number, updatedUser: Partial<User>) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      ),
    })),

  // 유저 제거 함수
  removeUser: (id: number) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })), // 전체 users 배열 재정의 함수

  setUsers: (newUsers: User[]) =>
    set(() => ({
      users: newUsers, // 새로운 배열로 전체 users 덮어쓰기
    })),
}));
