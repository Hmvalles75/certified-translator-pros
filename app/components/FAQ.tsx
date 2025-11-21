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
      question: "Are your translations compliant with USCIS requirements?",
      answer: "Yes. Our certified translations meet all USCIS, IRCC, court, and university requirements. Each translation includes a signed certification statement confirming accuracy, the translator's credentials, and contact information—exactly what USCIS requires."
    },
    {
      question: "Can I just take a photo of my document with my phone?",
      answer: "Yes! As long as the photo is clear and all text is readable, we can work with it. We accept photos, scans, and PDFs. Make sure there's good lighting and the entire document is visible."
    },
    {
      question: "How much does a certified translation cost?",
      answer: "Flat $29 per page (up to 250 words). No per-word pricing, no hidden fees, no confusing word counts. You'll see your exact cost before placing an order. Most birth certificates and marriage certificates fit on 1 page."
    },
    {
      question: "How long does a certified translation take?",
      answer: "Most certified translations are completed within 24-48 hours for 1-2 pages. Larger documents (3-10 pages) take 3-5 business days. Rush service available for urgent immigration or legal deadlines."
    },
    {
      question: "Can I use these translations for USCIS, courts, and universities?",
      answer: "Yes. Our certified translations are accepted by USCIS (green cards, citizenship, visas), state and federal courts, universities, employers, and all government agencies. We back this with our acceptance guarantee."
    },
    {
      question: "Are your translators certified and qualified?",
      answer: "Yes. All our translators are vetted professionals with expertise in their language pairs. They undergo rigorous screening including credential verification and background checks. Every translation is done by a human—never AI."
    },
    {
      question: "How do I receive my certified translation?",
      answer: "Your certified translation is delivered digitally as a PDF via email, ready to print and submit. We can also provide notarized hard copies shipped to your address for an additional fee if required by courts or schools."
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
