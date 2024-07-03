import { inferAsyncReturnType } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getSession } from "@auth0/nextjs-auth0";
import { prisma } from "../prisma/client";

export const createContext = async (
  opts?: CreateNextContextOptions,
  service?: string
) => {
  const req = opts?.req;
  const res = opts?.res;

  if (service) {
    return {
      prisma,
      req,
      res,
      service,
    };
  }

  const session = req && res && (await getSession(req, res));

  const user = await prisma.user.findFirst({
    where: { username: session?.user?.email },
  });

  return {
    prisma,
    req,
    res,
    user,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
