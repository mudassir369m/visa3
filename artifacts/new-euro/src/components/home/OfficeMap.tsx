import { useGetSiteSettings } from "@workspace/api-client-react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function OfficeMap() {
  const { data: settings } = useGetSiteSettings();

  const contactInfo = [
    { icon: <MapPin className="w-5 h-5" />, label: "Visit Us", value: settings?.address || "Office No. 17-18, 1st Floor, Lord Trade Centre, F-11 Markaz, Islamabad" },
    { icon: <Phone className="w-5 h-5" />, label: "Call Us", value: settings?.phone || "+92 314 5352222" },
    { icon: <Mail className="w-5 h-5" />, label: "Email", value: settings?.email || "info@neweuroconsultants.com" },
    { icon: <Clock className="w-5 h-5" />, label: "Working Hours", value: settings?.hours || "Mon - Sat: 10:00 AM - 6:00 PM" },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div>
            <h2 className="text-4xl font-display font-bold mb-4">Visit Our Office</h2>
            <p className="text-muted-foreground mb-10 text-lg">Step into our premium consultation center in the heart of Islamabad to discuss your visa journey with our experts.</p>
            
            <div className="space-y-8">
              {contactInfo.map((info, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/30 text-primary flex items-center justify-center shrink-0 border border-border">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">{info.label}</h3>
                    <p className="text-lg font-medium">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="h-[500px] rounded-2xl overflow-hidden border border-border bg-muted relative grayscale hover:grayscale-0 transition-all duration-700">
            {/* Dark themed google map embedded via iframe */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.46781254332!2d72.98379221147573!3d33.6826019364121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbe3812586cc9%3A0xc4864ab1a0eb1e8a!2sLord%20Trade%20Centre!5e0!3m2!1sen!2s!4v1709405625406!5m2!1sen!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
              title="Office Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
