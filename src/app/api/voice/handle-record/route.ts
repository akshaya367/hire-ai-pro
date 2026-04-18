import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const recordingUrl = formData.get('RecordingUrl') as string;
    
    // In a real app, you would download the recording and transcribe it here
    // For this example, we'll assume the user said "I am having trouble logging in"
    const userSpeech = "I am having trouble logging in"; 

    // Get AI response using Grok/OpenAI (Support System Prompt)
    const prompt = `User Issue: "${userSpeech}". 
    Provide a short (2-3 sentence) helpful response for a customer support agent. 
    Explain that a password reset link can be sent.`;

    const aiResponse = await axios.post(
      process.env.AI_API_BASE_URL + '/chat/completions',
      {
        model: process.env.AI_MODEL || 'grok-beta',
        messages: [
          { role: 'system', content: 'You are a helpful customer support voice agent. Keep responses short.' },
          { role: 'user', content: prompt }
        ],
      },
      {
        headers: { 'Authorization': `Bearer ${process.env.AI_API_KEY}` }
      }
    );

    const textResponse = aiResponse.data.choices[0].message.content;

    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="Polly.Amy-Neural">${textResponse}</Say>
    <Pause length="1"/>
    <Say voice="Polly.Amy-Neural">I hope that helps. Goodbye!</Say>
    <Hangup/>
</Response>`;

    return new NextResponse(twiml, {
      headers: { 'Content-Type': 'text/xml' },
    });
  } catch (error) {
    console.error('Record Handle Error:', error);
    return new NextResponse('<Response><Say>I am sorry, there was an error processing your request.</Say><Hangup/></Response>', {
      headers: { 'Content-Type': 'text/xml' },
    });
  }
}
