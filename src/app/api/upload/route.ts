import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary, isCloudinaryConfigured } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Cloudinary credentials are not configured in your .env file. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.',
        },
        { status: 500 }
      );
    }

    const contentType = req.headers.get('content-type') || '';

    // Handle JSON payload (base64 image or URL)
    if (contentType.includes('application/json')) {
      const body = await req.json();
      const { image, folder = 'travinno' } = body;

      if (!image) {
        return NextResponse.json(
          { success: false, error: 'Missing "image" field in request body' },
          { status: 400 }
        );
      }

      const result = await uploadToCloudinary(image, folder);

      if (!result.success) {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        url: result.url,
        public_id: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
      });
    }

    // Handle Multipart / Form-Data payload (direct file upload)
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null || formData.get('image') as File | null;
      const folder = (formData.get('folder') as string) || 'travinno';

      if (!file) {
        return NextResponse.json(
          { success: false, error: 'No file provided in form-data' },
          { status: 400 }
        );
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const mimeType = file.type || 'image/jpeg';
      const base64Data = `data:${mimeType};base64,${buffer.toString('base64')}`;

      const result = await uploadToCloudinary(base64Data, folder);

      if (!result.success) {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        url: result.url,
        public_id: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Unsupported Content-Type. Use application/json or multipart/form-data' },
      { status: 400 }
    );
  } catch (err: any) {
    console.error('[Upload API] Error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
