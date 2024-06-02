"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { Author, PostType, Role } from "@prisma/client";

import { db } from "@/lib/db";

import { CreateNewPost } from "./schema";
import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId, orgSlug } = auth();

  if (!userId && !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const {
    title,
    content,
    censored,
    censoredBy,
    published,
    postType,
    image,
    authorImage,
    email,
  } = data;

  const isAdmin = await db.author.findUnique({
    where: {
      email: process.env.NEXT_PRIVATE_MAIL_ADMIN as string,
    },
    select: {
      role: true,
      email: true,
    },
  });

  const role =
    (isAdmin?.email === (process.env.NEXT_PRIVATE_MAIL_ADMIN as string)
      ? Role.ADMIN
      : Role.USER) ?? Role.USER;

  let news;
  try {
    news = await db.author.upsert({
      where: {
        email,
        userId,
      },
      update: {
        posts: {
          create: {
            title,
            content,
            censored,
            censoredBy,
            published,
            image: image,
            postType: postType,
          },
        },
      },
      create: {
        userId,
        name: orgSlug ?? "Dang Huu Phuc",
        email,
        image: authorImage,
        role,
        posts: {
          create: {
            title,
            content,
            censored,
            censoredBy,
            published,
            image: image,
            postType: postType,
          },
        },
      },
    });
  } catch (error) {
    return {
      error: "Failed to create news",
    };
  }

  revalidatePath(`/news/${orgId}`);

  return {
    data: news,
  };
};

export const createNews = createSafeAction(CreateNewPost, handler);
