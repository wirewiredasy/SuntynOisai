from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from fastapi.responses import FileResponse
from pydub import AudioSegment
from moviepy.editor import VideoFileClip
import uuid
import os
import aiofiles
from typing import List, Optional
import tempfile

router = APIRouter()

# Ensure directories exist
os.makedirs("uploads", exist_ok=True)
os.makedirs("downloads", exist_ok=True)

@router.post("/convert")
async def convert_audio(
    file: UploadFile = File(...),
    target_format: str = Form(...)
):
    """Convert audio to different format"""
    supported_formats = ['mp3', 'wav', 'ogg', 'flac', 'm4a', 'aac']
    target_format = target_format.lower()
    
    if target_format not in supported_formats:
        raise HTTPException(status_code=400, detail=f"Unsupported format. Supported: {', '.join(supported_formats)}")
    
    try:
        content = await file.read()
        
        # Save uploaded file temporarily
        temp_input = f"uploads/temp_{uuid.uuid4()}.tmp"
        async with aiofiles.open(temp_input, "wb") as f:
            await f.write(content)
        
        # Load audio
        audio = AudioSegment.from_file(temp_input)
        
        # Generate output filename
        output_filename = f"converted_{uuid.uuid4()}.{target_format}"
        output_path = f"downloads/{output_filename}"
        
        # Export in target format
        audio.export(output_path, format=target_format)
        
        # Clean up temp file
        os.remove(temp_input)
        
        return FileResponse(
            output_path,
            media_type=f"audio/{target_format}",
            filename=output_filename,
            headers={"Content-Disposition": f"attachment; filename={output_filename}"}
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error converting audio: {str(e)}")

@router.post("/trim")
async def trim_audio(
    file: UploadFile = File(...),
    start_time: float = Form(...),  # in seconds
    end_time: float = Form(...)     # in seconds
):
    """Trim audio file to specified time range"""
    if start_time < 0 or end_time <= start_time:
        raise HTTPException(status_code=400, detail="Invalid time range")
    
    try:
        content = await file.read()
        
        # Save uploaded file temporarily
        temp_input = f"uploads/temp_{uuid.uuid4()}.tmp"
        async with aiofiles.open(temp_input, "wb") as f:
            await f.write(content)
        
        # Load audio
        audio = AudioSegment.from_file(temp_input)
        
        # Convert time to milliseconds
        start_ms = int(start_time * 1000)
        end_ms = int(end_time * 1000)
        
        # Validate time range against audio duration
        if end_ms > len(audio):
            end_ms = len(audio)
        
        # Trim audio
        trimmed_audio = audio[start_ms:end_ms]
        
        # Generate output filename
        output_filename = f"trimmed_{uuid.uuid4()}.mp3"
        output_path = f"downloads/{output_filename}"
        
        # Export trimmed audio
        trimmed_audio.export(output_path, format="mp3")
        
        # Clean up temp file
        os.remove(temp_input)
        
        return FileResponse(
            output_path,
            media_type="audio/mp3",
            filename=output_filename,
            headers={"Content-Disposition": f"attachment; filename={output_filename}"}
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error trimming audio: {str(e)}")

@router.post("/merge")
async def merge_audio(files: List[UploadFile] = File(...)):
    """Merge multiple audio files into one"""
    if len(files) < 2:
        raise HTTPException(status_code=400, detail="At least 2 audio files required")
    
    try:
        combined_audio = AudioSegment.empty()
        temp_files = []
        
        for file in files:
            content = await file.read()
            
            # Save uploaded file temporarily
            temp_input = f"uploads/temp_{uuid.uuid4()}.tmp"
            async with aiofiles.open(temp_input, "wb") as f:
                await f.write(content)
            
            temp_files.append(temp_input)
            
            # Load and add to combined audio
            audio = AudioSegment.from_file(temp_input)
            combined_audio += audio
        
        # Generate output filename
        output_filename = f"merged_{uuid.uuid4()}.mp3"
        output_path = f"downloads/{output_filename}"
        
        # Export merged audio
        combined_audio.export(output_path, format="mp3")
        
        # Clean up temp files
        for temp_file in temp_files:
            os.remove(temp_file)
        
        return FileResponse(
            output_path,
            media_type="audio/mp3",
            filename=output_filename,
            headers={"Content-Disposition": f"attachment; filename={output_filename}"}
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error merging audio: {str(e)}")

@router.post("/extract-from-video")
async def extract_audio_from_video(file: UploadFile = File(...)):
    """Extract audio from video file"""
    try:
        content = await file.read()
        
        # Save uploaded file temporarily
        temp_input = f"uploads/temp_{uuid.uuid4()}.tmp"
        async with aiofiles.open(temp_input, "wb") as f:
            await f.write(content)
        
        # Load video and extract audio
        video = VideoFileClip(temp_input)
        audio = video.audio
        
        if audio is None:
            raise HTTPException(status_code=400, detail="No audio track found in video")
        
        # Generate output filename
        output_filename = f"extracted_audio_{uuid.uuid4()}.mp3"
        output_path = f"downloads/{output_filename}"
        
        # Export audio
        audio.write_audiofile(output_path, codec='mp3')
        
        # Clean up
        audio.close()
        video.close()
        os.remove(temp_input)
        
        return FileResponse(
            output_path,
            media_type="audio/mp3",
            filename=output_filename,
            headers={"Content-Disposition": f"attachment; filename={output_filename}"}
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error extracting audio from video: {str(e)}")

@router.post("/video-convert")
async def convert_video(
    file: UploadFile = File(...),
    target_format: str = Form(...)
):
    """Convert video to different format"""
    supported_formats = ['mp4', 'avi', 'mov', 'mkv', 'webm']
    target_format = target_format.lower()
    
    if target_format not in supported_formats:
        raise HTTPException(status_code=400, detail=f"Unsupported format. Supported: {', '.join(supported_formats)}")
    
    try:
        content = await file.read()
        
        # Save uploaded file temporarily
        temp_input = f"uploads/temp_{uuid.uuid4()}.tmp"
        async with aiofiles.open(temp_input, "wb") as f:
            await f.write(content)
        
        # Load video
        video = VideoFileClip(temp_input)
        
        # Generate output filename
        output_filename = f"converted_{uuid.uuid4()}.{target_format}"
        output_path = f"downloads/{output_filename}"
        
        # Convert video
        if target_format == 'mp4':
            video.write_videofile(output_path, codec='libx264')
        elif target_format == 'webm':
            video.write_videofile(output_path, codec='libvpx')
        else:
            video.write_videofile(output_path)
        
        # Clean up
        video.close()
        os.remove(temp_input)
        
        return FileResponse(
            output_path,
            media_type=f"video/{target_format}",
            filename=output_filename,
            headers={"Content-Disposition": f"attachment; filename={output_filename}"}
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error converting video: {str(e)}")

@router.post("/enhance")
async def enhance_audio(
    file: UploadFile = File(...),
    volume_gain: float = Form(0.0),  # in dB
    normalize: bool = Form(False)
):
    """Enhance audio by adjusting volume and normalizing"""
    try:
        content = await file.read()
        
        # Save uploaded file temporarily
        temp_input = f"uploads/temp_{uuid.uuid4()}.tmp"
        async with aiofiles.open(temp_input, "wb") as f:
            await f.write(content)
        
        # Load audio
        audio = AudioSegment.from_file(temp_input)
        
        # Apply volume gain
        if volume_gain != 0:
            audio = audio + volume_gain
        
        # Normalize audio
        if normalize:
            # Find the maximum amplitude
            max_amplitude = audio.max
            if max_amplitude > 0:
                # Calculate normalization factor
                normalization_factor = (audio.max_possible_amplitude / max_amplitude)
                audio = audio + (20 * normalization_factor.bit_length())
        
        # Generate output filename
        output_filename = f"enhanced_{uuid.uuid4()}.mp3"
        output_path = f"downloads/{output_filename}"
        
        # Export enhanced audio
        audio.export(output_path, format="mp3")
        
        # Clean up temp file
        os.remove(temp_input)
        
        return FileResponse(
            output_path,
            media_type="audio/mp3",
            filename=output_filename,
            headers={"Content-Disposition": f"attachment; filename={output_filename}"}
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error enhancing audio: {str(e)}")

@router.get("/info")
async def get_audio_info():
    """Get information about available audio/video tools"""
    return {
        "tools": [
            {"name": "convert", "description": "Convert audio between formats"},
            {"name": "trim", "description": "Trim audio to specific time range"},
            {"name": "merge", "description": "Merge multiple audio files"},
            {"name": "extract-from-video", "description": "Extract audio from video files"},
            {"name": "video-convert", "description": "Convert video between formats"},
            {"name": "enhance", "description": "Enhance audio volume and normalize"}
        ],
        "supported_audio_formats": ["mp3", "wav", "ogg", "flac", "m4a", "aac"],
        "supported_video_formats": ["mp4", "avi", "mov", "mkv", "webm"]
    }