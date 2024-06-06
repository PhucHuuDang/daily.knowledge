import { z } from "zod";

export const PublishedCensored = z.object({
  id: z.string({
    required_error: "News ID is required",
    invalid_type_error: "News ID must be a string",
  }),
  censored: z.boolean({
    required_error: "Censored is required",
    invalid_type_error: "Censored must be a boolean",
  }),
  published: z.boolean({
    required_error: "Published is required",
    invalid_type_error: "Published must be a boolean",
  }),
  censoredBy: z.string({
    required_error: "Censored by is required",
    invalid_type_error: "Censored by must be a string",
  }),
});
