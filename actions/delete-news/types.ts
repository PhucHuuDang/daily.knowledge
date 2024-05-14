import { z } from "zod";

import { Post } from "@prisma/client";

import { DeleteNews } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof DeleteNews>;

export type ReturnType = ActionState<InputType, Post>;
