import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030014] text-white overflow-hidden">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Footer />
    </main>
  );
}
