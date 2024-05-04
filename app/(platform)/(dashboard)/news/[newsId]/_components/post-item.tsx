"use client";

import { format } from "date-fns";

import { HoverBorderGradient } from "@/components/aceternity/hover-border-gradient";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PostWIthAuthor } from "@/types/types";
import { useUser } from "@clerk/nextjs";
import { Post } from "@prisma/client";
import {
  Bookmark,
  EllipsisVertical,
  ExternalLink,
  Heart,
  Link as LinkLucid,
  MessageCircleMore,
} from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface PostItemProps {
  data: PostWIthAuthor;
}

export const PostItem = ({ data }: PostItemProps) => {
  const { user } = useUser();

  const MAX_LENGTH = 63;

  // console.log(data);

  // console.log({ user });

  //? try to use it hover:bg-opacity-0

  // * use Skeleton for client side rendering when pending data
  if (!data) {
    return (
      <>
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
      </>
    );
  }

  return (
    <div onClick={() => console.log(data.id)}>
      <BackgroundGradient
        className="
          rounded-3xl
          group/post
          my-1
          max-w-sm
          px-2
          py-2
          bg-zinc-900
          hover:bg-opacity-[0.93]
          mx-1
          dark:bg-zinc-900
          object-cover
          hover:cursor-pointer
          duration-200
          relative
          "
        containerClassName="w-full "
      >
        {/* <div className="bg-red-500"> */}

        <div className="absolute top-4 right-2 flex items-center gap-x-1 2xl:gap-x-2">
          <HoverBorderGradient
            onClick={() => console.log("read post")}
            containerClassName="rounded-md group-hover/post:visible invisible "
            className="flex items-center text-slate-200 h-7 2xl:h-8 bg-black 2xl:space-x-2 gap-x-1"
          >
            <span className="2xl:block hidden">Read post</span>{" "}
            <ExternalLink className=" h-5 w-5" />
          </HoverBorderGradient>

          <EllipsisVertical className="w-8 h-8 2xl:h-10 2xl:w-10 p-1 rounded-xl invisible group-hover/post:visible hover:bg-[#21262d] " />
        </div>

        <div className="flex items-center gap-2 my-2">
          <Avatar className="h-8 w-8 rounded-full flex">
            <AvatarImage src={data.author.image} />
            <AvatarFallback />
          </Avatar>
          <div className="flex flex-col">
            {/* !text-[#a8b3cf] */}
            <div className="text-sm font-semibold">{data.author.name}</div>
            <span className="text-sm font-light">
              {format(new Date(data.createdAt), "MMM d, yyyy 'at' h:mm a")}
            </span>
          </div>
        </div>

        <div className="my-2 text-base font-semibold min-h-14">
          {data.content.length > MAX_LENGTH
            ? data.content.slice(0, MAX_LENGTH) + "..."
            : data.content}
        </div>

        <Image
          src={data.image}
          height={0}
          width={0}
          sizes="100vw"
          // sizes={"(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"}
          // style={{ width: "350px", height: "300px" }}
          className="aspect-video object-cover w-96 md:h-48 2xl:h-56 rounded-2xl my-4"
          alt={data.title}
        />

        {/* <AspectRatio ratio={16 / 9} className="w-full h-full">
          <Image
            src={data.image}
            fill
            className="object-cover rounded-2xl w-full h-full"
            alt={data.title}
          />
        </AspectRatio> */}

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
