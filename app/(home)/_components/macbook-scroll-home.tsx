import React from "react";
// import { MacbookScroll } from "/ui/macbook-scroll";

import { MacbookScroll } from "@/components/ui/macbook-scroll";
import Link from "next/link";
import { Github } from "lucide-react";

export function MacbookScrollHome() {
  return (
    <div className="overflow-hidden dark:bg-[#4949c0] bg-white w-full">
      <MacbookScroll
        badge={
          <Link href={process.env.NEXT_PUBLIC_MY_GITHUB_URL!} target="_blank">
            <Github className="w-10 h-10 -rotate-12" />
          </Link>
        }
        src="/know-logo.jpeg"
        showGradient={false}
      />
    </div>
  );
}
