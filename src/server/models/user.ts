import { z } from "zod";
export const UpdateProfileInfoScheme = z.object({
  username: z.string().nullish(),
  instagram: z.string().nullish(),
  telegram: z.string().nullish(),
  title: z.string().nullish(),
  description: z.string().nullish(),
});

export type UpdateProfileInfoType = z.infer<typeof UpdateProfileInfoScheme>;
