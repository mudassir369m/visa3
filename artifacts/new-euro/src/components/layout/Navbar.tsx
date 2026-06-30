import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-display font-bold sm:inline-block gold-gradient-text">
              New Euro
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-primary">Home</Link>
            <Link href="/services" className="transition-colors hover:text-primary">Services</Link>
            <Link href="/tours" className="transition-colors hover:text-primary">Tours</Link>
            <Link href="/about" className="transition-colors hover:text-primary">About</Link>
            <Link href="/contact" className="transition-colors hover:text-primary">Contact</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="default" className="gold-gradient-bg text-primary-foreground font-semibold border-none">
            Free Consultation
          </Button>
        </div>
      </div>
    </nav>
  );
}
