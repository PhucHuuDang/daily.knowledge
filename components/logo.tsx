"use client";

import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex z-50 items-center gap-x-1 md:text-2xl hover:opacity-75 transition ">
        <Image alt="daily.know-logo" src="/logo.png" height={50} width={50} />

        <div className="text-slate-300">
          daily.
          <span className="text-neutral-400 text-[16px] ">know</span>
        </div>
      </div>
    </Link>
  );
};
