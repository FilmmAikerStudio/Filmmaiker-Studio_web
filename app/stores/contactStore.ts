import { create } from 'zustand';

interface ContactStore {
  isContactOpen: boolean;
  setContactOpen: (isOpen: boolean) => void;
}

export const useContactStore = create<ContactStore>((set) => ({
  isContactOpen: false,
  setContactOpen: (isOpen) => set(() => ({ isContactOpen: isOpen })),
}));
