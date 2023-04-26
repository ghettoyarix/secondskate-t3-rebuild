import { createTRPCRouter } from "~/server/api/trpc";

import { ProductProcedures } from "../procedures/products";
export const productRouter = createTRPCRouter({
  ...ProductProcedures,
});
