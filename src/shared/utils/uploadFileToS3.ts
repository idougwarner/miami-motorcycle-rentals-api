import { S3 } from 'aws-sdk';
import fetchFileData from './fetchFileDataByUrl';
import { v4 as uuidv4 } from 'uuid';
import { FileSystemStoredFile } from 'nestjs-form-data';
import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';

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

export async function uploadFormDataFileToS3({
  file,
  fileName,
  index,
}: {
  file: FileSystemStoredFile;
  fileName?: string;
  index?: number;
}): Promise<{ uploadedFileUrl: string; fileSizeInKB: number; index: number }> {
  // Read the file data
  const readFile = util.promisify(fs.readFile);
  const buffer = await readFile(file.path);

  // Generate a unique identifier for the file
  const key = fileName
    ? `${uuidv4()}-${fileName}`
    : `${uuidv4()}-${file.originalName}`;

  // Define the parameters for the S3 upload
  const bucketName = process.env.AWS_BUCKET_NAME;
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: buffer,
    ContentType: file['busBoyMimeType'],
    ACL: 'public-read',
  };

  await s3.upload(params).promise();

  const uploadedFileUrl = `https://${bucketName}.s3.${s3.config.region}.amazonaws.com/${key}`;

  const fileSizeInKB = file.size / 1024;

  console.log(`File uploaded(${fileSizeInKB} KB): ${key}`);

  // Cleanup: Delete the local file now that it has been uploaded to S3
  fs.unlink(file.path, (err) => {
    if (err) {
      console.error(
        `Error deleting temporary file ${path.basename(file.path)}:`,
        err,
      );
    } else {
      console.log(`Temporary file ${path.basename(file.path)} deleted.`);
    }
  });

  return { uploadedFileUrl, fileSizeInKB, index };
}
