import { z } from "zod";
import { publicProcedure, protectedProcedure } from "src/server/api/trpc";

interface StringFilter {
  contains?: string;
  endsWith?: string;
  startsWith?: string;
  mode?: "default" | "insensitive";
}

import { isProductOwner } from "src/utils/isProductOwner";
import { setProductStatus } from "src/utils/setProductStatus";
import { ProductSheme } from "src/server/models/products";
import clearProps from "src/helpers/clearProps";
import { AWS } from "src/utils/s3";

export namespace ProductProcedures {
  export const getInfiniteProducts = publicProcedure
    .input(
      ProductSheme.Get.extend({
        cursor: z.string().nullish(), // Add cursor property to the input schema
      })
    )
    .query(async ({ ctx, input }) => {
      const queryProps = {
        id: input.id,
        isActive: true,
        type: input.type,
        condition: input.condition,
        category: input.category,
        price: { gte: input.minPrice || 0, lte: input.maxPrice || 99999 },
        ownerId: input.uploadedBy,
        title: input.title
          ? ({
              contains: input.title,
              mode: "insensitive",
            } as StringFilter)
          : null,
      };
      const sortProps = {
        [input.sortBy || "price"]: input.sortDirection,
      };

      const cleanedSort = clearProps(sortProps);
      const cleanedProps = clearProps(queryProps);

      const pageSize = input.limit || 4;
      const { cursor } = input;
      const count = await ctx.prisma.product.count({
        where: cleanedProps,
      });
      const items = await ctx.prisma.product.findMany({
        where: {
          ...cleanedProps,
        },
        cursor: cursor ? { id: cursor } : undefined,

        orderBy: cleanedSort,
        take: pageSize + 1, // Get an extra item to check if there are more pages
        include: { owner: { select: { username: true, image: true } } },
      });

      const hasNextPage = items.length > pageSize;
      const products = hasNextPage ? items.slice(0, -1) : items;
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > pageSize) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }
      return {
        products,
        totalProducts: count,
        hasNextPage,
        nextCursor,
      }; // Return nextCursor to be used for the next query
    });

  export const asignPhotoKeys = protectedProcedure
    .input(z.object({ productId: z.string(), photoKeys: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const productId = input.productId;
      const neededProduct = {
        where: { id: productId },
      };
      const product = await isProductOwner({
        ctx,
        productId,
      });
      const newPhotoKeys = input.photoKeys;

      if (product) {
        const oldPhotoKeys = product.photosKeys;
        const notPresentArray = oldPhotoKeys.filter(
          (element) => !newPhotoKeys.includes(element)
        );
        console.log(notPresentArray);
        await Promise.all(notPresentArray.map((key) => AWS.deleteObject(key)));
        await ctx.prisma.product.update({
          ...neededProduct,
          data: { photosKeys: input.photoKeys },
        });

        await setProductStatus({ ctx, productId, isActive: true });
        return { succesfullyAsigned: true };
      }
    });

  export const getProducts = publicProcedure // page-based query
    .input(ProductSheme.Get)
    .query(async ({ ctx, input }) => {
      const queryProps = {
        id: input.id,
        isActive: true,
        type: input.type,
        condition: input.condition,
        category: input.category,
        price: { gte: input.minPrice || 0, lte: input.maxPrice || 99999 },
        ownerId: input.uploadedBy,
        title: input.title
          ? ({
              contains: input.title,
              mode: "insensitive",
            } as StringFilter)
          : null,
      };
      const sortProps = {
        [input.sortBy || "price"]: input.sortDirection, //anti-assertion crutch
      };

      const cleanedSort = clearProps(sortProps);
      const cleanedProps = clearProps(queryProps);

      const pageSize = input.limit || 4;
      const count = await ctx.prisma.product.count({
        where: cleanedProps,
        orderBy: cleanedSort,
      });
      const requiredProducts = await ctx.prisma.product.findMany({
        where: cleanedProps,
        orderBy: cleanedSort,
        skip: (input.page - 1) * pageSize,
        take: pageSize,
        include: { owner: { select: { username: true, image: true } } },
      });
      const totalPages = Math.ceil(count / pageSize); // Calculate the total number of pages
      const hasNextPage = input.page < totalPages;
      return { products: requiredProducts, totalProducts: count, hasNextPage };
    });

  export const createProduct = protectedProcedure
    .input(ProductSheme.Upload)
    .mutation(async ({ ctx, input }) => {
      const requiredProduct = await ctx.prisma.product.create({
        data: { ...input, ownerId: ctx.session.user.id },
      });
      return requiredProduct;
    });

  export const deleteProduct = protectedProcedure
    .input(z.object({ productId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const productId = input.productId;

      await isProductOwner({
        ctx,
        productId,
      });

      const deletedProduct = await ctx.prisma.product.delete({
        where: { id: input.productId },
      });

      await Promise.all(
        deletedProduct.photosKeys.map(
          async (key) => await AWS.deleteObject(key)
        )
      );
      return deletedProduct;
    });
  export const updateInfo = protectedProcedure
    .input(ProductSheme.Update)
    .mutation(async ({ ctx, input }) => {
      await isProductOwner({ ctx, productId: input.id });
      const { id, ...dataWithoutId } = input;

      await ctx.prisma.product.update({
        where: { id: input.id },
        data: { ...dataWithoutId },
      });
    });
}
