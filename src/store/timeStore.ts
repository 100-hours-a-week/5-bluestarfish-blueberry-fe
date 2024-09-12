import { create } from "zustand";

// Zustand 스토어 인터페이스
interface TimeStore {
  time: string;
  goaltime: string;
  isRunning: boolean;
  setTime: (time: string) => void;
  setGoaltime: (goaltime: string) => void;
  toggleIsRunning: () => void;
}

// Zustand 스토어 생성
export const useRoomStore = create<TimeStore>((set) => ({
  time: "00:00:00",
  goaltime: "00:00:00",
  isRunning: false,

  // 개별 상태 업데이트 메서드
  setTime: (time: string) => set(() => ({ time })),
  setGoaltime: (goaltime: string) => set(() => ({ goaltime })),
  toggleIsRunning: () => set((state) => ({ isRunning: !state.isRunning })),
}));
