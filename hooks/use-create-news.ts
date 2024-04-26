import { create } from "zustand";

interface useCreateNewsProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useCreateNews = create<useCreateNewsProps>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
