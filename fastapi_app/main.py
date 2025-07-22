from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn
import os

# Import routers
from routers import pdf_tools, image_tools, audio_tools, government_tools

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
            {"id": "pdf_to_powerpoint", "name": "PDF to PowerPoint", "route": "/api/pdf/to-powerpoint", "description": "Convert PDF to PPTX format"},
            {"id": "pdf_to_images", "name": "PDF to Images", "route": "/api/pdf/to-images", "description": "Convert PDF pages to images"},
            {"id": "pdf_form_filler", "name": "PDF Form Filler", "route": "/api/pdf/form-filler", "description": "Fill PDF forms with data"},
            {"id": "pdf_metadata_editor", "name": "PDF Metadata Editor", "route": "/api/pdf/metadata-editor", "description": "Edit PDF metadata"},
            {"id": "pdf_bookmark_manager", "name": "PDF Bookmark Manager", "route": "/api/pdf/bookmark-manager", "description": "Manage PDF bookmarks"},
            {"id": "pdf_page_extractor", "name": "PDF Page Extractor", "route": "/api/pdf/page-extractor", "description": "Extract specific pages from PDF"},
            {"id": "pdf_page_rotator", "name": "PDF Page Rotator", "route": "/api/pdf/page-rotator", "description": "Rotate PDF pages"},
            {"id": "pdf_redaction", "name": "PDF Redaction", "route": "/api/pdf/redaction", "description": "Redact sensitive content from PDF"},
            {"id": "pdf_digital_signature", "name": "PDF Digital Signature", "route": "/api/pdf/digital-signature", "description": "Add digital signature to PDF"},
            {"id": "pdf_table_extractor", "name": "PDF Table Extractor", "route": "/api/pdf/table-extractor", "description": "Extract tables from PDF"},
            {"id": "pdf_compare", "name": "PDF Compare", "route": "/api/pdf/compare", "description": "Compare two PDF files"},
            {"id": "pdf_annotation", "name": "PDF Annotation", "route": "/api/pdf/annotation", "description": "Add annotations to PDF"},
            {"id": "pdf_portfolio", "name": "PDF Portfolio", "route": "/api/pdf/portfolio", "description": "Create PDF portfolio from multiple files"},
            {"id": "pdf_bates_numbering", "name": "PDF Bates Numbering", "route": "/api/pdf/bates-numbering", "description": "Add Bates numbering to PDF"},
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
            {"id": "image_rotate", "name": "Image Rotator", "route": "/api/image/rotate", "description": "Rotate images by specified angle"},
            {"id": "smart_crop", "name": "Smart Crop", "route": "/api/image/smart-crop", "description": "Smart crop images with coordinates"},
            {"id": "image_grayscale", "name": "Grayscale Converter", "route": "/api/image/grayscale", "description": "Convert images to grayscale"},
            {"id": "image_sepia", "name": "Sepia Effect", "route": "/api/image/sepia", "description": "Apply sepia effect to images"},
            {"id": "image_blur", "name": "Blur Effect", "route": "/api/image/blur", "description": "Apply blur effect to images"},
            {"id": "image_sharpen", "name": "Sharpen Image", "route": "/api/image/sharpen", "description": "Sharpen images for better clarity"},
            {"id": "collage_maker", "name": "Collage Maker", "route": "/api/image/collage-maker", "description": "Create collage from multiple images"},
            {"id": "photo_frame", "name": "Photo Frame", "route": "/api/image/photo-frame", "description": "Add decorative frames to photos"},
            {"id": "vintage_effect", "name": "Vintage Effect", "route": "/api/image/vintage", "description": "Apply vintage effect to images"},
            {"id": "image_upscaler", "name": "Image Upscaler", "route": "/api/image/upscaler", "description": "Upscale images using AI interpolation"},
            {"id": "batch_resize", "name": "Batch Resize", "route": "/api/image/batch-resize", "description": "Batch resize multiple images"},
            {"id": "noise_reduction", "name": "Noise Reduction", "route": "/api/image/noise-reduction", "description": "Reduce noise in images"},
            {"id": "color_palette", "name": "Color Palette Extractor", "route": "/api/image/color-palette", "description": "Extract color palette from images"},
            {"id": "exif_viewer", "name": "EXIF Viewer", "route": "/api/image/exif-viewer", "description": "View image EXIF metadata"},
            {"id": "hdr_effect", "name": "HDR Effect", "route": "/api/image/hdr", "description": "Apply HDR effect to images"},
        ],
        "audio_tools": [
            {"id": "audio_convert", "name": "Audio Converter", "route": "/api/audio/convert", "description": "Convert between audio formats"},
            {"id": "audio_trim", "name": "Audio Trimmer", "route": "/api/audio/trim", "description": "Cut and trim audio files"},
            {"id": "audio_merge", "name": "Audio Merger", "route": "/api/audio/merge", "description": "Combine multiple audio files"},
            {"id": "video_to_audio", "name": "Extract Audio", "route": "/api/audio/extract", "description": "Extract audio from video files"},
            {"id": "video_convert", "name": "Video Converter", "route": "/api/audio/video-convert", "description": "Convert video formats"},
            {"id": "audio_enhance", "name": "Audio Enhancer", "route": "/api/audio/enhance", "description": "Remove noise and enhance quality"},
            {"id": "speed_changer", "name": "Speed Changer", "route": "/api/audio/speed-changer", "description": "Change audio playback speed"},
            {"id": "audio_equalizer", "name": "Audio Equalizer", "route": "/api/audio/equalizer", "description": "Apply equalizer settings to audio"},
            {"id": "audio_reverb", "name": "Audio Reverb", "route": "/api/audio/reverb", "description": "Add reverb effect to audio"},
            {"id": "audio_fade", "name": "Audio Fade", "route": "/api/audio/fade", "description": "Add fade in/out effects"},
            {"id": "audio_normalize", "name": "Audio Normalize", "route": "/api/audio/normalize", "description": "Normalize audio volume levels"},
            {"id": "pitch_shift", "name": "Pitch Shift", "route": "/api/audio/pitch-shift", "description": "Shift audio pitch by semitones"},
            {"id": "audio_info", "name": "Audio Info", "route": "/api/audio/audio-info", "description": "Get detailed audio file information"},
            {"id": "voice_changer", "name": "Voice Changer", "route": "/api/audio/voice-changer", "description": "Apply voice changing effects"},
            {"id": "silence_remove", "name": "Silence Remover", "route": "/api/audio/silence-remove", "description": "Remove silence from audio"},
            {"id": "audio_loop", "name": "Audio Loop", "route": "/api/audio/loop", "description": "Loop audio multiple times"},
            {"id": "stereo_split", "name": "Stereo Split", "route": "/api/audio/stereo-split", "description": "Split stereo into left/right channels"},
        ],
        "government_tools": [
            {"id": "pan_validate", "name": "PAN Validator", "route": "/api/government/pan-validate", "description": "Validate PAN card format"},
            {"id": "aadhaar_mask", "name": "Aadhaar Masker", "route": "/api/government/aadhaar-mask", "description": "Mask Aadhaar number for privacy"},
            {"id": "income_cert", "name": "Income Certificate", "route": "/api/government/income-cert", "description": "Generate income certificate"},
            {"id": "rent_agreement", "name": "Rent Agreement", "route": "/api/government/rent-agreement", "description": "Create legal rent agreement"},
            {"id": "passport_photo", "name": "Passport Photo", "route": "/api/government/passport-photo", "description": "Crop photo to passport size"},
            {"id": "gst_calculate", "name": "GST Calculator", "route": "/api/government/gst-calculate", "description": "Calculate GST on amounts"},
            {"id": "ifsc_lookup", "name": "IFSC Code Finder", "route": "/api/government/ifsc-lookup", "description": "Find bank details by IFSC code"},
            {"id": "emi_calculate", "name": "EMI Calculator", "route": "/api/government/emi-calculate", "description": "Calculate loan EMI"},
            {"id": "tds_calculate", "name": "TDS Calculator", "route": "/api/government/tds-calculate", "description": "Calculate TDS on salary"},
            {"id": "property_tax_calculate", "name": "Property Tax Calculator", "route": "/api/government/property-tax-calculate", "description": "Calculate property tax"},
            {"id": "professional_tax_calculate", "name": "Professional Tax Calculator", "route": "/api/government/professional-tax-calculate", "description": "Calculate professional tax"},
            {"id": "legal_notice_generator", "name": "Legal Notice Generator", "route": "/api/government/legal-notice-generator", "description": "Generate legal notice templates"},
            {"id": "affidavit_generator", "name": "Affidavit Generator", "route": "/api/government/affidavit-generator", "description": "Generate affidavit templates"},
            {"id": "vehicle_registration_check", "name": "Vehicle Registration Check", "route": "/api/government/vehicle-registration-check", "description": "Check vehicle registration details"},
            {"id": "driving_license_validator", "name": "Driving License Validator", "route": "/api/government/driving-license-validator", "description": "Validate driving license format"},
            {"id": "voter_id_validator", "name": "Voter ID Validator", "route": "/api/government/voter-id-validator", "description": "Validate voter ID format"},
            {"id": "stamp_duty_calculator", "name": "Stamp Duty Calculator", "route": "/api/government/stamp-duty-calculator", "description": "Calculate stamp duty for property"},
            {"id": "court_fee_calculator", "name": "Court Fee Calculator", "route": "/api/government/court-fee-calculator", "description": "Calculate court fees for legal cases"},
        ],

    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)