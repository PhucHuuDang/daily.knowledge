import { PostType } from "@prisma/client";
import { z } from "zod";

export const CreateNewPost = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(10, { message: "Title must be at least 10 characters long" }),

  content: z
    .string({
      required_error: "Content is required",
      invalid_type_error: "Content is required to create a post",
    })
    .min(50, { message: "Content must be at least 50 characters long" }),
  censored: z.boolean(),
  censoredBy: z.string({
    required_error: "Cencored by is required",
    invalid_type_error: "Invalid author of this post",
  }),
  published: z.boolean(),
  postType: z.any(),
});
