"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  UserPlus, 
  Search, 
  Upload,
  LayoutDashboard, 
  MessageSquare, 
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const steps = [
  {
    icon: <UserPlus className="w-8 h-8 text-purple-400" />,
    title: "1. Create Your Account",
    content: "Start by signing up with your Google account. This securely stores your profile, resume data, and saved jobs so you can access them from anywhere.",
    tip: "It takes less than 5 seconds with Google Sign-In!"
  },
  {
    icon: <Search className="w-8 h-8 text-blue-400" />,
    title: "2. Find Your Perfect Role",
    content: "Head to the 'Find Jobs' section and enter your core skills (e.g., React, Python, AWS). Our AI will analyze thousands of openings to suggest matching roles with salary estimates.",
    tip: "Be specific with your skills for better AI matching."
  },
  {
    icon: <Upload className="w-8 h-8 text-emerald-400" />,
    title: "3. Analyze Your Resume",
    content: "Upload your current resume in PDF format. The AI will cross-reference it with industry standards to give you an ATS score and identify missing keywords.",
    tip: "Follow the AI suggestions to boost your score above 85%."
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-orange-400" />,
    title: "4. Consult Your AI Mentor",
    content: "Stuck on a career decision? Open the AI Mentor chat to get advice on interview preparation, salary negotiation, or choosing the right tech stack.",
    tip: "Ask 'How can I prepare for a Senior Developer interview?'"
  },
  {
    icon: <LayoutDashboard className="w-8 h-8 text-pink-400" />,
    title: "5. Track Your Progress",
    content: "Use the Smart Dashboard to save jobs you're interested in and monitor your application status. You'll see your overall career health score update in real-time.",
    tip: "Keep your saved jobs updated to get better personalized suggestions."
  }
];

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-[#030014] text-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">User <span className="text-gradient">Guide</span></h1>
            <p className="text-gray-400 text-lg">Everything you need to know to master HireAI and land your dream job.</p>
          </motion.div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <CheckCircle2 className="w-24 h-24" />
                </div>
                
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                  {step.icon}
                </div>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">{step.title}</h2>
                  <p className="text-gray-400 leading-relaxed mb-6">{step.content}</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-purple-300">
                    <span className="text-purple-500 font-bold uppercase tracking-wider">Pro Tip:</span>
                    {step.tip}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center glass-card p-12 border border-purple-500/30"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Launch Your Career?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">Join thousands of professionals using AI to navigate the modern job market with confidence.</p>
            <Link 
              href="/auth/signin"
              className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-bold text-lg hover:scale-105 transition-transform"
            >
              Get Started Now <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
