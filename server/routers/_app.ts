import { createTRPCRouter } from "../trpc";
import userRouter from "./user.routes";

export const appRouter = createTRPCRouter({
  userRouter,
});

export type AppRouter = typeof appRouter;
