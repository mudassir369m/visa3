import { useListServices } from "@workspace/api-client-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Plane, Building, ShieldCheck, MapMap } from "lucide-react";

export default function ServicesRow() {
  const { data: services, isLoading } = useListServices();

  if (isLoading) return null;
  
  // Provide fallback icons if db doesn't match perfectly
  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'plane': return <Plane className="w-8 h-8 text-primary" />;
      case 'hotel': return <Building className="w-8 h-8 text-primary" />;
      case 'insurance': return <ShieldCheck className="w-8 h-8 text-primary" />;
      case 'tour': return <MapMap className="w-8 h-8 text-primary" />;
      default: return <Plane className="w-8 h-8 text-primary" />;
    }
  };

  return (
    <section className="py-24 bg-secondary/10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-display font-bold mb-4">Beyond Visas</h2>
            <p className="text-muted-foreground">Complete travel solutions tailored for your peace of mind.</p>
          </div>
          <Link href="/services" className="text-primary font-medium hover:underline mt-4 md:mt-0">
            View All Services →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services?.slice(0,4).map((service) => (
            <Link key={service.id} href={`/services/${service.slug}`}>
              <motion.div 
                whileHover={{ y: -8 }}
                className="bg-card/50 backdrop-blur-sm border border-border p-8 rounded-xl h-full flex flex-col hover:border-primary/50 transition-colors"
              >
                <div className="mb-6 p-4 rounded-full bg-background inline-flex self-start border border-border shadow-inner">
                  {getIcon(service.icon)}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm flex-1">{service.description}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
