"use client";

import { useState } from "react";
import SectionContainer from "./SectionContainer";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
      >
        <span className="font-semibold text-primary">{question}</span>
        <svg
          className={`w-5 h-5 text-accent transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-background border-t border-gray-200">
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is a certified translation?",
      answer: "A certified translation is a translation accompanied by a signed statement from the translator or translation company attesting to the accuracy and completeness of the translation. This certification is required for official use with USCIS, courts, universities, and other institutions."
    },
    {
      question: "How long does a certified translation take?",
      answer: "Most certified translations are completed within 24-48 hours. Rush services are available for urgent requests, with some documents ready in as little as 12 hours. The exact timeline depends on document length and complexity."
    },
    {
      question: "Will my translation be accepted by USCIS?",
      answer: "Yes. Our certified translations meet all USCIS requirements. Each translation includes a signed certification statement confirming accuracy, the translator's credentials, and contact information, which satisfies USCIS standards."
    },
    {
      question: "How much does a certified translation cost?",
      answer: "Pricing varies based on the language pair, document length, and complexity. We offer transparent, upfront pricing with no hidden fees. You'll see your exact cost before placing an order. Most simple documents start around $25-40 per page."
    },
    {
      question: "Are your translators certified and qualified?",
      answer: "Yes. All our translators are certified professionals with expertise in their language pairs. They undergo rigorous vetting, including credential verification and background checks, to ensure the highest quality translations."
    },
    {
      question: "How do I receive my certified translation?",
      answer: "Your certified translation will be delivered digitally as a PDF via email. We can also provide physical copies with original signatures and notarization if required, shipped to your address for an additional fee."
    }
  ];

  return (
    <SectionContainer background="white">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Frequently asked questions
        </h2>
      </div>

      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </SectionContainer>
  );
}
