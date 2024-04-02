"use client";

import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center md:text-2xl gap-x-1 hover:opacity-75">
        <div className="text-neutral-700">daily.</div>
        <div className="text-sky-500 font-medium ">learn</div>
      </div>
    </Link>
  );
};
