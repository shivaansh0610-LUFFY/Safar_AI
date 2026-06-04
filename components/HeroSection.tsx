'use client';

import { motion } from 'framer-motion';
import PlannerPanel from '@/components/PlannerPanel';
import PreviewPanel from '@/components/PreviewPanel';
import { TripInput } from '@/types/itinerary';

interface HeroSectionProps {
  onSubmit: (data: TripInput) => void;
  isLoading: boolean;
}

export default function HeroSection({ onSubmit, isLoading }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 noise-overlay" />

      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 10, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[15%] left-[10%] w-[400px] h-[400px] rounded-full opacity-[0.07] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,128,48,0.5) 0%, transparent 70%)' }}
      />
      <motion.div
        animate={{
          x: [0, -25, 15, 0],
          y: [0, 15, -25, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[20%] right-[5%] w-[350px] h-[350px] rounded-full opacity-[0.05] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(45,155,94,0.5) 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full flex items-center">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 xl:gap-20 items-center w-full">
          {/* LEFT */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--secondary-400)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--secondary-400)]" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent-300)]">
                Safar AI — Live
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-medium text-5xl sm:text-6xl lg:text-7xl mb-8 leading-[1.08] tracking-tight"
            >
              <span className="text-[var(--text-primary)]">The intelligent</span>
              <br />
              <span className="text-[var(--text-primary)]">way to traverse</span>
              <br />
              <span className="text-gradient-accent italic">India.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-lg max-w-lg mb-10 leading-relaxed text-[var(--text-secondary)]"
            >
              Hyper-local, day-by-day itineraries mapped with exact transit routes,
              local dining, and hidden topography. No generic lists.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <PlannerPanel onSubmit={onSubmit} isLoading={isLoading} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="flex items-center gap-4 mt-6"
            >
              {['Complimentary', 'No Registration', 'Local Intelligence'].map((t, i) => (
                <span key={t} className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
                  {i > 0 && <span className="w-1 h-1 bg-[var(--border-hover)] rounded-full" />}
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <PreviewPanel />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-5 h-8 border border-[var(--border-hover)] rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 bg-[var(--text-tertiary)] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
