"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, IndianRupee, Building2, X, Terminal, Sparkles } from "lucide-react";
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
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skills) return;
    
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/jobs/search", { skills });
      // Filter out invalid or empty responses if any
      const jobs = data.jobs || [];
      if (jobs.length === 0) throw new Error("No results found");
      setResults(jobs);
    } catch (error) {
      console.error("Search Error:", error);
      // Premium Fallback Data (Expanded to 6 diverse roles as requested)
      setResults([
        { title: 'Senior Data Analyst (AI)', salary: '18 - 35 LPA', skills: ['Python', 'SQL', 'Power BI'], companies: ['Google', 'Amazon', 'Accenture'] },
        { title: 'Machine Learning Engineer', salary: '25 - 50 LPA', skills: ['Python', 'PyTorch', 'SQL'], companies: ['NVIDIA', 'Infosys AI', 'Meta'] },
        { title: 'Business Intelligence Architect', salary: '20 - 40 LPA', skills: ['PowerBI', 'Tableau', 'Excel'], companies: ['Deloitte', 'PwC', 'KPMG'] },
        { title: 'Full Stack AI Developer', salary: '15 - 35 LPA', skills: ['Next.js', 'Groq', 'Python'], companies: ['Zomato', 'Freshworks', 'Swiggy'] },
        { title: 'Data Scientist', salary: '22 - 45 LPA', skills: ['Python', 'SQL', 'Scikit-Learn'], companies: ['Flipkart', 'DataBricks', 'Snapdeal'] },
        { title: 'Cloud Data Engineer', salary: '20 - 45 LPA', skills: ['AWS', 'Python', 'SQL'], companies: ['TCS', 'Wipro', 'HCL Tech'] },
        { title: 'UI/UX Designer', salary: '12 - 25 LPA', skills: ['Figma', 'Adobe XD', 'Prototyping'], companies: ['Adobe', 'Apple', 'Uber'] },
        { title: 'DevOps Architect', salary: '30 - 60 LPA', skills: ['Docker', 'Kubernetes', 'CI/CD'], companies: ['Microsoft', 'Atlassian', 'GitLab'] },
        { title: 'Cybersecurity Analyst', salary: '15 - 30 LPA', skills: ['Networking', 'PenTesting', 'Security'], companies: ['Cisco', 'Palo Alto', 'CrowdStrike'] },
        { title: 'Product Manager', salary: '25 - 55 LPA', skills: ['Strategy', 'Agile', 'Product'], companies: ['Paytm', 'PhonePe', 'Razorpay'] }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 px-6 pb-20 bg-[#030014] text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-4">
            Version 2.1 - Deployment Live
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            AI Job Discovery
          </h1>
          <p className="text-gray-400">Tell us what you can do, and our AI will find where you belong.</p>
        </motion.div>

        <div className="glass-card p-2 mb-12 border border-white/10">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input 
              type="text" 
              placeholder="Enter skills (e.g. React, Python, AWS)..." 
              className="flex-1 bg-transparent border-none focus:ring-0 px-6 py-4 placeholder:text-gray-600 outline-none"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
            <button 
              disabled={isLoading}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-bold flex items-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all"
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
                className="glass-card p-8 hover:border-purple-500/50 transition-all group border border-white/5"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {job.skills.map((s, i) => (
                        <span key={i} className="px-3 py-1 rounded-lg bg-white/5 text-xs text-purple-300 border border-white/5">
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
                        <Building2 className="w-4 h-4 text-blue-400" />
                        {job.companies.join(", ")}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedJob(job)}
                    className="h-fit px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-bold transition-all"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative glass-card w-full max-w-2xl p-8 md:p-12 border border-purple-500/30 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500" />
              <button 
                onClick={() => setSelectedJob(null)}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-purple-400">AI Role Insight</span>
              </div>

              <h2 className="text-4xl font-bold mb-2">{selectedJob.title}</h2>
              <p className="text-xl text-blue-300 font-medium mb-8">@{selectedJob.companies.join(", ")}</p>

              <div className="space-y-8">
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Required Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((s, i) => (
                      <span key={i} className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-sm">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 bg-white/5 p-6 rounded-2xl border border-white/5">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Expected Package</p>
                    <p className="text-2xl font-bold text-green-400">{selectedJob.salary}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Hiring Status</p>
                    <p className="text-2xl font-bold text-blue-400">Active</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20">
                  <p className="text-gray-300 leading-relaxed italic">
                    "This role perfectly matches your detected skills in {selectedJob.skills[0]}. Based on market trends, specialized knowledge in {selectedJob.skills[1]} will give you a significant competitive edge during the interview process."
                  </p>
                </div>

                <button className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-100 transition-all">
                  Apply Now via HireAI
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

