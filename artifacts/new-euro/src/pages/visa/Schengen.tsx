import VisaPage from "./VisaPage";

export default function SchengenVisa() {
  return (
    <VisaPage 
      country="Schengen"
      flag="🇪🇺"
      types={["Tourist (Type C)", "Business", "Family/Friend Visit"]}
      time="15 - 20 Days"
      success="97%"
      heroImgGradient="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900"
      reqs={[
        "Schengen application form",
        "Valid Passport (issued within 10 years)",
        "Travel medical insurance (€30k coverage)",
        "Flight itinerary (round trip)",
        "Proof of accommodation",
        "Proof of financial means (6 months bank statement)",
        "Leave approval letter from employer",
        "Cover letter detailing purpose of visit"
      ]}
    />
  );
}