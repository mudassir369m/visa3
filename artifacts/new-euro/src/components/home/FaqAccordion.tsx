import { useListFaqs } from "@workspace/api-client-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqAccordion() {
  const { data: faqs, isLoading } = useListFaqs();

  if (isLoading || !faqs?.length) return null;

  return (
    <section className="py-24 container mx-auto max-w-4xl">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-display font-bold mb-4">Questions, Answered</h2>
        <p className="text-muted-foreground">Everything you need to know about our visa services.</p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.slice(0, 6).map((faq) => (
          <AccordionItem key={faq.id} value={`item-${faq.id}`} className="border-border">
            <AccordionTrigger className="text-left text-lg hover:text-primary hover:no-underline py-6">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-base">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
