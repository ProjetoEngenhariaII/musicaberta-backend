import { S3Client } from "@aws-sdk/client-s3";

export const clientS3 = new S3Client({
  forcePathStyle: true,
  region: process.env.S3_REGION as string,
  endpoint: process.env.S3_ENDPOINT as string,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
  },
});
