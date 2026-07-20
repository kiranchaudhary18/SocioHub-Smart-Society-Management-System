import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does it take to set up my society?",
    answer: "You can set up your society in less than 15 minutes. Once registered, you can immediately start inviting residents, guards, and committee members via email or SMS links.",
  },
  {
    question: "Do residents need to pay to use the app?",
    answer: "No, the mobile app is completely free for all residents, visitors, and staff members. The society management committee pays a flat subscription fee based on the number of flats.",
  },
  {
    question: "Is our community data secure?",
    answer: "Yes, we use bank-grade 256-bit encryption for all data. Your data is stored on secure cloud servers with daily backups, and we never share or sell your data to third parties.",
  },
  {
    question: "Can we migrate data from our old system?",
    answer: "Absolutely! We provide a simple Excel/CSV import tool that allows you to bulk upload resident details, vehicle information, and past maintenance records in one click.",
  },
];

export function FAQ() {
  return (
    <section className="py-24 bg-card border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about SocioHub.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border/50 px-2">
                  <AccordionTrigger className="text-left font-heading font-semibold text-lg hover:no-underline hover:text-primary transition-colors py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
