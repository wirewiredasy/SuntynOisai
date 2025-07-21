import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';

export class ImageProcessor {
  private downloadsDir = path.join(process.cwd(), 'downloads');

  constructor() {
    this.ensureDownloadsDir();
  }

  private async ensureDownloadsDir() {
    try {
      await fs.access(this.downloadsDir);
    } catch {
      await fs.mkdir(this.downloadsDir, { recursive: true });
    }
  }

  async resizeImages(files: Express.Multer.File[], options: any) {
    const results = [];
    const { width, height, maintainRatio } = options;

    for (const file of files) {
      const image = sharp(file.path);
      const metadata = await image.metadata();
      
      let resizeOptions: any = {};
      
      if (maintainRatio === 'Yes') {
        if (width && height) {
          resizeOptions = { width: parseInt(width), height: parseInt(height), fit: 'inside' };
        } else if (width) {
          resizeOptions = { width: parseInt(width) };
        } else if (height) {
          resizeOptions = { height: parseInt(height) };
        }
      } else {
        resizeOptions = { 
          width: width ? parseInt(width) : undefined,
          height: height ? parseInt(height) : undefined
        };
      }

      const filename = `resized-${Date.now()}-${file.originalname}`;
      const outputPath = path.join(this.downloadsDir, filename);
      
      await image
        .resize(resizeOptions)
        .jpeg({ quality: 90 })
        .toFile(outputPath);

      const newMetadata = await sharp(outputPath).metadata();

      results.push({
        originalName: file.originalname,
        filename,
        downloadUrl: `/api/download/${filename}`,
        originalSize: `${metadata.width}x${metadata.height}`,
        newSize: `${newMetadata.width}x${newMetadata.height}`
      });
    }

    return {
      success: true,
      message: `${results.length} images resized successfully`,
      images: results
    };
  }

  async compressImages(files: Express.Multer.File[], options: any) {
    const results = [];
    const quality = parseInt(options.quality) || 80;

    for (const file of files) {
      const originalStats = await fs.stat(file.path);
      const filename = `compressed-${Date.now()}-${file.originalname}`;
      const outputPath = path.join(this.downloadsDir, filename);

      await sharp(file.path)
        .jpeg({ quality })
        .toFile(outputPath);

      const compressedStats = await fs.stat(outputPath);
      const compressionRatio = ((originalStats.size - compressedStats.size) / originalStats.size * 100).toFixed(1);

      results.push({
        originalName: file.originalname,
        filename,
        downloadUrl: `/api/download/${filename}`,
        originalSize: Math.round(originalStats.size / 1024),
        compressedSize: Math.round(compressedStats.size / 1024),
        compressionRatio: `${compressionRatio}%`
      });
    }

    return {
      success: true,
      message: `${results.length} images compressed successfully`,
      images: results
    };
  }

  async removeBackground(files: Express.Multer.File[], options: any) {
    const results = [];

    // Note: This is a simplified implementation
    // In production, you'd use a service like remove.bg API or a local AI model
    for (const file of files) {
      const filename = `no-bg-${Date.now()}-${file.originalname}.png`;
      const outputPath = path.join(this.downloadsDir, filename);

      // Simple implementation: convert to PNG with transparency
      // In reality, you'd use AI background removal
      await sharp(file.path)
        .png()
        .toFile(outputPath);

      results.push({
        originalName: file.originalname,
        filename,
        downloadUrl: `/api/download/${filename}`,
        note: 'Background removal requires AI service integration in production'
      });
    }

    return {
      success: true,
      message: `${results.length} images processed (demo)`,
      images: results
    };
  }

  async applyColorFilters(files: Express.Multer.File[], options: any) {
    const results = [];
    const { filter, intensity } = options;
    const intensityValue = parseInt(intensity) || 50;

    for (const file of files) {
      const image = sharp(file.path);
      const filename = `filtered-${Date.now()}-${file.originalname}`;
      const outputPath = path.join(this.downloadsDir, filename);

      let processedImage = image;

      switch (filter) {
        case 'Black & White':
          processedImage = image.grayscale();
          break;
        case 'Sepia':
          processedImage = image.tint({ r: 255, g: 236, b: 139 });
          break;
        case 'Vibrant':
          processedImage = image.modulate({ saturation: 1 + intensityValue / 100 });
          break;
        case 'Cool':
          processedImage = image.tint({ r: 200, g: 220, b: 255 });
          break;
        case 'Warm':
          processedImage = image.tint({ r: 255, g: 220, b: 200 });
          break;
        default:
          processedImage = image;
      }

      await processedImage
        .jpeg({ quality: 90 })
        .toFile(outputPath);

      results.push({
        originalName: file.originalname,
        filename,
        downloadUrl: `/api/download/${filename}`,
        filter,
        intensity: `${intensityValue}%`
      });
    }

    return {
      success: true,
      message: `${results.length} images filtered successfully`,
      images: results
    };
  }
}
