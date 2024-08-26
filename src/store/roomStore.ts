import { create } from "zustand";

// User 인터페이스 정의
interface User {
  id: number;
  nickname: string;
  profileImage: string;
  camEnabled: boolean;
  micEnabled: boolean;
  speakerEnabled: boolean;
}

// Zustand 스토어 인터페이스
interface RoomStore {
  roomId: number;
  users: User[];
}

// Zustand 스토어 생성
export const useUserStore = create<RoomStore>((set) => ({
  roomId: 0,
  users: [], // 초기 상태는 빈 배열

  setUsers: (newUsers: User[]) =>
    set(() => ({
      users: newUsers, // 새로운 배열로 전체 users 덮어쓰기
    })),
}));
