import { NextApiRequest, NextApiResponse } from "next";
import { RickAndMortyUser } from "@/utils/type-definitions";
import getLogger from "@/utils/Logger";
import { Session, updateSession, handleProfile } from "@auth0/nextjs-auth0";
import { prisma } from "../../../prisma/client";

const logger = getLogger("auth");

const createUserIfNoneExists = async (session: Session) => {
  const user = await prisma.user.findFirst({
    where: {
      username: session.user.email,
    },
  });
  if (user) {
    logger.log("silly", "Successfully found user");
    return user;
  }
  logger.log("silly", "Creating new User as none exists in DB");
  const newUser = await prisma.user.create({
    data: {
      username: session.user.email,
    },
  });

  logger.log("silly", "Successfully created new user");
  return newUser;
};

const afterRefetch = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  if (session) {
    try {
      const newSession = {
        ...session,
        user: {
          ...session.user,
          appUser: (await createUserIfNoneExists(session)) as RickAndMortyUser,
        },
      };

      await updateSession(req, res, newSession);
      return newSession as Session;
    } catch (error: any) {
      logger.log("error", `Failed to log in with user, ${error}`);
    }
  }
  return session as Session;
};

const profileHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await handleProfile(req, res, {
      refetch: true,
      afterRefetch,
    });
  } catch (error: any) {
    res.status(error.status || 400).end(error.message);
  }
};

export default profileHandler;
