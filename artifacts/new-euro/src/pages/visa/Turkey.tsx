import VisaPage from "./VisaPage";

export default function TurkeyVisa() {
  return (
    <VisaPage 
      country="Turkey"
      flag="🇹🇷"
      types={["Sticker Visa", "E-Visa (Valid US/UK/Schengen holders)"]}
      time="3 - 10 Days"
      success="99%"
      heroImgGradient="bg-gradient-to-br from-red-900 via-slate-900 to-slate-900"
      reqs={[
        "Valid Passport",
        "2 recent photographs (5x5 cm white bg)",
        "Bank statement (Last 3 months with min 500k PKR)",
        "Account maintenance letter",
        "Employment/Business proofs",
        "Confirmed hotel booking (We arrange)",
        "Confirmed flight reservation (We arrange)",
        "Travel insurance (We arrange)"
      ]}
    />
  );
}