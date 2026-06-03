'use client';

import { motion } from 'framer-motion';
import { Brain, Zap, IndianRupee, LayoutList } from 'lucide-react';

const FEATURES = [
  {
    id: 'ai',
    icon: Brain,
    title: 'Hyper-local Intelligence',
    desc: 'Named buses, actual dhabas, exact street addresses, and booking keywords.',
    size: 'large',
  },
  {
    id: 'speed',
    icon: Zap,
    title: 'Instant Generation',
    desc: 'Day-by-day itineraries mapped in seconds.',
    size: 'small',
  },
  {
    id: 'budget',
    icon: IndianRupee,
    title: 'Budget Accuracy',
    desc: 'Recommendations perfectly scaled to your spend bracket.',
    size: 'small',
  },
  {
    id: 'timeline',
    icon: LayoutList,
    title: 'Precision Timeline',
    desc: 'Morning to night mapped seamlessly.',
    size: 'large',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-32 px-4 sm:px-6 lg:px-8 border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-24"
        >
          <h2 className="font-display font-medium text-4xl sm:text-5xl text-[var(--text-primary)] mb-6">
            The end of generic travel.
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
            Pure hyper-local Indian intelligence, distilled into actionable itineraries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border-color)] border border-[var(--border-color)]">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-[var(--bg-base)] p-10 flex flex-col items-center text-center group"
            >
              <feature.icon className="w-6 h-6 mb-6 text-[var(--accent)]" />
              <h3 className="font-display font-medium text-xl text-[var(--text-primary)] mb-4">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
