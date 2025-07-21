#!/usr/bin/env python3
import sys
import os
sys.path.append('fastapi_app')

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "fastapi_app.main:app", 
        host="0.0.0.0", 
        port=8000, 
        reload=True,
        reload_dirs=["fastapi_app"]
    )