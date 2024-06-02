import { create } from "zustand";

interface UseSetPublishAlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useSetPublishAlertDialog = create<UseSetPublishAlertDialogProps>(
  (set) => ({
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true }),
  })
);
