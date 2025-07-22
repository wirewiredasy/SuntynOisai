from fastapi import APIRouter, HTTPException, Form
from pydantic import BaseModel
import re
from typing import Optional

router = APIRouter()

class PANValidationResponse(BaseModel):
    valid: bool
    message: str
    format_correct: bool

class GSTCalculation(BaseModel):
    amount: float
    gst_rate: float
    gst_amount: float
    total_amount: float
    cgst: float
    sgst: float
    igst: float

@router.post("/pan-validate", response_model=PANValidationResponse)
async def validate_pan(pan_number: str = Form(...)):
    """Validate PAN card number format"""
    try:
        # PAN format: 5 letters + 4 digits + 1 letter (e.g., ABCDE1234F)
        pan_pattern = re.compile(r'^[A-Z]{5}[0-9]{4}[A-Z]{1}$')
        
        pan_number = pan_number.upper().strip()
        
        if pan_pattern.match(pan_number):
            return PANValidationResponse(
                valid=True,
                message="PAN format is valid",
                format_correct=True
            )
        else:
            return PANValidationResponse(
                valid=False,
                message="Invalid PAN format. Format should be: ABCDE1234F",
                format_correct=False
            )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error validating PAN: {str(e)}")

@router.post("/aadhaar-mask")
async def mask_aadhaar(aadhaar_number: str = Form(...)):
    """Mask Aadhaar number for privacy"""
    try:
        # Remove spaces and dashes
        clean_aadhaar = re.sub(r'[\s\-]', '', aadhaar_number)
        
        if len(clean_aadhaar) != 12 or not clean_aadhaar.isdigit():
            raise HTTPException(status_code=400, detail="Invalid Aadhaar format")
        
        # Mask first 8 digits
        masked_aadhaar = 'XXXX XXXX ' + clean_aadhaar[8:12]
        
        return {
            "success": True,
            "original": aadhaar_number,
            "masked": masked_aadhaar,
            "message": "Aadhaar number masked successfully"
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error masking Aadhaar: {str(e)}")

@router.post("/gst-calculate", response_model=GSTCalculation)
async def calculate_gst(
    amount: float = Form(...),
    gst_rate: float = Form(18.0),
    include_gst: bool = Form(False)
):
    """Calculate GST amount"""
    try:
        if gst_rate < 0 or gst_rate > 100:
            raise HTTPException(status_code=400, detail="GST rate should be between 0 and 100")
        
        if include_gst:
            # Amount includes GST, calculate base amount
            base_amount = amount / (1 + (gst_rate / 100))
            gst_amount = amount - base_amount
            total_amount = amount
        else:
            # Amount is base, add GST
            base_amount = amount
            gst_amount = amount * (gst_rate / 100)
            total_amount = amount + gst_amount
        
        # For intrastate transactions
        cgst = gst_amount / 2
        sgst = gst_amount / 2
        igst = 0
        
        return GSTCalculation(
            amount=base_amount,
            gst_rate=gst_rate,
            gst_amount=gst_amount,
            total_amount=total_amount,
            cgst=cgst,
            sgst=sgst,
            igst=igst
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calculating GST: {str(e)}")

@router.post("/ifsc-lookup")
async def lookup_ifsc(ifsc_code: str = Form(...)):
    """Look up bank details from IFSC code"""
    try:
        ifsc_code = ifsc_code.upper().strip()
        
        # Basic IFSC format validation
        if len(ifsc_code) != 11:
            raise HTTPException(status_code=400, detail="IFSC code should be 11 characters")
        
        # Mock data for demonstration
        bank_data = {
            "SBIN0000001": {"bank": "State Bank of India", "branch": "Mumbai Main", "city": "Mumbai"},
            "HDFC0000001": {"bank": "HDFC Bank", "branch": "Mumbai Fort", "city": "Mumbai"},
            "ICIC0000001": {"bank": "ICICI Bank", "branch": "Mumbai BKC", "city": "Mumbai"},
        }
        
        if ifsc_code in bank_data:
            return {
                "success": True,
                "ifsc": ifsc_code,
                "bank_name": bank_data[ifsc_code]["bank"],
                "branch_name": bank_data[ifsc_code]["branch"],
                "city": bank_data[ifsc_code]["city"]
            }
        else:
            return {
                "success": False,
                "message": "IFSC code not found in database",
                "ifsc": ifsc_code
            }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error looking up IFSC: {str(e)}")

@router.post("/emi-calculate")
async def calculate_emi(
    principal: float = Form(...),
    rate: float = Form(...),
    tenure: int = Form(...)
):
    """Calculate EMI for loan"""
    try:
        if principal <= 0 or rate <= 0 or tenure <= 0:
            raise HTTPException(status_code=400, detail="All values should be positive")
        
        # Convert annual rate to monthly and percentage to decimal
        monthly_rate = (rate / 100) / 12
        
        # EMI calculation formula
        if monthly_rate > 0:
            emi = principal * monthly_rate * ((1 + monthly_rate) ** tenure) / (((1 + monthly_rate) ** tenure) - 1)
        else:
            emi = principal / tenure
        
        total_payment = emi * tenure
        total_interest = total_payment - principal
        
        return {
            "success": True,
            "principal": principal,
            "rate": rate,
            "tenure": tenure,
            "emi": round(emi, 2),
            "total_payment": round(total_payment, 2),
            "total_interest": round(total_interest, 2)
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calculating EMI: {str(e)}")