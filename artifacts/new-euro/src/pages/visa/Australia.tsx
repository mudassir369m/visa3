import VisaPage from "./VisaPage";

export default function AustraliaVisa() {
  return (
    <VisaPage 
      country="Australia"
      flag="🇦🇺"
      types={["Visitor (Subclass 600)", "Business", "Student (Subclass 500)"]}
      time="20 - 25 Days"
      success="97%"
      heroImgGradient="bg-gradient-to-br from-blue-900 via-slate-900 to-amber-900"
      reqs={[
        "Valid Passport (all pages scanned)",
        "Bank statements (Last 6 months)",
        "Proof of income / Employment letter",
        "Tax documents",
        "Family registration certificate (FRC)",
        "Property documents (optional but recommended)",
        "Travel itinerary",
        "Health insurance (if over 75 years old)"
      ]}
    />
  );
}