import { create } from "zustand";

// Zustand 스토어 인터페이스
interface RoomStore {
  roomId: number;
  title: string;
  maxUsers: number;
  curUsers: number;
  camEnabled: boolean;
  setRoomId: (roomId: number) => void;
  setTitle: (title: string) => void;
  setMaxUsers: (maxUsers: number) => void;
  setCurUsers: (maxUsers: number) => void;
  setCamEnabled: (camEnabled: boolean) => void;
}

// Zustand 스토어 생성
export const useRoomStore = create<RoomStore>((set) => ({
  roomId: 0, // 초기 roomId
  title: "", // 초기 방 제목
  maxUsers: 0, // 초기 최대 인원 수
  curUsers: 0,
  camEnabled: true, // 기본 카메라 상태는 활성화 (true)

  // 개별 상태 업데이트 메서드
  setRoomId: (roomId: number) => set(() => ({ roomId })),
  setTitle: (title: string) => set(() => ({ title })),
  setMaxUsers: (maxUsers: number) => set(() => ({ maxUsers })),
  setCurUsers: (curUsers: number) => set(() => ({ curUsers })),
  setCamEnabled: (camEnabled: boolean) => set(() => ({ camEnabled })),
}));
