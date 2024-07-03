import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/routers/_app";
import { createContext } from "../../../server/createContext";
import getLogger from "@/utils/Logger";

const logger = getLogger("trpc");

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4.5mb",
    },
  },
};

const nextApiHandler = trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext,
  onError:
    process.env.NODE_ENV === "development"
      ? ({ path, error }) => {
          logger.log(
            "error",
            `tRPC failed on ${path ?? "<no path>"}: ${error.message}`
          );
        }
      : undefined,
});

export default nextApiHandler;
