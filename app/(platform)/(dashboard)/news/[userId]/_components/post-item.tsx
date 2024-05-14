"use client";

import { format } from "date-fns";

import { HoverBorderGradient } from "@/components/aceternity/hover-border-gradient";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Skeleton } from "@/components/ui/skeleton";
import { PostWIthAuthor } from "@/types/types";
import { useUser } from "@clerk/nextjs";
import { Post } from "@prisma/client";
import {
  Bookmark,
  EllipsisVertical,
  ExternalLink,
  FilePenLine,
  Heart,
  Link as LinkLucid,
  MessageCircleMore,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAction } from "@/hooks/use-action";
import { deleteNews } from "@/actions/delete-news";
import { toast } from "sonner";
import { FormSubmit } from "@/components/form/form-submit";
import React, { MouseEventHandler } from "react";
import { cn } from "@/lib/utils";

interface PostItemProps {
  data: PostWIthAuthor;
  authorNews?: boolean;
}

export const PostItem = ({ data, authorNews }: PostItemProps) => {
  const MAX_LENGTH = 63;
  const { user } = useUser();
  const router = useRouter();

  // console.log(data);

  // console.log({ user });

  const { execute } = useAction(deleteNews, {
    onSuccess: (data) => {
      toast.success(`The News has been deleted successfully`);
    },

    onError(error) {
      toast.error(error);
    },
  });

  const onDelete = (formData: FormData) => {
    execute({
      id: data.id,
      authorId: data.authorId,
      userIdInput: data.author.userId,
    });
  };

  const defaultStyles =
    "w-full h-8 flex items-center justify-start gap-4 hover:scale-105 hover:bg-slate-200/20 text-base text-[#707a8c] transition duration-200 ";

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
    <div onClick={() => router.push(`/news/news-detail/${data.id}`)}>
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
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical className="w-8 h-8 2xl:h-10 2xl:w-10 p-1 rounded-xl invisible group-hover/post:visible focus-visible:visible hover:bg-[#21262d] " />
            </DropdownMenuTrigger>

            {authorNews ? (
              <DropdownMenuContent
                className="w-40 bg-[#1c1f26] border border-[#383d47] p-0 "
                onClick={(
                  e: React.MouseEvent<HTMLDivElement, MouseEvent>
                ): void => {
                  e.stopPropagation();
                }}
              >
                <DropdownMenuGroup className="w-full flex flex-col justify-center">
                  {/* <DropdownMenuItem> */}
                  {/* <div className="flex flex-col justify-center gap-y-2 bg-red-500 min-w-full"> */}
                  <form action={onDelete}>
                    <FormSubmit
                      className={cn(`${defaultStyles}`, "hover:text-rose-500")}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </FormSubmit>
                  </form>
                  <form action={() => {}}>
                    <FormSubmit
                      className={cn(`${defaultStyles}`, "hover:text-sky-500")}
                    >
                      <FilePenLine className="h-4 w-4" /> Edit
                    </FormSubmit>
                  </form>
                  {/* </div> */}
                  {/* </DropdownMenuItem> */}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            ) : (
              <DropdownMenuContent>
                <DropdownMenuLabel className="w-52 z-50">
                  Home page
                </DropdownMenuLabel>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
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

        {data ? (
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
        ) : (
          <Skeleton className="aspect-video w-96 md:h-48 2xl:h-56 rounded-2xl my-4" />
        )}

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
