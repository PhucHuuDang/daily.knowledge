import { z } from "zod";
import { Post } from "@prisma/client";

import { CreateNewPost } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof CreateNewPost>;

export type ReturnType = ActionState<InputType, Post>;
