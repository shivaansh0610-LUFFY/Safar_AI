'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Clock, IndianRupee } from 'lucide-react';
import SpotlightCard from '@/components/SpotlightCard';

const DESTS = [
  {
    name: 'Manali',
    state: 'Himachal Pradesh',
    tag: 'Adventure',
    days: '5D', from: '₹12,500',
    emoji: '🏔',
    grad: 'linear-gradient(135deg, #1e3a5f 0%, #0ea5e9 100%)',
    glow: 'rgba(14, 165, 233, 0.22)',
    slug: 'delhi-to-manali',
  },
  {
    name: 'Goa',
    state: 'Goa',
    tag: 'Coastal',
    days: '4D', from: '₹15,000',
    emoji: '🌊',
    grad: 'linear-gradient(135deg, #0c4a6e 0%, #0891b2 100%)',
    glow: 'rgba(8, 145, 178, 0.22)',
    slug: 'mumbai-to-goa',
  },
  {
    name: 'Kerala',
    state: 'Kerala',
    tag: 'Culture',
    days: '6D', from: '₹18,000',
    emoji: '🌴',
    grad: 'linear-gradient(135deg, #064e3b 0%, #10b981 100%)',
    glow: 'rgba(16, 185, 129, 0.22)',
    slug: 'bangalore-to-kerala',
  },
  {
    name: 'Rishikesh',
    state: 'Uttarakhand',
    tag: 'Spiritual',
    days: '3D', from: '₹7,800',
    emoji: '🧘',
    grad: 'linear-gradient(135deg, #78350f 0%, #f59e0b 100%)',
    glow: 'rgba(245, 158, 11, 0.20)',
    slug: 'delhi-to-rishikesh',
  },
  {
    name: 'Jaisalmer',
    state: 'Rajasthan',
    tag: 'Desert',
    days: '5D', from: '₹22,000',
    emoji: '🏜',
    grad: 'linear-gradient(135deg, #7c2d12 0%, #f97316 100%)',
    glow: 'rgba(249, 115, 22, 0.20)',
    slug: 'delhi-to-jaisalmer',
  },
  {
    name: 'Spiti Valley',
    state: 'Himachal Pradesh',
    tag: 'Expedition',
    days: '8D', from: '₹28,000',
    emoji: '🗻',
    grad: 'linear-gradient(135deg, #3b0764 0%, #7c3aed 100%)',
    glow: 'rgba(124, 58, 237, 0.22)',
    slug: 'manali-to-spiti',
  },
];

export default function DestinationsGrid({ onDestinationClick }: { onDestinationClick?: (d: string) => void }) {
  return (
    <section id="destinations" className="section-darker py-28 px-5 sm:px-8 relative overflow-hidden bg-[#030309] noise">
      {/* Background dot grid */}
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

      {/* Orbs */}
      <div className="orb orb-1 absolute bottom-0 left-0 opacity-20 pointer-events-none" />
      <div className="orb orb-3 absolute top-1/2 right-0 opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="eyebrow mb-3">Explore India</p>
            <h2 className="font-display font-extrabold text-white leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Popular<br />
              <span className="grad-multi">destinations.</span>
            </h2>
          </div>
          <button
            className="flex items-center gap-2 text-xs font-black uppercase tracking-wider group transition-all cursor-pointer"
            style={{ color: 'var(--indigo)' }}
          >
            See all routes
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTS.map((d, i) => (
            <motion.div
              key={d.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => onDestinationClick?.(d.name)}
              className="h-full cursor-pointer"
            >
              <SpotlightCard
                glowColor={d.glow}
                className="h-full border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.035] transition-all duration-500 relative group overflow-hidden"
              >
                {/* Gradient header banner */}
                <div className="h-28 relative flex items-end p-5 overflow-hidden" style={{ background: d.grad }}>
                  {/* Grain overlay */}
                  <div className="absolute inset-0 opacity-[0.12] pointer-events-none" style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.5\'/%3E%3C/svg%3E")',
                    backgroundSize: '150px',
                  }} />
                  <span className="absolute top-4 right-4 text-4xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 pointer-events-none">{d.emoji}</span>
                  <span
                    className="relative z-10 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full text-white"
                    style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}
                  >
                    {d.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-display font-black text-xl text-white mb-0.5">{d.name}</h3>
                  <p className="text-xs font-semibold mb-4" style={{ color: 'var(--text-3)' }}>{d.state}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs font-semibold" style={{ color: 'var(--text-2)' }}>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 opacity-60" />{d.days}
                      </span>
                      <span className="flex items-center gap-1">
                        <IndianRupee className="w-3.5 h-3.5 opacity-60" />from {d.from.replace('₹', '')}
                      </span>
                    </div>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-white/70 group-hover:text-white" />
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
