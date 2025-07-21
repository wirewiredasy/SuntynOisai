import express from 'express';
import { spawn } from 'child_process';
import path from 'path';

const router = express.Router();

// Start FastAPI server as a subprocess
let fastapiProcess: any = null;

const startFastAPIServer = () => {
  if (fastapiProcess) return;
  
  const fastapiPath = path.join(process.cwd(), 'fastapi_app');
  
  fastapiProcess = spawn('python3', ['main_simple.py'], {
    cwd: fastapiPath,
    stdio: 'pipe'
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

// Proxy requests to FastAPI
router.all('/api/fastapi/*', async (req, res) => {
  try {
    const fastapiUrl = `http://localhost:8000${req.path.replace('/api/fastapi', '')}`;
    
    // Simple fetch proxy for now
    const response = await fetch(fastapiUrl, {
      method: req.method,
      headers: req.headers as HeadersInit,
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('FastAPI proxy error:', error);
    res.status(500).json({ error: 'FastAPI service unavailable' });
  }
});

// Start FastAPI when this module loads
startFastAPIServer();

export default router;