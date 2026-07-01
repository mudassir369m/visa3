import VisaPage from "./VisaPage";

export default function USAVisa() {
  return (
    <VisaPage 
      country="United States"
      flag="🇺🇸"
      types={["B1/B2 Visit", "F1 Student", "Business", "J1 Exchange"]}
      time="30 - 45 Days"
      success="95%"
      heroImgGradient="bg-gradient-to-br from-blue-900 via-slate-900 to-red-800"
      reqs={[
        "DS-160 Form Confirmation",
        "Valid Passport",
        "Strong ties to home country (Property, Job, Family)",
        "Bank statements (Last 6 months)",
        "Tax returns (FBR) last 3 years",
        "Letter of invitation (if applicable)",
        "Detailed travel itinerary",
        "Interview preparation (We provide mock interviews)"
      ]}
    />
  );
}