"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  Clock,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Mon', applications: 2 },
  { name: 'Tue', applications: 5 },
  { name: 'Wed', applications: 3 },
  { name: 'Thu', applications: 8 },
  { name: 'Fri', applications: 4 },
  { name: 'Sat', applications: 1 },
  { name: 'Sun', applications: 3 },
];

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-6 pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl font-bold mb-2">Welcome back, <span className="neon-text">{session?.user?.name}</span></h1>
            <p className="text-gray-400">Here's what's happening with your job search today.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex gap-4">
            <Link href="/jobs" className="px-6 py-3 rounded-xl bg-purple-600 text-sm font-bold hover:bg-purple-700 transition-all flex items-center gap-2">
              <Plus className="w-4 h-4" /> New Search
            </Link>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Jobs Applied", value: "24", icon: Briefcase, color: "text-blue-400" },
            { label: "Profile Views", value: "142", icon: TrendingUp, color: "text-green-400" },
            { label: "Interviews", value: "3", icon: MessageSquare, color: "text-purple-400" },
            { label: "ATS Score", value: "82/100", icon: FileText, color: "text-pink-400" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-xs text-gray-500">+12% from last week</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium">{stat.label}</h3>
              <p className="text-3xl font-bold mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Applications Chart */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 glass-card p-8"
          >
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <TrendingUp className="text-purple-500" />
              Application Trends
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                    itemStyle={{ color: '#a855f7' }}
                  />
                  <Area type="monotone" dataKey="applications" stroke="#a855f7" fillOpacity={1} fill="url(#colorApps)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8"
          >
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <Clock className="text-blue-500" />
              Recent Activity
            </h3>
            <div className="space-y-6">
              {[
                { activity: "Applied to Google", time: "2 hours ago", type: "job" },
                { activity: "Updated Resume", time: "5 hours ago", type: "file" },
                { activity: "Interview with Zomato", time: "1 day ago", type: "chat" }
              ].map((act, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{act.activity}</p>
                    <p className="text-xs text-gray-500 mt-1">{act.time}</p>
                  </div>
                </div>
              ))}
              <button className="w-full py-4 mt-6 rounded-xl bg-white/5 border border-white/10 text-sm font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                View All Activity <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  );
}
