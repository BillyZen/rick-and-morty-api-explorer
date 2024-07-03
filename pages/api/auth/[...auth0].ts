import { RickAndMortyUser } from "@/utils/type-definitions";
import getLogger from "@/utils/Logger";
import {
  handleAuth,
  Session,
  updateSession,
  handleProfile,
} from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/client";

const logger = getLogger("auth");

const createUserIfNoneExists = async (
  user: RickAndMortyUser,
  session: Session
) => {
  if (user) {
    logger.log("silly", `User already exists`);
    return user;
  }

  const newUser = await prisma.user.create({
    data: {
      username: session.user.email,
    },
  });

  logger.log("silly", `Created new user ${JSON.stringify(newUser, null, 4)}`);

  return newUser;
};

const afterRefetch = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  if (session) {
    try {
      const appUser = await prisma.user.findFirst({
        where: {
          username: session.user.email,
        },
      });

      const newSession = {
        ...session,
        user: {
          ...session.user,
          appUser: await createUserIfNoneExists(
            appUser as RickAndMortyUser,
            session
          ),
        },
      };

      logger.log("silly", `New session ${JSON.stringify(newSession, null, 4)}`);

      await updateSession(req, res, newSession);
      return newSession as Session;
    } catch (error) {
      logger.log("error", `Failed to find user, ${error}`);
    }
  }
  return session as Session;
};

export default handleAuth({
  async profile(req: NextApiRequest, res: NextApiResponse) {
    try {
      await handleProfile(req, res, {
        refetch: true,
        afterRefetch,
      });
      logger.log("silly", `handled new profile`);
    } catch (error: any) {
      logger.log("error", `Failed to handle profile, ${error}`);
      res.status(error.status || 500).end(error.message);
    }
  },
});
