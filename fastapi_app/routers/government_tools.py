from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from fastapi.responses import FileResponse
from PIL import Image, ImageDraw, ImageFont
import re
import uuid
import os
import io
import aiofiles
from typing import Optional
import json

router = APIRouter()

# Ensure directories exist
os.makedirs("uploads", exist_ok=True)
os.makedirs("downloads", exist_ok=True)

@router.post("/pan-validate")
async def validate_pan(pan_number: str = Form(...)):
    """Validate PAN card format"""
    # PAN format: AAAAA9999A (5 letters, 4 digits, 1 letter)
    pan_pattern = r'^[A-Z]{5}[0-9]{4}[A-Z]{1}$'
    
    is_valid = bool(re.match(pan_pattern, pan_number.upper()))
    
    return {
        "pan_number": pan_number.upper(),
        "is_valid": is_valid,
        "format": "AAAAA9999A",
        "description": "5 letters + 4 digits + 1 letter" if is_valid else "Invalid PAN format"
    }

@router.post("/aadhaar-mask")
async def mask_aadhaar(aadhaar_number: str = Form(...)):
    """Mask Aadhaar number for privacy (show only last 4 digits)"""
    # Remove spaces and validate
    clean_aadhaar = re.sub(r'\s+', '', aadhaar_number)
    
    # Aadhaar should be 12 digits
    if not re.match(r'^\d{12}$', clean_aadhaar):
        raise HTTPException(status_code=400, detail="Invalid Aadhaar format. Should be 12 digits.")
    
    # Mask first 8 digits
    masked_aadhaar = 'XXXX XXXX ' + clean_aadhaar[-4:]
    
    return {
        "original": aadhaar_number,
        "masked": masked_aadhaar,
        "format": "XXXX XXXX ****",
        "message": "Aadhaar number masked for privacy"
    }

