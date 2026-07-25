"use client";

// FAQ section for SEO (FAQPage rich results) and GEO (structured Q&A is
// exactly what AI answer engines quote from) — same JSON-LD schema and
// visible content, single source of truth. Answers are deliberately
// accurate/non-overclaiming per knowlagebase.md's content rules (e.g. we
// route negative reviews, we don't block them; both trials require a card).
//
// The JSON-LD schema is sourced directly from the English dictionary
// (not the reactive t()) — crawlers primarily see the server-rendered
// English HTML regardless of what the visitor later switches to
// client-side, so the structured data should match that, not whichever
// language happens to be active when this renders.
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
  mainEntity: en.landing.faq.items.map((f) => ({
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

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useTranslations();
  const faqs = t<FAQItemData[]>("landing.faq.items");

  return (
    <section id="faq" className="container py-20 sm:py-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <SectionHeading
        eyebrow={t("landing.faq.eyebrow")}
        title={t("landing.faq.title")}
        subtitle={t("landing.faq.subtitle")}
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
