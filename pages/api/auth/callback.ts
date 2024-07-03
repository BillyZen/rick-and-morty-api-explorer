import { handleCallback } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { redirect } from "next/dist/server/api-utils";
import { getLogger } from "../../../utils/Logger";

const logger = getLogger("auth");

const callbackHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const forcedLogoutUrl = `${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}`;
  try {
    await handleCallback(req, res);
    logger.log("silly", `Auth callback handled successfully`);
  } catch (error: any) {
    const redirectStr = `${process.env.AUTH0_BASE_URL}/error?error_description=Please verify your email address before logging in.&logout_url=${forcedLogoutUrl}&returnTo=${process.env.AUTH0_BASE_URL}`;
    redirect(res, redirectStr);
    logger.log("error", `Auth callback forced redirect to ${redirectStr}`);
    res.status(error.status || 400).end(error.message);
  }
};

export default callbackHandler;
