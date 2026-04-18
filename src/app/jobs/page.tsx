"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, IndianRupee, Building2, Terminal } from "lucide-react";
import axios from "axios";

interface Job {
  title: string;
  salary: string;
  skills: string[];
  companies: string[];
}

export default function JobsPage() {
  const [skills, setSkills] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Job[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skills) return;
    
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/jobs/search", { skills });
      setResults(data.jobs);
    } catch (error) {
      console.error(error);
      // Fallback dummy data for visual feedback in case of error
      setResults([
        { title: 'Full Stack Developer', salary: '15 - 30 LPA', skills: ['React', 'Next.js', 'MongoDB'], companies: ['Zomato', 'Swiggy', 'Razorpay'] },
        { title: 'AI Engineer', salary: '20 - 45 LPA', skills: ['Python', 'TensorFlow', 'PyTorch'], companies: ['Reliance', 'Infosys', 'Wipro'] },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 px-6 pb-20">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 neon-text">AI Job Discovery</h1>
          <p className="text-gray-400">Tell us what you can do, and our AI will find where you belong.</p>
        </motion.div>

        <div className="glass-card p-2 mb-12">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input 
              type="text" 
              placeholder="Enter skills (e.g. React, Python, AWS)..." 
              className="flex-1 bg-transparent border-none focus:ring-0 px-6 py-4 placeholder:text-gray-600"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
            <button 
              disabled={isLoading}
              className="px-8 py-4 rounded-xl bg-purple-600 font-bold flex items-center gap-2 hover:bg-purple-700 disabled:opacity-50 transition-colors"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <Search />}
              Search
            </button>
          </form>
        </div>

        <div className="grid gap-6">
          <AnimatePresence mode="popLayout">
            {results.map((job, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card p-8 hover:border-blue-500/50 transition-all group"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {job.skills.map((s, i) => (
                        <span key={i} className="px-3 py-1 rounded-lg bg-white/5 text-xs text-blue-300 border border-white/5">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <IndianRupee className="w-4 h-4 text-green-400" />
                        {job.salary}
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-purple-400" />
                        {job.companies.join(", ")}
                      </div>
                    </div>
                  </div>
                  <button className="h-fit px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-bold transition-all">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
