# HireAI Pro - Premium AI SaaS Platform

HireAI Pro is a next-generation career and support platform powered by advanced AI. It combines job searching, resume analysis, and real-time support (Chat & Voice) into one seamless, high-performance web experience.

## 🚀 Key Features
- **AI Job Search**: Highly personalized role matching for the Indian market.
- **Resume Analyzer**: PDF analysis with ATS scoring and skill improvement suggestions.
- **AI Support Chat**: Context-aware chatbot for platform guidance and troubleshooting.
- **AI Voice Calling**: Instant outbound support calls via Twilio & ElevenLabs.
- **Personalized Dashboard**: Track applications, saved jobs, and career metrics.

## 🛠 Tech Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, MongoDB (Mongoose)
- **Auth**: NextAuth.js (Google & GitHub)
- **AI**: Grok-beta (supports OpenAI spec), Twilio, ElevenLabs

## 📦 Setup Instructions

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Twilio account (Account SID, Auth Token, Twilio Number)
- OpenAI or Grok API Key

### 2. Environment Setup
Copy the `.env.example` to `.env.local` and fill in your credentials.

### 3. Installation
```bash
npm install
npm run dev
```

### 4. Twilio/Voice Configuration
- Ensure your Twilio number is active.
- Set `NEXT_PUBLIC_APP_URL` in `.env.local` to your public URL (or ngrok during local dev).
- Point Twilio Voice Webhook to `${NEXT_PUBLIC_APP_URL}/api/voice/webhook`.

## 🌐 Deployment
The platform is optimized for Vercel. Ensure all environment variables are added to your Vercel project settings.
