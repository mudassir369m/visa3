import { Instagram, Facebook, Youtube, Phone, MessageCircle } from "lucide-react";
import { Link } from "wouter";

export default function SocialRail() {
  const socials = [
    { icon: <MessageCircle className="w-5 h-5" />, label: "WhatsApp", href: "https://wa.me/923145352222" },
    { icon: <Phone className="w-5 h-5" />, label: "Call Us", href: "tel:+923145352222" },
    { icon: <Instagram className="w-5 h-5" />, label: "Instagram", href: "#" },
    { icon: <Facebook className="w-5 h-5" />, label: "Facebook", href: "#" },
    { icon: <Youtube className="w-5 h-5" />, label: "YouTube", href: "#" },
  ];

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2 p-2">
      {socials.map((social, i) => (
        <a 
          key={i}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 bg-card border border-border rounded-l-md flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all group relative"
        >
          {social.icon}
          <span className="absolute right-full mr-2 px-2 py-1 bg-card border border-border text-xs rounded opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap">
            {social.label}
          </span>
        </a>
      ))}
    </div>
  );
}
