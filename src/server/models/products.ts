import { z } from "zod";
import type { Prisma } from "@prisma/client";

export const FolderScheme = z.union([
  z.literal("productPhotos"),
  z.literal("profilePhotos"),
]);

export type Folder = z.infer<typeof FolderScheme>;
export type ProductWithOwner = Prisma.ProductGetPayload<{
  include: { owner: { select: { username: true; image: true } } };
}>;
export const SortDirection = z.union([z.literal("asc"), z.literal("desc")]);
export type SortDirection = z.infer<typeof SortDirection>;

const ConditionScheme = z.union([
  z.literal("new"),
  z.literal("barely"),
  z.literal("roughly"),
  z.literal("any"),
]);
export type ConditionValues = z.infer<typeof ConditionScheme>;

export namespace ProductSheme {
  export const Get = z.object({
    id: z.string().nullish(),
    type: z.string().nullish(),
    category: z.string().nullish(),
    condition: ConditionScheme.nullish(),
    minPrice: z.number().nullish(),
    maxPrice: z.number().nullish(),
    title: z.string().nullish(),
    sortBy: z.string().optional(),
    sortDirection: SortDirection.optional(),
    uploadedBy: z.string().nullish(),
    limit: z.number().nullish(),
    page: z.number(),
  });

  export const Upload = z.object({
    title: z.string().max(25),
    price: z.number().max(9999),
    description: z.string().max(100),
    size: z.string().optional(),
    condition: z.string().max(25),
    brand: z.string().max(25),
    category: z.string().max(25),
    type: z.string(),
  });
  export const Update = Upload.extend({ id: z.string() });
}
export type UploadProductInput = z.infer<typeof ProductSheme.Upload>;
