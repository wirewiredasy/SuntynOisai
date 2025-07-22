
from fastapi import APIRouter, HTTPException, Form
from pydantic import BaseModel
import re
from typing import Optional, List
import uuid
import base64
import json

router = APIRouter()

@router.post("/text-summarizer")
async def summarize_text(text: str = Form(...), max_sentences: int = Form(3)):
    """AI-powered text summarization"""
    try:
        # Simple sentence-based summarization
        sentences = text.split('.')
        sentences = [s.strip() for s in sentences if s.strip()]
        
        if len(sentences) <= max_sentences:
            summary = text
        else:
            # Take first, middle, and last sentences for basic summarization
            summary = '. '.join(sentences[:max_sentences]) + '.'
        
        return {
            "success": True,
            "original_length": len(text),
            "summary_length": len(summary),
            "summary": summary,
            "compression_ratio": f"{round((len(summary)/len(text))*100)}%"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error summarizing text: {str(e)}")

@router.post("/password-generator")
async def generate_password(
    length: int = Form(12),
    include_symbols: bool = Form(True),
    include_numbers: bool = Form(True)
):
    """Generate secure passwords"""
    try:
        import random
        import string
        
        chars = string.ascii_letters
        if include_numbers:
            chars += string.digits
        if include_symbols:
            chars += "!@#$%^&*"
        
        password = ''.join(random.choice(chars) for _ in range(length))
        
        return {
            "success": True,
            "password": password,
            "length": length,
            "strength": "Strong" if length >= 12 else "Medium" if length >= 8 else "Weak"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating password: {str(e)}")

@router.post("/url-shortener")
async def shorten_url(url: str = Form(...)):
    """Create short URLs"""
    try:
        # Generate short code
        short_code = str(uuid.uuid4())[:8]
        short_url = f"https://suntyn.ai/{short_code}"
        
        return {
            "success": True,
            "original_url": url,
            "short_url": short_url,
            "short_code": short_code,
            "clicks": 0
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error shortening URL: {str(e)}")

@router.post("/base64-encoder")
async def encode_decode_base64(
    text: str = Form(...),
    operation: str = Form("encode")
):
    """Encode/Decode Base64 strings"""
    try:
        if operation == "encode":
            encoded = base64.b64encode(text.encode()).decode()
            return {
                "success": True,
                "operation": "encode",
                "input": text,
                "result": encoded
            }
        else:
            decoded = base64.b64decode(text.encode()).decode()
            return {
                "success": True,
                "operation": "decode", 
                "input": text,
                "result": decoded
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing Base64: {str(e)}")

@router.post("/json-formatter")
async def format_json(json_text: str = Form(...)):
    """Format and validate JSON"""
    try:
        # Parse and format JSON
        parsed = json.loads(json_text)
        formatted = json.dumps(parsed, indent=2)
        
        return {
            "success": True,
            "valid": True,
            "formatted_json": formatted,
            "minified_json": json.dumps(parsed, separators=(',', ':')),
            "size_original": len(json_text),
            "size_formatted": len(formatted)
        }
    except json.JSONDecodeError as e:
        return {
            "success": False,
            "valid": False,
            "error": str(e),
            "message": "Invalid JSON format"
        }

@router.post("/word-counter")
async def count_words(text: str = Form(...)):
    """Count words, characters, and paragraphs"""
    try:
        words = len(text.split())
        characters = len(text)
        characters_no_spaces = len(text.replace(' ', ''))
        paragraphs = len([p for p in text.split('\n\n') if p.strip()])
        lines = len(text.split('\n'))
        
        return {
            "success": True,
            "words": words,
            "characters": characters,
            "characters_no_spaces": characters_no_spaces,
            "paragraphs": paragraphs,
            "lines": lines,
            "reading_time": f"{max(1, words // 200)} min"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error counting words: {str(e)}")
