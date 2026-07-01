import { motion } from "framer-motion";
import { RiWhatsappFill, RiMapPinFill, RiTimeFill, RiMailFill, RiPhoneFill } from "react-icons/ri";

export default function OfficeMap() {
  return (
    <section className="py-24 bg-card border-t border-white/5">
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-display-l mb-4"
          >
            Visit Us in <span className="gold-gradient-text">F-11 Markaz</span>
          </motion.h2>
          <p className="text-muted-foreground">Located in the heart of Islamabad for your convenience.</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-8 items-stretch">
          
          {/* Contact Info Card */}
          <div className="glass-card rounded-2xl p-8 flex flex-col gap-8 h-full">
            <div>
              <h3 className="text-2xl font-display font-bold mb-6 text-white">Contact Info</h3>
              
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <RiMapPinFill className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <strong className="block text-white mb-1">Office Address</strong>
                    <span className="text-muted-foreground text-sm">Office No. 17-18, 1st Floor, Lord Trade Centre, F-11 Markaz, Islamabad, Pakistan</span>
                  </div>
                </li>
                
                <li className="flex gap-4">
                  <RiTimeFill className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <strong className="block text-white mb-1">Working Hours</strong>
                    <span className="text-muted-foreground text-sm">Monday – Friday: 9:00 AM – 4:00 PM<br/>Sat & Sun: Closed</span>
                  </div>
                </li>
                
                <li className="flex gap-4">
                  <RiPhoneFill className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <strong className="block text-white mb-1">Phone Line</strong>
                    <a href="tel:+923145352222" className="text-muted-foreground text-sm hover:text-primary transition-colors">+92 314 535 2222</a>
                  </div>
                </li>

                <li className="flex gap-4">
                  <RiMailFill className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <strong className="block text-white mb-1">Email</strong>
                    <a href="mailto:info@neweuroconsultants.com" className="text-muted-foreground text-sm hover:text-primary transition-colors">info@neweuroconsultants.com</a>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="mt-auto pt-8 border-t border-white/10">
              <a href="https://wa.me/923145352222" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl font-bold transition-colors">
                <RiWhatsappFill className="w-6 h-6" /> Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Map Embed Container */}
          <div className="glass-card rounded-2xl overflow-hidden min-h-[400px] lg:min-h-full border-white/10 relative p-1 group">
            {/* The grayscale/invert filters make the map match the dark theme */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.4396!2d73.0551!3d33.7295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbff2a3bfc0b3%3A0x4e2e2e2e2e2e2e2e!2sF-11+Markaz%2C+Islamabad!5e0!3m2!1sen!2spk!4v1234567890123" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl w-full h-full object-cover filter brightness-[0.8] contrast-[1.2] opacity-80 group-hover:opacity-100 group-hover:brightness-100 group-hover:contrast-100 transition-all duration-700 invert-[0.9] hue-rotate-180"
              title="New Euro Consultants Location Map"
            ></iframe>
            
            {/* Overlay hint */}
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-xl"></div>
          </div>

        </div>
      </div>
    </section>
  );
}