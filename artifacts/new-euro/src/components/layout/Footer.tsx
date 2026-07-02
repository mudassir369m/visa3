import { Link } from "wouter";
import { RiInstagramLine, RiTiktokFill, RiYoutubeFill, RiFacebookFill, RiWhatsappFill } from 'react-icons/ri';

export default function Footer() {
  return (
    <footer className="relative bg-card border-t border-white/10 overflow-hidden pt-16 pb-8">
      {/* Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-5">
        <span className="font-display text-[15vw] font-bold whitespace-nowrap text-transparent" style={{ WebkitTextStroke: '2px white' }}>
          NEW EURO
        </span>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Col 1 */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center bg-background">
                <span className="font-display font-bold text-lg gold-gradient-text tracking-tighter">NE</span>
              </div>
              <span className="font-display font-bold text-xl">New Euro Consultants</span>
            </div>
            <p className="text-muted-foreground text-sm">
              A Step Before Embassy.<br/>
              18 years of excellence in premium visa processing, ticketing, and tours.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/neweuroconsultants" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"><RiInstagramLine className="w-5 h-5" /></a>
              <a href="https://tiktok.com/@worldofmustafa" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"><RiTiktokFill className="w-5 h-5" /></a>
              <a href="https://facebook.com/worldofmustafa" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"><RiFacebookFill className="w-5 h-5" /></a>
              <a href="https://youtube.com/@neweuroconsultants" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"><RiYoutubeFill className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-6">
            <h4 className="font-display font-bold text-lg">Visas</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/visa/uk" className="hover:text-primary transition-colors">UK Visa</Link></li>
              <li><Link href="/visa/usa" className="hover:text-primary transition-colors">USA Visa</Link></li>
              <li><Link href="/visa/canada" className="hover:text-primary transition-colors">Canada Visa</Link></li>
              <li><Link href="/visa/australia" className="hover:text-primary transition-colors">Australia Visa</Link></li>
              <li><Link href="/visa/turkey" className="hover:text-primary transition-colors">Turkey Visa</Link></li>
              <li><Link href="/visa/schengen" className="hover:text-primary transition-colors">Schengen Visa</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-6">
            <h4 className="font-display font-bold text-lg">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/why-us" className="hover:text-primary transition-colors">Why Choose Us</Link></li>
              <li><Link href="/process" className="hover:text-primary transition-colors">Our Process</Link></li>
              <li><Link href="/success-stories" className="hover:text-primary transition-colors">Success Stories</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-6">
            <h4 className="font-display font-bold text-lg">Visit Us</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary mt-0.5">📍</span>
                <span>Office No. 17-18, 1st Floor, Lord Trade Centre, F-11 Markaz, Islamabad</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary mt-0.5">🗓️</span>
                <span>Mon–Fri: 9:00 AM – 4:00 PM<br/>Sat–Sun: Closed</span>
              </li>
              <li className="flex gap-2 items-center">
                <span className="text-primary">☎️</span>
                <a href="tel:+923145352222" className="hover:text-primary transition-colors">+92 314 535 2222</a>
              </li>
              <li className="flex gap-2 items-center">
                <RiWhatsappFill className="text-[#25D366]" />
                <a href="https://wa.me/923145352222" className="hover:text-primary transition-colors">WhatsApp Us</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} New Euro Consultants. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}