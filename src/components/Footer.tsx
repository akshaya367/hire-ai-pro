import { Bot, Mail, Globe, User, Send } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 pt-24 pb-12 overflow-hidden bg-[#030014] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center group-hover:rotate-12 transition-transform">
                <Bot className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight">Hire<span className="text-purple-500">AI</span></span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering the next generation of talent in India with state-of-the-art AI career tools.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                <Globe className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                <Send className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/guide" className="hover:text-purple-400 transition-colors">User Guide</Link></li>
              <li><Link href="/jobs" className="hover:text-purple-400 transition-colors">Job Search</Link></li>
              <li><Link href="/analyzer" className="hover:text-purple-400 transition-colors">Resume Analyzer</Link></li>
              <li><Link href="/chat" className="hover:text-purple-400 transition-colors">AI Career Mentor</Link></li>
              <li><Link href="/dashboard" className="hover:text-purple-400 transition-colors">Smart Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-purple-400 transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-purple-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-purple-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Stay Updated</h4>
            <p className="text-sm text-gray-400 mb-4">Get the latest career tips and job openings.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email address"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 focus:ring-2 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-600 outline-none"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 transition-colors">
                <Mail className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} HireAI. All rights reserved. Built with ❤️ for India.
          </p>
        </div>
      </div>
    </footer>
  );
}
