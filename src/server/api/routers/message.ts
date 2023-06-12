import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "src/server/api/trpc";

export const messageRouter = createTRPCRouter({
  getMessage: publicProcedure.query(({ ctx }) => {
    const messages = ctx.prisma.message.findMany({
      orderBy: { id: "desc" },
      take: 5,
      include: {
        author: { select: { name: true } },
      },
    });
    return messages;
  }),
  sendMessage: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.message.create({
        data: {
          text: input.text,
          sentBy: ctx.session.user.id,
          createdAt: new Date(),
        },
      });
    }),
});
