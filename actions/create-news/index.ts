import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { PostType } from "@prisma/client";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateNewPost } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId, orgSlug } = auth();

  if (!userId && !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, content, censored, censoredBy, published, postType } = data;

  let news;
  try {
    news = await db.post.create({
      data: {
        title,
        content,
        censored,
        censoredBy,
        published,
        createdBy: orgSlug ?? "HarryDang",
        postType: PostType.TECHNOLOGY,
        authorId: userId,
      },
    });
  } catch (error) {
    return {
      error: "Failed to create news",
    };
  }

  revalidatePath("/news/123");

  return {
    data: news,
  };
};

export const createNews = createSafeAction(CreateNewPost, handler);
