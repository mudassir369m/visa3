import bcrypt from "bcryptjs";
import {
  db,
  pool,
  adminUsersTable,
  visasTable,
  servicesTable,
  toursTable,
  testimonialsTable,
  faqsTable,
  blogPostsTable,
  embassyUpdatesTable,
  heroSlidesTable,
  siteSettingsTable,
} from "@workspace/db";

async function seedAdminUser() {
  const email = process.env.ADMIN_EMAIL ?? "admin@neweuroconsultants.com";
  const password = process.env.ADMIN_PASSWORD ?? "ChangeMe!StrongPass2026";
  const existing = await db.select().from(adminUsersTable);
  if (existing.length > 0) {
    console.log(`Skipping admin user seed — ${existing.length} admin user(s) already exist.`);
    return;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await db.insert(adminUsersTable).values({ email, name: "S. Mustafa", passwordHash });
  console.log(`Seeded admin user: ${email}`);
}

async function seedVisas() {
  const existing = await db.select().from(visasTable);
  if (existing.length > 0) return console.log("Skipping visas seed — already seeded.");

  await db.insert(visasTable).values([
    {
      country: "United Kingdom",
      slug: "uk",
      flag: "🇬🇧",
      headline: "Your UK Visa, Done Right",
      description: "Expert preparation, flawless documentation, and priority appointment booking for all UK visa categories.",
      visaTypes: ["Standard Visitor", "Business", "Student Tier 4", "Spouse/Dependent"],
      processingDays: "15 - 20 Days",
      successRate: "98%",
      requirements: [
        "Valid Passport (6 months validity)",
        "Previous passports & travel history",
        "Bank statements (Last 6 months, signed & stamped)",
        "Account maintenance certificate",
        "Employment letter / Business registration NTN",
        "Tax returns (FBR) last 2 years",
        "Hotel & flight itinerary",
        "Ties to home country evidence",
      ],
      documents: ["Passport", "CNIC", "FRC", "Bank Statements", "Property Documents"],
      sortOrder: 1,
      published: true,
    },
    {
      country: "United States",
      slug: "usa",
      flag: "🇺🇸",
      headline: "Your USA Visa, Done Right",
      description: "Expert preparation for B1/B2 tourist, business, and family visit visa interviews at the US Embassy.",
      visaTypes: ["Tourist B1/B2", "Business", "Family"],
      processingDays: "45 Days",
      successRate: "95%",
      requirements: [
        "Valid Passport (6 months validity)",
        "DS-160 confirmation page",
        "Bank statements (Last 6 months)",
        "Employment letter / Business registration",
        "Property documents",
        "Interview preparation guidance",
      ],
      documents: ["Passport", "CNIC", "FRC", "Bank Statements"],
      sortOrder: 2,
      published: true,
    },
    {
      country: "Canada",
      slug: "canada",
      flag: "🇨🇦",
      headline: "Your Canada Visa, Done Right",
      description: "Expert preparation for tourist, super visa, and ETA applications with embassy-grade documentation.",
      visaTypes: ["Tourist", "Super Visa", "ETA"],
      processingDays: "30 Days",
      successRate: "96%",
      requirements: [
        "Valid Passport (6 months validity)",
        "Bank statements (Last 6 months)",
        "Employment letter / Business registration",
        "Travel history",
        "Ties to home country evidence",
      ],
      documents: ["Passport", "CNIC", "FRC", "Bank Statements"],
      sortOrder: 3,
      published: true,
    },
    {
      country: "Australia",
      slug: "australia",
      flag: "🇦🇺",
      headline: "Your Australia Visa, Done Right",
      description: "Expert preparation for tourist, business, and working holiday visa applications.",
      visaTypes: ["Tourist", "Business", "Working Holiday"],
      processingDays: "25 Days",
      successRate: "97%",
      requirements: [
        "Valid Passport (6 months validity)",
        "Bank statements (Last 6 months)",
        "Employment letter / Business registration",
        "Travel itinerary",
        "Ties to home country evidence",
      ],
      documents: ["Passport", "CNIC", "FRC", "Bank Statements"],
      sortOrder: 4,
      published: true,
    },
    {
      country: "Turkey",
      slug: "turkey",
      flag: "🇹🇷",
      headline: "Your Turkey Visa, Done Right",
      description: "Fast e-Visa and tourist visa processing for Turkey, often approved within 24-72 hours.",
      visaTypes: ["e-Visa", "Tourist"],
      processingDays: "3 Days",
      successRate: "99%",
      requirements: [
        "Valid Passport (6 months validity)",
        "Passport-size photo",
        "Confirmed flight itinerary",
        "Hotel booking confirmation",
      ],
      documents: ["Passport", "CNIC"],
      sortOrder: 5,
      published: true,
    },
    {
      country: "Schengen",
      slug: "schengen",
      flag: "🇪🇺",
      headline: "Your Schengen Visa, Done Right",
      description: "Expert preparation for tourist, business, and family visit visas across all Schengen member states.",
      visaTypes: ["Tourist", "Business", "Family"],
      processingDays: "15 Days",
      successRate: "97%",
      requirements: [
        "Valid Passport (6 months validity)",
        "Bank statements (Last 6 months)",
        "Schengen-approved travel insurance",
        "Confirmed flight itinerary",
        "Verified hotel bookings",
      ],
      documents: ["Passport", "CNIC", "FRC", "Bank Statements", "Travel Insurance"],
      sortOrder: 6,
      published: true,
    },
  ]);
  console.log("Seeded 6 visas.");
}

async function seedServices() {
  const existing = await db.select().from(servicesTable);
  if (existing.length > 0) return console.log("Skipping services seed — already seeded.");

  await db.insert(servicesTable).values([
    { title: "Air Ticketing", slug: "air-ticketing", description: "Best fares to 200+ destinations globally.", icon: "PlaneTakeoff", sortOrder: 1, published: true },
    { title: "Hotel Booking", slug: "hotel-booking", description: "Verified accommodations worldwide.", icon: "Hotel", sortOrder: 2, published: true },
    { title: "Travel Insurance", slug: "travel-insurance", description: "Schengen-approved medical coverage.", icon: "ShieldCheck", sortOrder: 3, published: true },
    { title: "Tour Packages", slug: "tours", description: "Curated Europe, Umrah, & Asia tours.", icon: "Map", sortOrder: 4, published: true },
  ]);
  console.log("Seeded 4 services.");
}

async function seedTours() {
  const existing = await db.select().from(toursTable);
  if (existing.length > 0) return console.log("Skipping tours seed — already seeded.");

  await db.insert(toursTable).values([
    { title: "Umrah Package", slug: "umrah-package", category: "Umrah", days: 8, nights: 7, price: "85000", originalPrice: "95000", inclusions: ["Visa", "Hotels", "Transport"], sortOrder: 1, published: true },
    { title: "Europe Explorer", slug: "europe-explorer", category: "Europe", days: 15, nights: 14, price: "350000", originalPrice: "400000", inclusions: ["Schengen", "Flights", "Guide"], sortOrder: 2, published: true },
    { title: "Turkey Discovery", slug: "turkey-discovery", category: "Turkey", days: 9, nights: 8, price: "120000", originalPrice: "145000", inclusions: ["Bosphorus", "Cappadocia", "Flights"], sortOrder: 3, published: true },
    { title: "UK Experience", slug: "uk-experience", category: "Europe", days: 11, nights: 10, price: "280000", originalPrice: "310000", inclusions: ["London", "Scotland", "Visa"], sortOrder: 4, published: true },
    { title: "Dubai Weekend", slug: "dubai-weekend", category: "Middle East", days: 5, nights: 4, price: "65000", originalPrice: "80000", inclusions: ["Desert Safari", "Visa", "Hotel"], sortOrder: 5, published: true },
    { title: "Bali Escape", slug: "bali-escape", category: "Asia", days: 9, nights: 8, price: "95000", originalPrice: "115000", inclusions: ["Resort", "Tours", "Flights"], sortOrder: 6, published: true },
  ]);
  console.log("Seeded 6 tour packages.");
}

async function seedTestimonials() {
  const existing = await db.select().from(testimonialsTable);
  if (existing.length > 0) return console.log("Skipping testimonials seed — already seeded.");

  await db.insert(testimonialsTable).values([
    { name: "Ali Hassan", country: "UK", visaType: "Student Visa", message: "Got my UK student visa in just 12 days! The team guided me perfectly on bank statements. Very professional.", rating: 5, status: "published" },
    { name: "Sana Tariq", country: "USA", visaType: "B1/B2 Visa", message: "I had a previous refusal, but New Euro rebuilt my case beautifully. The mock interviews gave me so much confidence.", rating: 5, status: "published" },
    { name: "Fahad M.", country: "Schengen", visaType: "Schengen Visa", message: "Zero hassle. They arranged the appointment, filled the forms, and booked the hotels. My family's Schengen visa was approved smoothly.", rating: 5, status: "published" },
    { name: "Zainab R.", country: "Canada", visaType: "Canada Visit", message: "Super transparent about their fees. No hidden charges. The portal to track documents is very helpful.", rating: 4, status: "published" },
    { name: "Usman A.", country: "Australia", visaType: "Australia Visa", message: "Best consultancy in F-11 Markaz. Mustafa bhai is very knowledgeable about current immigration laws.", rating: 5, status: "published" },
    { name: "Kamran K.", country: "Turkey", visaType: "Turkey E-Visa", message: "Got it in 24 hours. Excellent service for ticketing and hotel bookings as well.", rating: 5, status: "published" },
  ]);
  console.log("Seeded 6 testimonials.");
}

async function seedFaqs() {
  const existing = await db.select().from(faqsTable);
  if (existing.length > 0) return console.log("Skipping FAQs seed — already seeded.");

  await db.insert(faqsTable).values([
    { question: "How long does a UK visa take?", answer: "Typically, standard UK visit visas take 15-20 working days after biometrics. Priority services (at extra embassy cost) can reduce this to 5 working days.", sortOrder: 1 },
    { question: "What documents are needed for Schengen?", answer: "Standard requirements include a valid passport, bank statements (last 6 months), confirmed flight itinerary, verified hotel bookings, and Schengen-approved travel insurance. We provide a customized checklist based on your profile.", sortOrder: 2 },
    { question: "Do you guarantee visa approval?", answer: "No honest consultant guarantees approval, as the final decision rests solely with the visa officer. We guarantee embassy-grade application preparation, error-free documentation, and expert guidance to maximize your chances.", sortOrder: 3 },
    { question: "What are your consultation fees?", answer: "We offer a FREE initial eligibility assessment. If you proceed, our service charges vary depending on the visa category and complexity of the case. All fees are transparently discussed upfront—no hidden charges.", sortOrder: 4 },
    { question: "Can you help if I was previously refused?", answer: "Yes. Visa refusals are common. We specialize in analyzing refusal letters, addressing the visa officer's concerns, and preparing strong re-applications with necessary justification letters.", sortOrder: 5 },
    { question: "How do I start the process?", answer: "Simply click the 'Free Eligibility Check' button on this site, or send us a message on WhatsApp. One of our senior consultants will review your details and guide you on the next steps.", sortOrder: 6 },
  ]);
  console.log("Seeded 6 FAQs.");
}

async function seedBlogPosts() {
  const existing = await db.select().from(blogPostsTable);
  if (existing.length > 0) return console.log("Skipping blog posts seed — already seeded.");

  await db.insert(blogPostsTable).values([
    {
      title: "How to Build a Strong Bank Statement for Visas",
      slug: "strong-bank-statement-for-visas",
      excerpt: "Learn exactly what visa officers look for when assessing financial documents, and how to avoid the \"unexplained deposits\" rejection clause.",
      content: "Learn exactly what visa officers look for when assessing financial documents, and how to avoid the \"unexplained deposits\" rejection clause. Maintain a consistent balance for at least six months, avoid large unexplained lump-sum deposits, and keep your account statements signed and stamped by the bank.",
      category: "Guide",
      readTime: "5 min read",
      published: true,
    },
    {
      title: "5 Common Reasons for USA B1/B2 Refusals",
      slug: "usa-b1-b2-refusal-reasons",
      excerpt: "The most common reasons US consular officers cite when refusing tourist and business visa applications.",
      content: "Insufficient ties to home country, unclear travel purpose, weak financial documentation, prior overstays, and inconsistent interview answers are the top five reasons US consular officers cite when refusing B1/B2 applications.",
      category: "Tips",
      readTime: "4 min read",
      published: true,
    },
    {
      title: "Canada Super Visa vs. Regular Visit Visa",
      slug: "canada-super-visa-vs-visit-visa",
      excerpt: "Understand the key differences between Canada's Super Visa for parents/grandparents and the standard visitor visa.",
      content: "The Super Visa allows parents and grandparents of Canadian citizens or permanent residents to stay for up to two years per visit and is valid for up to 10 years, while the regular visitor visa typically permits stays of up to six months per entry.",
      category: "Guide",
      readTime: "6 min read",
      published: true,
    },
  ]);
  console.log("Seeded 3 blog posts.");
}

async function seedEmbassyUpdates() {
  const existing = await db.select().from(embassyUpdatesTable);
  if (existing.length > 0) return console.log("Skipping embassy updates seed — already seeded.");

  await db.insert(embassyUpdatesTable).values([
    { country: "United Kingdom", flag: "🇬🇧", headline: "UK Updates Student Visa Financial Requirements", summary: "The UK Home Office has announced new maintenance funds rules for international students applying for the Tier 4 visa." },
    { country: "Canada", flag: "🇨🇦", headline: "Canada Processing Times Reduced", summary: "IRCC has successfully cleared backlogs, reducing average processing times for visitor visas from Pakistan by 15 days." },
    { country: "Schengen", flag: "🇪🇺", headline: "Schengen Digital Visa Implementation", summary: "Select Schengen states have begun transitioning to a digital visa sticker system for short-stay tourist applications." },
  ]);
  console.log("Seeded 3 embassy updates.");
}

async function seedHeroSlide() {
  const existing = await db.select().from(heroSlidesTable);
  if (existing.length > 0) return console.log("Skipping hero slide seed — already seeded.");

  await db.insert(heroSlidesTable).values([
    {
      headline: "A Step Before Embassy.",
      subhead: "Premium visa consultancy for UK, USA, Canada, Australia, Turkey & Schengen. Real eligibility checks. No hidden fees. Embassy-grade documentation.",
      primaryCta: "Free Eligibility Check",
      primaryCtaLink: "/eligibility-check",
      secondaryCta: "Talk on WhatsApp",
      secondaryCtaLink: "https://wa.me/923145352222",
      overlayOpacity: 0.7,
      active: true,
      sortOrder: 1,
    },
  ]);
  console.log("Seeded 1 hero slide.");
}

async function seedSiteSettings() {
  const existing = await db.select().from(siteSettingsTable);
  if (existing.length > 0) return console.log("Skipping site settings seed — already seeded.");

  const defaults: Record<string, string> = {
    businessName: "New Euro Consultants",
    tagline: "A Step Before Embassy",
    phone: "+92 314 535 2222",
    whatsapp: "923145352222",
    email: "info@neweuroconsultants.com",
    address: "Office No. 17-18, 1st Floor, Lord Trade Centre, F-11 Markaz, Islamabad, Pakistan",
    hours: "Mon–Fri 9:00 AM – 4:00 PM (Sat & Sun closed)",
    instagramHandle: "neweuroconsultants",
    instagramHandle2: "worldofmustafa1",
    tiktokHandle: "worldofmustafa",
    facebookHandle: "worldofmustafa",
    youtubeHandle: "neweuroconsultants",
    announcementBar: "🛂 Free Eligibility Check · ☎️ +92 314 535 2222 · 📍 F-11 Markaz Islamabad · ⭐ 18 Years of Excellence",
    visasProcessed: "5000",
    yearsExperience: "18",
    successRate: "99%",
    countriesCovered: "50",
  };
  await db.insert(siteSettingsTable).values(Object.entries(defaults).map(([key, value]) => ({ key, value })));
  console.log("Seeded site settings.");
}

async function main() {
  await seedAdminUser();
  await seedVisas();
  await seedServices();
  await seedTours();
  await seedTestimonials();
  await seedFaqs();
  await seedBlogPosts();
  await seedEmbassyUpdates();
  await seedHeroSlide();
  await seedSiteSettings();
  await pool.end();
  console.log("Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
