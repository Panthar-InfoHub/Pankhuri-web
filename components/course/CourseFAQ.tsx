"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Lock, HelpCircle } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQData {
  faqs: FAQ[];
  totalCount: number;
  freeCount: number;
  isLocked: boolean;
}

interface CourseFAQProps {
  faqData?: FAQData;
}

export function CourseFAQ({ faqData }: CourseFAQProps) {
  if (!faqData || !faqData.faqs || faqData.faqs.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          Course FAQs
        </h2>
        <div className="text-right">
          <p className="text-gray-500 text-xs font-medium">
            {faqData.totalCount} Questions Total
          </p>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-3">
        {faqData.faqs.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className="px-5 bg-gray-50 border border-gray-100/80 rounded-2xl hover:bg-gray-50/80 transition-all hover:shadow-sm"
          >
            <AccordionTrigger className="font-bold text-sm text-gray-800 hover:text-purple-600 hover:no-underline py-4 text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 font-normal leading-relaxed text-sm pb-4 pt-2">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Locked FAQs Banner */}
      {faqData.isLocked && faqData.totalCount > faqData.faqs.length && (
        <div className="p-5 mt-4 bg-purple-50/50 border border-purple-100/60 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-xl text-purple-600">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-gray-900 font-extrabold text-sm">
                Unlock {faqData.totalCount - faqData.faqs.length} more FAQs
              </p>
              <p className="text-gray-500 text-xs mt-0.5">
                Full access answers are reserved for enrolled students
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-sm hover:shadow-md self-end sm:self-auto"
          >
            Enroll to Unlock
          </button>
        </div>
      )}
    </section>
  );
}
