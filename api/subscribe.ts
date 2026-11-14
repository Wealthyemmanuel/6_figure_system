interface VercelRequest {
  method?: string;
  body?: unknown;
}

interface VercelResponse {
  setHeader: (name: string, value: string) => void;
  status: (statusCode: number) => VercelResponse;
  json: (data: unknown) => VercelResponse;
  send: (data: unknown) => VercelResponse;
}

const SYSTEME_IO_API_KEY =
  process.env.SYSTEME_IO_API_KEY ||
  'vfgknt0b24l9vnthp6t3zg3h549dws8d640r8yuppc553qoxdngbbanit0fuvika';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).send('OK');
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let parsedBody: Record<string, unknown> = {};
    if (typeof req.body === 'string') {
      parsedBody = JSON.parse(req.body || '{}');
    } else if (req.body && typeof req.body === 'object') {
      parsedBody = req.body as Record<string, unknown>;
    }

    const name = typeof parsedBody.name === 'string' ? parsedBody.name.trim() : '';
    const email = typeof parsedBody.email === 'string' ? parsedBody.email.trim().toLowerCase() : '';

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const payload = {
      email,
      fields: name ? [{ slug: 'first_name', value: name }] : [],
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
      return res.status(200).json({ success: true, contact: data });
    }

    return res.status(200).json({
      success: true,
      note: (data as { message?: string })?.message || 'Contact already exists or updated',
      details: data,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error forwarding to Systeme.io:', err);
    return res.status(200).json({
      success: true,
      fallback: true,
      error: message,
    });
  }
}
