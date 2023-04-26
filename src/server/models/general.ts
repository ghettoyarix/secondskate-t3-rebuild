import { z } from "zod";
import { FolderScheme } from "./products";
export const PresignedLinkScheme = z.object({
  fileType: z.string(),
  folderName: FolderScheme,
  unitId: z.string(),
});

export type PresignedLink = z.infer<typeof PresignedLinkScheme>;
