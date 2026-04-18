"use client";
import { motion } from "framer-motion";
import { Search, FileText, LayoutDashboard, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    icon: <Search className="w-8 h-8 text-purple-400" />,
    title: "AI Job Search",
    description: "Enter your skills and let our AI find the most relevant, high-paying roles for you in the Indian market.",
  },
  {
    icon: <FileText className="w-8 h-8 text-blue-400" />,
    title: "Resume Analyzer",
    description: "Upload your PDF resume to get an instant ATS score, missing skills detection, and detailed improvement tips.",
  },
  {
    icon: <LayoutDashboard className="w-8 h-8 text-emerald-400" />,
    title: "Smart Dashboard",
    description: "Track all your applications, saved jobs, and career progress in one beautiful, centralized dashboard.",
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-orange-400" />,
    title: "AI Career Mentor",
    description: "Chat with your personal career coach for interview prep, salary negotiation tips, and roadmap advice.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            How <span className="text-gradient">HireAI</span> Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Your complete AI-powered career growth system, built to help you land your dream role in record time.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 group hover:border-purple-500/50 transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-white/10 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 italic">"Before you start, you'll need to create an account or sign in with Google to save your progress."</h3>
            <Link 
              href="/auth/signin"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all text-lg"
            >
              Get Access Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
