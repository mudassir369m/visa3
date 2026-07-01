import VisaPage from "./VisaPage";

export default function CanadaVisa() {
  return (
    <VisaPage 
      country="Canada"
      flag="🇨🇦"
      types={["Visitor Visa", "Super Visa", "Study Permit", "Business Visit"]}
      time="30 - 40 Days"
      success="96%"
      heroImgGradient="bg-gradient-to-br from-red-900 via-slate-900 to-slate-800"
      reqs={[
        "IMM Forms completely filled",
        "Valid Passport",
        "Bank statements (Last 6 months)",
        "Source of funds justification",
        "Travel history evidence",
        "Family Information Form",
        "Letter of Explanation (Cover Letter - We draft this)",
        "Biometrics confirmation"
      ]}
    />
  );
}