"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-white/40 backdrop-blur-sm">
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-pink-100/30 blur-[100px] -z-10 rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-100/30 blur-[120px] -z-10 rounded-full" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="bg-purple-50 p-3 rounded-2xl text-purple-600 mb-5 border border-purple-100 shadow-sm">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 tracking-tight mb-4">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-zinc-500 text-lg max-w-lg leading-relaxed font-medium">
            Got questions? We have got items covered inside layout loads properly here.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="px-6 bg-white/70 border border-zinc-100/80 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <AccordionTrigger className="font-bold text-base text-zinc-800 hover:text-purple-600 hover:no-underline py-5 text-left transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-600 font-normal leading-relaxed text-sm pb-5 border-t border-zinc-100/50 pt-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
