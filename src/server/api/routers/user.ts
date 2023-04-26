import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { UpdateProfileInfoScheme } from "~/server/models/user";
import { AWS } from "~/utils/s3";
export const userRouter = createTRPCRouter({
  getPublicUserInfoByUsername: publicProcedure
    .input(z.object({ username: z.string().nullish() }))
    .query(async ({ ctx, input }) => {
      if (input.username) {
        const user = await ctx.prisma.user.findFirst({
          where: { username: input.username },
        });
        return user;
      } else throw new TRPCError({ code: "BAD_REQUEST" });
    }),
  updateUserInfo: protectedProcedure
    .input(UpdateProfileInfoScheme)
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.user.update({
        where: {
          id: ctx.session?.user.id,
        },
        data: {
          ...input,
        },
      });
    }),
  updateProfilePhoto: protectedProcedure
    .input(z.object({ photoKey: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await AWS.deleteObject(ctx.session.user.image!);
      await ctx.prisma.user.update({
        where: {
          id: ctx.session?.user.id,
        },
        data: {
          image: input.photoKey,
        },
      });

      console.log(ctx.session.user.image);
    }),
});
