"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname, useRouter } from "next/navigation";
import { IconType } from "react-icons";

interface NavbarItemProps {
  toggleSidebar: boolean;
  icon?: IconType;
  label: string;
  children?: React.ReactNode;
  route?: string;
  delayDuration?: number;
  onClick?: () => void;
}

export const NavbarItem = ({
  toggleSidebar,
  icon: Icon,
  label,
  children,
  route,
  delayDuration,
  onClick,
}: NavbarItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Tooltip delayDuration={delayDuration}>
      <div className="w-full hover:bg-[#2d323b] py-1 cursor-pointer duration-150">
        <TooltipTrigger
          className="px-2 hover:text-slate-100 text-[#a8b3cf] flex items-center gap-1 w-full py-1"
          onClick={() => {
            console.log(route), onClick?.();
          }}
        >
          {/* <div className="h-6 w-6 mx-2">
            <Icon />
          </div> */}
          <div className="mx-2">{children}</div>
          {/* <Icon className="h-6 w-6 mx-2" /> */}

          <div
            className={`${
              toggleSidebar ? "block opacity-100" : "hidden opacity-0"
            } text-sm min-w-28 overflow-hidden flex items-start rounded-md duration-200`}
          >
            {label}
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" className="min-w-24 " sideOffset={5}>
          <span className="w-full">{label}</span>
        </TooltipContent>
      </div>
    </Tooltip>
  );
};
