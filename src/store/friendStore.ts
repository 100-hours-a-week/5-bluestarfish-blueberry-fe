import { create } from "zustand";

interface Friend {
  id: number;
  nickname: string;
  profileImage: string;
}

interface FriendStore {
  friends: Friend[];
  setFriends: (newFriends: Friend[]) => void;
}

export const useFriendStore = create<FriendStore>((set) => ({
  friends: [],

  setFriends: (newFriends: Friend[]) =>
    set(() => ({
      friends: Array.isArray(newFriends) ? newFriends : [],
    })),
}));
