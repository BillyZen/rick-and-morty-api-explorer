import { handleLogin } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await handleLogin(req, res, {
      authorizationParams: {
        response_type: "code",
        scope: "openid profile email",
      },
    });
  } catch (error: any) {
    res.status(error.status || 400).end(error.message);
  }
};

export default loginHandler;
