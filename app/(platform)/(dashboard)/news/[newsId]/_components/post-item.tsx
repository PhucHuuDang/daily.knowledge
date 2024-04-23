"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { useUser } from "@clerk/nextjs";
import {
  Bookmark,
  Heart,
  Link as LinkLucid,
  MessageCircleMore,
} from "lucide-react";
import Image from "next/image";

interface PostItemProps {}

export const PostItem = ({}: PostItemProps) => {
  const { user } = useUser();

  const MAX_LENGTH = 63;

  const text =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisctempora maxime quaerat, eveniet iure sint deleæctus sunt quas non esse praesentium, architecto tenetur ullam suscipit";

  return (
    <div>
      <BackgroundGradient className="rounded-3xl my-1 max-w-sm px-2 py-2  duration-200 bg-zinc-900 ml-1 dark:bg-zinc-900 object-cover hover:cursor-pointer">
        {/* <div className="bg-red-500"> */}

        <div className="flex items-center gap-2 my-2">
          <Avatar className="h-10 w-10 rounded-full flex">
            <AvatarImage src={user?.externalAccounts[0].imageUrl} />
            <AvatarFallback />
          </Avatar>
          <div className="flex flex-col">
            {/* !text-[#a8b3cf] */}
            <div className=" font-semibold">Dang Huu Phuc</div>
            <span className="text-sm font-light">created At: 14:32 </span>
          </div>
        </div>

        <div className="my-2 text-xl font-semibold min-h-14">
          {text.length > MAX_LENGTH ? text.slice(0, MAX_LENGTH) + "..." : text}
        </div>

        <Image
          src="https://techcrunch.com/wp-content/uploads/2023/11/xAI-Grok-GettyImages-1765893916.jpeg?w=1390&crop=1"
          height="400"
          width="400"
          className="object-contain rounded-2xl my-4"
          alt="product"
        />

        <div className="flex items-center justify-between my-2 px-4">
          <Heart className="hover:bg-rose-200/30 hover:text-rose-500 h-8 w-8 rounded-md p-1 duration-200" />
          <MessageCircleMore className="hover:bg-[#234b51] hover:text-[#3edce7] h-8 w-8 rounded-md p-1 duration-200" />
          <Bookmark className="hover:bg-[#53362a] hover:text-[#f98e3b]  h-8 w-8 rounded-md p-1 duration-200" />
          <LinkLucid className="hover:bg-[#442356] hover:text-[#ce3cf3] h-8 w-8 rounded-md p-1 duration-200" />
        </div>

        {/* </div> */}
      </BackgroundGradient>
    </div>
  );
};
