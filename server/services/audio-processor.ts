import path from 'path';
import fs from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class AudioProcessor {
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

  private async checkFFmpeg(): Promise<boolean> {
    try {
      await execAsync('ffmpeg -version');
      return true;
    } catch {
      return false;
    }
  }

  async convertAudio(files: Express.Multer.File[], options: any) {
    const hasFFmpeg = await this.checkFFmpeg();
    if (!hasFFmpeg) {
      throw new Error('FFmpeg is required for audio conversion. Please install FFmpeg.');
    }

    const results = [];
    const { format, bitrate } = options;
    const outputFormat = format.toLowerCase();

    for (const file of files) {
      const filename = `converted-${Date.now()}.${outputFormat}`;
      const outputPath = path.join(this.downloadsDir, filename);

      const command = `ffmpeg -i "${file.path}" -b:a ${bitrate} "${outputPath}"`;
      
      try {
        await execAsync(command);
        
        results.push({
          originalName: file.originalname,
          filename,
          downloadUrl: `/api/download/${filename}`,
          format: outputFormat.toUpperCase(),
          bitrate
        });
      } catch (error) {
        console.error('FFmpeg error:', error);
        throw new Error(`Failed to convert ${file.originalname}`);
      }
    }

    return {
      success: true,
      message: `${results.length} audio files converted successfully`,
      files: results
    };
  }

  async convertVideo(files: Express.Multer.File[], options: any) {
    const hasFFmpeg = await this.checkFFmpeg();
    if (!hasFFmpeg) {
      throw new Error('FFmpeg is required for video conversion. Please install FFmpeg.');
    }

    const results = [];
    const { format, quality } = options;
    const outputFormat = format.toLowerCase();

    for (const file of files) {
      const filename = `converted-${Date.now()}.${outputFormat}`;
      const outputPath = path.join(this.downloadsDir, filename);

      let qualitySettings = '';
      switch (quality) {
        case '480p':
          qualitySettings = '-vf scale=854:480';
          break;
        case '720p':
          qualitySettings = '-vf scale=1280:720';
          break;
        case '1080p':
          qualitySettings = '-vf scale=1920:1080';
          break;
        case '4K':
          qualitySettings = '-vf scale=3840:2160';
          break;
      }

      const command = `ffmpeg -i "${file.path}" ${qualitySettings} -c:v libx264 -crf 23 -c:a aac "${outputPath}"`;
      
      try {
        await execAsync(command);
        
        results.push({
          originalName: file.originalname,
          filename,
          downloadUrl: `/api/download/${filename}`,
          format: outputFormat.toUpperCase(),
          quality
        });
      } catch (error) {
        console.error('FFmpeg error:', error);
        throw new Error(`Failed to convert ${file.originalname}`);
      }
    }

    return {
      success: true,
      message: `${results.length} video files converted successfully`,
      files: results
    };
  }

  async extractAudio(files: Express.Multer.File[], options: any) {
    const hasFFmpeg = await this.checkFFmpeg();
    if (!hasFFmpeg) {
      throw new Error('FFmpeg is required for audio extraction. Please install FFmpeg.');
    }

    const results = [];
    const { audioFormat } = options;
    const outputFormat = audioFormat.toLowerCase();

    for (const file of files) {
      const filename = `extracted-${Date.now()}.${outputFormat}`;
      const outputPath = path.join(this.downloadsDir, filename);

      const command = `ffmpeg -i "${file.path}" -vn -acodec copy "${outputPath}"`;
      
      try {
        await execAsync(command);
        
        results.push({
          originalName: file.originalname,
          filename,
          downloadUrl: `/api/download/${filename}`,
          format: outputFormat.toUpperCase()
        });
      } catch (error) {
        console.error('FFmpeg error:', error);
        throw new Error(`Failed to extract audio from ${file.originalname}`);
      }
    }

    return {
      success: true,
      message: `Audio extracted from ${results.length} video files`,
      files: results
    };
  }

  async trimMedia(file: Express.Multer.File, options: any) {
    const hasFFmpeg = await this.checkFFmpeg();
    if (!hasFFmpeg) {
      throw new Error('FFmpeg is required for media trimming. Please install FFmpeg.');
    }

    const { startTime, endTime } = options;
    const extension = path.extname(file.originalname);
    const filename = `trimmed-${Date.now()}${extension}`;
    const outputPath = path.join(this.downloadsDir, filename);

    const command = `ffmpeg -i "${file.path}" -ss ${startTime} -to ${endTime} -c copy "${outputPath}"`;
    
    try {
      await execAsync(command);
      
      return {
        success: true,
        message: 'Media trimmed successfully',
        filename,
        downloadUrl: `/api/download/${filename}`,
        startTime,
        endTime
      };
    } catch (error) {
      console.error('FFmpeg error:', error);
      throw new Error(`Failed to trim ${file.originalname}`);
    }
  }
}
