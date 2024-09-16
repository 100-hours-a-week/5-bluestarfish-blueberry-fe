import { create } from "zustand";

// State 인터페이스 정의 (카메라, 마이크, 스피커 상태)
interface TimeState {
  time: string;
  goaltime: string;
  isRunning: boolean;
  setTime: (updater: (prevTime: string) => string) => void;
  setGoaltime: (goaltime: string) => void;
  toggleIsRunning: () => void;
  setIsRunning: (isRunning: boolean) => void;
}

// 카메라, 마이크, 스피커 상태 관리하는 Zustand 스토어
export const useTimeStore = create<TimeState>((set) => ({
  time: "00:00:00",
  goaltime: "12:00:00",
  isRunning: false,

  setTime: (updater) =>
    set((state) => ({
      time: updater(state.time), // 이전 상태를 기반으로 시간 업데이트
    })),
  setGoaltime: (goaltime: string) => set({ goaltime: goaltime }),
  toggleIsRunning: () => set((state) => ({ isRunning: !state.isRunning })),
  setIsRunning: (isRunning: boolean) => set({ isRunning: isRunning }),
}));
