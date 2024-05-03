import { PostType } from "@prisma/client";
import { z } from "zod";

export const CreateNewPost = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(10, { message: "Title must be at least 10 characters long" }),

  image: z.string({
    required_error: 'Image is required',
    invalid_type_error: 'Image must be a string',
  }),

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
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),

  authorImage: z.string({
    required_error: "Author image is required",
    invalid_type_error: "Author image must be a string",
  }),
  // name: z.string({
  //   required_error: "Name is required",
  //   invalid_type_error: "Name must be a string",
  // }),
  // postType: z.any(),
  postType: z.nativeEnum(PostType),
});
