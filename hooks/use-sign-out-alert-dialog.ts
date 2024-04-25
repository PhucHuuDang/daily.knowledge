import { create } from "zustand";

interface UseSignOutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useSignOutDialog = create<UseSignOutDialogProps>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
