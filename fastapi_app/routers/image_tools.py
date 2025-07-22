from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from fastapi.responses import FileResponse
import os
import uuid
import io
from typing import List, Optional
from pathlib import Path

# Simplified imports to avoid missing dependencies
try:
    from PIL import Image, ImageEnhance, ImageFilter
    HAS_IMAGE_SUPPORT = True
except ImportError:
    HAS_IMAGE_SUPPORT = False

router = APIRouter()

# Ensure directories exist
os.makedirs("uploads", exist_ok=True)
os.makedirs("downloads", exist_ok=True)

@router.post("/resize")
async def resize_image(
    file: UploadFile = File(...),
    width: int = Form(800),
    height: int = Form(600)
):
    """Resize image to specified dimensions"""
    if not HAS_IMAGE_SUPPORT:
        raise HTTPException(status_code=500, detail="Image processing not available")
    
    if not file.filename.lower().endswith(('.jpg', '.jpeg', '.png', '.bmp', '.tiff')):
        raise HTTPException(status_code=400, detail="Unsupported image format")
    
    try:
        content = await file.read()
        image = Image.open(io.BytesIO(content))
        
        # Resize image
        resized_image = image.resize((width, height), Image.LANCZOS)
        
        # Generate unique filename
        file_extension = file.filename.split('.')[-1]
        output_filename = f"resized_{uuid.uuid4()}.{file_extension}"
        output_path = f"downloads/{output_filename}"
        
        # Save resized image
        resized_image.save(output_path)
        
        return {
            "success": True,
            "message": f"Image resized to {width}x{height}",
            "download_url": f"/downloads/{output_filename}",
            "filename": output_filename
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error resizing image: {str(e)}")

@router.post("/compress")
async def compress_image(
    file: UploadFile = File(...),
    quality: int = Form(85)
):
    """Compress image to reduce file size"""
    if not HAS_IMAGE_SUPPORT:
        raise HTTPException(status_code=500, detail="Image processing not available")
    
    if not file.filename.lower().endswith(('.jpg', '.jpeg', '.png')):
        raise HTTPException(status_code=400, detail="Unsupported image format for compression")
    
    try:
        content = await file.read()
        image = Image.open(io.BytesIO(content))
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Generate unique filename
        output_filename = f"compressed_{uuid.uuid4()}.jpg"
        output_path = f"downloads/{output_filename}"
        
        # Save compressed image
        image.save(output_path, "JPEG", quality=quality, optimize=True)
        
        return {
            "success": True,
            "message": f"Image compressed with {quality}% quality",
            "download_url": f"/downloads/{output_filename}",
            "filename": output_filename
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error compressing image: {str(e)}")

@router.post("/convert")
async def convert_format(
    file: UploadFile = File(...),
    output_format: str = Form("png")
):
    """Convert image to different format"""
    if not HAS_IMAGE_SUPPORT:
        raise HTTPException(status_code=500, detail="Image processing not available")
    
    supported_formats = ['png', 'jpg', 'jpeg', 'bmp', 'tiff', 'webp']
    if output_format.lower() not in supported_formats:
        raise HTTPException(status_code=400, detail=f"Unsupported output format. Supported: {supported_formats}")
    
    try:
        content = await file.read()
        image = Image.open(io.BytesIO(content))
        
        # Convert to RGB for JPEG output
        if output_format.lower() in ['jpg', 'jpeg'] and image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Generate unique filename
        output_filename = f"converted_{uuid.uuid4()}.{output_format.lower()}"
        output_path = f"downloads/{output_filename}"
        
        # Save converted image
        image.save(output_path, output_format.upper())
        
        return {
            "success": True,
            "message": f"Image converted to {output_format.upper()}",
            "download_url": f"/downloads/{output_filename}",
            "filename": output_filename
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error converting image: {str(e)}")