import { useGetPublicStats } from "@workspace/api-client-react";
import { motion } from "framer-motion";

export default function StatsStrip() {
  const { data: stats } = useGetPublicStats();

  if (!stats) return null;

  const items = [
    { label: "Years Experience", value: `${stats.yearsExperience}+` },
    { label: "Visas Processed", value: `${stats.visasProcessed}+` },
    { label: "Success Rate", value: stats.successRate },
    { label: "Countries Covered", value: `${stats.countriesCovered}+` },
  ];

  return (
    <section className="py-16 bg-card border-y border-border">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center justify-center p-6 rounded-lg bg-background border border-border"
            >
              <div className="text-4xl font-display font-bold gold-gradient-text mb-2">{item.value}</div>
              <div className="w-12 h-1 gold-gradient-bg mb-4"></div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
