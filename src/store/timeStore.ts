import { create } from "zustand";

// State 인터페이스 정의 (카메라, 마이크, 스피커 상태)
interface TimeState {
  time: string;
  goaltime: string;
  isRunning: boolean;
  setTime: (time: string) => void;
  setGoaltime: (goaltime: string) => void;
  toggleIsRunning: () => void;
}

// 카메라, 마이크, 스피커 상태 관리하는 Zustand 스토어
export const useTimeStore = create<TimeState>((set) => ({
  time: "00:00:00",
  goaltime: "12:00:00",
  isRunning: false,

  setTime: (time: string) => set({ time: time }),
  setGoaltime: (goaltime: string) => set({ goaltime: goaltime }),
  toggleIsRunning: () => set((state) => ({ isRunning: !state.isRunning })),
}));
