import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useGetMe, useAdminLogout } from "@workspace/api-client-react";
import {
  LayoutDashboard,
  Image,
  Plane,
  Briefcase,
  Map,
  MessageSquareQuote,
  HelpCircle,
  Newspaper,
  Globe,
  Inbox,
  ClipboardCheck,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/hero", label: "Hero Slides", icon: Image },
  { href: "/admin/visas", label: "Visas", icon: Plane },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/tours", label: "Tours", icon: Map },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/embassy-updates", label: "Embassy Updates", icon: Globe },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/eligibility", label: "Eligibility Submissions", icon: ClipboardCheck },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const { data: user, isError, isLoading } = useGetMe();
  const logout = useAdminLogout();

  useEffect(() => {
    if (isError) setLocation("/admin/login");
  }, [isError, setLocation]);

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => setLocation("/admin/login"),
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-primary">
        <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <aside className="w-64 shrink-0 border-r border-white/10 bg-card flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full gold-gradient-bg flex items-center justify-center font-display font-bold text-black">NE</div>
            <div>
              <p className="font-display font-bold leading-none">New Euro</p>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const active = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/10">
          <div className="px-3 py-2 text-xs text-muted-foreground truncate">{user.email}</div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
