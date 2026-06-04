'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import SpotlightCard from '@/components/SpotlightCard';

const HOW_IT_WORKS = [
  {
    n: '01',
    emoji: '📍',
    title: 'Tell us your trip',
    desc: 'Origin, destination, duration, budget, vibe. Takes 30 seconds.',
    glow: 'rgba(99, 102, 241, 0.18)', // Indigo glow
  },
  {
    n: '02',
    emoji: '⚡',
    title: 'AI crafts the plan',
    desc: 'Gemini AI generates hyper-local, street-level itineraries instantly.',
    glow: 'rgba(168, 85, 247, 0.18)', // Violet glow
  },
  {
    n: '03',
    emoji: '🗺️',
    title: 'Travel smarter',
    desc: 'Get real bus names, actual dhabas, costs, and booking keywords.',
    glow: 'rgba(249, 115, 22, 0.15)', // Saffron glow
  },
];

const FEATURES = [
  { icon: '🚌', label: 'Real transit names',   sub: 'HRTC Volvo, KSRTC buses, exact route numbers', glow: 'rgba(99, 102, 241, 0.12)' },
  { icon: '🍛', label: 'Actual dhabas',         sub: 'Not "try local food" — named restaurants', glow: 'rgba(249, 115, 22, 0.12)' },
  { icon: '💰', label: 'Accurate budgets',       sub: 'Scaled per person to your tier', glow: 'rgba(16, 185, 129, 0.12)' },
  { icon: '⏰', label: 'Hour-by-hour plan',      sub: 'Morning, afternoon, evening, night', glow: 'rgba(168, 85, 247, 0.12)' },
  { icon: '🏔', label: 'Terrain-aware routing',  sub: 'Altitude, seasonal, weather factors', glow: 'rgba(99, 102, 241, 0.12)' },
  { icon: '🎯', label: 'Zero fluff policy',      sub: 'Only actionable, specific information', glow: 'rgba(244, 63, 94, 0.12)' },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="section-dark py-28 px-5 sm:px-8 relative overflow-hidden bg-[#0C0C18] noise">
      {/* Background dot grid */}
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

      {/* Subtle background orb */}
      <div className="orb orb-4 absolute top-[10%] right-1/4 opacity-30 pointer-events-none" style={{ width: '450px', height: '450px' }} />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── HOW IT WORKS ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-4">How it works</p>
          <h2 className="font-display font-extrabold text-white leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            From idea to itinerary.
            <br />
            <span className="grad-indigo">In 10 seconds.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-28">
          {HOW_IT_WORKS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="h-full"
            >
              <SpotlightCard
                glowColor={s.glow}
                className="h-full p-8 border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.035] transition-all duration-300 relative group cursor-default"
              >
                {/* Number watermark */}
                <div
                  className="absolute top-4 right-4 font-display font-black opacity-[0.03] select-none group-hover:opacity-[0.06] transition-opacity duration-300"
                  style={{ fontSize: '5rem', lineHeight: 1, color: 'white' }}
                >
                  {s.n}
                </div>
                <span className="text-3xl mb-5 block">{s.emoji}</span>
                <h3 className="font-display font-bold text-white text-xl mb-2">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{s.desc}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* ── BENTO FEATURES ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="eyebrow mb-4">Why Safar AI is different</p>
          <h2 className="font-display font-extrabold text-white leading-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
            Hyper-local.{' '}
            <span
              className="font-display italic"
              style={{ color: 'var(--text-2)', fontWeight: 400 }}
            >
              Always.
            </span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <SpotlightCard
                glowColor={f.glow}
                className="flex items-start gap-4 p-6 border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 cursor-default h-full"
              >
                <span className="text-2xl flex-shrink-0 mt-0.5">{f.icon}</span>
                <div>
                  <p className="font-bold text-sm text-white mb-1">{f.label}</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>{f.sub}</p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* ── TESTIMONIAL BANNER ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl p-10 text-center overflow-hidden border border-white/10"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(168,85,247,0.06) 50%, rgba(249,115,22,0.04) 100%)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          }}
        >
          {/* Background shimmer */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.02) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 4s ease-in-out infinite',
            }}
          />
          <div className="relative z-10">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xl font-bold text-white mb-2 max-w-2xl mx-auto leading-relaxed">
              "Finally an India travel planner that actually <em>knows</em> India.
              It gave me the exact HRTC bus number for Manali. Unreal."
            </p>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/30">
              — 10,000+ trips planned with Safar AI
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
