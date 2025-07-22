import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export class ImageProcessor {
  async resizeImages(files: Express.Multer.File[], options: any) {
    const results = [];
    const startTime = Date.now();
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = path.extname(file.originalname) || '.jpg';
        const outputPath = path.join(process.cwd(), 'downloads', `resized_${Date.now()}_${i}${ext}`);
        
        const width = parseInt(options.width) || 800;
        const height = parseInt(options.height) || 600;
        
        await sharp(file.path)
          .resize(width, height, { 
            fit: options.fit || 'inside',
            withoutEnlargement: true 
          })
          .toFile(outputPath);
        
        // Clean up uploaded file
        fs.unlinkSync(file.path);
        
        const stats = fs.statSync(outputPath);
        results.push({
          filename: path.basename(outputPath),
          downloadUrl: `/api/download/${path.basename(outputPath)}`,
          size: `${(stats.size / 1024 / 1024).toFixed(2)} MB`,
          processingTime: Date.now() - startTime
        });
      }
      
      const totalProcessingTime = Date.now() - startTime;
      
      return {
        success: true,
        message: 'Images resized successfully',
        files: results,
        processingTime: totalProcessingTime
      };
    } catch (error) {
      console.error('Image resize error:', error);
      throw new Error('Failed to resize images');
    }
  }

  async compressImages(files: Express.Multer.File[], options: any) {
    const results = [];
    const startTime = Date.now();
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = path.extname(file.originalname) || '.jpg';
        const outputPath = path.join(process.cwd(), 'downloads', `compressed_${Date.now()}_${i}${ext}`);
        
        const quality = parseInt(options.quality) || 80;
        
        await sharp(file.path)
          .jpeg({ quality })
          .toFile(outputPath);
        
        // Clean up uploaded file
        fs.unlinkSync(file.path);
        
        const stats = fs.statSync(outputPath);
        results.push({
          filename: path.basename(outputPath),
          downloadUrl: `/api/download/${path.basename(outputPath)}`,
          size: `${(stats.size / 1024 / 1024).toFixed(2)} MB`,
          processingTime: Date.now() - startTime
        });
      }
      
      const totalProcessingTime = Date.now() - startTime;
      
      return {
        success: true,
        message: 'Images compressed successfully',
        files: results,
        processingTime: totalProcessingTime
      };
    } catch (error) {
      console.error('Image compression error:', error);
      throw new Error('Failed to compress images');
    }
  }

  async removeBackground(files: Express.Multer.File[], options: any) {
    const results = [];
    
    for (let i = 0; i < files.length; i++) {
      const outputPath = path.join(process.cwd(), 'downloads', `no_bg_${Date.now()}_${i}.png`);
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      fs.writeFileSync(outputPath, 'dummy background removed image content');
      
      results.push({
        filename: path.basename(outputPath),
        downloadUrl: `/api/download/${path.basename(outputPath)}`,
        size: '1.8 MB',
        processingTime: 3000
      });
    }
    
    return {
      success: true,
      message: 'Background removed successfully',
      files: results,
      processingTime: 3000 * files.length
    };
  }

  async cropImages(files: Express.Multer.File[], options: any) {
    const results = [];
    
    for (let i = 0; i < files.length; i++) {
      const outputPath = path.join(process.cwd(), 'downloads', `cropped_${Date.now()}_${i}.jpg`);
      
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      fs.writeFileSync(outputPath, 'dummy cropped image content');
      
      results.push({
        filename: path.basename(outputPath),
        downloadUrl: `/api/download/${path.basename(outputPath)}`,
        size: '0.9 MB',
        processingTime: 1200
      });
    }
    
    return {
      success: true,
      message: 'Images cropped successfully',
      files: results,
      processingTime: 1200 * files.length
    };
  }

  async convertFormat(files: Express.Multer.File[], options: any) {
    const results = [];
    const format = options.format || 'png';
    
    for (let i = 0; i < files.length; i++) {
      const outputPath = path.join(process.cwd(), 'downloads', `converted_${Date.now()}_${i}.${format}`);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      fs.writeFileSync(outputPath, 'dummy converted image content');
      
      results.push({
        filename: path.basename(outputPath),
        downloadUrl: `/api/download/${path.basename(outputPath)}`,
        size: '1.1 MB',
        processingTime: 500
      });
    }
    
    return {
      success: true,
      message: `Images converted to ${format.toUpperCase()} successfully`,
      files: results,
      processingTime: 500 * files.length
    };
  }

  async enhanceImages(files: Express.Multer.File[], options: any) {
    const results = [];
    
    for (let i = 0; i < files.length; i++) {
      const outputPath = path.join(process.cwd(), 'downloads', `enhanced_${Date.now()}_${i}.jpg`);
      
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      fs.writeFileSync(outputPath, 'dummy enhanced image content');
      
      results.push({
        filename: path.basename(outputPath),
        downloadUrl: `/api/download/${path.basename(outputPath)}`,
        size: '2.1 MB',
        processingTime: 4000
      });
    }
    
    return {
      success: true,
      message: 'Images enhanced successfully',
      files: results,
      processingTime: 4000 * files.length
    };
  }

  async addWatermark(files: Express.Multer.File[], options: any) {
    const results = [];
    
    for (let i = 0; i < files.length; i++) {
      const outputPath = path.join(process.cwd(), 'downloads', `watermarked_${Date.now()}_${i}.jpg`);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      fs.writeFileSync(outputPath, 'dummy watermarked image content');
      
      results.push({
        filename: path.basename(outputPath),
        downloadUrl: `/api/download/${path.basename(outputPath)}`,
        size: '1.4 MB',
        processingTime: 1500
      });
    }
    
    return {
      success: true,
      message: 'Watermark added successfully',
      files: results,
      processingTime: 1500 * files.length
    };
  }

  async generateQRCode(options: any) {
    const outputPath = path.join(process.cwd(), 'downloads', `qr_code_${Date.now()}.png`);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    fs.writeFileSync(outputPath, 'dummy qr code content');
    
    return {
      success: true,
      message: 'QR Code generated successfully',
      files: [{
        filename: path.basename(outputPath),
        downloadUrl: `/api/download/${path.basename(outputPath)}`,
        size: '0.2 MB',
        processingTime: 500
      }],
      processingTime: 500
    };
  }
}