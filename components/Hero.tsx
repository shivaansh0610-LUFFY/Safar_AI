'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Mountain, Waves, Star } from 'lucide-react';

const floatingCards = [
  { icon: Mountain, label: 'Manali Trek', sub: '5 days · Backpacker', color: 'brand', delay: 0.8 },
  { icon: Waves, label: 'Goa Escape', sub: '4 days · Chill Vibes', color: 'dusk', delay: 1.1 },
  { icon: Star, label: 'Rajasthan Royal', sub: '7 days · Luxury', color: 'sand', delay: 1.4 },
];

const colorMap: Record<string, string> = {
  brand: 'icon-bg-brand',
  dusk: 'icon-bg-dusk',
  sand: 'icon-bg-sand',
};

export default function Hero({ onPlanClick }: { onPlanClick: () => void }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-aurora" />
      
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Radial glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-dusk-600/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-semibold uppercase tracking-widest"
          style={{
            background: 'rgba(48,150,102,0.1)',
            border: '1px solid rgba(48,150,102,0.25)',
            color: '#54b285',
          }}
        >
          <Sparkles className="w-3 h-3" />
          AI-Powered · Hyper-Local · Made for India
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="heading-hero text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6"
        >
          <span className="text-white">Your next</span>
          <br />
          <span className="text-gradient-brand">Indian adventure</span>
          <br />
          <span className="text-white">starts here.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          From Himalayan passes to backwater sunsets — get a street-smart, day-by-day 
          itinerary with real local transport, hidden dhabas, and zero fluff.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={onPlanClick}
            className="btn-primary text-base py-4 px-8 rounded-2xl text-base"
          >
            <Sparkles className="w-4 h-4" />
            Plan My Trip — Free
          </button>
          <a href="#how-it-works" className="btn-ghost text-base py-4 px-8 rounded-2xl">
            See how it works
            <ArrowDown className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Floating Trip Preview Cards */}
        <div className="flex flex-wrap justify-center gap-4">
          {floatingCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: card.delay, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass-card flex items-center gap-3 px-4 py-3 cursor-pointer"
              style={{ animationDelay: `${i * 2}s` }}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${colorMap[card.color]}`}>
                <card.icon className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">{card.label}</p>
                <p className="text-xs text-gray-500">{card.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-gray-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
