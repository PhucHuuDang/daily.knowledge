import { ClerkProvider } from "@clerk/nextjs";
import { CreatePost } from "./(dashboard)/_components/create-post";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <CreatePost />
      {children}
    </ClerkProvider>
  );
};

export default PlatformLayout;
