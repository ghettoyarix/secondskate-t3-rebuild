import { TRPCError } from "@trpc/server";
import { type Context } from "~/server/api/trpc";

export const isProductOwner = async ({
  ctx,
  productId,
}: {
  ctx: Context;
  productId: string;
}): Promise<boolean> => {
  const neededProduct = {
    where: { id: productId },
  };
  const productFound = await ctx.prisma.product.findUnique(neededProduct);
  if (ctx?.session?.user.id === productFound?.ownerId) {
    return true;
  } else
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not allowed to do it.",
    });
};
