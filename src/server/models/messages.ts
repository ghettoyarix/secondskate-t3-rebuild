import type { Prisma } from "@prisma/client";
export type MessageWithAuthor = Prisma.MessageGetPayload<{
  include: { author: { select: { name: true } } };
}>;
