import { create } from "zustand";

// LoginedUserState 인터페이스 정의
interface LoginedUserState {
  userId: number;
  nickname: string;
  profileImage: string;
  // authType: string;
  setUserId: (id: number) => void;
  setNickname: (nickname: string) => void;
  setProfileImage: (profileImage: string) => void;
  // setAuthType: (authType: string) => void;
}

// 로그인된 사용자 상태 관리하는 Zustand 스토어
export const useLoginedUserStore = create<LoginedUserState>((set) => ({
  userId: 0, // 기본값 설정 (로그인되지 않은 상태)
  nickname: "Guest", // 기본 닉네임 설정
  profileImage: "", // 기본 프로필 이미지 경로
  // authType: "guest", // 기본 authType 설정

  // 상태 업데이트 함수들
  setUserId: (id: number) => set({ userId: id }),
  setNickname: (nickname: string) => set({ nickname }),
  setProfileImage: (profileImage: string) => set({ profileImage }),
  // setAuthType: (authType: string) => set({ authType }),
}));

// State 인터페이스 정의 (카메라, 마이크, 스피커 상태)
interface DeviceState {
  camEnabled: boolean;
  micEnabled: boolean;
  speakerEnabled: boolean;
  toggleCam: () => void;
  toggleMic: () => void;
  toggleSpeaker: () => void;
}

// 카메라, 마이크, 스피커 상태 관리하는 Zustand 스토어
export const useDeviceStore = create<DeviceState>((set) => ({
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
