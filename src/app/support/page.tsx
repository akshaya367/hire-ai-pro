"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { MessageSquare, Phone, ShieldCheck, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
  return (
    <div className="min-h-screen pt-32 px-6 pb-20">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6 neon-text">AI Support Center</h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Get instant help from our AI agents via chat or a quick voice call.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Chat Support */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="glass-card p-10 flex flex-col items-center text-center group"
          >
            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 ring-1 ring-purple-500/50 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all">
              <MessageSquare className="w-8 h-8 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Smart Chat Support</h2>
            <p className="text-gray-400 mb-8">Instant answers for login issues, account settings, and platform features.</p>
            <Link href="/chat" className="w-full py-4 rounded-xl bg-purple-600 font-bold hover:bg-purple-700 transition-all flex items-center justify-center gap-2">
              Start Chat <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Voice Support */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="glass-card p-10 flex flex-col items-center text-center group"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 ring-1 ring-blue-500/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all">
              <Phone className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4">AI Voice Agent</h2>
            <p className="text-gray-400 mb-8">Need a call? Our AI agent can help you resolve issues over the phone in seconds.</p>
            <Link href="/support/voice" className="w-full py-4 rounded-xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              Call Support <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/2 flex items-center gap-4">
            <ShieldCheck className="text-green-400" />
            <span className="text-sm text-gray-400 text-left">24/7 Monitoring & High Availability</span>
          </div>
          <div className="p-6 rounded-2xl bg-white/2 flex items-center gap-4">
            <Mail className="text-blue-400" />
            <span className="text-sm text-gray-400 text-left">support@hireaipro.com</span>
          </div>
          <div className="p-6 rounded-2xl bg-white/2 flex items-center gap-4">
            <MessageSquare className="text-purple-400" />
            <span className="text-sm text-gray-400 text-left">Average response time: 2s</span>
          </div>
        </div>
      </div>
    </div>
  );
}
