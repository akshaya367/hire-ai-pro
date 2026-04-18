import { NextResponse } from 'next/server';
import axios from 'axios';

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    // @ts-ignore
    const pdf = require('pdf-parse');
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const data = await pdf(buffer);
    const resumeText = data.text;

    const prompt = `Act as an expert ATS (Applicant Tracking System) and Career Coach. 
    Analyze this resume text and provide:
    1. ATS Score (0-100)
    2. Key Improvements (3-5 points)
    3. Missing Skills (top high-demand skills the user should add)
    4. Industry Fit (which industries/roles they are best suited for)
    
    Resume Text: "${resumeText.substring(0, 4000)}"
    
    Format the response MUST be a valid JSON object with keys: "score", "improvements" (array), "missingSkills" (array), "industryFit".
    Do not include any other text.`;

    const response = await axios.post(
      process.env.AI_API_BASE_URL + '/chat/completions',
      {
        model: process.env.AI_MODEL || 'grok-beta',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.AI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const content = response.data.choices[0].message.content;
    const analysis = JSON.parse(content.replace(/```json|```/g, '').trim());

    return NextResponse.json({ analysis });
  } catch (error: any) {
    console.error('Analysis Error:', error.message);
    return NextResponse.json({ 
      error: 'Analysis failed', 
      fallback: {
        score: 75,
        improvements: ["Add more quantifiable achievements", "Use better action verbs"],
        missingSkills: ["Next.js", "Docker", "Kubernetes"],
        industryFit: "Product-based Tech Startups"
      }
    }, { status: 500 });
  }
}
