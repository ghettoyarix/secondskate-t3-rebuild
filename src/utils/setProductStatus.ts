import { type Context } from "~/server/api/trpc";
import { isProductOwner } from "./isProductOwner";
export const setProductStatus = async ({
  ctx,
  productId,
  isActive,
}: {
  ctx: Context;
  productId: string;
  isActive: boolean;
}) => {
  const neededProduct = {
    where: { id: productId },
  };

  const permitCondition = await isProductOwner({ ctx, productId });
  if (permitCondition) {
    await ctx.prisma.product.update({
      ...neededProduct,
      data: { isActive: isActive },
    });
  }
};
