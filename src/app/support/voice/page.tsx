"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, PhoneCall, Loader2, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import axios from "axios";

export default function VoiceSupportPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState<"idle" | "calling" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCall = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;

    setStatus("calling");
    setErrorMessage("");

    try {
      await axios.post("/api/voice/call", { phoneNumber });
      setStatus("success");
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.response?.data?.error || "Failed to initiate call. Check your Twilio config.");
    }
  };

  return (
    <div className="min-h-screen pt-32 px-6 pb-20">
      <Navbar />
      <div className="max-w-2xl mx-auto">
        <Link href="/support" className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Support
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-12 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-8 ring-1 ring-blue-500/50">
            <PhoneCall className={`w-10 h-10 ${status === 'calling' ? 'text-blue-400 animate-pulse' : 'text-blue-500'}`} />
          </div>

          <h1 className="text-3xl font-bold mb-4">AI Voice Assistant</h1>
          <p className="text-gray-400 mb-10">
            Enter your phone number (including country code) and our AI agent will call you instantly to help with any platform issues.
          </p>

          <AnimatePresence mode="wait">
            {status === "idle" || status === "calling" ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleCall} 
                className="space-y-6"
              >
                <div className="relative">
                  <input 
                    type="tel" 
                    placeholder="+91 99999 99999"
                    disabled={status === "calling"}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-xl text-center focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-700"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <button 
                  disabled={status === "calling" || !phoneNumber}
                  className="w-full py-5 rounded-2xl bg-blue-600 font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {status === "calling" ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" /> Calling you...
                    </>
                  ) : (
                    "Receive Support Call"
                  )}
                </button>
              </motion.form>
            ) : status === "success" ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="flex flex-col items-center gap-4 text-green-400">
                  <CheckCircle2 className="w-16 h-16" />
                  <h3 className="text-2xl font-bold">Call Initiated!</h3>
                </div>
                <p className="text-gray-400">Your phone should be ringing right now. Please answer to speak with our AI agent.</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="w-full py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                >
                  Make another call
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="flex flex-col items-center gap-4 text-red-400">
                  <AlertCircle className="w-16 h-16" />
                  <h3 className="text-2xl font-bold">Call Failed</h3>
                </div>
                <p className="text-gray-400">{errorMessage}</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="w-full py-4 rounded-xl bg-blue-600 font-bold hover:bg-blue-700 transition-all"
                >
                  Try Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-12 text-xs text-gray-500 italic">
            Note: This is an AI-powered voice call. Standard messaging and data rates may apply.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
