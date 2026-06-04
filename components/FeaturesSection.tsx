'use client';

import { motion } from 'framer-motion';
import { Brain, Zap, IndianRupee, LayoutList, Bus, UtensilsCrossed } from 'lucide-react';

const FEATURES = [
  {
    id: 'ai',
    icon: Brain,
    title: 'Hyper-local Intelligence',
    desc: 'Named buses, actual dhabas, exact street addresses, and booking keywords — all verified against real Indian travel data.',
    accent: 'accent' as const,
  },
  {
    id: 'transit',
    icon: Bus,
    title: 'Real Transit Routes',
    desc: 'HRTC Volvo, Shatabdi Express, KSRTC Airavat — we name the exact service, fare, and departure point.',
    accent: 'secondary' as const,
  },
  {
    id: 'food',
    icon: UtensilsCrossed,
    title: 'Local Dining Intel',
    desc: 'From highway dhabas to hidden cafes, every meal recommendation is a real, named place with a must-try dish.',
    accent: 'warning' as const,
  },
  {
    id: 'speed',
    icon: Zap,
    title: 'Instant Generation',
    desc: 'Get a full multi-day itinerary mapped in seconds, not hours of research.',
    accent: 'accent' as const,
  },
  {
    id: 'budget',
    icon: IndianRupee,
    title: 'Budget Accuracy',
    desc: 'Recommendations perfectly scaled to your spend bracket — backpacker to luxury.',
    accent: 'secondary' as const,
  },
  {
    id: 'timeline',
    icon: LayoutList,
    title: 'Precision Timeline',
    desc: 'Morning to night mapped seamlessly with terrain-adjusted timings.',
    accent: 'accent' as const,
  },
];

const accentMap = {
  accent: {
    iconBg: 'rgba(212,128,48,0.12)',
    iconBorder: 'rgba(212,128,48,0.2)',
    iconColor: '#F5BD5C',
    numColor: 'rgba(212,128,48,0.06)',
  },
  secondary: {
    iconBg: 'rgba(45,155,94,0.12)',
    iconBorder: 'rgba(45,155,94,0.2)',
    iconColor: '#8BDDA6',
    numColor: 'rgba(45,155,94,0.06)',
  },
  warning: {
    iconBg: 'rgba(251,191,36,0.12)',
    iconBorder: 'rgba(251,191,36,0.2)',
    iconColor: '#FBBF24',
    numColor: 'rgba(251,191,36,0.06)',
  },
};

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 hero-gradient pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--accent-300)] mb-4">
            Capabilities
          </span>
          <h2 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl text-[var(--text-primary)] mb-6 tracking-tight">
            The end of generic
            <br />
            <span className="text-gradient-accent">travel planning.</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto leading-relaxed">
            Pure hyper-local Indian intelligence, distilled into actionable day-by-day itineraries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border-color)] border border-[var(--border-color)]">
          {FEATURES.map((feature, i) => {
            const colors = accentMap[feature.accent];
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-[var(--bg-base)] p-10 flex flex-col group hover:bg-white/[0.01] transition-colors duration-300 relative"
              >
                <span
                  className="font-display font-black text-7xl absolute top-4 right-5 leading-none select-none"
                  style={{ color: colors.numColor }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: colors.iconBg, border: `1px solid ${colors.iconBorder}` }}
                >
                  <feature.icon className="w-5 h-5" style={{ color: colors.iconColor }} />
                </div>

                <h3 className="font-display font-medium text-xl text-[var(--text-primary)] mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
