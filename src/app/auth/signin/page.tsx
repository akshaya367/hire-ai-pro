"use client";

import { signIn } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Github, Chrome, Bot } from "lucide-react";

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <Navbar />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-card p-10 text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-8 shadow-lg shadow-purple-500/20">
          <Bot className="text-white w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Join HireAI</h1>
        <p className="text-gray-400 mb-10">Sign in to unlock AI-powered career growth.</p>

        <div className="space-y-4">
          <button 
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full py-4 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-3 hover:bg-purple-50 transition-all border border-transparent"
          >
            <Chrome className="w-5 h-5" />
            Continue with Google
          </button>
          
          <button 
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            className="w-full py-4 rounded-xl bg-white/5 border border-white/10 font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
          >
            <Github className="w-5 h-5" />
            Continue with GitHub
          </button>
        </div>

        <p className="mt-10 text-xs text-gray-500 leading-relaxed px-6">
          By continuing, you agree to our Terms of Service and Privacy Policy. 
          We use your data only to improve your job search experience.
        </p>
      </motion.div>
    </div>
  );
}
