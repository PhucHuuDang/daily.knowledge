import { z } from "zod";
import { PublishedCensored } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Post } from "@prisma/client";

export type InputType = z.infer<typeof PublishedCensored>;

export type ReturnType = ActionState<InputType, Post>;
