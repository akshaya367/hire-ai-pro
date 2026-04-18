# HireAI - Premium AI-Powered Job Platform

HireAI is a production-ready web application designed to revolutionize the job search experience in India using cutting-edge AI.

## 🚀 Features
- **AI Job Search**: Discover roles, salary ranges, and hiring companies based on your skills.
- **Resume Analyzer**: Get an instant ATS score and actionable improvements for your PDF resume.
- **Smart Dashboard**: Track applications and visualize your growth with interactive charts.
- **AI Career Mentor**: Chat with an expert AI coach for interview prep and career guidance.
- **Secure Auth**: Seamless Google and GitHub authentication.

## 🛠 Tech Stack
- **Frontend**: Next.js 14/15, Tailwind CSS 4, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Auth**: NextAuth.js
- **AI**: Grok (X.AI) integration

## 📦 Setup Instructions

1. **Clone and Install**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env.local` file and add the following:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   SUPABASE_SERVICE_ROLE_KEY=your_role_key
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret
   GOOGLE_CLIENT_ID=your_id
   GOOGLE_CLIENT_SECRET=your_secret
   GITHUB_ID=your_id
   GITHUB_SECRET=your_secret
   AI_API_KEY=your_grok_key
   AI_API_BASE_URL=https://api.x.ai/v1
   AI_MODEL=grok-beta
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Production Build**:
   ```bash
   npm run build
   npm start
   ```

## 🔒 Security
- Protected routes using NextAuth middleware.
- Sanitized input and structured AI prompting.
- Environment variables for all sensitive keys.

## 🌩 Deployment
This app is optimized for **Vercel**.
- Connect your GitHub repo to Vercel.
- Add your environment variables in the Vercel dashboard.
- Deployment is automatic on push.
