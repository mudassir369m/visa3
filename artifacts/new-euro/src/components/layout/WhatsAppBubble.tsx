import { MessageCircle } from "lucide-react";

export default function WhatsAppBubble() {
  return (
    <a 
      href="https://wa.me/923145352222"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-3"
    >
      <span className="bg-card px-3 py-1.5 rounded-full text-xs font-medium border border-border shadow-lg opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none">
        Online now
      </span>
      <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform relative border-2 border-primary/50">
        <div className="absolute inset-0 rounded-full animate-ping bg-green-500/30"></div>
        <MessageCircle className="w-7 h-7 relative z-10" />
      </div>
    </a>
  );
}
