"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useClerk, useOrganizationList, useUser } from "@clerk/nextjs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  ChevronLeft,
  LogOut,
  Pencil,
  Settings,
  ShieldQuestion,
  User,
} from "lucide-react";

import { NavbarItem } from "./nav-item";

export const Sidebar = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const { signOut } = useClerk();
  const router = useRouter();

  const { user } = useUser();

  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

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

  const onSignOut = () => {
    signOut(() => router.push("/"));
  };

  return (
    <div
      className={`group/sidebar relative flex h-screen pt-20 md:pt-16 ${
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
            top-20
            z-3
            invisible
            opacity-0
            transition-opacity
            group-hover/sidebar:visible
            group-hover/sidebar:opacity-100
            "
        >
          <ChevronLeft
            className={`${
              !toggleSidebar && "rotate-180"
            } transition duration-200 cursor-pointer`}
          />
          <span className="invisible w-24 inline-flex absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-slate-200 px-2 py-1.5 text-xs font-medium text-neutral-700 group-hover/arrow:visible duration-200 ease-in-out text-center">
            {toggleSidebar ? "Close sidebar" : "Open sidebar"}
          </span>
        </div>

        <div className="mt-10">
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
          <div
            className={`${
              toggleSidebar ? "visible" : "invisible"
            } px-4 text-[#707a8c] text-sm font-semibold mb-2`}
          >
            Censor
          </div>
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

      <div className="sticky inset-x-0 bottom-0 border-t border-[#2d323b] bg-slate-900 transition">
        <NavbarItem
          label="Logout"
          toggleSidebar={toggleSidebar}
          onClick={onSignOut}
          delayDuration={200}
        >
          <LogOut className="w-6 h-5" />
        </NavbarItem>
      </div>
    </div>
  );
};
