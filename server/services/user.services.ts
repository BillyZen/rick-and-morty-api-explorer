import { Context } from "../createContext";
import { Prisma } from "@prisma/client";
import { RickAndMortyUser } from "../../utils/type-definitions";

export const getUser = async (
  ctx: Context,
  where: Prisma.UserWhereUniqueInput
) => {
  return (await ctx.prisma.user.findFirst({
    where,
  })) as RickAndMortyUser;
};
