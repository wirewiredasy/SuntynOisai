from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from fastapi.responses import FileResponse
import os
import uuid
import io
from typing import List, Optional
from pathlib import Path

# Simplified imports to avoid missing dependencies
try:
    from PyPDF2 import PdfReader, PdfWriter
    HAS_PDF_SUPPORT = True
except ImportError:
    HAS_PDF_SUPPORT = False

router = APIRouter()

# Ensure directories exist
os.makedirs("uploads", exist_ok=True)
os.makedirs("downloads", exist_ok=True)

@router.post("/merge")
async def merge_pdfs(files: List[UploadFile] = File(...)):
    """Merge multiple PDF files into one"""
    if len(files) < 2:
        raise HTTPException(status_code=400, detail="At least 2 PDF files required")
    
    if not HAS_PDF_SUPPORT:
        raise HTTPException(status_code=500, detail="PDF processing not available")
    
    try:
        writer = PdfWriter()
        
        for file in files:
            if not file.filename.lower().endswith('.pdf'):
                raise HTTPException(status_code=400, detail="Only PDF files are allowed")
            
            content = await file.read()
            reader = PdfReader(io.BytesIO(content))
            
            for page in reader.pages:
                writer.add_page(page)
        
        # Generate unique filename
        output_filename = f"merged_{uuid.uuid4()}.pdf"
        output_path = f"downloads/{output_filename}"
        
        with open(output_path, "wb") as output_file:
            writer.write(output_file)
        
        return {
            "success": True,
            "message": "PDFs merged successfully",
            "download_url": f"/downloads/{output_filename}",
            "filename": output_filename
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error merging PDFs: {str(e)}")

@router.post("/split")
async def split_pdf(
    file: UploadFile = File(...),
    start_page: int = Form(1),
    end_page: Optional[int] = Form(None)
):
    """Split PDF by page range"""
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    try:
        content = await file.read()
        reader = PdfReader(io.BytesIO(content))
        
        total_pages = len(reader.pages)
        if end_page is None:
            end_page = total_pages
        
        if start_page < 1 or end_page > total_pages or start_page > end_page:
            raise HTTPException(status_code=400, detail="Invalid page range")
        
        writer = PdfWriter()
        for i in range(start_page - 1, min(end_page, total_pages)):
            writer.add_page(reader.pages[i])
        
        output_filename = f"split_{start_page}-{end_page}_{uuid.uuid4()}.pdf"
        output_path = f"downloads/{output_filename}"
        
        with open(output_path, "wb") as output_file:
            writer.write(output_file)
        
        return FileResponse(
            output_path,
            media_type="application/pdf",
            filename=output_filename,
            headers={"Content-Disposition": f"attachment; filename={output_filename}"}
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error splitting PDF: {str(e)}")

@router.post("/compress")
async def compress_pdf(file: UploadFile = File(...), quality: int = Form(85)):
    """Compress PDF file to reduce size"""
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    try:
        content = await file.read()
        input_path = f"uploads/temp_{uuid.uuid4()}.pdf"
        
        async with aiofiles.open(input_path, "wb") as f:
            await f.write(content)
        
        # Use PyMuPDF for compression
        doc = fitz.open(input_path)
        output_filename = f"compressed_{uuid.uuid4()}.pdf"
        output_path = f"downloads/{output_filename}"
        
        doc.save(output_path, garbage=4, deflate=True, clean=True)
        doc.close()
        
        # Clean up temp file
        os.remove(input_path)
        
        return FileResponse(
            output_path,
            media_type="application/pdf",
            filename=output_filename,
            headers={"Content-Disposition": f"attachment; filename={output_filename}"}
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error compressing PDF: {str(e)}")

@router.post("/ocr")
async def pdf_ocr(file: UploadFile = File(...)):
    """Extract text from scanned PDF using OCR"""
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    try:
        content = await file.read()
        
        # Convert PDF to images
        images = convert_from_bytes(content)
        extracted_text = ""
        
        for i, image in enumerate(images):
            # Perform OCR on each page
            text = pytesseract.image_to_string(image)
            extracted_text += f"--- Page {i+1} ---\n{text}\n\n"
        
        # Save as text file
        output_filename = f"ocr_text_{uuid.uuid4()}.txt"
        output_path = f"downloads/{output_filename}"
        
        async with aiofiles.open(output_path, "w", encoding="utf-8") as f:
            await f.write(extracted_text)
        
        return FileResponse(
            output_path,
            media_type="text/plain",
            filename=output_filename,
            headers={"Content-Disposition": f"attachment; filename={output_filename}"}
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error performing OCR: {str(e)}")

@router.post("/to-images")
async def pdf_to_images(file: UploadFile = File(...), dpi: int = Form(200)):
    """Convert PDF pages to images"""
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    try:
        content = await file.read()
        images = convert_from_bytes(content, dpi=dpi)
        
        # Create a zip file containing all images
        import zipfile
        output_filename = f"pdf_images_{uuid.uuid4()}.zip"
        output_path = f"downloads/{output_filename}"
        
        with zipfile.ZipFile(output_path, 'w') as zipf:
            for i, image in enumerate(images):
                img_filename = f"page_{i+1}.png"
                img_path = f"downloads/temp_{img_filename}"
                image.save(img_path, "PNG")
                zipf.write(img_path, img_filename)
                os.remove(img_path)  # Clean up temp image
        
        return FileResponse(
            output_path,
            media_type="application/zip",
            filename=output_filename,
            headers={"Content-Disposition": f"attachment; filename={output_filename}"}
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error converting PDF to images: {str(e)}")

@router.post("/unlock")
async def unlock_pdf(file: UploadFile = File(...), password: str = Form(...)):
    """Remove password protection from PDF"""
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    try:
        content = await file.read()
        reader = PdfReader(io.BytesIO(content))
        
        if reader.is_encrypted:
            if not reader.decrypt(password):
                raise HTTPException(status_code=400, detail="Invalid password")
        
        writer = PdfWriter()
        for page in reader.pages:
            writer.add_page(page)
        
        output_filename = f"unlocked_{uuid.uuid4()}.pdf"
        output_path = f"downloads/{output_filename}"
        
        with open(output_path, "wb") as output_file:
            writer.write(output_file)
        
        return FileResponse(
            output_path,
            media_type="application/pdf",
            filename=output_filename,
            headers={"Content-Disposition": f"attachment; filename={output_filename}"}
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error unlocking PDF: {str(e)}")

@router.post("/protect")
async def protect_pdf(file: UploadFile = File(...), password: str = Form(...)):
    """Add password protection to PDF"""
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    try:
        content = await file.read()
        reader = PdfReader(io.BytesIO(content))
        writer = PdfWriter()
        
        for page in reader.pages:
            writer.add_page(page)
        
        writer.encrypt(password)
        
        output_filename = f"protected_{uuid.uuid4()}.pdf"
        output_path = f"downloads/{output_filename}"
        
        with open(output_path, "wb") as output_file:
            writer.write(output_file)
        
        return FileResponse(
            output_path,
            media_type="application/pdf",
            filename=output_filename,
            headers={"Content-Disposition": f"attachment; filename={output_filename}"}
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error protecting PDF: {str(e)}")

@router.get("/info")
async def get_pdf_info():
    """Get information about available PDF tools"""
    return {
        "tools": [
            {"name": "merge", "description": "Merge multiple PDF files"},
            {"name": "split", "description": "Split PDF by page range"},
            {"name": "compress", "description": "Compress PDF to reduce file size"},
            {"name": "ocr", "description": "Extract text from scanned PDFs"},
            {"name": "to-images", "description": "Convert PDF pages to images"},
            {"name": "unlock", "description": "Remove password protection"},
            {"name": "protect", "description": "Add password protection"}
        ]
    }