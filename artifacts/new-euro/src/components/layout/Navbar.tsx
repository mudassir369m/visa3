import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [location] = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ur' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ur' ? 'rtl' : 'ltr';
  };

  const navLinks = [
    { label: t("nav.home"), path: "/" },
    { 
      label: t("nav.visas"), 
      path: "/visa",
      dropdown: [
        { label: "UK", path: "/visa/uk" },
        { label: "USA", path: "/visa/usa" },
        { label: "Canada", path: "/visa/canada" },
        { label: "Australia", path: "/visa/australia" },
        { label: "Turkey", path: "/visa/turkey" },
        { label: "Schengen", path: "/visa/schengen" },
      ]
    },
    { 
      label: t("nav.services"), 
      path: "/services",
      dropdown: [
        { label: "Air Ticketing", path: "/services#air" },
        { label: "Hotel Booking", path: "/services#hotel" },
        { label: "Travel Insurance", path: "/services#insurance" },
        { label: "Tour Packages", path: "/tours" },
      ]
    },
    { label: t("nav.tours"), path: "/tours" },
    { label: t("nav.about"), path: "/about" },
    { label: t("nav.contact"), path: "/contact" },
  ];

  return (
    <motion.nav 
      initial={false}
      animate={{ 
        height: isScrolled ? "56px" : "72px",
        backgroundColor: isScrolled ? "rgba(10, 26, 51, 0.7)" : "rgba(10, 26, 51, 0.4)"
      }}
      className="sticky top-0 z-50 w-full border-b border-white/8 backdrop-blur-2xl transition-colors duration-300"
    >
      <div className="container h-full flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 relative z-50 group">
          <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center bg-card relative overflow-hidden">
            <div className="absolute inset-0 gold-gradient-bg opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <span className="font-display font-bold text-lg gold-gradient-text tracking-tighter">NE</span>
          </div>
          <div className="hidden sm:flex flex-col -gap-1">
            <span className="font-display font-bold text-lg leading-none tracking-tight">New Euro</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none">Consultants</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link, i) => (
            link.dropdown ? (
              <DropdownMenu key={i}>
                <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary transition-colors outline-none cursor-pointer">
                  {link.label} <ChevronDown className="w-3 h-3 opacity-70" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="glass-card bg-card/90">
                  {link.dropdown.map((sub, j) => (
                    <DropdownMenuItem key={j} className="cursor-pointer hover:bg-white/5" asChild>
                      <Link href={sub.path}>{sub.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link key={i} href={link.path} className={`transition-colors hover:text-primary ${location === link.path ? 'text-primary' : 'text-foreground/90'}`}>
                {link.label}
              </Link>
            )
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={toggleLanguage} className="text-xs font-semibold px-2 py-1 border border-white/10 rounded hover:bg-white/5 transition-colors">
            {i18n.language === 'en' ? 'اردو' : 'EN'}
          </button>
          
          <Button asChild variant="default" className="gold-gradient-bg text-black font-semibold border-none hover:shadow-glow-gold transition-all duration-300 transform hover:-translate-y-0.5 rounded-sm">
            <Link href="/eligibility-check">{t("nav.free_consultation")}</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden relative z-50 p-2 text-foreground"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[56px] z-40 bg-background/98 backdrop-blur-3xl flex flex-col p-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-6 mt-4">
              {navLinks.map((link, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col gap-2"
                >
                  <Link href={link.dropdown ? "#" : link.path} onClick={() => !link.dropdown && setIsMobileOpen(false)} className="text-2xl font-display font-medium">
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <div className="pl-4 flex flex-col gap-3 border-l border-white/10 mt-2">
                      {link.dropdown.map((sub, j) => (
                        <Link key={j} href={sub.path} onClick={() => setIsMobileOpen(false)} className="text-lg text-muted-foreground">
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            
            <div className="mt-auto pt-8 flex flex-col gap-4">
              <button onClick={toggleLanguage} className="w-full py-3 border border-white/10 rounded-sm hover:bg-white/5 transition-colors font-medium">
                Switch to {i18n.language === 'en' ? 'Urdu' : 'English'}
              </button>
              <Button asChild size="lg" className="w-full gold-gradient-bg text-black font-semibold rounded-sm">
                <Link href="/eligibility-check">{t("nav.free_consultation")}</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}