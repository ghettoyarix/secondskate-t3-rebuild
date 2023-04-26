import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { deleteObject } from "~/utils/s3";
export const exampleRouter = createTRPCRouter({
  deleteObject: publicProcedure.mutation(async ({ input }) => {
    await deleteObject({
      folderName: "profilePhotos",
      fileName: "1d0a132e-0f98-4840-b855-683d83b0ae57.png",
      unitId: "clge3138x0006v1qwb0i09jm0",
    });
  }),

  postThing: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.product.create({
        data: {
          title: input.text,
          ownerId: ctx.session.user.id,
        },
      });
    }),
  getProducts: publicProcedure

    .input(z.object({ text: z.string() }).optional())
    .query(({ input, ctx }) => {
      return ctx.prisma.product.findMany({});
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
