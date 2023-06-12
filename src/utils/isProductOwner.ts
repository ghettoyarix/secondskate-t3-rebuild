import { Product } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type Context } from "src/server/api/trpc";
export const isProductOwner = async ({
  ctx,
  productId,
}: {
  ctx: Context;
  productId: string;
}): Promise<Product | null> => {
  const neededProduct = {
    where: { id: productId },
  };
  const productFound = await ctx.prisma.product.findUnique(neededProduct);
  if (ctx?.session?.user.id === productFound?.ownerId) {
    return productFound;
  } else
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not allowed to do it.",
    });
};
