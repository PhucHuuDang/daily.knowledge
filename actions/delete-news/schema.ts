import { z } from "zod";

export const DeleteNews = z.object({
  userIdInput: z.string({
    required_error: "User ID is required",
    invalid_type_error: "User ID must be a string",
  }),
  authorId: z.string({
    required_error: "Author ID is required",
    invalid_type_error: "Author ID must be a string",
  }),
  id: z.string({
    required_error: "News ID to be deleted is required",
    invalid_type_error: "News ID to be deleted must be a string",
  }),
});
