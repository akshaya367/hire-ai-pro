"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Briefcase, Zap, Shield } from "lucide-react";
import Link from "next/link";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center"
        >
          <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-purple-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Career Revolution</span>
          </motion.div>
          
          <motion.h1 variants={item} className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Landing Your Dream Job <br />
            <span className="neon-text">Just Got Smarter.</span>
          </motion.h1>
          
          <motion.p variants={item} className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Harness the power of AI to analyze your resume, optimize your profile, and connect with top Indian companies in seconds.
          </motion.p>
          
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/jobs" className="group w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all">
              Start Searching
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/analyzer" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-colors">
              Analyze Resume
            </Link>
          </motion.div>

          {/* Feature Grid */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24"
          >
            {[
              { icon: Briefcase, title: "Smart Matching", desc: "Our AI matches your specific skills with thousands of live openings." },
              { icon: Zap, title: "Instant Feedback", desc: "Get an real-time ATS score and improvement suggestions for your resume." },
              { icon: Shield, title: "Direct Connect", desc: "Verified company listings and direct application pathways for India-hub." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={item}
                className="glass-card p-8 text-left hover:border-purple-500/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="text-purple-500 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
