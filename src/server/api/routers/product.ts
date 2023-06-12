import { createTRPCRouter } from "src/server/api/trpc";

import { ProductProcedures } from "../procedures/products";
export const productRouter = createTRPCRouter({
  ...ProductProcedures,
});
