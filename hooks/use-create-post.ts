import { create } from "zustand";

interface useCreatePostProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useCreatePost = create<useCreatePostProps>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
