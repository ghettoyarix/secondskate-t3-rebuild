import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { AWS } from "~/utils/s3";
import { PresignedLinkScheme } from "~/server/models/general";
export const fileRouter = createTRPCRouter({
  getPresignedLink: protectedProcedure
    .input(PresignedLinkScheme)
    .mutation(async ({ ctx, input }) => {
      let unit = input.unitId;
      if (input.folderName === "profilePhotos") {
        unit = ctx.session.user.id;
      }
      const res = await AWS.getPreSignedLink({ ...input, unitId: unit });
      return res;
    }),
  sendMessage: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.message.create({
        data: {
          text: input.text,
          sentBy: ctx.session.user.id,
        },
      });
    }),
});
