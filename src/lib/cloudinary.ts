import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';

// Attempt to load .env from process.cwd() and parent directory
try {
  dotenv.config({ path: path.resolve(process.cwd(), '.env') });
  dotenv.config({ path: path.resolve(__dirname, '../../.env') });
} catch (_) {}

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'fifyhrcr';
const API_KEY = process.env.CLOUDINARY_API_KEY || '462151937739666';
const API_SECRET = process.env.CLOUDINARY_API_SECRET || '_lcjEAWwXMWr07V3Z7FUmawQks4';

// Configure Cloudinary
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

export const isCloudinaryConfigured = (): boolean => {
  return Boolean(CLOUD_NAME && API_KEY && API_SECRET);
};

export interface CloudinaryUploadResult {
  success: boolean;
  url?: string;
  public_id?: string;
  width?: number;
  height?: number;
  format?: string;
  error?: string;
}

/**
 * Uploads a file (Buffer, base64 data URI, remote URL) to Cloudinary.
 */
export async function uploadToCloudinary(
  fileData: string | Buffer,
  folder: string = 'travinno'
): Promise<CloudinaryUploadResult> {
  if (!isCloudinaryConfigured()) {
    return {
      success: false,
      error: 'Cloudinary environment credentials (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) are missing.',
    };
  }

  try {
    let result: UploadApiResponse;

    if (Buffer.isBuffer(fileData)) {
      result = await new Promise<UploadApiResponse>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: 'auto',
            overwrite: true,
            transformation: [
              { quality: 'auto:good' },
              { fetch_format: 'auto' },
            ],
          },
          (error, uploadRes) => {
            if (error || !uploadRes) {
              reject(error || new Error('Upload stream returned empty result'));
            } else {
              resolve(uploadRes);
            }
          }
        );
        stream.end(fileData);
      });
    } else {
      result = await cloudinary.uploader.upload(fileData, {
        folder,
        resource_type: 'auto',
        overwrite: true,
        transformation: [
          { quality: 'auto:good' },
          { fetch_format: 'auto' },
        ],
      });
    }

    return {
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    };
  } catch (err: any) {
    console.error('[Cloudinary] Upload error:', err);
    return {
      success: false,
      error: err.message || 'Failed to upload image to Cloudinary',
    };
  }
}

export default cloudinary;
