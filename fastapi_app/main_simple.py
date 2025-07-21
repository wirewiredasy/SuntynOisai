from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn
import os

app = FastAPI(
    title="SuntynAI - Multi-Purpose Tool Platform",
    description="Comprehensive toolkit for PDF, Image, Audio/Video, and Government document processing",
    version="2.0.0"
)

# CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create directories if they don't exist
os.makedirs("uploads", exist_ok=True)
os.makedirs("downloads", exist_ok=True)

# Mount static files
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.mount("/downloads", StaticFiles(directory="downloads"), name="downloads")

@app.get("/")
async def root():
    return {"message": "SuntynAI FastAPI Backend", "version": "2.0.0", "status": "running"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "FastAPI backend is running successfully"}

@app.get("/api/tools")
async def get_tools():
    """Get all available tools categorized"""
    return {
        "pdf_tools": [
            {"id": "pdf_merge", "name": "PDF Merger", "route": "/api/pdf/merge", "description": "Merge multiple PDF files into one"},
            {"id": "pdf_split", "name": "PDF Splitter", "route": "/api/pdf/split", "description": "Split PDF into separate pages"},
            {"id": "pdf_compress", "name": "PDF Compressor", "route": "/api/pdf/compress", "description": "Reduce PDF file size"},
            {"id": "pdf_ocr", "name": "PDF OCR", "route": "/api/pdf/ocr", "description": "Extract text from scanned PDFs"},
        ],
        "image_tools": [
            {"id": "image_resize", "name": "Image Resizer", "route": "/api/image/resize", "description": "Resize images to specific dimensions"},
            {"id": "image_compress", "name": "Image Compressor", "route": "/api/image/compress", "description": "Compress images without quality loss"},
            {"id": "bg_remove", "name": "Background Remover", "route": "/api/image/bg-remove", "description": "AI-powered background removal"},
            {"id": "image_convert", "name": "Format Converter", "route": "/api/image/convert", "description": "Convert between image formats"},
        ],
        "audio_tools": [
            {"id": "audio_convert", "name": "Audio Converter", "route": "/api/audio/convert", "description": "Convert between audio formats"},
            {"id": "audio_trim", "name": "Audio Trimmer", "route": "/api/audio/trim", "description": "Cut and trim audio files"},
            {"id": "video_to_audio", "name": "Extract Audio", "route": "/api/audio/extract", "description": "Extract audio from video files"},
        ],
        "government_tools": [
            {"id": "pan_validate", "name": "PAN Validator", "route": "/api/government/pan-validate", "description": "Validate PAN card format"},
            {"id": "aadhaar_mask", "name": "Aadhaar Masker", "route": "/api/government/aadhaar-mask", "description": "Mask Aadhaar number for privacy"},
            {"id": "passport_photo", "name": "Passport Photo", "route": "/api/government/passport-photo", "description": "Crop photo to passport size"},
        ]
    }

if __name__ == "__main__":
    uvicorn.run("main_simple:app", host="0.0.0.0", port=8000, reload=True)