export const BRAND_COLORS = {
  purple: {
    50: '#f3f4f6',
    100: '#e5e7eb', 
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
  },
  gold: {
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
  },
} as const;

export const PROCESSING_STATES = {
  IDLE: 'idle',
  PROCESSING: 'processing', 
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

export const SUPPORTED_FORMATS = {
  PDF: ['.pdf'],
  IMAGE: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'],
  AUDIO: ['.mp3', '.wav', '.flac', '.aac', '.ogg', '.m4a'],
  VIDEO: ['.mp4', '.avi', '.mov', '.mkv', '.wmv', '.flv'],
  DOCUMENT: ['.doc', '.docx', '.txt', '.rtf'],
} as const;

export const MAX_FILE_SIZES = {
  PDF: 50 * 1024 * 1024, // 50MB
  IMAGE: 25 * 1024 * 1024, // 25MB
  AUDIO: 100 * 1024 * 1024, // 100MB
  VIDEO: 500 * 1024 * 1024, // 500MB
  DOCUMENT: 10 * 1024 * 1024, // 10MB
} as const;
