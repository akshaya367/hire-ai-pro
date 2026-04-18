import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HireAI | Production-Ready AI Job Platform",
  description: "Accelerate your career with AI-powered job search and resume analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white selection:bg-purple-500/30`}>
        <Providers>
          <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px] animate-blob" />
            <div className="absolute top-[20%] right-[-5%] w-[35%] h-[35%] rounded-full bg-blue-900/20 blur-[120px] animate-blob delay-2000" />
            <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-pink-900/20 blur-[120px] animate-blob delay-4000" />
          </div>
          <main className="relative z-10">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
