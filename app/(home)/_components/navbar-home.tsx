import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const NavbarHome = () => {
  return (
    <div
      className="fixed top-0 h-14 flex items-center border-b bg-white w-full px-8 shadow-sm
  "
    >
      <div className="mx-auto flex items-center justify-between md:max-w-screen-2xl w-full">
        <Logo />
        <div className="space-x-4 flex items-center justify-between w-full md:block md:w-auto">
          <Button variant="ghost">Login</Button>
          <Button variant="ghost">
            <Link href="/">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
