import { NextResponse } from 'next/server';
import axios from 'axios';

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { skills } = await req.json();

    if (!skills) {
      return NextResponse.json({ error: 'Skills are required' }, { status: 400 });
    }

    const prompt = `Act as an expert career consultant in India. Based on these skills: "${skills}", return a list of 5 premium job roles. 
    For each role, provide:
    1. Job Title
    2. Salary Range (in INR Lakhs per annum)
    3. Essential Skills
    4. 3-4 Top Companies hiring for this in India.
    
    Format the response MUST be a valid JSON array of objects with keys: "title", "salary", "skills" (array), "companies" (array).
    Do not include any other text.`;

    const response = await axios.post(
      process.env.AI_API_BASE_URL + '/chat/completions',
      {
        model: process.env.AI_MODEL || 'grok-beta',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.AI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const content = response.data.choices[0].message.content;
    const jobs = JSON.parse(content.replace(/```json|```/g, '').trim());

    return NextResponse.json({ jobs });
  } catch (error: any) {
    console.error('AI Search Error:', error.response?.data || error.message);
    // Fallback for demo if API fails
    return NextResponse.json({ 
      error: 'AI request failed',
      fallback: [
        { title: 'Software Engineer', salary: '12 - 25 LPA', skills: ['React', 'Node.js'], companies: ['Google', 'TCS', 'Paytm'] }
      ] 
    }, { status: 500 });
  }
}
