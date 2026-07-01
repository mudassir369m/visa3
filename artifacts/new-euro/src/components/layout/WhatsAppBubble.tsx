import { motion } from 'framer-motion';
import { RiWhatsappFill } from 'react-icons/ri';

export default function WhatsAppBubble() {
  return (
    <div className="fixed bottom-6 right-6 z-50 lg:hidden">
      <motion.a
        href="https://wa.me/923145352222"
        target="_blank"
        rel="noopener noreferrer"
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg ring-2 ring-offset-2 ring-offset-background ring-primary hover:scale-110 transition-transform"
      >
        <RiWhatsappFill className="w-8 h-8 text-white" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-background"></span>
        </span>
      </motion.a>
    </div>
  );
}