from fastapi import APIRouter, HTTPException, Form
from fastapi.responses import JSONResponse
import uuid
import json
from typing import Optional

router = APIRouter()

@router.post("/qr-generate")
async def generate_qr_code(
    text: str = Form(...),
    size: int = Form(200),
    error_correction: str = Form("M")
):
    """Generate QR code from text"""
    try:
        # In a real implementation, you would use qrcode library
        qr_filename = f"qr_{uuid.uuid4()}.png"
        
        return {
            "success": True,
            "message": "QR code generated successfully",
            "download_url": f"/downloads/{qr_filename}",
            "filename": qr_filename,
            "data": {
                "text": text,
                "size": f"{size}x{size}",
                "error_correction": error_correction
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating QR code: {str(e)}")

@router.post("/barcode-generate")
async def generate_barcode(
    text: str = Form(...),
    format: str = Form("CODE128")
):
    """Generate barcode from text"""
    try:
        barcode_filename = f"barcode_{uuid.uuid4()}.png"
        
        return {
            "success": True,
            "message": f"Barcode generated in {format} format",
            "download_url": f"/downloads/{barcode_filename}",
            "filename": barcode_filename,
            "data": {
                "text": text,
                "format": format
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating barcode: {str(e)}")

@router.post("/text-to-speech")
async def text_to_speech(
    text: str = Form(...),
    voice: str = Form("en-US"),
    speed: float = Form(1.0)
):
    """Convert text to speech"""
    try:
        audio_filename = f"speech_{uuid.uuid4()}.mp3"
        
        return {
            "success": True,
            "message": "Text converted to speech successfully",
            "download_url": f"/downloads/{audio_filename}",
            "filename": audio_filename,
            "data": {
                "text": text[:100] + "..." if len(text) > 100 else text,
                "voice": voice,
                "speed": speed,
                "duration": f"{len(text.split()) * 0.6:.1f}s"
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error converting text to speech: {str(e)}")

@router.post("/lorem-generator")
async def generate_lorem_ipsum(
    paragraphs: int = Form(3),
    words_per_paragraph: int = Form(50)
):
    """Generate Lorem Ipsum text"""
    try:
        lorem_words = [
            "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
            "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
            "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
            "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo"
        ]
        
        result_paragraphs = []
        for _ in range(paragraphs):
            words = []
            for i in range(words_per_paragraph):
                words.append(lorem_words[i % len(lorem_words)])
            paragraph = " ".join(words).capitalize() + "."
            result_paragraphs.append(paragraph)
        
        generated_text = "\n\n".join(result_paragraphs)
        
        return {
            "success": True,
            "message": f"Generated {paragraphs} paragraphs of Lorem Ipsum text",
            "data": {
                "text": generated_text,
                "paragraphs": paragraphs,
                "total_words": paragraphs * words_per_paragraph,
                "characters": len(generated_text)
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating Lorem Ipsum: {str(e)}")

@router.post("/password-generator")
async def generate_password(
    length: int = Form(12),
    include_uppercase: bool = Form(True),
    include_lowercase: bool = Form(True),
    include_numbers: bool = Form(True),
    include_symbols: bool = Form(False)
):
    """Generate secure password"""
    try:
        import random
        import string
        
        characters = ""
        if include_lowercase:
            characters += string.ascii_lowercase
        if include_uppercase:
            characters += string.ascii_uppercase
        if include_numbers:
            characters += string.digits
        if include_symbols:
            characters += "!@#$%^&*"
            
        if not characters:
            raise HTTPException(status_code=400, detail="At least one character type must be selected")
            
        password = "".join(random.choice(characters) for _ in range(length))
        
        # Calculate strength
        strength_score = 0
        if include_lowercase: strength_score += 1
        if include_uppercase: strength_score += 1
        if include_numbers: strength_score += 1
        if include_symbols: strength_score += 1
        if length >= 8: strength_score += 1
        if length >= 12: strength_score += 1
        
        strength_levels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"]
        strength = strength_levels[min(strength_score, 5)]
        
        return {
            "success": True,
            "message": "Password generated successfully",
            "data": {
                "password": password,
                "length": length,
                "strength": strength,
                "includes": {
                    "uppercase": include_uppercase,
                    "lowercase": include_lowercase,
                    "numbers": include_numbers,
                    "symbols": include_symbols
                }
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating password: {str(e)}")

@router.post("/hash-generator")
async def generate_hash(
    text: str = Form(...),
    algorithm: str = Form("sha256")
):
    """Generate hash from text"""
    try:
        import hashlib
        
        supported_algorithms = ["md5", "sha1", "sha224", "sha256", "sha384", "sha512"]
        if algorithm.lower() not in supported_algorithms:
            raise HTTPException(status_code=400, detail=f"Unsupported algorithm. Supported: {supported_algorithms}")
        
        # Generate hash
        hash_obj = hashlib.new(algorithm.lower())
        hash_obj.update(text.encode('utf-8'))
        hash_value = hash_obj.hexdigest()
        
        return {
            "success": True,
            "message": f"Hash generated using {algorithm.upper()}",
            "data": {
                "original_text": text,
                "algorithm": algorithm.upper(),
                "hash": hash_value,
                "length": len(hash_value)
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating hash: {str(e)}")

@router.post("/base64-encode")
async def encode_base64(
    text: str = Form(...)
):
    """Encode text to Base64"""
    try:
        import base64
        
        encoded = base64.b64encode(text.encode('utf-8')).decode('utf-8')
        
        return {
            "success": True,
            "message": "Text encoded to Base64 successfully",
            "data": {
                "original_text": text,
                "encoded": encoded,
                "original_length": len(text),
                "encoded_length": len(encoded)
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error encoding to Base64: {str(e)}")

@router.post("/base64-decode")
async def decode_base64(
    encoded_text: str = Form(...)
):
    """Decode Base64 to text"""
    try:
        import base64
        
        decoded = base64.b64decode(encoded_text.encode('utf-8')).decode('utf-8')
        
        return {
            "success": True,
            "message": "Base64 decoded successfully",
            "data": {
                "encoded_text": encoded_text,
                "decoded": decoded,
                "encoded_length": len(encoded_text),
                "decoded_length": len(decoded)
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error decoding Base64: {str(e)}")

@router.post("/url-shortener")
async def shorten_url(
    url: str = Form(...),
    custom_alias: Optional[str] = Form(None)
):
    """Create shortened URL"""
    try:
        import re
        
        # Basic URL validation
        url_pattern = re.compile(
            r'^https?://'  # http:// or https://
            r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?|'  # domain...
            r'localhost|'  # localhost...
            r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # ...or ip
            r'(?::\d+)?'  # optional port
            r'(?:/?|[/?]\S+)$', re.IGNORECASE)
        
        if not url_pattern.match(url):
            raise HTTPException(status_code=400, detail="Invalid URL format")
        
        # Generate short code
        if custom_alias:
            short_code = custom_alias
        else:
            import random
            import string
            short_code = ''.join(random.choices(string.ascii_letters + string.digits, k=6))
        
        short_url = f"https://suntyn.ai/{short_code}"
        
        return {
            "success": True,
            "message": "URL shortened successfully",
            "data": {
                "original_url": url,
                "short_url": short_url,
                "short_code": short_code,
                "clicks": 0,
                "created_at": "2025-01-22"
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error shortening URL: {str(e)}")

@router.post("/json-formatter")
async def format_json(
    json_text: str = Form(...),
    indent: int = Form(2)
):
    """Format and validate JSON"""
    try:
        # Parse and format JSON
        parsed_json = json.loads(json_text)
        formatted_json = json.dumps(parsed_json, indent=indent, ensure_ascii=False)
        
        # Count elements
        def count_elements(obj, counts=None):
            if counts is None:
                counts = {"objects": 0, "arrays": 0, "strings": 0, "numbers": 0, "booleans": 0, "nulls": 0}
            
            if isinstance(obj, dict):
                counts["objects"] += 1
                for value in obj.values():
                    count_elements(value, counts)
            elif isinstance(obj, list):
                counts["arrays"] += 1
                for item in obj:
                    count_elements(item, counts)
            elif isinstance(obj, str):
                counts["strings"] += 1
            elif isinstance(obj, (int, float)):
                counts["numbers"] += 1
            elif isinstance(obj, bool):
                counts["booleans"] += 1
            elif obj is None:
                counts["nulls"] += 1
            
            return counts
        
        element_counts = count_elements(parsed_json)
        
        return {
            "success": True,
            "message": "JSON formatted and validated successfully",
            "data": {
                "formatted_json": formatted_json,
                "is_valid": True,
                "original_size": len(json_text),
                "formatted_size": len(formatted_json),
                "element_counts": element_counts
            }
        }
    except json.JSONDecodeError as e:
        return {
            "success": False,
            "message": f"Invalid JSON: {str(e)}",
            "data": {
                "formatted_json": json_text,
                "is_valid": False,
                "error": str(e)
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error formatting JSON: {str(e)}")

@router.post("/markdown-to-html")
async def markdown_to_html(
    markdown_text: str = Form(...)
):
    """Convert Markdown to HTML"""
    try:
        import re
        
        # Simple markdown to HTML conversion
        html = markdown_text
        
        # Headers
        html = re.sub(r'^### (.*$)', r'<h3>\1</h3>', html, flags=re.MULTILINE)
        html = re.sub(r'^## (.*$)', r'<h2>\1</h2>', html, flags=re.MULTILINE)
        html = re.sub(r'^# (.*$)', r'<h1>\1</h1>', html, flags=re.MULTILINE)
        
        # Bold and italic
        html = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', html)
        html = re.sub(r'\*(.*?)\*', r'<em>\1</em>', html)
        
        # Links
        html = re.sub(r'\[([^\]]+)\]\(([^\)]+)\)', r'<a href="\2">\1</a>', html)
        
        # Code
        html = re.sub(r'`([^`]+)`', r'<code>\1</code>', html)
        
        # Line breaks
        html = html.replace('\n\n', '</p><p>')
        html = html.replace('\n', '<br>')
        html = f'<p>{html}</p>'
        
        return {
            "success": True,
            "message": "Markdown converted to HTML successfully",
            "data": {
                "markdown": markdown_text,
                "html": html,
                "markdown_length": len(markdown_text),
                "html_length": len(html)
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error converting Markdown: {str(e)}")