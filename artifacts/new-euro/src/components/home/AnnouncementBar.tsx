import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hidden = sessionStorage.getItem('announcement-hidden');
    if (hidden === 'true') {
      setIsVisible(false);
    }
  }, []);

  const hide = () => {
    setIsVisible(false);
    sessionStorage.setItem('announcement-hidden', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="relative h-10 w-full gold-gradient-bg flex items-center overflow-hidden z-[60]">
      <div className="absolute inset-0 flex items-center whitespace-nowrap animate-[marquee_20s_linear_infinite] hover:[animation-play-state:paused]">
        <span className="text-black font-medium text-sm px-4">
          🛂 Free Eligibility Check · ☎️ +92 314 535 2222 · 📍 F-11 Markaz Islamabad · ⭐ 18 Years of Excellence · ✈️ UK • USA • Canada • Australia • Turkey • Schengen
        </span>
        <span className="text-black font-medium text-sm px-4">
          🛂 Free Eligibility Check · ☎️ +92 314 535 2222 · 📍 F-11 Markaz Islamabad · ⭐ 18 Years of Excellence · ✈️ UK • USA • Canada • Australia • Turkey • Schengen
        </span>
      </div>
      <button 
        onClick={hide}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-black hover:bg-black/10 rounded-full transition-colors z-10"
        aria-label="Close announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}