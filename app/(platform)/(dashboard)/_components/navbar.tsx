"use client";

import { FormInput } from "@/components/form/form-input";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "@/components/ui/search-icon";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreatePost } from "@/hooks/use-create-post";
import { UserButton, useSignIn } from "@clerk/nextjs";
import { Bell } from "lucide-react";

export const Navbar = () => {
  const createPost = useCreatePost();

  const { isLoaded } = useSignIn();

  const onClick = () => {
    createPost.onOpen();
    // console.log(createPost.isOpen);
  };

  return (
    <div className="fixed top-0 z-50 flex bg-gradient-to-r from-slate-900 to-slate-700 items-center justify-between w-full px-2 md:px-3 shadow-sm border-b border-[#3d3f43]">
      <div
        className="
        flex
        items-center
        justify-between
        w-full
        p-2
        gap-x-10
        "
      >
        {/* Mobile side bar */}
        <Logo height={30} width={30} className="md:text-lg" />
        <div className="w-1/3">
          <FormInput
            // icon={Search as IconType}
            searchIcon={<SearchIcon fillColor="#a8b3cf" />}
            placeholder="Search posts"
            id="search"
            className="p-5 bg-slate-700 text-slate-400 rounded-xl caret-sky-600 border-0 focus:ring-0 focus:ring-offset-0 focus:ring-offset-slate-400 focus:ring-slate-300 focus:ring-opacity-50"
          />
        </div>

        <div className="flex items-center gap-4">
          <Button
            onClick={onClick}
            variant="default"
            className="h-10 font-semibold px-7 rounded-xl border border-slate-300"
          >
            New Post
          </Button>

          <div className="group bg-slate-700 rounded-xl hover:cursor-pointer p-3 hover:bg-slate-600 transition">
            <Bell className=" text-slate-400 group-hover:text-slate-100" />
          </div>

          {isLoaded ? (
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: {
                    height: 32,
                    width: 32,
                  },
                },
              }}
            />
          ) : (
            <Skeleton className="rounded-full h-8 w-8" />
          )}
        </div>
      </div>
    </div>
  );
};
