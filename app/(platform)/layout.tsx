import { ClerkProvider } from "@clerk/nextjs";
import { CreatePost } from "./(dashboard)/_components/create-post";
import { SignOutAlertDialog } from "@/components/sign-out-alert-dialog";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <CreatePost />
      <SignOutAlertDialog />
      {children}
    </ClerkProvider>
  );
};

export default PlatformLayout;
