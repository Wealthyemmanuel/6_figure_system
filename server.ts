import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const SYSTEME_IO_API_KEY =
  process.env.SYSTEME_IO_API_KEY ||
  'vfgknt0b24l9vnthp6t3zg3h549dws8d640r8yuppc553qoxdngbbanit0fuvika';

app.use(express.json());

// Enable permissive CORS for all client requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// API route to forward lead to systeme.io
app.post('/api/subscribe', async (req, res) => {
  try {
    const { name, email, consent } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    if (consent === false) {
      return res.status(400).json({ error: 'Email consent is required' });
    }

    const trimmedName = name ? String(name).trim() : '';
    const nameParts = trimmedName ? trimmedName.split(/\s+/) : [];
    const firstName = nameParts[0] || '';
    const surname = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    const fields: Array<{ slug: string; value: string }> = [];
    if (firstName) fields.push({ slug: 'first_name', value: firstName });
    if (surname) fields.push({ slug: 'surname', value: surname });

    const payload = {
      email: String(email).trim().toLowerCase(),
      fields,
    };

    const response = await fetch('https://api.systeme.io/api/contacts', {
      method: 'POST',
      headers: {
        'X-API-KEY': SYSTEME_IO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (response.ok) {
      return res.json({ success: true, contact: data });
    } else {
      // Even if already registered in systeme.io, permit progression
      return res.json({
        success: true,
        note: data?.message || 'Contact already exists or updated',
        details: data,
      });
    }
  } catch (err: any) {
    console.error('Error forwarding to Systeme.io:', err);
    // Don't block user access if upstream encounters an issue
    return res.json({
      success: true,
      fallback: true,
      error: err?.message,
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'systeme-io-proxy' });
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
