import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { AppRouter } from "@/server/routers/_app";
import superjson from "superjson";

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return `http://127.0.0.1:${process.env.PORT ?? 3000}`;
};

const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          async headers() {
            if (ctx?.req) {
              return {
                ...ctx.req.headers,
              };
            }
            return {};
          },
        }),
      ],
      transformer: superjson,
    };
  },
  ssr: false,
});

export default trpc;
