import express from 'express';
import { spawn } from 'child_process';
import path from 'path';
import multer from 'multer';
import FormData from 'form-data';
import fetch from 'node-fetch';
import fs from 'fs';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Start FastAPI server as a subprocess
let fastapiProcess: any = null;

const startFastAPIServer = () => {
  if (fastapiProcess) return;
  
  const fastapiPath = path.join(process.cwd(), 'fastapi_app');
  
  fastapiProcess = spawn('python3', ['-m', 'uvicorn', 'main:app', '--host', '0.0.0.0', '--port', '8000', '--reload'], {
    cwd: fastapiPath,
    stdio: 'pipe',
    env: { ...process.env, PYTHONPATH: fastapiPath }
  });
  
  fastapiProcess.stdout.on('data', (data: Buffer) => {
    console.log('[FastAPI]', data.toString());
  });
  
  fastapiProcess.stderr.on('data', (data: Buffer) => {
    console.error('[FastAPI Error]', data.toString());
  });
  
  fastapiProcess.on('close', (code: number) => {
    console.log(`[FastAPI] Process exited with code ${code}`);
    fastapiProcess = null;
  });
  
  // Give it time to start
  setTimeout(() => {
    console.log('[FastAPI] Server should be running on port 8000');
  }, 3000);
};

// Proxy API requests to FastAPI backend
router.all('/api/*', upload.any(), async (req, res) => {
  try {
    const fastapiUrl = `http://localhost:8000${req.path}`;
    
    let fetchOptions: any = {
      method: req.method,
      headers: {}
    };
    
    // Handle file uploads with FormData
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const formData = new FormData();
      
      // Add files to FormData
      (req.files as Express.Multer.File[]).forEach((file, index) => {
        formData.append('files', fs.createReadStream(file.path), file.originalname);
      });
      
      // Add other form fields
      Object.keys(req.body).forEach(key => {
        if (req.body[key]) {
          formData.append(key, req.body[key]);
        }
      });
      
      fetchOptions.body = formData;
    } else if (req.body && Object.keys(req.body).length > 0) {
      if (req.is('application/json')) {
        fetchOptions.body = JSON.stringify(req.body);
        fetchOptions.headers['content-type'] = 'application/json';
      } else {
        // Handle form data
        const formData = new FormData();
        Object.keys(req.body).forEach(key => {
          formData.append(key, req.body[key]);
        });
        fetchOptions.body = formData;
      }
    }
    
    const response = await fetch(fastapiUrl, fetchOptions);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('FastAPI error response:', errorText);
      return res.status(response.status).json({ 
        error: 'FastAPI error', 
        details: errorText,
        status: response.status
      });
    }
    
    const contentType = response.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      const data = await response.json();
      res.json(data);
    } else {
      const buffer = await response.buffer();
      res.setHeader('content-type', contentType || 'application/octet-stream');
      res.send(buffer);
    }
    
  } catch (error: any) {
    console.error('FastAPI proxy error:', error);
    res.status(500).json({ 
      error: 'FastAPI service unavailable', 
      details: error?.message || 'Unknown error'
    });
  } finally {
    // Clean up uploaded files
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      (req.files as Express.Multer.File[]).forEach(file => {
        fs.unlinkSync(file.path);
      });
    }
  }
});

// Start FastAPI when this module loads
startFastAPIServer();

export default router;