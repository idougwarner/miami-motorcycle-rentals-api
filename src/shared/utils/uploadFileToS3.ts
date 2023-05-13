import { S3 } from 'aws-sdk';
import fetchFileData from './fetchFileDataByUrl';
import { v4 as uuidv4 } from 'uuid';

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

export async function uploadFileToS3(
  fileUrl: string,
  filename: string,
): Promise<{ uploadedFileUrl: string; fileSizeInKB: number }> {
  const { buffer, contentType } = await fetchFileData(fileUrl);

  // Generate a unique identifier for the file
  const key = `${uuidv4()}-${filename}`;

  // Define the parameters for the S3 upload
  const bucketName = process.env.AWS_BUCKET_NAME;
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: buffer,
    ContentType: contentType,
    ACL: 'public-read',
  };

  await s3.upload(params).promise();

  const uploadedFileUrl = `https://${bucketName}.s3.${s3.config.region}.amazonaws.com/${key}`;

  const fileSizeInBytes = buffer.byteLength;
  const fileSizeInKB = fileSizeInBytes / 1024;

  console.log(`File uploaded(${fileSizeInKB} KB): ${key}`);
  return { uploadedFileUrl, fileSizeInKB };
}
