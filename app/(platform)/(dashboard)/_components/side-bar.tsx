"use client";

import { useAuth, useClerk, useOrganizationList, useUser } from "@clerk/nextjs";
import {
  ChevronLeft,
  LayoutDashboard,
  Newspaper,
  Pencil,
  Settings,
  ShieldQuestion,
  User,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavbarItem } from "./nav-item";

const NAVIGATION_SIDEBAR = [
  {
    title: "Settings",
    icon: <Settings />,
    route: "/news/org_2eoNiBI0HXBF8Wg8bpYGz2EdzMv",
  },
  {
    title: "Edit Post",
    icon: <Pencil />,
    route: "/news/org_2eoNiBI0HXBF8Wg8bpYGz2EdzMv/edit",
  },
  {
    title: "Users",
    icon: <User />,
    route: "/user",
  },
];

export const Sidebar = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

  const { user } = useUser();

  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  return (
    <div
      className={`group/sidebar relative flex  no-scrollbar h-screen ${
        toggleSidebar ? "w-64" : "w-16"
      } flex-col justify-between border-e border-[#3d3f43] bg-slate-900 duration-300 `}
    >
      <div>
        <div
          onClick={() => setToggleSidebar((newValue) => !newValue)}
          className="
            group/arrow
            flex
            items-center
            h-6
            w-6
            bg-white
            absolute
            -right-3
            rounded-lg
            top-3
            z-3
            invisible
            opacity-0
            transition-opacity
            group-hover/sidebar:visible
            group-hover/sidebar:opacity-100"
        >
          <ChevronLeft
            className={`${
              !toggleSidebar && "rotate-180"
            } transition duration-200 cursor-pointer`}
          />
          <span className="invisible w-24 inline-flex absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-slate-200 px-2 py-1.5 text-xs font-medium text-neutral-700 group-hover/arrow:visible duration-200 ease-in-out text-center">
            Close
          </span>
        </div>

        <div className="mt-5">
          <NavbarItem
            route="/news/org_2eoNiBI0HXBF8Wg8bpYGz2EdzMv"
            label="My feed"
            toggleSidebar={toggleSidebar}
          >
            <Avatar className="h-6 w-6 rounded-lg">
              <AvatarImage src={user?.externalAccounts[0].imageUrl} />
              <AvatarFallback />
            </Avatar>
          </NavbarItem>
        </div>

        <div className="mt-10">
          <NavbarItem
            route="/news/org_2eoNiBI0HXBF8Wg8bpYGz2EdzMv"
            label="Post Censored?"
            toggleSidebar={toggleSidebar}
          >
            <ShieldQuestion className="h-6 w-6" />
          </NavbarItem>

          <ul className="space-y-1 mt-14">
            <div
              className={`${
                toggleSidebar ? "visible" : "invisible"
              } px-4 text-[#707a8c] text-sm font-semibold mb-2`}
            >
              Tools
            </div>

            {NAVIGATION_SIDEBAR.map((item, index) => (
              <NavbarItem
                key={index}
                route={item.route}
                label={item.title}
                toggleSidebar={toggleSidebar}
              >
                {item.icon}
              </NavbarItem>
            ))}
          </ul>
        </div>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-[#2d323b] bg-slate-900  p-2">
        <form action="#">
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>

            <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
              Logout
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};
