/* eslint-disable @typescript-eslint/no-namespace */
import S3 from "aws-sdk/clients/s3";
import { randomUUID } from "crypto";
import { type PresignedLink } from "~/server/models/general";
import { env } from "~/utils/env.mjs";
type URLResponse = { URL: string; key: string };
interface IDeleteObject {
  folderName: Folder;
  fileName: string;
  unitId: string;
}
type FileKey = string;
import type { Folder } from "~/server/models/products";
const BUCKET_NAME = env.BUCKET_NAME;
const s3 = new S3({
  apiVersion: "2006-03-01",
  accessKeyId: env.ACCESS_KEY,
  secretAccessKey: env.SECRET_KEY,
  region: env.REGION,
  signatureVersion: "v4",
});

export namespace AWS {
  export const getPreSignedLink = async (
    data: PresignedLink
  ): Promise<URLResponse> => {
    const { fileType, unitId, folderName } = data;
    const ex = fileType.split("/")[1];

    const Key = `${folderName || "UNWANTED"}/${unitId}/${randomUUID()}.${
      ex || ""
    }`;
    const s3Params = {
      Bucket: process.env.BUCKET_NAME,
      Key,
      Expires: 60,
      ContentType: `image/${ex || "png"}`,
    };

    const link = await s3.getSignedUrlPromise("putObject", s3Params);
    return { key: Key, URL: link };
  };

  export const deleteObject = async (data: IDeleteObject | FileKey) => {
    let key = "";
    if (typeof data === "string") {
      key = data;
    }
    if (typeof data !== "string") {
      key = `${data.folderName}/${data.unitId}/${data.fileName}`;
    }

    try {
      const params = {
        Bucket: BUCKET_NAME,
        Key: key,
      };
      console.log(params.Key);
      const deleteRequest = s3.deleteObject(params, (err, data) => {
        if (err) throw err;
        else console.log(data);
      });
      const deletePromise = deleteRequest.promise();
      await deletePromise;
    } catch (error) {
      throw error;
    }
  };
}
