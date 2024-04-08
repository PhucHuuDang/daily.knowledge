import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const NavbarHome = () => {
  // bg-[#0e1217]

  // ? bg-gradient-to-r from-slate-900 to-slate-700
  return (
    <div
      className="fixed top-0 z-50 h-14 flex items-center pt-6 w-full px-8 shadow-sm
  "
    >
      <div className="mx-auto flex items-center justify-around md:max-w-screen-2xl w-full p-2 md:p-4 rounded-xl backdrop-blur-lg ">
        <Logo />
        <div className="space-x-4 flex items-center justify-between w-full md:block md:w-auto">
          <Button size="default" className="rounded-lg py-6">
            <Link href={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL!}>
              <div>
                Start reading -{" "}
                <span className="text-gray-300">Free forever</span>
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
