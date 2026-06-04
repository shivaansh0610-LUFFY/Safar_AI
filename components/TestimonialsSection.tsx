'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'Backpacker, Delhi',
    text: 'Safar AI gave me actual HRTC bus names and departure times. No other travel app does this. My Manali trip was seamless.',
    trip: 'Delhi to Manali',
  },
  {
    name: 'Arjun Mehta',
    role: 'Software Engineer, Bangalore',
    text: 'The food recommendations are insane. Found a hidden dhaba in McLeod Ganj that served the best rajma chawal of my life.',
    trip: 'Delhi to Dharamshala',
  },
  {
    name: 'Kavya Nair',
    role: 'Architecture Student, Kochi',
    text: 'Finally a travel planner that understands India. Not generic "take a taxi" — actual local buses, real guest houses, honest costs.',
    trip: 'Kochi to Munnar',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 section-divider">
      <div className="absolute inset-0 hero-gradient pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--secondary-300)] mb-4">
            Testimonials
          </span>
          <h2 className="font-display font-medium text-4xl sm:text-5xl text-[var(--text-primary)] tracking-tight">
            Trusted by real
            <br />
            <span className="text-gradient-accent">Indian travellers.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="editorial-card p-8 relative group hover:bg-white/[0.01] transition-colors duration-300"
            >
              <Quote className="w-8 h-8 text-[var(--accent)] opacity-20 mb-6" />

              <p className="text-[var(--text-secondary)] leading-relaxed mb-8 text-[15px]">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="mt-auto pt-4 border-t border-[var(--border-color)]">
                <p className="font-medium text-[var(--text-primary)] text-sm">{t.name}</p>
                <p className="text-xs text-[var(--text-tertiary)] mt-0.5">{t.role}</p>
                <p className="text-xs text-[var(--accent)] mt-2 font-medium">{t.trip}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
