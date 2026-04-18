"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { Bot, LogOut, User, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-card px-6 py-3">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Bot className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">Hire<span className="text-purple-500">AI</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/jobs" className="text-sm font-medium hover:text-purple-400 transition-colors">Find Jobs</Link>
          <Link href="/analyzer" className="text-sm font-medium hover:text-purple-400 transition-colors">Resume AI</Link>
          <Link href="/support" className="text-sm font-medium hover:text-purple-400 transition-colors">Support</Link>
          <Link href="/guide" className="text-sm font-medium hover:text-purple-400 transition-colors">Guide</Link>
          {session ? (
            <div className="flex items-center gap-4 border-l border-white/10 pl-8">
              <Link href="/dashboard" className="flex items-center gap-2 hover:text-purple-400 transition-colors">
                <User className="w-4 h-4" />
                <span className="text-sm">{session.user?.name}</span>
              </Link>
              <button 
                onClick={() => signOut()}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4 text-red-400" />
              </button>
            </div>
          ) : (
            <Link 
              href="/auth/signin"
              className="px-5 py-2 rounded-xl bg-white text-black text-sm font-semibold hover:bg-purple-50 transition-colors"
            >
              Get Started
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-2 glass-card p-4 flex flex-col gap-4"
        >
          <Link href="/jobs" onClick={() => setIsOpen(false)}>Find Jobs</Link>
          <Link href="/analyzer" onClick={() => setIsOpen(false)}>Resume AI</Link>
          <Link href="/support" onClick={() => setIsOpen(false)}>Support</Link>
          <Link href="/chat" onClick={() => setIsOpen(false)}>AI Mentor</Link>
          {session ? (
            <Link href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
          ) : (
            <Link href="/auth/signin" onClick={() => setIsOpen(false)}>Sign In</Link>
          )}
        </motion.div>
      )}
    </nav>
  );
}
