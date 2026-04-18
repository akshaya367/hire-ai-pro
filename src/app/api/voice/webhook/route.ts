import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="Polly.Amy-Neural">Hello, I am your HireAI Pro assistant. I understand you are having some issues? Please state your problem after the beep.</Say>
    <Record action="/api/voice/handle-record" maxLength="10" />
</Response>`;

  return new NextResponse(twiml, {
    headers: { 'Content-Type': 'text/xml' },
  });
}
