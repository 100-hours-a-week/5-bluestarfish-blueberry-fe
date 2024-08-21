import create from "zustand";

// User 인터페이스 정의
interface User {
  id: number;
  email: string;
  nickname: string;
  profileImage: string;
  createdAt: string;
  authType: string;
}

// LoginedUserState 인터페이스 정의
interface LoginedUserState {
  loginedUser: User | null;
  setLoginedUser: (user: User | null) => void;
}

// 로그인된 사용자 상태 관리하는 Zustand 스토어
export const useLoginedUserStore = create<LoginedUserState>((set) => ({
  loginedUser: null,
  setLoginedUser: (user: User | null) => set({ loginedUser: user }),
}));

// State 인터페이스 정의 (카메라, 마이크, 스피커 상태)
interface State {
  camEnabled: boolean;
  micEnabled: boolean;
  speakerEnabled: boolean;
  toggleCam: () => void;
  toggleMic: () => void;
  toggleSpeaker: () => void;
}

// 카메라, 마이크, 스피커 상태 관리하는 Zustand 스토어
export const useStore = create<State>((set) => ({
  camEnabled: true, // 초기값 설정
  micEnabled: true,
  speakerEnabled: true,

  // 카메라 상태 토글 함수
  toggleCam: () => set((state) => ({ camEnabled: !state.camEnabled })),

  // 마이크 상태 토글 함수
  toggleMic: () => set((state) => ({ micEnabled: !state.micEnabled })),

  // 스피커 상태 토글 함수
  toggleSpeaker: () =>
    set((state) => ({ speakerEnabled: !state.speakerEnabled })),
}));
