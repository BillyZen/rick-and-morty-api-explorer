import { Context } from "../createContext";
import getLogger from "@/utils/Logger";
import { GetUserParamsType } from "../schema/user.schema";
import { getUser } from "../services/user.services";

const logger = getLogger("trpc");

export const getUserHandler = async ({
  ctx,
  params,
}: {
  ctx: Context;
  params: GetUserParamsType;
}) => {
  if (!ctx.user) {
    logger.log("silly", `Unauthorized user attempting to use getUserHandler`);
    return {
      status: "Unauthorized",
      message: "You must be logged in to access this resource",
    };
  }

  if (!params.username) {
    logger.log(
      "silly",
      `Params for getUserHandler is missing username property`
    );
    return {
      status: "Failed",
      message: "Must include username",
    };
  }

  try {
    const data = await getUser(ctx, { username: params.username });
    logger.log("silly", `Successfully got user`);

    return {
      status: "Success",
      message: `Found Profile for ${params.username}`,
      data,
    };
  } catch (error) {
    logger.log("error", `Failed calling getUserHandler --- ${error}`);
    return {
      status: "Failed",
      message: "There was an issue trying to get the user!",
    };
  }
};
