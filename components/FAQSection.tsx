'use client';

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-forest-950 relative overflow-hidden border-t border-forest-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-forest-800 border border-lime/30 text-lime text-xs font-bold tracking-widest uppercase mb-4">
            {t.faq.tag}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-offwhite font-sans tracking-tight mb-5">
            {t.faq.title}
          </h2>
        </div>

        {/* FAQ Accordion Items */}
        <div className="space-y-4">
          {t.faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-forest-900/70 border border-forest-700/80 transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-bold text-offwhite font-sans">
                    {item.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-forest-950 border border-forest-700 flex items-center justify-center text-lime transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180 bg-lime text-forest-950' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-gray-300 leading-relaxed border-t border-forest-800/80 animate-in fade-in-50 duration-200">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
