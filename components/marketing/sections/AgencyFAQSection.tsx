"use client";

// Agency-specific FAQ — same accordion mechanics and JSON-LD pattern as the
// homepage's FAQSection, but its own question set targeted at objections
// this audience actually has (dev skills, revenue cut, client cap, GHL-style
// comparisons) rather than duplicating the general product FAQ.
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/marketing/primitives/SectionHeading";
import { useTranslations } from "@/lib/i18n";
import en from "@/content/en.json";

interface FAQItemData {
  question: string;
  answer: string;
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: en.agencyPage.faq.items.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border/70 py-5">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="text-sm font-semibold sm:text-base">{question}</span>
        <Plus
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
            isOpen ? "rotate-45" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pt-3 text-sm leading-relaxed text-muted-foreground">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AgencyFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useTranslations();
  const faqs = t<FAQItemData[]>("agencyPage.faq.items");

  return (
    <section id="agency-faq" className="container scroll-mt-24 py-20 sm:py-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <SectionHeading
        eyebrow={t("agencyPage.faq.eyebrow")}
        title={t("agencyPage.faq.title")}
        subtitle={t("agencyPage.faq.subtitle")}
      />

      <div className="mx-auto max-w-2xl">
        {faqs.map((faq, i) => (
          <FAQItem
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
}
