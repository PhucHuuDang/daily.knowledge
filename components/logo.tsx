"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  height?: number;
  width?: number;
}

export const Logo = ({ className, width = 50, height = 50 }: LogoProps) => {
  return (
    <Link href="/">
      <div
        className={cn(
          "flex z-50 items-center gap-x-1 md:text-2xl hover:opacity-75 transition ",
          className
        )}
      >
        <Image
          alt="daily.know-logo"
          src="/logo.png"
          height={height}
          width={width}
        />

        <div className="text-slate-300">
          daily.
          <span className="text-neutral-400 text-[16px] ">know</span>
        </div>
      </div>
    </Link>
  );
};
