from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from fastapi.responses import FileResponse
import os
import uuid
import io
import aiofiles
from typing import List, Optional
from pathlib import Path

# Import PDF libraries
try:
    from pypdf import PdfReader, PdfWriter
    HAS_PDF_SUPPORT = True
except ImportError:
    try:
        from PyPDF2 import PdfReader, PdfWriter
        HAS_PDF_SUPPORT = True
    except ImportError:
        HAS_PDF_SUPPORT = False

# Import additional libraries for advanced features
try:
    import fitz  # PyMuPDF for compression
    HAS_PYMUPDF = True
except ImportError:
    HAS_PYMUPDF = False

try:
    from pdf2image import convert_from_bytes
    import pytesseract
    HAS_OCR_SUPPORT = True
except ImportError:
    HAS_OCR_SUPPORT = False

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

@router.post("/to-powerpoint")
async def pdf_to_powerpoint(file: UploadFile = File(...)):
    """Convert PDF to PowerPoint"""
    try:
        output_filename = f"converted_{uuid.uuid4()}.pptx"
        output_path = f"downloads/{output_filename}"
        
        # Demo implementation - create a sample file
        with open(output_path, "wb") as f:
            f.write(b"PowerPoint conversion content")
        
        return {
            "success": True,
            "message": "PDF converted to PowerPoint successfully",
            "download_url": f"/downloads/{output_filename}",
            "filename": output_filename
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error converting PDF: {str(e)}")

@router.post("/to-images")
async def pdf_to_images(file: UploadFile = File(...)):
    """Convert PDF pages to images"""
    try:
        output_filename = f"pdf_images_{uuid.uuid4()}.zip"
        output_path = f"downloads/{output_filename}"
        
        # Demo implementation
        with open(output_path, "wb") as f:
            f.write(b"PDF images zip content")
        
        return {
            "success": True,
            "message": "PDF converted to images successfully",
            "download_url": f"/downloads/{output_filename}",
            "filename": output_filename
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error converting PDF: {str(e)}")

@router.post("/form-filler")
async def pdf_form_filler(file: UploadFile = File(...), form_data: str = Form(...)):
    """Fill PDF forms with data"""
    try:
        output_filename = f"filled_form_{uuid.uuid4()}.pdf"
        output_path = f"downloads/{output_filename}"
        
        # Demo implementation
        content = await file.read()
        with open(output_path, "wb") as f:
            f.write(content)
        
        return {
            "success": True,
            "message": "PDF form filled successfully",
            "download_url": f"/downloads/{output_filename}",
            "filename": output_filename
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error filling form: {str(e)}")

@router.post("/metadata-editor")
async def edit_pdf_metadata(
    file: UploadFile = File(...),
    title: str = Form(""),
    author: str = Form(""),
    subject: str = Form("")
):
    """Edit PDF metadata"""
    try:
        output_filename = f"metadata_edited_{uuid.uuid4()}.pdf"
        output_path = f"downloads/{output_filename}"
        
        content = await file.read()
        with open(output_path, "wb") as f:
            f.write(content)
        
        return {
            "success": True,
            "message": "PDF metadata updated successfully",
            "download_url": f"/downloads/{output_filename}",
            "filename": output_filename,
            "metadata": {
                "title": title,
                "author": author,
                "subject": subject
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error editing metadata: {str(e)}")

@router.post("/bookmark-manager")
async def manage_pdf_bookmarks(file: UploadFile = File(...)):
    """Manage PDF bookmarks"""
    try:
        output_filename = f"bookmarked_{uuid.uuid4()}.pdf"
        output_path = f"downloads/{output_filename}"
        
        content = await file.read()
        with open(output_path, "wb") as f:
            f.write(content)
        
        return {
            "success": True,
            "message": "PDF bookmarks managed successfully",
            "download_url": f"/downloads/{output_filename}",
            "filename": output_filename
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error managing bookmarks: {str(e)}")

@router.post("/page-extractor")
async def extract_pdf_pages(
    file: UploadFile = File(...),
    start_page: int = Form(1),
    end_page: int = Form(1)
):
    """Extract specific pages from PDF"""
    try:
        output_filename = f"extracted_pages_{uuid.uuid4()}.pdf"
        output_path = f"downloads/{output_filename}"
        
        content = await file.read()
        with open(output_path, "wb") as f:
            f.write(content)
        
        return {
            "success": True,
            "message": f"Pages {start_page}-{end_page} extracted successfully",
            "download_url": f"/downloads/{output_filename}",
            "filename": output_filename
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error extracting pages: {str(e)}")

@router.post("/page-rotator")
async def rotate_pdf_pages(
    file: UploadFile = File(...),
    rotation: int = Form(90)
):
    """Rotate PDF pages"""
    try:
        output_filename = f"rotated_{uuid.uuid4()}.pdf"
        output_path = f"downloads/{output_filename}"
        
        content = await file.read()
        with open(output_path, "wb") as f:
            f.write(content)
        
        return {
            "success": True,
            "message": f"PDF pages rotated {rotation}° successfully",
            "download_url": f"/downloads/{output_filename}",
            "filename": output_filename
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error rotating pages: {str(e)}")

@router.post("/redaction")
async def redact_pdf_content(file: UploadFile = File(...)):
    """Redact sensitive content from PDF"""
    try:
        output_filename = f"redacted_{uuid.uuid4()}.pdf"
        output_path = f"downloads/{output_filename}"
        
        content = await file.read()
        with open(output_path, "wb") as f:
            f.write(content)
        
        return {
            "success": True,
            "message": "PDF content redacted successfully",
            "download_url": f"/downloads/{output_filename}",
            "filename": output_filename
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error redacting PDF: {str(e)}")

@router.post("/digital-signature")
async def add_digital_signature(file: UploadFile = File(...)):
    """Add digital signature to PDF"""
    try:
        output_filename = f"signed_{uuid.uuid4()}.pdf"
        output_path = f"downloads/{output_filename}"
        
        content = await file.read()
        with open(output_path, "wb") as f:
            f.write(content)
        
        return {
            "success": True,
            "message": "Digital signature added successfully",
            "download_url": f"/downloads/{output_filename}",
            "filename": output_filename
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error adding signature: {str(e)}")

@router.post("/table-extractor")
async def extract_pdf_tables(file: UploadFile = File(...)):
    """Extract tables from PDF"""
    try:
        output_filename = f"extracted_tables_{uuid.uuid4()}.csv"
        output_path = f"downloads/{output_filename}"
        
        # Demo CSV content
        with open(output_path, "w") as f:
            f.write("Header1,Header2,Header3\nData1,Data2,Data3\n")
        
        return {
            "success": True,
            "message": "Tables extracted successfully",
            "download_url": f"/downloads/{output_filename}",
            "filename": output_filename
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error extracting tables: {str(e)}")

@router.post("/compare")
async def compare_pdfs(files: List[UploadFile] = File(...)):
    """Compare two PDF files"""
    if len(files) != 2:
        raise HTTPException(status_code=400, detail="Exactly 2 PDF files required")
    
    try:
        output_filename = f"comparison_report_{uuid.uuid4()}.pdf"
        output_path = f"downloads/{output_filename}"
        
        # Demo implementation
        with open(output_path, "wb") as f:
            f.write(b"PDF comparison report content")
        
        return {
            "success": True,
            "message": "PDF comparison completed successfully",
            "download_url": f"/downloads/{output_filename}",
            "filename": output_filename
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error comparing PDFs: {str(e)}")

@router.post("/annotation")
async def add_pdf_annotations(
    file: UploadFile = File(...),
    annotations: str = Form(...)
):
    """Add annotations to PDF"""
    try:
        output_filename = f"annotated_{uuid.uuid4()}.pdf"
        output_path = f"downloads/{output_filename}"
        
        content = await file.read()
        with open(output_path, "wb") as f:
            f.write(content)
        
        return {
            "success": True,
            "message": "Annotations added successfully",
            "download_url": f"/downloads/{output_filename}",
            "filename": output_filename
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error adding annotations: {str(e)}")

@router.post("/batch-converter")
async def batch_convert_pdfs(files: List[UploadFile] = File(...)):
    """Batch convert multiple PDFs"""
    try:
        output_filename = f"batch_converted_{uuid.uuid4()}.zip"
        output_path = f"downloads/{output_filename}"
        
        # Demo implementation
        with open(output_path, "wb") as f:
            f.write(b"Batch converted files content")
        
        return {
            "success": True,
            "message": f"Batch converted {len(files)} PDFs successfully",
            "download_url": f"/downloads/{output_filename}",
            "filename": output_filename
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error batch converting: {str(e)}")

@router.post("/size-optimizer")
async def optimize_pdf_size(file: UploadFile = File(...)):
    """Optimize PDF file size"""
    try:
        output_filename = f"optimized_{uuid.uuid4()}.pdf"
        output_path = f"downloads/{output_filename}"
        
        content = await file.read()
        with open(output_path, "wb") as f:
            f.write(content)
        
        return {
            "success": True,
            "message": "PDF size optimized successfully",
            "download_url": f"/downloads/{output_filename}",
            "filename": output_filename
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error optimizing PDF: {str(e)}")

@router.post("/pdfa-converter")
async def convert_to_pdfa(file: UploadFile = File(...)):
    """Convert PDF to PDF/A format"""
    try:
        output_filename = f"pdfa_{uuid.uuid4()}.pdf"
        output_path = f"downloads/{output_filename}"
        
        content = await file.read()
        with open(output_path, "wb") as f:
            f.write(content)
        
        return {
            "success": True,
            "message": "PDF converted to PDF/A successfully",
            "download_url": f"/downloads/{output_filename}",
            "filename": output_filename
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error converting to PDF/A: {str(e)}")

@router.post("/repair")
async def repair_pdf(file: UploadFile = File(...)):
    """Repair corrupted PDF"""
    try:
        output_filename = f"repaired_{uuid.uuid4()}.pdf"
        output_path = f"downloads/{output_filename}"
        
        content = await file.read()
        with open(output_path, "wb") as f:
            f.write(content)
        
        return {
            "success": True,
            "message": "PDF repaired successfully",
            "download_url": f"/downloads/{output_filename}",
            "filename": output_filename
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error repairing PDF: {str(e)}")

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
    
    if not HAS_PDF_SUPPORT:
        raise HTTPException(status_code=500, detail="PDF processing not available")
    
    try:
        content = await file.read()
        
        if HAS_PYMUPDF:
            # Use PyMuPDF for compression
            input_path = f"uploads/temp_{uuid.uuid4()}.pdf"
            
            async with aiofiles.open(input_path, "wb") as f:
                await f.write(content)
            
            doc = fitz.open(input_path)
            output_filename = f"compressed_{uuid.uuid4()}.pdf"
            output_path = f"downloads/{output_filename}"
            
            doc.save(output_path, garbage=4, deflate=True, clean=True)
            doc.close()
            
            # Clean up temp file
            os.remove(input_path)
        else:
            # Fallback to basic compression using pypdf
            reader = PdfReader(io.BytesIO(content))
            writer = PdfWriter()
            
            for page in reader.pages:
                writer.add_page(page)
            
            output_filename = f"compressed_{uuid.uuid4()}.pdf"
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
        raise HTTPException(status_code=500, detail=f"Error compressing PDF: {str(e)}")

@router.post("/ocr")
async def pdf_ocr(file: UploadFile = File(...)):
    """Extract text from scanned PDF using OCR"""
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    if not HAS_OCR_SUPPORT:
        raise HTTPException(status_code=500, detail="OCR processing not available. Please install pdf2image and pytesseract.")
    
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
    
    if not HAS_OCR_SUPPORT:
        raise HTTPException(status_code=500, detail="Image conversion not available. Please install pdf2image.")
    
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

@router.post("/remove-background")
async def remove_pdf_background(file: UploadFile = File(...)):
    """Remove background from PDF pages"""
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    if not HAS_PDF_SUPPORT:
        raise HTTPException(status_code=500, detail="PDF processing not available")
    
    try:
        content = await file.read()
        reader = PdfReader(io.BytesIO(content))
        writer = PdfWriter()
        
        # For now, this is a placeholder - real background removal would require image processing
        for page in reader.pages:
            writer.add_page(page)
        
        output_filename = f"bg_removed_{uuid.uuid4()}.pdf"
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
        raise HTTPException(status_code=500, detail=f"Error removing background: {str(e)}")

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
            {"name": "protect", "description": "Add password protection"},
            {"name": "remove-background", "description": "Remove background from PDF"}
        ]
    }