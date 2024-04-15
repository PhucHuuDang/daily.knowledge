"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IconType } from "react-icons";

interface NavbarItemProps {
  toggleSidebar: boolean;
  icon?: IconType;
  label: string;
  children?: React.ReactNode;
  route: string;
}

export const NavbarItem = ({
  toggleSidebar,
  icon: Icon,
  label,
  children,
  route,
}: NavbarItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Tooltip>
      <div className="w-full hover:bg-[#2d323b]  cursor-pointer">
        <TooltipTrigger className="px-2 text-slate-200 flex items-center gap-1 w-full py-1">
          {/* <div className="h-6 w-6 mx-2">
            <Icon />
          </div> */}
          <div className="mx-2">{children}</div>
          {/* <Icon className="h-6 w-6 mx-2" /> */}

          <div className={`${toggleSidebar ? "block" : "hidden"} text-sm `}>
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
