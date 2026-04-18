"use client";

import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Loader2, CheckCircle2, AlertCircle, Sparkles, TrendingUp } from "lucide-react";
import { useDropzone } from 'react-dropzone';
import axios from "axios";

interface Analysis {
  score: number;
  improvements: string[];
  missingSkills: string[];
  industryFit: string;
}

export default function AnalyzerPage() {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsAnalyzing(true);
    setError("");
    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await axios.post("/api/analyze", formData);
      setAnalysis(data.analysis);
    } catch (err: any) {
      setError("Failed to analyze resume. Please try again.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false
  });

  return (
    <div className="min-h-screen pt-32 px-6 pb-20">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 neon-text">AI Resume Analyzer</h1>
          <p className="text-gray-400">Upload your resume and let AI give you a winning edge.</p>
        </motion.div>

        {!analysis && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full"
          >
            <div
              {...getRootProps()}
              className={`glass-card p-16 border-2 border-dashed transition-all cursor-pointer text-center
                ${isDragActive ? 'border-purple-500 bg-purple-500/10' : 'border-white/10 hover:border-purple-500/50'}`}
            >
              <input {...getInputProps()} />
              {isAnalyzing ? (
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
                  <p className="text-lg font-medium">Analyzing your potential...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-2">
                    <Upload className="w-8 h-8 text-purple-400" />
                  </div>
                  <p className="text-xl font-bold">Drag & drop your PDF resume</p>
                  <p className="text-gray-500">or click to browse files</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {analysis && (
          <AnimatePresence>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Score Header */}
              <div className="glass-card p-8 flex flex-col md:flex-row items-center gap-8 bg-gradient-to-br from-purple-900/10 to-blue-900/10">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                    <circle 
                      cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                      strokeDasharray={364.4} strokeDashoffset={364.4 * (1 - analysis.score / 100)}
                      className="text-purple-500"
                    />
                  </svg>
                  <span className="absolute text-3xl font-bold">{analysis.score}</span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold mb-2">ATS Quality Score</h2>
                  <p className="text-gray-400">Your resume is strong in {analysis.industryFit}. Here is how to make it perfect.</p>
                  <button onClick={() => setAnalysis(null)} className="mt-4 text-sm text-purple-400 hover:underline">Upload another</button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Improvements */}
                <div className="glass-card p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="text-green-400" />
                    <h3 className="text-xl font-bold">Key Improvements</h3>
                  </div>
                  <ul className="space-y-4">
                    {analysis.improvements.map((item, i) => (
                      <li key={i} className="flex gap-3 text-gray-400 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Missing Skills */}
                <div className="glass-card p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="text-yellow-400" />
                    <h3 className="text-xl font-bold">Missing Skills</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {analysis.missingSkills.map((skill, i) => (
                      <span key={i} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
