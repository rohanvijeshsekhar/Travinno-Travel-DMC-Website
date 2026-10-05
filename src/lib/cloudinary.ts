import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

// Configure Cloudinary from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const isCloudinaryConfigured = (): boolean => {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
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
 * Uploads a file (base64 data URI, remote URL, or buffer) to Cloudinary.
 */
export async function uploadToCloudinary(
  fileData: string,
  folder: string = 'travinno'
): Promise<CloudinaryUploadResult> {
  if (!isCloudinaryConfigured()) {
    return {
      success: false,
      error: 'Cloudinary environment variables (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) are not configured in .env',
    };
  }

  try {
    const result: UploadApiResponse = await cloudinary.uploader.upload(fileData, {
      folder,
      resource_type: 'auto',
      overwrite: true,
      transformation: [
        { quality: 'auto:good' },
        { fetch_format: 'auto' },
      ],
    });

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
