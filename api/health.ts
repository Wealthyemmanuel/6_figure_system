interface VercelRequest {
  method?: string;
}

interface VercelResponse {
  status: (statusCode: number) => VercelResponse;
  json: (data: unknown) => VercelResponse;
}

export default function handler(_req: VercelRequest, res: VercelResponse) {
  return res.status(200).json({ status: 'ok', service: 'systeme-io-proxy' });
}
