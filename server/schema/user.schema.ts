import { z, TypeOf } from "zod";

export const getUserParams = z.object({
  username: z.string(),
});

export type GetUserParamsType = TypeOf<typeof getUserParams>;
