"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteNews } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = auth();

  if (!userId && !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, userIdInput, authorId } = data;

  let deleteNews;

  try {
    deleteNews = await db.post.delete({
      where: {
        id,
        authorId,
        author: {
          userId: userIdInput,
        },
      },
    });
  } catch (error) {
    return {
      error: "Failed to delete news",
    };
  }

  revalidatePath(`/news/${orgId}/news-shared`);

  return {
    data: deleteNews,
  };
};

export const deleteNews = createSafeAction(DeleteNews, handler);
