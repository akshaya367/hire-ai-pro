"use client";

import { signIn } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Bot, Globe, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SignIn() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-[#030014]">
      <Navbar />
      
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card w-full max-w-md p-8 md:p-10 border border-white/10"
        >
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to your AI career assistant</p>
          </div>

          <div className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <Link href="#" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            <button className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-purple-500/20 group">
              Sign In
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#030014] px-4 text-gray-500 font-medium">Or continue with</span>
              </div>
            </div>

            <button 
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full py-4 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-3 hover:bg-gray-100 transition-all border border-transparent"
            >
              <Globe className="w-5 h-5 text-purple-600" />
              Sign in with Google
            </button>
          </div>

          <p className="text-center mt-8 text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="#" className="text-purple-400 font-bold hover:text-purple-300 transition-colors underline underline-offset-4">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
