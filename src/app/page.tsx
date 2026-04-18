import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Footer Section */}
      <footer className="py-12 border-t border-white/5 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 HireAI. Powered by Grok AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
