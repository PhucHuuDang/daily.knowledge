"use client";

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useSignOutDialog } from "@/hooks/use-sign-out-alert-dialog";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "./ui/alert-dialog";

export const SignOutAlertDialog = () => {
  const signOutRef = useRef<HTMLDivElement>(null);
  const { signOut } = useClerk();
  const router = useRouter();
  const useSignOut = useSignOutDialog();

  const onSignOut = () => {
    useSignOut.onClose();
    signOut(() => router.push("/"));
  };

  useOnClickOutside(signOutRef, useSignOut.onClose);

  return (
    <AlertDialog open={useSignOut.isOpen}>
      <AlertDialogContent
        ref={signOutRef}
        className="bg-[#21262d] border border-slate-400"
      >
        <AlertDialogHeader className="font-semibold text-lg text-[#a8b3cf]">
          Are you sure you want to sign out?
        </AlertDialogHeader>
        <AlertDialogDescription className="text-sm font-light text-[#82899c]">
          You will be redirected to the sign-in page. Thanks for your time!
        </AlertDialogDescription>
        <AlertDialogFooter className="mt-2 gap-x-1">
          <AlertDialogCancel onClick={useSignOut.onClose}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={onSignOut}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
