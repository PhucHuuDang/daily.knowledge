import { Author, Post } from "@prisma/client";

export type PostWIthAuthor = Post & {
  //   author: Pick<Author, "image" | "name" | "email">;
  author: Author;
};
