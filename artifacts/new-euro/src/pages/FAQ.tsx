import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FaqAccordion from "@/components/home/FaqAccordion";

export default function FAQ() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-12">
        {/* We reuse the home page FAQ component since it already contains the detailed Q&As */}
        <FaqAccordion />
      </main>

      <Footer />
    </div>
  );
}