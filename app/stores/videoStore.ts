import { create } from 'zustand';

interface VideoStore {
  isVideoOpen: boolean;
  setVideoOpen: (isOpen: boolean) => void;
}

export const useVideoStore = create<VideoStore>((set) => ({
  isVideoOpen: false,
  setVideoOpen: (isOpen) => set(() => ({ isVideoOpen: isOpen })),
}));
