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

@router.post("/tds-calculate")
async def calculate_tds(
    salary: float = Form(...),
    tax_regime: str = Form("new")
):
    """Calculate TDS (Tax Deducted at Source)"""
    try:
        if salary <= 0:
            raise HTTPException(status_code=400, detail="Salary should be positive")
        
        annual_salary = salary * 12
        
        # Basic TDS calculation (simplified)
        if tax_regime == "new":
            if annual_salary <= 300000:
                tds = 0
            elif annual_salary <= 600000:
                tds = (annual_salary - 300000) * 0.05
            elif annual_salary <= 900000:
                tds = 15000 + (annual_salary - 600000) * 0.10
            else:
                tds = 45000 + (annual_salary - 900000) * 0.15
        else:  # old regime
            if annual_salary <= 250000:
                tds = 0
            elif annual_salary <= 500000:
                tds = (annual_salary - 250000) * 0.05
            elif annual_salary <= 1000000:
                tds = 12500 + (annual_salary - 500000) * 0.20
            else:
                tds = 112500 + (annual_salary - 1000000) * 0.30
        
        monthly_tds = tds / 12
        
        return {
            "success": True,
            "monthly_salary": salary,
            "annual_salary": annual_salary,
            "tax_regime": tax_regime,
            "annual_tds": round(tds, 2),
            "monthly_tds": round(monthly_tds, 2),
            "net_monthly_salary": round(salary - monthly_tds, 2)
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calculating TDS: {str(e)}")

@router.post("/property-tax-calculate")
async def calculate_property_tax(
    property_value: float = Form(...),
    property_type: str = Form("residential"),
    city: str = Form("mumbai")
):
    """Calculate property tax"""
    try:
        if property_value <= 0:
            raise HTTPException(status_code=400, detail="Property value should be positive")
        
        # Property tax rates vary by city and type
        tax_rates = {
            "mumbai": {"residential": 0.003, "commercial": 0.004},
            "delhi": {"residential": 0.0025, "commercial": 0.0035},
            "bangalore": {"residential": 0.0015, "commercial": 0.0025},
            "pune": {"residential": 0.002, "commercial": 0.003}
        }
        
        city_lower = city.lower()
        if city_lower not in tax_rates:
            city_lower = "mumbai"  # default
        
        rate = tax_rates[city_lower].get(property_type, tax_rates[city_lower]["residential"])
        annual_tax = property_value * rate
        
        return {
            "success": True,
            "property_value": property_value,
            "property_type": property_type,
            "city": city,
            "tax_rate": f"{rate*100}%",
            "annual_tax": round(annual_tax, 2),
            "quarterly_tax": round(annual_tax/4, 2)
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calculating property tax: {str(e)}")

@router.post("/professional-tax-calculate")
async def calculate_professional_tax(
    monthly_salary: float = Form(...),
    state: str = Form("maharashtra")
):
    """Calculate professional tax"""
    try:
        if monthly_salary <= 0:
            raise HTTPException(status_code=400, detail="Salary should be positive")
        
        # Professional tax slabs (Maharashtra example)
        pt_slabs = {
            "maharashtra": [
                (0, 15000, 0),
                (15000, 25000, 175),
                (25000, float('inf'), 200)
            ],
            "karnataka": [
                (0, 15000, 0),
                (15000, 30000, 150),
                (30000, float('inf'), 200)
            ],
            "west bengal": [
                (0, 15000, 0),
                (15000, 20000, 110),
                (20000, float('inf'), 130)
            ]
        }
        
        state_lower = state.lower()
        if state_lower not in pt_slabs:
            state_lower = "maharashtra"  # default
        
        pt_tax = 0
        for min_sal, max_sal, tax in pt_slabs[state_lower]:
            if monthly_salary > min_sal and monthly_salary <= max_sal:
                pt_tax = tax
                break
        
        annual_pt = pt_tax * 12
        
        return {
            "success": True,
            "monthly_salary": monthly_salary,
            "state": state,
            "monthly_pt": pt_tax,
            "annual_pt": annual_pt
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calculating professional tax: {str(e)}")

@router.post("/legal-notice-generator")
async def generate_legal_notice(
    sender_name: str = Form(...),
    recipient_name: str = Form(...),
    issue_description: str = Form(...),
    amount: Optional[float] = Form(None)
):
    """Generate legal notice template"""
    try:
        notice_content = f"""
LEGAL NOTICE

To,
{recipient_name}

Subject: Legal Notice for {issue_description}

Sir/Madam,

I, {sender_name}, hereby serve you this legal notice regarding the matter mentioned above.

FACTS OF THE CASE:
{issue_description}

{"AMOUNT INVOLVED: Rs. " + str(amount) if amount else ""}

DEMAND:
You are hereby called upon to resolve this matter within 15 days from the receipt of this notice, failing which my client shall be constrained to initiate appropriate legal proceedings against you at your risk as to costs.

Take notice that if you fail to comply with the demand within the stipulated time, my client shall be left with no option but to approach the appropriate court of law for redressal and claim damages.

Yours faithfully,
{sender_name}

Date: [DATE]
Place: [PLACE]
"""
        
        # Save as text file
        output_filename = f"legal_notice_{uuid.uuid4()}.txt"
        output_path = f"downloads/{output_filename}"
        
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(notice_content)
        
        return {
            "success": True,
            "message": "Legal notice generated successfully",
            "download_url": f"/downloads/{output_filename}",
            "filename": output_filename
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating legal notice: {str(e)}")

@router.post("/affidavit-generator")
async def generate_affidavit(
    deponent_name: str = Form(...),
    father_name: str = Form(...),
    address: str = Form(...),
    statement: str = Form(...)
):
    """Generate affidavit template"""
    try:
        affidavit_content = f"""
AFFIDAVIT

I, {deponent_name}, son/daughter of {father_name}, aged [AGE] years, 
residing at {address}, do hereby solemnly affirm and declare as under:

1. That I am the deponent herein and I am well conversant with the facts 
   and circumstances of the case and hence competent to swear this affidavit.

2. That {statement}

3. That the statements made in the preceding paragraphs are true and correct 
   to the best of my knowledge and belief and nothing material has been 
   concealed therefrom.

4. That I am making this affidavit to [PURPOSE].

DEPONENT

VERIFICATION:
I, the above named deponent, do hereby verify that the contents of the above 
affidavit are true and correct to the best of my knowledge and belief and 
nothing material has been concealed therefrom.

Verified at [PLACE] on this [DAY] day of [MONTH], [YEAR].

DEPONENT
"""
        
        # Save as text file
        output_filename = f"affidavit_{uuid.uuid4()}.txt"
        output_path = f"downloads/{output_filename}"
        
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(affidavit_content)
        
        return {
            "success": True,
            "message": "Affidavit generated successfully",
            "download_url": f"/downloads/{output_filename}",
            "filename": output_filename
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating affidavit: {str(e)}")

@router.post("/vehicle-registration-check")
async def check_vehicle_registration(vehicle_number: str = Form(...)):
    """Check vehicle registration details"""
    try:
        # Clean the vehicle number
        vehicle_number = vehicle_number.upper().strip()
        
        # Basic format validation for Indian vehicle numbers
        import re
        pattern = r'^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$'
        
        if not re.match(pattern, vehicle_number.replace(" ", "")):
            return {
                "success": False,
                "message": "Invalid vehicle number format",
                "vehicle_number": vehicle_number
            }
        
        # Demo data (in real implementation, this would connect to RTO database)
        demo_data = {
            "success": True,
            "vehicle_number": vehicle_number,
            "owner_name": "Demo Owner Name",
            "vehicle_type": "Motor Car",
            "fuel_type": "Petrol",
            "registration_date": "2020-01-15",
            "chassis_number": "XXXXX1234XXXXX",
            "engine_number": "ABC123DEF456",
            "rto_office": "Mumbai Central",
            "fitness_valid_upto": "2025-01-15",
            "insurance_valid_upto": "2024-01-15",
            "puc_valid_upto": "2024-07-15"
        }
        
        return demo_data
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error checking vehicle registration: {str(e)}")

@router.post("/driving-license-validator")
async def validate_driving_license(dl_number: str = Form(...)):
    """Validate driving license number format"""
    try:
        # Clean the DL number
        dl_number = dl_number.upper().strip()
        
        # DL format: State Code (2) + RTO Code (2) + Year (4) + Unique Number (7)
        import re
        pattern = r'^[A-Z]{2}[0-9]{2}[0-9]{4}[0-9]{7}$'
        
        if re.match(pattern, dl_number.replace(" ", "")):
            return {
                "success": True,
                "valid": True,
                "dl_number": dl_number,
                "message": "Driving license format is valid",
                "state_code": dl_number[:2],
                "rto_code": dl_number[2:4],
                "issue_year": dl_number[4:8]
            }
        else:
            return {
                "success": True,
                "valid": False,
                "dl_number": dl_number,
                "message": "Invalid driving license format"
            }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error validating DL: {str(e)}")

@router.post("/voter-id-validator")
async def validate_voter_id(voter_id: str = Form(...)):
    """Validate voter ID card number format"""
    try:
        # Clean the voter ID
        voter_id = voter_id.upper().strip()
        
        # Voter ID format: 3 letters + 7 digits
        import re
        pattern = r'^[A-Z]{3}[0-9]{7}$'
        
        if re.match(pattern, voter_id):
            return {
                "success": True,
                "valid": True,
                "voter_id": voter_id,
                "message": "Voter ID format is valid",
                "state_code": voter_id[:3]
            }
        else:
            return {
                "success": True,
                "valid": False,
                "voter_id": voter_id,
                "message": "Invalid voter ID format. Format should be: ABC1234567"
            }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error validating voter ID: {str(e)}")

@router.post("/stamp-duty-calculator")
async def calculate_stamp_duty(
    property_value: float = Form(...),
    property_type: str = Form("residential"),
    state: str = Form("maharashtra"),
    gender: str = Form("male")
):
    """Calculate stamp duty for property registration"""
    try:
        if property_value <= 0:
            raise HTTPException(status_code=400, detail="Property value should be positive")
        
        # Stamp duty rates vary by state
        stamp_duty_rates = {
            "maharashtra": {
                "residential": {"male": 0.05, "female": 0.04},
                "commercial": {"male": 0.06, "female": 0.06}
            },
            "delhi": {
                "residential": {"male": 0.06, "female": 0.04},
                "commercial": {"male": 0.06, "female": 0.06}
            },
            "karnataka": {
                "residential": {"male": 0.05, "female": 0.02},
                "commercial": {"male": 0.05, "female": 0.05}
            }
        }
        
        state_lower = state.lower()
        if state_lower not in stamp_duty_rates:
            state_lower = "maharashtra"  # default
        
        rates = stamp_duty_rates[state_lower]
        rate = rates.get(property_type, rates["residential"])[gender]
        
        stamp_duty = property_value * rate
        registration_fee = property_value * 0.01  # 1% registration fee
        total_charges = stamp_duty + registration_fee
        
        return {
            "success": True,
            "property_value": property_value,
            "property_type": property_type,
            "state": state,
            "gender": gender,
            "stamp_duty_rate": f"{rate*100}%",
            "stamp_duty": round(stamp_duty, 2),
            "registration_fee": round(registration_fee, 2),
            "total_charges": round(total_charges, 2)
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calculating stamp duty: {str(e)}")

@router.post("/court-fee-calculator")
async def calculate_court_fee(
    case_value: float = Form(...),
    court_type: str = Form("district"),
    case_type: str = Form("civil")
):
    """Calculate court fee for legal proceedings"""
    try:
        if case_value <= 0:
            raise HTTPException(status_code=400, detail="Case value should be positive")
        
        # Court fee calculation (simplified structure)
        if court_type.lower() == "supreme":
            base_fee = 15000
            percentage = 0.005
        elif court_type.lower() == "high":
            base_fee = 5000
            percentage = 0.01
        else:  # district court
            base_fee = 1000
            percentage = 0.02
        
        if case_type.lower() == "criminal":
            calculated_fee = base_fee
        else:  # civil case
            calculated_fee = max(base_fee, case_value * percentage)
        
        # Additional fees
        process_fee = 500
        miscellaneous_fee = 200
        total_fee = calculated_fee + process_fee + miscellaneous_fee
        
        return {
            "success": True,
            "case_value": case_value,
            "court_type": court_type,
            "case_type": case_type,
            "court_fee": round(calculated_fee, 2),
            "process_fee": process_fee,
            "miscellaneous_fee": miscellaneous_fee,
            "total_fee": round(total_fee, 2)
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calculating court fee: {str(e)}")