import { createTRPCRouter } from "src/server/api/trpc";
import { exampleRouter } from "src/server/api/routers/example";
import { productRouter } from "./routers/product";
import { messageRouter } from "./routers/message";
import { userRouter } from "./routers/user";
import { fileRouter } from "./routers/file";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  product: productRouter,
  message: messageRouter,
  user: userRouter,
  file: fileRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
