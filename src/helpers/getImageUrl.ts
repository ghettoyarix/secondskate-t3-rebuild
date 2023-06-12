import { env } from "src/utils/env.mjs";

export const getImageUrl = (
  fileKey: string | undefined | null
): string | null => {
  if (typeof fileKey === "string") {
    // Check if the file URL already includes 'http' or 'https'
    if (fileKey.startsWith("http" || fileKey.includes("localhost"))) {
      return fileKey;
    }
    // Construct the CDN URL from the file URL and CDN domain
    const cdnUrl = `${env.NEXT_PUBLIC_CDN_DOMAIN_NAME}/${fileKey}`;
    return cdnUrl;
  } else {
    return null;
  }
};
