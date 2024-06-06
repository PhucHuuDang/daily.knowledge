"use server";

import { PublishedCensored } from "./schema";
import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, censored, published, censoredBy } = data;

  let updatePublishedCensored;

  try {
    updatePublishedCensored = await db.post.update({
      where: {
        id,
      },
      data: {
        censored,
        published,
        censoredBy,
      },
    });
  } catch (error) {
    return {
      error: "Failed to publish news",
    };
  }

  revalidatePath(`/authenticate`);

  return {
    data: updatePublishedCensored,
  };
};

export const updatePublishedCensoredPost = createSafeAction(
  PublishedCensored,
  handler
);
