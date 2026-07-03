import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import React, { Suspense } from "react";
import { ThemeProvider } from "@/lib/theme";
import CustomCursor from "@/components/layout/CustomCursor";
import LenisProvider from "@/components/layout/LenisProvider";
import SocialRail from "@/components/layout/SocialRail";
import WhatsAppBubble from "@/components/layout/WhatsAppBubble";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import EligibilityCheck from "@/pages/EligibilityCheck";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";

// Admin CRUD Pages
const AdminHero = React.lazy(() => import("@/pages/admin/Hero"));
const AdminVisas = React.lazy(() => import("@/pages/admin/Visas"));
const AdminServices = React.lazy(() => import("@/pages/admin/Services"));
const AdminTours = React.lazy(() => import("@/pages/admin/Tours"));
const AdminTestimonials = React.lazy(() => import("@/pages/admin/Testimonials"));
const AdminFaqs = React.lazy(() => import("@/pages/admin/Faqs"));
const AdminBlog = React.lazy(() => import("@/pages/admin/Blog"));
const AdminEmbassyUpdates = React.lazy(() => import("@/pages/admin/EmbassyUpdates"));
const AdminLeads = React.lazy(() => import("@/pages/admin/Leads"));
const AdminEligibility = React.lazy(() => import("@/pages/admin/Eligibility"));
const AdminSettings = React.lazy(() => import("@/pages/admin/Settings"));
const AdminNewsletter = React.lazy(() => import("@/pages/admin/Newsletter"));
const AdminUsers = React.lazy(() => import("@/pages/admin/Users"));
const AdminAnalytics = React.lazy(() => import("@/pages/admin/Analytics"));
const AdminSuccessStories = React.lazy(() => import("@/pages/admin/SuccessStories"));
const AdminGallery = React.lazy(() => import("@/pages/admin/Gallery"));
const AdminTeam = React.lazy(() => import("@/pages/admin/Team"));

// Lazy Pages
const About = React.lazy(() => import("@/pages/About"));
const Contact = React.lazy(() => import("@/pages/Contact"));
const Services = React.lazy(() => import("@/pages/Services"));
const Tours = React.lazy(() => import("@/pages/Tours"));
const FAQ = React.lazy(() => import("@/pages/FAQ"));
const WhyUs = React.lazy(() => import("@/pages/WhyUs"));
const Process = React.lazy(() => import("@/pages/Process"));
const SuccessStories = React.lazy(() => import("@/pages/SuccessStories"));
const Blog = React.lazy(() => import("@/pages/Blog"));
const BlogPost = React.lazy(() => import("@/pages/BlogPost"));
const Gallery = React.lazy(() => import("@/pages/Gallery"));
const Privacy = React.lazy(() => import("@/pages/Privacy"));
const Terms = React.lazy(() => import("@/pages/Terms"));
const TourDetail = React.lazy(() => import("@/pages/TourDetail"));

// Service sub-pages
const AirTicketing = React.lazy(() => import("@/pages/services/AirTicketing"));
const HotelBooking = React.lazy(() => import("@/pages/services/HotelBooking"));
const TravelInsurance = React.lazy(() => import("@/pages/services/TravelInsurance"));

// Visa Pages
const VisaOverview = React.lazy(() => import("@/pages/visa/Overview"));
const UKVisa = React.lazy(() => import("@/pages/visa/UK"));
const USAVisa = React.lazy(() => import("@/pages/visa/USA"));
const CanadaVisa = React.lazy(() => import("@/pages/visa/Canada"));
const AustraliaVisa = React.lazy(() => import("@/pages/visa/Australia"));
const TurkeyVisa = React.lazy(() => import("@/pages/visa/Turkey"));
const SchengenVisa = React.lazy(() => import("@/pages/visa/Schengen"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Suspense fallback={<div className="h-[100dvh] w-full flex items-center justify-center bg-background text-primary">Loading...</div>}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/eligibility-check" component={EligibilityCheck} />

        {/* Public pages */}
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/services" component={Services} />
        <Route path="/tours" component={Tours} />
        <Route path="/tours/:id" component={TourDetail} />
        <Route path="/faq" component={FAQ} />
        <Route path="/why-us" component={WhyUs} />
        <Route path="/process" component={Process} />
        <Route path="/success-stories" component={SuccessStories} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />

        {/* Service sub-pages */}
        <Route path="/services/air-ticketing" component={AirTicketing} />
        <Route path="/services/hotel-booking" component={HotelBooking} />
        <Route path="/services/travel-insurance" component={TravelInsurance} />

        {/* Visa pages */}
        <Route path="/visa" component={VisaOverview} />
        <Route path="/visa/uk" component={UKVisa} />
        <Route path="/visa/usa" component={USAVisa} />
        <Route path="/visa/canada" component={CanadaVisa} />
        <Route path="/visa/australia" component={AustraliaVisa} />
        <Route path="/visa/turkey" component={TurkeyVisa} />
        <Route path="/visa/schengen" component={SchengenVisa} />

        {/* Admin Routes — /admin redirects to dashboard */}
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route path="/admin">{() => <Redirect to="/admin/dashboard" />}</Route>
        <Route path="/admin/hero" component={AdminHero} />
        <Route path="/admin/visas" component={AdminVisas} />
        <Route path="/admin/services" component={AdminServices} />
        <Route path="/admin/tours" component={AdminTours} />
        <Route path="/admin/testimonials" component={AdminTestimonials} />
        <Route path="/admin/success-stories" component={AdminSuccessStories} />
        <Route path="/admin/faqs" component={AdminFaqs} />
        <Route path="/admin/blog" component={AdminBlog} />
        <Route path="/admin/embassy-updates" component={AdminEmbassyUpdates} />
        <Route path="/admin/leads" component={AdminLeads} />
        <Route path="/admin/eligibility" component={AdminEligibility} />
        <Route path="/admin/newsletter" component={AdminNewsletter} />
        <Route path="/admin/users" component={AdminUsers} />
        <Route path="/admin/analytics" component={AdminAnalytics} />
        <Route path="/admin/gallery" component={AdminGallery} />
        <Route path="/admin/team" component={AdminTeam} />
        <Route path="/admin/settings" component={AdminSettings} />

        {/* Fallback */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LenisProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <CustomCursor />
              <SocialRail />
              <WhatsAppBubble />
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      </LenisProvider>
    </ThemeProvider>
  );
}

export default App;