@router.post("/passport-photo")
async def create_passport_photo(
    file: UploadFile = File(...),
    size: str = Form("2x2")  # 2x2 inches, 35x45mm, etc.
):
    """Crop and resize photo to passport size specifications"""
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are allowed")
    
    # Define passport photo sizes (in pixels at 300 DPI)
    sizes = {
        "2x2": (600, 600),      # US passport (2x2 inches)
        "35x45": (413, 531),    # Standard passport (35x45mm)
        "25x35": (295, 413),    # Visa size (25x35mm)
        "33x48": (390, 567)     # Indian passport (33x48mm)
    }
    
    if size not in sizes:
        raise HTTPException(status_code=400, detail=f"Unsupported size. Available: {', '.join(sizes.keys())}")
    
    try:
        content = await file.read()
        image = Image.open(io.BytesIO(content))
        
        target_width, target_height = sizes[size]
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Calculate crop area (center crop)
        width, height = image.size
        aspect_ratio = target_width / target_height
        
        if width / height > aspect_ratio:
            # Image is too wide
            new_width = int(height * aspect_ratio)
            left = (width - new_width) // 2
            right = left + new_width
            top, bottom = 0, height
        else:
            # Image is too tall
            new_height = int(width / aspect_ratio)
            top = (height - new_height) // 2
            bottom = top + new_height
            left, right = 0, width
        
        # Crop and resize
        cropped = image.crop((left, top, right, bottom))
        resized = cropped.resize((target_width, target_height), Image.Resampling.LANCZOS)
        
        # Generate output filename
        output_filename = f"passport_{size}_{uuid.uuid4()}.jpg"
        output_path = f"downloads/{output_filename}"
        
        # Save with high quality
        resized.save(output_path, "JPEG", quality=95, optimize=True)
        
        return FileResponse(
            output_path,
            media_type="image/jpeg",
            filename=output_filename,
            headers={"Content-Disposition": f"attachment; filename={output_filename}"}
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating passport photo: {str(e)}")

@router.post("/income-certificate")
async def generate_income_certificate(
    name: str = Form(...),
    father_name: str = Form(...),
    annual_income: str = Form(...),
    occupation: str = Form(...),
    address: str = Form(...),
    purpose: str = Form(...)
):
    """Generate income certificate template"""
    try:
        # Create certificate template
        template = f"""
        
        INCOME CERTIFICATE
        
        Government of India
        ==================
        
        This is to certify that:
        
        Name: {name}
        Father's/Husband's Name: {father_name}
        Address: {address}
        Occupation: {occupation}
        
        Annual Income: Rs. {annual_income}/-
        
        This certificate is issued for the purpose of: {purpose}
        
        This certificate is valid for one year from the date of issue.
        
        Date: {import datetime; datetime.datetime.now().strftime('%d/%m/%Y')}
        
        
        Authorized Officer
        Revenue Department
        
        Note: This is a template document. Please use official government channels 
        for legally valid income certificates.
        """
        
        # Save as text file
        output_filename = f"income_certificate_{uuid.uuid4()}.txt"
        output_path = f"downloads/{output_filename}"
        
        async with aiofiles.open(output_path, "w", encoding="utf-8") as f:
            await f.write(template.strip())
        
        return FileResponse(
            output_path,
            media_type="text/plain",
            filename=output_filename,
            headers={"Content-Disposition": f"attachment; filename={output_filename}"}
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating certificate: {str(e)}")

@router.post("/rent-agreement")
async def generate_rent_agreement(
    landlord_name: str = Form(...),
    tenant_name: str = Form(...),
    property_address: str = Form(...),
    monthly_rent: str = Form(...),
    security_deposit: str = Form(...),
    lease_period: str = Form(...),
    start_date: str = Form(...)
):
    """Generate rent agreement template"""
    try:
        template = f"""
        
        RENTAL AGREEMENT
        
        This Rental Agreement is made between:
        
        LANDLORD: {landlord_name}
        TENANT: {tenant_name}
        
        PROPERTY DETAILS:
        Address: {property_address}
        
        TERMS AND CONDITIONS:
        
        1. Monthly Rent: Rs. {monthly_rent}/-
        2. Security Deposit: Rs. {security_deposit}/-
        3. Lease Period: {lease_period}
        4. Agreement Start Date: {start_date}
        
        5. The tenant agrees to pay rent on or before 5th of each month.
        6. The security deposit will be refunded after deducting any dues.
        7. The tenant will maintain the property in good condition.
        8. Any modifications to the property require landlord's written consent.
        9. The agreement can be terminated by either party with 30 days notice.
        
        SIGNATURES:
        
        Landlord: ___________________    Date: ___________
        {landlord_name}
        
        Tenant: ___________________      Date: ___________
        {tenant_name}
        
        Witness 1: ___________________  Date: ___________
        
        Witness 2: ___________________  Date: ___________
        
        
        Note: This is a basic template. Please consult a legal expert and 
        register the agreement as per local laws.
        """
        
        # Save as text file
        output_filename = f"rent_agreement_{uuid.uuid4()}.txt"
        output_path = f"downloads/{output_filename}"
        
        async with aiofiles.open(output_path, "w", encoding="utf-8") as f:
            await f.write(template.strip())
        
        return FileResponse(
            output_path,
            media_type="text/plain",
            filename=output_filename,
            headers={"Content-Disposition": f"attachment; filename={output_filename}"}
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating rent agreement: {str(e)}")

@router.post("/voter-id-info")
async def extract_voter_id_info(voter_id: str = Form(...)):
    """Extract basic information from Voter ID format"""
    # Voter ID format varies by state, but generally follows patterns
    voter_id = voter_id.upper().strip()
    
    # Basic validation (3 letters + 7 digits is common format)
    if not re.match(r'^[A-Z]{3}[0-9]{7}$', voter_id):
        return {
            "voter_id": voter_id,
            "is_valid_format": False,
            "message": "Voter ID format varies by state. Common format: ABC1234567"
        }
    
    # Extract state code (first 3 letters give hints about state)
    state_codes = {
        "AAA": "Andhra Pradesh", "GUJ": "Gujarat", "KAR": "Karnataka",
        "KER": "Kerala", "MAH": "Maharashtra", "TAM": "Tamil Nadu",
        "WES": "West Bengal", "DEL": "Delhi", "PUN": "Punjab"
    }
    
    state_code = voter_id[:3]
    possible_state = state_codes.get(state_code, "Unknown state")
    
    return {
        "voter_id": voter_id,
        "is_valid_format": True,
        "state_code": state_code,
        "possible_state": possible_state,
        "sequence_number": voter_id[3:],
        "message": "Format validated. Note: This is basic format checking only."
    }

@router.post("/form-filler")
async def fill_government_form(
    form_type: str = Form(...),
    form_data: str = Form(...)  # JSON string with form fields
):
    """Generic government form filler"""
    try:
        # Parse form data
        try:
            data = json.loads(form_data)
        except json.JSONDecodeError:
            raise HTTPException(status_code=400, detail="Invalid JSON format for form data")
        
        forms = {
            "application": "Government Application Form",
            "complaint": "Public Complaint Form",
            "certificate_request": "Certificate Request Form",
            "license_application": "License Application Form"
        }
        
        if form_type not in forms:
            raise HTTPException(status_code=400, detail=f"Unsupported form type. Available: {', '.join(forms.keys())}")
        
        form_title = forms[form_type]
        
        # Generate filled form
        content = f"""
        
        {form_title.upper()}
        {"=" * len(form_title)}
        
        """
        
        for key, value in data.items():
            formatted_key = key.replace("_", " ").title()
            content += f"{formatted_key}: {value}\n"
        
        content += f"""
        
        Declaration:
        I hereby declare that the information provided above is true to the best 
        of my knowledge and belief.
        
        Date: {import datetime; datetime.datetime.now().strftime('%d/%m/%Y')}
        
        Signature: ___________________
        
        
        Note: This is a template form. Please submit through official government 
        channels for legal validity.
        """
        
        # Save as text file
        output_filename = f"{form_type}_form_{uuid.uuid4()}.txt"
        output_path = f"downloads/{output_filename}"
        
        async with aiofiles.open(output_path, "w", encoding="utf-8") as f:
            await f.write(content.strip())
        
        return FileResponse(
            output_path,
            media_type="text/plain",
            filename=output_filename,
            headers={"Content-Disposition": f"attachment; filename={output_filename}"}
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error filling form: {str(e)}")

@router.get("/info")
async def get_government_tools_info():
    """Get information about available government tools"""
    return {
        "tools": [
            {"name": "pan-validate", "description": "Validate PAN card format"},
            {"name": "aadhaar-mask", "description": "Mask Aadhaar number for privacy"},
            {"name": "passport-photo", "description": "Create passport-sized photos"},
            {"name": "income-certificate", "description": "Generate income certificate template"},
            {"name": "rent-agreement", "description": "Create rent agreement template"},
            {"name": "voter-id-info", "description": "Extract Voter ID information"},
            {"name": "form-filler", "description": "Fill government form templates"}
        ],
        "passport_sizes": ["2x2", "35x45", "25x35", "33x48"],
        "form_types": ["application", "complaint", "certificate_request", "license_application"],
        "disclaimer": "These are template tools. Please use official government channels for legally valid documents."
    }