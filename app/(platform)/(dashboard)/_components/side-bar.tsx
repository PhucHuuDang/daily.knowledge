"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth, useOrganizationList, useUser } from "@clerk/nextjs";
import { useSignOutDialog } from "@/hooks/use-sign-out-alert-dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  ChevronLeft,
  FileUp,
  LogOut,
  Pencil,
  ScreenShare,
  Settings,
  ShieldQuestion,
  User,
} from "lucide-react";

import { NavItem } from "./nav-item";

export const Sidebar = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const router = useRouter();

  const { user } = useUser();
  const { orgId, userId } = useAuth();
  const useSignOut = useSignOutDialog();

  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const NAVIGATION_SIDEBAR = [
    {
      title: "Create Post",
      icon: <FileUp />,
      route: `/news/${orgId}/create`,
    },
    {
      title: "Settings",
      icon: <Settings />,
      route: `/news/${orgId}/settings`,
    },
    {
      title: "My posts",
      icon: <ScreenShare />,
      route: `/news/${orgId}/news-shared`,
    },
    {
      title: "Edit Post",
      icon: <Pencil />,
      route: `/news/${orgId}/edit`,
    },
    {
      title: "Users",
      icon: <User />,
      route: "/user",
    },
  ];

  const sidebarWidth = toggleSidebar ? "w-64" : "w-16";
  // translate-x
  const translateText = toggleSidebar
    ? "translate-x-0"
    : "-translate-x-20 duration-400";

  return (
    <div
      className={`group/sidebar relative flex h-full 2xl:min-h-screen pt-20 md:pt-16 ${sidebarWidth} flex-col justify-between border-e border-[#3d3f43] bg-slate-900 duration-300`}
    >
      <div className={`fixed ${sidebarWidth} z-20  duration-300`}>
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
            top-3.5
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
            } transition duration-500 cursor-pointer`}
          />
          <span className="invisible w-24 inline-flex absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-slate-200 px-2 py-1.5 text-xs font-medium text-neutral-700 group-hover/arrow:visible transition duration-200 ease-in-out text-center">
            {toggleSidebar ? "Close sidebar" : "Open sidebar"}
          </span>
        </div>

        <div className="mt-14">
          {/* <div className={`fixed ${sidebarWidth} `}> */}
          <NavItem
            route="/news/org_2eoNiBI0HXBF8Wg8bpYGz2EdzMv"
            label="My feed"
            toggleSidebar={toggleSidebar}
          >
            <Avatar className="h-6 w-6 rounded-lg">
              <AvatarImage src={user?.externalAccounts[0].imageUrl} />
              <AvatarFallback />
            </Avatar>
          </NavItem>
          {/* </div> */}
        </div>

        {/* <div className={`mt-10 fixed ${sidebarWidth}`}> */}
        <div className="mt-10">
          <div
            className={`${translateText} px-4 text-[#707a8c] text-sm font-semibold mb-2 transition duration-300`}
          >
            Censor
          </div>
          <NavItem
            route="/news/org_2eoNiBI0HXBF8Wg8bpYGz2EdzMv"
            label="Post Censored?"
            toggleSidebar={toggleSidebar}
          >
            <ShieldQuestion className="h-6 w-6" />
          </NavItem>

          <ul className="space-y-1 mt-14">
            <div
              className={`${translateText} px-4 text-[#707a8c] text-sm font-semibold mb-2 transition duration-300`}
            >
              Tools
            </div>

            {NAVIGATION_SIDEBAR.map((item, index) => (
              <NavItem
                key={index}
                route={item.route}
                label={item.title}
                toggleSidebar={toggleSidebar}
                onClick={() => router.push(item.route)}
              >
                {item.icon}
              </NavItem>
            ))}

            {/* <Dock>
              {NAVIGATION_SIDEBAR.map((item, index) => (
                <DockIcon onClick={() => console.log(item.title)} key={item.title}>{item.icon}</DockIcon>
              ))}
            </Dock> */}
          </ul>
        </div>
      </div>
      <div
        className={`fixed inset-x-0 z-20 bottom-0  border-t border-[#2d323b] border-r border-r-[#3d3f43] bg-slate-900 ${sidebarWidth} duration-300`}
      >
        <NavItem
          label="Logout"
          toggleSidebar={toggleSidebar}
          onClick={useSignOut.onOpen}
          delayDuration={200}
        >
          <LogOut className="w-6 h-5" />
        </NavItem>
      </div>
    </div>
  );
};
