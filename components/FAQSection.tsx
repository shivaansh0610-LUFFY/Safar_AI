'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'What is Safar AI?',
    a: 'Safar AI is a hyper-local Indian travel planner powered by Gemini AI. Unlike generic trip planners, we generate street-level detail — actual bus names (HRTC Volvo, KSRTC), real local dhabas, terrain-aware timings — all tuned specifically for Indian travel.',
  },
  {
    q: 'Is Safar AI free to use?',
    a: 'Yes, completely free. No signup, no credit card, no hidden fees. Just enter your trip details and get a full itinerary instantly.',
  },
  {
    q: 'How accurate are the itineraries?',
    a: 'Our AI is trained on thousands of Indian travel experiences and optimized for real-world conditions — transport availability, local business hours, terrain difficulty, and seasonal factors. We recommend verifying bookings independently.',
  },
  {
    q: 'Can I customize the generated plan?',
    a: 'After generating your itinerary, you can re-run it with different preferences (budget, vibe, duration) to get an alternative plan. We\'re working on in-itinerary editing for a future version.',
  },
  {
    q: 'What AI model powers Safar AI?',
    a: 'Safar AI is built on Google\'s Gemini AI — one of the most capable large language models available — fine-tuned with a hyper-local India travel prompt system developed by our team.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No account needed. Safar AI works completely anonymously. Just fill in your trip details and get your itinerary instantly.',
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 px-4 sm:px-6 lg:px-8 section-divider">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[2fr_3fr] gap-12 lg:gap-20">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="md:sticky md:top-28 self-start"
          >
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--accent-300)] mb-4">
              FAQ
            </span>
            <h2 className="font-display font-medium text-4xl sm:text-5xl text-[var(--text-primary)] mb-6 leading-tight tracking-tight">
              Common<br />inquiries.
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-xs">
              Everything you need to know about our methodology.
            </p>
          </motion.div>

          {/* Right: Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {FAQS.map((faq, i) => (
              <div key={i} className="faq-item">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 py-5 text-left group"
                >
                  <span
                    className="font-medium text-base leading-snug transition-colors duration-200"
                    style={{ color: open === i ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                  >
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex-shrink-0 mt-1 w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200"
                    style={{
                      color: open === i ? 'var(--accent-300)' : 'var(--text-tertiary)',
                      background: open === i ? 'rgba(212,128,48,0.1)' : 'transparent',
                    }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="pb-6 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
