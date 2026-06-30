import { useGetPublicStats, useListVisas, useListServices, useListTours, useListTestimonials, useListEmbassyUpdates, useListBlogPosts, useListFaqs, useGetSiteSettings } from "@workspace/api-client-react";
import { Link } from "wouter";

// Layout
import AnnouncementBar from "@/components/home/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SocialRail from "@/components/layout/SocialRail";
import WhatsAppBubble from "@/components/layout/WhatsAppBubble";

// Home Sections
import Hero from "@/components/home/Hero";
import StatsStrip from "@/components/home/StatsStrip";
import CountryCards from "@/components/home/CountryCards";
import ServicesRow from "@/components/home/ServicesRow";
import HowItWorks from "@/components/home/HowItWorks";
import EligibilityTeaser from "@/components/home/EligibilityTeaser";
import ToursCarousel from "@/components/home/ToursCarousel";
import SuccessStories from "@/components/home/SuccessStories";
import FaqAccordion from "@/components/home/FaqAccordion";
import EmbassyUpdates from "@/components/home/EmbassyUpdates";
import BlogPreview from "@/components/home/BlogPreview";
import OfficeMap from "@/components/home/OfficeMap";
import FinalCta from "@/components/home/FinalCta";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <AnnouncementBar />
      <Navbar />
      <SocialRail />
      <WhatsAppBubble />
      <main className="flex-1">
        <Hero />
        <StatsStrip />
        <CountryCards />
        <ServicesRow />
        <HowItWorks />
        <EligibilityTeaser />
        <ToursCarousel />
        <SuccessStories />
        <EmbassyUpdates />
        <BlogPreview />
        <FaqAccordion />
        <OfficeMap />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
