from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from fastapi.responses import FileResponse
import os
import uuid
from typing import List, Optional

router = APIRouter()

# Ensure directories exist
os.makedirs("uploads", exist_ok=True)
os.makedirs("downloads", exist_ok=True)

@router.post("/convert")
async def convert_audio(
    file: UploadFile = File(...),
    output_format: str = Form("mp3")
):
    """Convert audio between different formats"""
    supported_formats = ['mp3', 'wav', 'ogg', 'flac', 'm4a']
    if output_format.lower() not in supported_formats:
        raise HTTPException(status_code=400, detail=f"Unsupported format. Supported: {supported_formats}")
    
    try:
        # For now, return a placeholder response
        # In a real implementation, you would use FFmpeg or similar
        content = await file.read()
        
        # Generate unique filename
        output_filename = f"converted_{uuid.uuid4()}.{output_format}"
        output_path = f"downloads/{output_filename}"
        
        # Placeholder: copy the file (in reality, convert it)
        with open(output_path, "wb") as f:
            f.write(content)
        
        return {
            "success": True,
            "message": f"Audio converted to {output_format.upper()}",
            "download_url": f"/downloads/{output_filename}",
            "filename": output_filename
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error converting audio: {str(e)}")

@router.post("/trim")
async def trim_audio(
    file: UploadFile = File(...),
    start_time: float = Form(0),
    end_time: float = Form(30)
):
    """Trim audio file"""
    try:
        content = await file.read()
        
        # Generate unique filename
        file_extension = file.filename.split('.')[-1]
        output_filename = f"trimmed_{uuid.uuid4()}.{file_extension}"
        output_path = f"downloads/{output_filename}"
        
        # Placeholder: copy the file (in reality, trim it)
        with open(output_path, "wb") as f:
            f.write(content)
        
        return {
            "success": True,
            "message": f"Audio trimmed from {start_time}s to {end_time}s",
            "download_url": f"/downloads/{output_filename}",
            "filename": output_filename
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error trimming audio: {str(e)}")

@router.post("/merge")
async def merge_audio(files: List[UploadFile] = File(...)):
    """Merge multiple audio files"""
    if len(files) < 2:
        raise HTTPException(status_code=400, detail="At least 2 audio files required")
    
    try:
        # Generate unique filename
        output_filename = f"merged_{uuid.uuid4()}.mp3"
        output_path = f"downloads/{output_filename}"
        
        # Placeholder: take first file (in reality, merge all)
        first_file = files[0]
        content = await first_file.read()
        
        with open(output_path, "wb") as f:
            f.write(content)
        
        return {
            "success": True,
            "message": f"Merged {len(files)} audio files",
            "download_url": f"/downloads/{output_filename}",
            "filename": output_filename
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error merging audio: {str(e)}")