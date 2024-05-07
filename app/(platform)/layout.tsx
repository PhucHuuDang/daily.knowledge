import { ClerkProvider } from "@clerk/nextjs";
import { CreatePost } from "./(dashboard)/_components/create-news-drawer";
import { SignOutAlertDialog } from "@/components/sign-out-alert-dialog";
import { Toaster } from "sonner";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <ClerkProvider>
      <>
        <Toaster />
        <CreatePost />
        <SignOutAlertDialog />
        {children}
      </>
    // </ClerkProvider>
  );
};

export default PlatformLayout;
