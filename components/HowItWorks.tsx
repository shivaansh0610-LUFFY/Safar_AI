'use client';

import { motion } from 'framer-motion';
import { Sparkles, Map, Download } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: Sparkles,
    title: 'Tell us your trip',
    desc: "Pick your starting city, destination, number of days, budget, and the vibe you're after. Takes under 60 seconds.",
    color: 'brand',
  },
  {
    num: '02',
    icon: Map,
    title: 'AI builds your route',
    desc: 'Our AI models act like a street-smart Indian travel operator — naming actual buses, real dhabas, hidden gems, and terrain-adjusted timings.',
    color: 'dusk',
  },
  {
    num: '03',
    icon: Download,
    title: 'Explore & book',
    desc: 'Browse your day-by-day timeline. Every transport and stay recommendation links to the best booking platform for your budget.',
    color: 'sand',
  },
];

const colorStyles: Record<string, string> = {
  brand: 'bg-gradient-to-br from-brand-500 to-brand-700 shadow-[0_0_24px_rgba(48,150,102,0.35)]',
  dusk: 'bg-gradient-to-br from-dusk-500 to-dusk-700 shadow-[0_0_24px_rgba(139,92,246,0.35)]',
  sand: 'bg-gradient-to-br from-sand-400 to-sand-600 shadow-[0_0_24px_rgba(224,168,78,0.35)]',
};

const textColors: Record<string, string> = {
  brand: 'text-brand-400',
  dusk: 'text-dusk-400',
  sand: 'text-sand-400',
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/20 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs text-brand-400 uppercase tracking-widest font-semibold mb-4">How it works</p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-4">
            From idea to itinerary
            <br />
            <span className="text-gradient-brand">in three steps</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            No generic travel blogs. No copy-paste routes. Pure hyper-local intelligence.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="glass-card p-7 relative group"
            >
              {/* Number */}
              <span className={`font-display font-black text-6xl opacity-[0.06] absolute top-4 right-5 leading-none ${textColors[step.color]}`}>
                {step.num}
              </span>

              {/* Icon */}
              <div className={`w-12 h-12 rounded-2xl ${colorStyles[step.color]} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                <step.icon className="w-5 h-5 text-white" />
              </div>

              {/* Content */}
              <h3 className="font-display font-bold text-xl text-white mb-3">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>

              {/* Connector line (hidden on last) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-white/[0.08] z-10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
