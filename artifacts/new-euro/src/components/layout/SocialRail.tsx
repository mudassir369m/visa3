import { RiWhatsappFill, RiPhoneFill, RiInstagramLine, RiTiktokFill, RiYoutubeFill, RiFacebookFill } from 'react-icons/ri';

export default function SocialRail() {
  const links = [
    { icon: RiWhatsappFill, label: 'WhatsApp', href: 'https://wa.me/923145352222', color: 'text-[#25D366]' },
    { icon: RiPhoneFill, label: 'Call Us', href: 'tel:+923145352222', color: 'text-primary' },
    { icon: RiInstagramLine, label: 'Instagram', href: 'https://instagram.com/neweuroconsultants', color: 'text-pink-500' },
    { icon: RiTiktokFill, label: 'TikTok', href: 'https://tiktok.com/@worldofmustafa', color: 'text-white' },
    { icon: RiYoutubeFill, label: 'YouTube', href: 'https://youtube.com/@neweuroconsultants', color: 'text-red-500' },
    { icon: RiFacebookFill, label: 'Facebook', href: 'https://facebook.com/worldofmustafa', color: 'text-blue-500' },
  ];

  return (
    <div className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 flex-col gap-2 p-2 z-40 bg-card/50 backdrop-blur-md border-l border-y border-white/5 rounded-l-2xl">
      {links.map((item, i) => (
        <a 
          key={i}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        >
          <item.icon className={`w-5 h-5 ${item.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
          <span className="absolute right-full mr-4 px-2 py-1 bg-card border border-white/10 rounded text-xs whitespace-nowrap opacity-0 -translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            {item.label}
          </span>
        </a>
      ))}
    </div>
  );
}