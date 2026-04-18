import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemPrompt = {
      role: 'system',
      content: 'You are HireAI Mentor, an expert career advisor and interview coach. You provide concise, actionable advice on careers, resumes, and interview preparation specifically for the Indian job market. Be encouraging and professional.'
    };

    const response = await axios.post(
      process.env.AI_API_BASE_URL + '/chat/completions',
      {
        model: process.env.AI_MODEL || 'grok-beta',
        messages: [systemPrompt, ...messages],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.AI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json({ message: response.data.choices[0].message });
  } catch (error: any) {
    console.error('Chat Error:', error.message);
    return NextResponse.json({ error: 'Failed to get response' }, { status: 500 });
  }
}
