# SuntynAI - Multi-Purpose Tool Platform

## Overview

SuntynAI is a comprehensive web-based tool platform that provides various professional utilities including PDF processing, image manipulation, audio/video conversion, and government document tools. The application is built with a modern full-stack architecture using React for the frontend, Express.js for the backend, and PostgreSQL with Drizzle ORM for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Migration Updates (January 2025)

✓ **Replit Migration Complete**: Successfully migrated from Replit Agent to full Replit environment
✓ **FastAPI Backend Integration**: Python FastAPI server running on port 8000 with Express proxy
✓ **Real Tool Processing**: Implemented actual PDF merging (pdf-lib) and image processing (sharp)
✓ **Enhanced Tool Categories**: 
  - PDF Tools (25): Merge, split, compress, protect/unlock, OCR, watermark, format conversion, form filling, metadata editing, bookmark management
  - Image Tools (25): Resize, compress, crop, enhance, filters, background removal, watermark, editing, QR/barcode generation, meme maker
  - Audio/Video Tools (20): Convert, trim, merge, extract, boost volume, compress media, speed control, stabilization, noise removal
  - Government Tools (15): PAN validation, Aadhaar masking, GST calculator, passport photos, digital signatures, tax calculators, IFSC finder
✓ **Database Integration**: Supabase PostgreSQL configured (pending connection setup)
✓ **Security Improvements**: Proper error handling, file cleanup, and type safety
✓ **Hybrid Architecture**: Express.js frontend serving + FastAPI backend processing

## System Architecture

### Frontend Architecture
The client-side application is built using:
- **React 18** with TypeScript for the main UI framework
- **Vite** as the build tool and development server
- **Wouter** for client-side routing (lightweight alternative to React Router)
- **TailwindCSS** for styling with a dark theme design system
- **Shadcn/ui** component library for consistent UI components
- **TanStack Query** for server state management and API data fetching

### Backend Architecture
The server-side application follows:
- **Express.js** as the web framework
- **TypeScript** for type safety across the entire application
- **RESTful API** design with modular route handlers
- **Service layer pattern** for business logic separation
- **File upload handling** using Multer middleware
- **Session-based architecture** (prepared for user authentication)

### Component Structure
- **Shared types and schemas** in the `/shared` directory
- **Client code** in `/client` with organized components, pages, and utilities
- **Server code** in `/server` with routes, services, and database logic
- **Service classes** for tool-specific processing (PDF, Image, Audio, Government)

## Key Components

### Database Schema
- **Users table**: For user management (id, username, email, password, timestamps)
- **Tools table**: Catalog of available tools with metadata (name, slug, category, description, icon, status)
- **Tool usage table**: Analytics and usage tracking (user_id, tool_id, session_id, processing_time, success status)

### Core Services
1. **PDFProcessor**: Handles PDF merging, splitting, and manipulation using pdf-lib
2. **ImageProcessor**: Image resizing and processing using Sharp
3. **AudioProcessor**: Audio/video conversion using FFmpeg
4. **GovernmentTools**: Indian government document validation (PAN, Aadhaar, etc.)

### UI Components
- **AnimatedLogo**: Brand identity with animated neural network design
- **CategoryCard**: Tool category display with gradients and hover effects
- **ToolCard**: Individual tool representation with processing indicators
- **SearchFilter**: Advanced filtering and search functionality

### Tool Categories
- **PDF Tools**: Merge, split, compress, protect, convert PDFs
- **Image Tools**: Resize, compress, format conversion, background removal
- **Audio/Video**: Format conversion, compression, extraction
- **Government**: Document validation, form processing

## Data Flow

1. **User Interaction**: Users select tools from categorized dashboard
2. **File Upload**: Multer middleware handles file uploads to `/uploads` directory
3. **Processing**: Service classes process files based on tool type
4. **Result Generation**: Processed files saved to `/downloads` directory
5. **Download Delivery**: API endpoints serve processed files to users
6. **Usage Tracking**: Tool usage analytics stored in database

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM
- **sharp**: High-performance image processing
- **pdf-lib**: PDF document manipulation
- **multer**: File upload handling

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **@tanstack/react-query**: Server state management
- **lucide-react**: Icon library
- **tailwindcss**: Utility-first CSS framework

### Development Tools
- **vite**: Fast build tool and dev server
- **typescript**: Type safety
- **tsx**: TypeScript execution for server
- **esbuild**: Fast JavaScript bundler

## Deployment Strategy

### Development
- Vite dev server serves the React frontend
- Express server runs with hot reload using tsx
- Database migrations handled by Drizzle Kit
- File uploads stored locally in development

### Production Build
1. **Frontend**: Vite builds optimized React bundle to `/dist/public`
2. **Backend**: esbuild bundles Express server to `/dist/index.js`
3. **Database**: Drizzle migrations applied via `db:push` command
4. **Static Assets**: Express serves built frontend and processed files

### Environment Requirements
- **Node.js**: ES modules support required
- **PostgreSQL**: Database connection via `DATABASE_URL`
- **FFmpeg**: Required for audio/video processing tools
- **File System**: Local storage for uploads and downloads

### Scalability Considerations
- Service-oriented architecture allows for microservice extraction
- File processing can be moved to background job queues
- Database queries optimized with proper indexing
- Static assets can be served via CDN in production

The application is designed for easy deployment on platforms like Replit, with proper environment variable configuration and automatic dependency installation.