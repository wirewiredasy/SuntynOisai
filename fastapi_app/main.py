from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn
import os

# Import routers
from routers import pdf_tools, image_tools, audio_tools, government_tools, ai_business_tools

app = FastAPI(
    title="SuntynAI - Multi-Purpose Tool Platform",
    description="Comprehensive toolkit for PDF, Image, Audio/Video, and Government document processing",
    version="2.0.0"
)

# CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://localhost:3000", 
        "http://localhost:5000",
        "https://*.replit.app",
        "https://*.repl.co",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Create directories if they don't exist
os.makedirs("uploads", exist_ok=True)
os.makedirs("downloads", exist_ok=True)

# Mount static files
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.mount("/downloads", StaticFiles(directory="downloads"), name="downloads")

# Include routers
app.include_router(pdf_tools.router, prefix="/api/pdf", tags=["PDF Tools"])
app.include_router(image_tools.router, prefix="/api/image", tags=["Image Tools"]) 
app.include_router(audio_tools.router, prefix="/api/audio", tags=["Audio Tools"])
app.include_router(government_tools.router, prefix="/api/government", tags=["Government Tools"])
app.include_router(ai_business_tools.router, prefix="/api/ai", tags=["AI & Business Tools"])

@app.get("/")
async def root():
    return {"message": "SuntynAI FastAPI Backend", "version": "2.0.0", "status": "running"}

@app.get("/api/tools")
async def get_tools():
    """Get all available tools categorized"""
    return {
        "pdf_tools": [
            {"id": "pdf_merge", "name": "PDF Merger", "route": "/api/pdf/merge", "description": "Merge multiple PDF files into one"},
            {"id": "pdf_split", "name": "PDF Splitter", "route": "/api/pdf/split", "description": "Split PDF into separate pages"},
            {"id": "pdf_compress", "name": "PDF Compressor", "route": "/api/pdf/compress", "description": "Reduce PDF file size"},
            {"id": "pdf_to_word", "name": "PDF to Word", "route": "/api/pdf/to-word", "description": "Convert PDF to DOCX format"},
            {"id": "pdf_to_excel", "name": "PDF to Excel", "route": "/api/pdf/to-excel", "description": "Extract tables from PDF to Excel"},
            {"id": "pdf_ocr", "name": "PDF OCR", "route": "/api/pdf/ocr", "description": "Extract text from scanned PDFs"},
            {"id": "pdf_unlock", "name": "PDF Unlock", "route": "/api/pdf/unlock", "description": "Remove password protection"},
            {"id": "pdf_protect", "name": "PDF Protect", "route": "/api/pdf/protect", "description": "Add password protection"},
        ],
        "image_tools": [
            {"id": "image_resize", "name": "Image Resizer", "route": "/api/image/resize", "description": "Resize images to specific dimensions"},
            {"id": "image_compress", "name": "Image Compressor", "route": "/api/image/compress", "description": "Compress images without quality loss"},
            {"id": "bg_remove", "name": "Background Remover", "route": "/api/image/bg-remove", "description": "AI-powered background removal"},
            {"id": "image_crop", "name": "Image Cropper", "route": "/api/image/crop", "description": "Crop images to specific area"},
            {"id": "image_convert", "name": "Format Converter", "route": "/api/image/convert", "description": "Convert between image formats"},
            {"id": "image_watermark", "name": "Add Watermark", "route": "/api/image/watermark", "description": "Add text or image watermark"},
            {"id": "image_enhance", "name": "AI Enhancer", "route": "/api/image/enhance", "description": "AI-powered image enhancement"},
            {"id": "image_filter", "name": "Apply Filters", "route": "/api/image/filter", "description": "Apply various image filters"},
        ],
        "audio_tools": [
            {"id": "audio_convert", "name": "Audio Converter", "route": "/api/audio/convert", "description": "Convert between audio formats"},
            {"id": "audio_trim", "name": "Audio Trimmer", "route": "/api/audio/trim", "description": "Cut and trim audio files"},
            {"id": "audio_merge", "name": "Audio Merger", "route": "/api/audio/merge", "description": "Combine multiple audio files"},
            {"id": "video_to_audio", "name": "Extract Audio", "route": "/api/audio/extract", "description": "Extract audio from video files"},
            {"id": "video_convert", "name": "Video Converter", "route": "/api/audio/video-convert", "description": "Convert video formats"},
            {"id": "audio_enhance", "name": "Audio Enhancer", "route": "/api/audio/enhance", "description": "Remove noise and enhance quality"},
        ],
        "government_tools": [
            {"id": "pan_validate", "name": "PAN Validator", "route": "/api/government/pan-validate", "description": "Validate PAN card format"},
            {"id": "aadhaar_mask", "name": "Aadhaar Masker", "route": "/api/government/aadhaar-mask", "description": "Mask Aadhaar number for privacy"},
            {"id": "income_cert", "name": "Income Certificate", "route": "/api/government/income-cert", "description": "Generate income certificate"},
            {"id": "rent_agreement", "name": "Rent Agreement", "route": "/api/government/rent-agreement", "description": "Create legal rent agreement"},
            {"id": "passport_photo", "name": "Passport Photo", "route": "/api/government/passport-photo", "description": "Crop photo to passport size"},
        ]
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
```