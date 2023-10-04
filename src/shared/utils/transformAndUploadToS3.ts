import { S3 } from 'aws-sdk';
import * as sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { MediaDimension, MediaSize } from '../common';
import { MediaURLDto } from '../dtos/media/media-transform-request.dto';

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

export async function transformAndUploadToS3(
  imageBuffer: Buffer,
  mediaData: MediaURLDto,
): Promise<
  {
    mediaUrl: string;
    size: { width: number; height: number; mediaSize: MediaSize };
    fileSizeInKB: number;
    filename: string;
    id: number;
    mimeType: string;
  }[]
> {
  const { filename: originalFileName, mimeType, id } = mediaData;
  try {
    // Define the sizes to resize to
    const sizes = [
      MediaDimension.Large,
      MediaDimension.MediumLarge,
      MediaDimension.Medium,
    ];
    // Resize and upload each size to S3
    const uploadPromises = sizes.map(async (size) => {
      const resizedBuffer = await sharp(imageBuffer)
        .resize(size.width, size.height, { fit: 'contain' })
        .toBuffer();
      const fileSizeInBytes = resizedBuffer.byteLength;
      const fileSizeInKB = fileSizeInBytes / 1024;

      const resizedFilename = `${originalFileName}-min-${size.width}x${size.height}`;
      const key = `${uuidv4()}-${resizedFilename}`;

      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: resizedBuffer,
        ContentType: mimeType,
        ACL: 'public-read',
      };

      await s3.upload(params).promise();
      console.log(`Transformed Image uploaded to: ${key}`);

      // Return the S3 URL for the uploaded resized image
      return {
        mediaUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${key}`,
        size,
        fileSizeInKB,
        filename: resizedFilename,
        id,
        mimeType,
      };
    });

    // Wait for all uploads to finish and return the resulting S3 URLs
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Error resizing and uploading image:', error);
    throw error; // Re-throw the error after logging it
  }
}
