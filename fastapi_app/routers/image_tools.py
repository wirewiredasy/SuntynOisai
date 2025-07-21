from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from fastapi.responses import FileResponse
from PIL import Image, ImageFilter, ImageEnhance, ImageOps
import io
import uuid
import os
import aiofiles
from typing import Optional

router = APIRouter()

# Ensure directories exist
os.makedirs("uploads", exist_ok=True)
os.makedirs("downloads", exist_ok=True)

@router.post("/resize")
async def resize_image(
    file: UploadFile = File(...),
    width: int = Form(...),
    height: int = Form(...),
    maintain_aspect: bool = Form(True)
):
    """Resize image to specified dimensions"""
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are allowed")
    
    try:
        content = await file.read()
        image = Image.open(io.BytesIO(content))
        
        if maintain_aspect:
            image.thumbnail((width, height), Image.Resampling.LANCZOS)
        else:
            image = image.resize((width, height), Image.Resampling.LANCZOS)
        
        # Determine output format
        original_format = image.format or 'PNG'
        output_filename = f"resized_{uuid.uuid4()}.{original_format.lower()}"
        output_path = f"downloads/{output_filename}"
        
        image.save(output_path, format=original_format)
        
        return FileResponse(
            output_path,
            media_type=f"image/{original_format.lower()}",
            filename=output_filename,
            headers={"Content-Disposition": f"attachment; filename={output_filename}"}
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error resizing image: {str(e)}")

@router.post("/compress")
async def compress_image(
    file: UploadFile = File(...),
    quality: int = Form(85)
):
    """Compress image to reduce file size"""
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are allowed")
    
    if quality < 1 or quality > 100:
        raise HTTPException(status_code=400, detail="Quality must be between 1 and 100")
    
    try:
        content = await file.read()
        image = Image.open(io.BytesIO(content))
        
        # Convert to RGB if necessary for JPEG
        if image.mode in ('RGBA', 'P'):
            image = image.convert('RGB')
        
        output_filename = f"compressed_{uuid.uuid4()}.jpg"
        output_path = f"downloads/{output_filename}"
        
        image.save(output_path, format='JPEG', quality=quality, optimize=True)
        
        return FileResponse(
            output_path,
            media_type="image/jpeg",
            filename=output_filename,
            headers={"Content-Disposition": f"attachment; filename={output_filename}"}
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error compressing image: {str(e)}")

@router.post("/convert")
async def convert_image(
    file: UploadFile = File(...),
    target_format: str = Form(...)
):
    """Convert image to different format"""
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are allowed")
    
    supported_formats = ['JPEG', 'PNG', 'WEBP', 'BMP', 'TIFF']
    target_format = target_format.upper()
    
    if target_format not in supported_formats:
        raise HTTPException(status_code=400, detail=f"Unsupported format. Supported: {', '.join(supported_formats)}")
    
    try:
        content = await file.read()
        image = Image.open(io.BytesIO(content))
        
        # Handle transparency for formats that don't support it
        if target_format == 'JPEG' and image.mode in ('RGBA', 'P'):
            # Create white background for transparent images
            background = Image.new('RGB', image.size, (255, 255, 255))
            if image.mode == 'P':
                image = image.convert('RGBA')
            background.paste(image, mask=image.split()[-1])
            image = background
        
        output_filename = f"converted_{uuid.uuid4()}.{target_format.lower()}"
        output_path = f"downloads/{output_filename}"
        
        image.save(output_path, format=target_format)
        
        return FileResponse(
            output_path,
            media_type=f"image/{target_format.lower()}",
            filename=output_filename,
            headers={"Content-Disposition": f"attachment; filename={output_filename}"}
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error converting image: {str(e)}")

@router.post("/crop")
async def crop_image(
    file: UploadFile = File(...),
    left: int = Form(...),
    top: int = Form(...),
    right: int = Form(...),
    bottom: int = Form(...)
):
    """Crop image to specified coordinates"""
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are allowed")
    
    try:
        content = await file.read()
        image = Image.open(io.BytesIO(content))
        
        # Validate crop coordinates
        if left < 0 or top < 0 or right > image.width or bottom > image.height:
            raise HTTPException(status_code=400, detail="Invalid crop coordinates")
        
        if left >= right or top >= bottom:
            raise HTTPException(status_code=400, detail="Invalid crop area")
        
        cropped_image = image.crop((left, top, right, bottom))
        
        original_format = image.format or 'PNG'
        output_filename = f"cropped_{uuid.uuid4()}.{original_format.lower()}"
        output_path = f"downloads/{output_filename}"
        
        cropped_image.save(output_path, format=original_format)
        
        return FileResponse(
            output_path,
            media_type=f"image/{original_format.lower()}",
            filename=output_filename,
            headers={"Content-Disposition": f"attachment; filename={output_filename}"}
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error cropping image: {str(e)}")

@router.post("/filter")
async def apply_filter(
    file: UploadFile = File(...),
    filter_type: str = Form(...)
):
    """Apply various filters to image"""
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are allowed")
    
    filter_map = {
        'blur': ImageFilter.BLUR,
        'sharpen': ImageFilter.SHARPEN,
        'smooth': ImageFilter.SMOOTH,
        'edge_enhance': ImageFilter.EDGE_ENHANCE,
        'emboss': ImageFilter.EMBOSS,
        'contour': ImageFilter.CONTOUR,
        'grayscale': None  # Special case
    }
    
    if filter_type not in filter_map:
        raise HTTPException(status_code=400, detail=f"Unsupported filter. Available: {', '.join(filter_map.keys())}")
    
    try:
        content = await file.read()
        image = Image.open(io.BytesIO(content))
        
        if filter_type == 'grayscale':
            filtered_image = ImageOps.grayscale(image)
            # Convert back to RGB for consistency
            filtered_image = Image.merge("RGB", (filtered_image, filtered_image, filtered_image))
        else:
            filtered_image = image.filter(filter_map[filter_type])
        
        original_format = image.format or 'PNG'
        output_filename = f"{filter_type}_{uuid.uuid4()}.{original_format.lower()}"
        output_path = f"downloads/{output_filename}"
        
        filtered_image.save(output_path, format=original_format)
        
        return FileResponse(
            output_path,
            media_type=f"image/{original_format.lower()}",
            filename=output_filename,
            headers={"Content-Disposition": f"attachment; filename={output_filename}"}
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error applying filter: {str(e)}")

@router.post("/enhance")
async def enhance_image(
    file: UploadFile = File(...),
    brightness: float = Form(1.0),
    contrast: float = Form(1.0),
    color: float = Form(1.0),
    sharpness: float = Form(1.0)
):
    """Enhance image brightness, contrast, color, and sharpness"""
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are allowed")
    
    try:
        content = await file.read()
        image = Image.open(io.BytesIO(content))
        
        # Apply enhancements
        if brightness != 1.0:
            enhancer = ImageEnhance.Brightness(image)
            image = enhancer.enhance(brightness)
        
        if contrast != 1.0:
            enhancer = ImageEnhance.Contrast(image)
            image = enhancer.enhance(contrast)
        
        if color != 1.0:
            enhancer = ImageEnhance.Color(image)
            image = enhancer.enhance(color)
        
        if sharpness != 1.0:
            enhancer = ImageEnhance.Sharpness(image)
            image = enhancer.enhance(sharpness)
        
        original_format = image.format or 'PNG'
        output_filename = f"enhanced_{uuid.uuid4()}.{original_format.lower()}"
        output_path = f"downloads/{output_filename}"
        
        image.save(output_path, format=original_format)
        
        return FileResponse(
            output_path,
            media_type=f"image/{original_format.lower()}",
            filename=output_filename,
            headers={"Content-Disposition": f"attachment; filename={output_filename}"}
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error enhancing image: {str(e)}")

@router.post("/watermark")
async def add_watermark(
    file: UploadFile = File(...),
    watermark_text: str = Form(...),
    position: str = Form("bottom-right"),  # top-left, top-right, bottom-left, bottom-right, center
    opacity: int = Form(128)
):
    """Add text watermark to image"""
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are allowed")
    
    try:
        content = await file.read()
        image = Image.open(io.BytesIO(content))
        
        # Create watermark
        from PIL import ImageDraw, ImageFont
        
        # Make a transparent overlay
        watermark = Image.new('RGBA', image.size, (255, 255, 255, 0))
        draw = ImageDraw.Draw(watermark)
        
        # Try to use a font, fall back to default if not available
        try:
            font_size = max(20, image.width // 30)
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", font_size)
        except:
            font = ImageFont.load_default()
        
        # Calculate text size and position
        bbox = draw.textbbox((0, 0), watermark_text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        positions = {
            'top-left': (10, 10),
            'top-right': (image.width - text_width - 10, 10),
            'bottom-left': (10, image.height - text_height - 10),
            'bottom-right': (image.width - text_width - 10, image.height - text_height - 10),
            'center': ((image.width - text_width) // 2, (image.height - text_height) // 2)
        }
        
        if position not in positions:
            position = 'bottom-right'
        
        x, y = positions[position]
        
        # Draw watermark
        draw.text((x, y), watermark_text, font=font, fill=(255, 255, 255, opacity))
        
        # Combine with original image
        watermarked = Image.alpha_composite(image.convert('RGBA'), watermark)
        watermarked = watermarked.convert('RGB')
        
        output_filename = f"watermarked_{uuid.uuid4()}.png"
        output_path = f"downloads/{output_filename}"
        
        watermarked.save(output_path, format='PNG')
        
        return FileResponse(
            output_path,
            media_type="image/png",
            filename=output_filename,
            headers={"Content-Disposition": f"attachment; filename={output_filename}"}
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error adding watermark: {str(e)}")

@router.get("/info")
async def get_image_info():
    """Get information about available image tools"""
    return {
        "tools": [
            {"name": "resize", "description": "Resize image dimensions"},
            {"name": "compress", "description": "Compress image to reduce file size"},
            {"name": "convert", "description": "Convert between image formats"},
            {"name": "crop", "description": "Crop image to specified area"},
            {"name": "filter", "description": "Apply various image filters"},
            {"name": "enhance", "description": "Enhance brightness, contrast, color, sharpness"},
            {"name": "watermark", "description": "Add text watermark to image"}
        ],
        "supported_formats": ["JPEG", "PNG", "WEBP", "BMP", "TIFF"],
        "filters": ["blur", "sharpen", "smooth", "edge_enhance", "emboss", "contour", "grayscale"]
    }