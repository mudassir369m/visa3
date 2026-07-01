import VisaPage from "./VisaPage";

export default function UKVisa() {
  return (
    <VisaPage 
      country="United Kingdom"
      flag="🇬🇧"
      types={["Standard Visitor", "Business", "Student Tier 4", "Spouse/Dependent"]}
      time="15 - 20 Days"
      success="98%"
      heroImgGradient="bg-gradient-to-br from-blue-900 via-slate-900 to-red-900"
      reqs={[
        "Valid Passport (6 months validity)",
        "Previous passports & travel history",
        "Bank statements (Last 6 months, signed & stamped)",
        "Account maintenance certificate",
        "Employment letter / Business registration NTN",
        "Tax returns (FBR) last 2 years",
        "Hotel & flight itinerary",
        "Ties to home country evidence"
      ]}
    />
  );
}