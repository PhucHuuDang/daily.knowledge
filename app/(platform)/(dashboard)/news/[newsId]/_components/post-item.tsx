"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Skeleton } from "@/components/ui/skeleton";
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

  //? try to use it hover:bg-opacity-0

  // * use Skeleton for client side rendering when pending data
  // if (true) {
  //   return <PostItem.Skeleton />;
  // }

  return (
    <div>
      <BackgroundGradient
        className="
          rounded-3xl
          my-1
          max-w-sm
          px-2
          py-2
          bg-zinc-900
          hover:bg-opacity-95
          mx-1
          dark:bg-zinc-900
          object-cover
          hover:cursor-pointer
          duration-200"
        containerClassName="w-full "
      >
        {/* <div className="bg-red-500"> */}

        <div className="flex items-center gap-2 my-2">
          <Avatar className="h-8 w-8 rounded-full flex">
            <AvatarImage src={user?.externalAccounts[0].imageUrl} />
            <AvatarFallback />
          </Avatar>
          <div className="flex flex-col">
            {/* !text-[#a8b3cf] */}
            <div className="text-sm font-semibold">Dang Huu Phuc</div>
            <span className="text-sm font-light">created At: 14:32 </span>
          </div>
        </div>

        <div className="my-2 text-base font-semibold min-h-14">
          {text.length > MAX_LENGTH ? text.slice(0, MAX_LENGTH) + "..." : text}
        </div>

        <Image
          src="https://techcrunch.com/wp-content/uploads/2023/11/xAI-Grok-GettyImages-1765893916.jpeg?w=1390&crop=1"
          height="350"
          width="350"
          className="object-contain rounded-2xl my-4"
          alt="product"
        />

        <div className="flex items-center justify-between my-2 px-4">
          <Heart className="hover:bg-rose-200/30 hover:text-rose-500 h-7 w-7 rounded-md p-1 duration-200" />
          <MessageCircleMore className="hover:bg-[#234b51] hover:text-[#3edce7] h-7 w-7 rounded-md p-1 duration-200" />
          <Bookmark className="hover:bg-[#53362a] hover:text-[#f98e3b]  h-7 w-7 rounded-md p-1 duration-200" />
          <LinkLucid className="hover:bg-[#442356] hover:text-[#ce3cf3] h-7 w-7 rounded-md p-1 duration-200" />
        </div>

        {/* </div> */}
      </BackgroundGradient>
    </div>
  );
};

PostItem.Skeleton = function PostSkeleton() {
  return (
    <div className="rounded-3xl my-1 max-w-sm px-2 py-2 bg-zinc-900 mx-1 object-cover hover:cursor-pointer">
      <div className="flex items-center gap-2 my-2">
        <Skeleton className="h-8 w-8 rounded-full" />

        <div className="flex flex-col gap-y-2">
          <Skeleton className="w-16 h-2" />
          <Skeleton className="w-32 h-2" />
        </div>
      </div>
      <Skeleton className="min-h-14 w-full" />

      <Skeleton className="object-contain rounded-2xl h-[180px] w-full my-4 text-slate-200" />

      <div className="flex items-center justify-between my-2 px-4">
        <Skeleton className="h-7 w-7 rounded-md p-1" />
        <Skeleton className="h-7 w-7 rounded-md p-1" />
        <Skeleton className="h-7 w-7 rounded-md p-1" />
        <Skeleton className="h-7 w-7 rounded-md p-1" />
      </div>
    </div>
  );
};
