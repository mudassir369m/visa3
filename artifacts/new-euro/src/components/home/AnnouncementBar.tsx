import { useGetSiteSettings } from "@workspace/api-client-react";
import { useState } from "react";
import { X } from "lucide-react";

export default function AnnouncementBar() {
  const { data: settings } = useGetSiteSettings();
  const [isVisible, setIsVisible] = useState(true);

  if (!settings?.announcementBar || !isVisible) return null;

  return (
    <div className="relative gold-gradient-bg text-primary-foreground py-2 px-4 z-50">
      <div className="container mx-auto flex items-center justify-center relative">
        <p className="text-sm font-medium text-center truncate max-w-[90%]">
          {settings.announcementBar}
        </p>
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute right-0 hover:bg-black/10 rounded-full p-1 transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
