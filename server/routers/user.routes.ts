import { createTRPCRouter, protectedProcedure } from "../trpc";
import { getUserParams } from "../schema/user.schema";
import { getUserHandler } from "../controllers/user.controllers";

const userRouter = createTRPCRouter({
  getUser: protectedProcedure.input(getUserParams).query(({ ctx, input }) => {
    return getUserHandler({ ctx, params: input });
  }),
});

export default userRouter;
