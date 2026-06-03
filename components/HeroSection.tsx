'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import PlannerPanel from '@/components/PlannerPanel';
import PreviewPanel from '@/components/PreviewPanel';
import { TripInput } from '@/types/itinerary';

interface HeroSectionProps {
  onSubmit: (data: TripInput) => void;
  isLoading: boolean;
}

export default function HeroSection({ onSubmit, isLoading }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[var(--border-color)]">
      {/* Main content */}
      <div className="flex-1 max-w-7xl mx-auto w-full flex items-center">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 xl:gap-20 items-center w-full">

          {/* ── LEFT COLUMN ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-6 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]"
            >
              <span className="block w-4 h-[1px] bg-[var(--accent)]" />
              Safar AI — Issue N°1
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-medium text-5xl sm:text-6xl lg:text-7xl mb-8 leading-[1.1]"
            >
              The intelligent<br />
              way to traverse<br />
              <span className="italic text-[var(--text-secondary)]">India.</span>
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
              className="flex items-center gap-6 mt-6 text-xs text-[var(--text-tertiary)] uppercase tracking-wider"
            >
              {['Complimentary', 'No Registration', 'Local Intelligence'].map((t, i) => (
                <span key={t} className="flex items-center gap-2">
                  {i > 0 && <span className="w-1 h-1 bg-[var(--border-color)] rounded-full" />}
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="hidden lg:block">
            <PreviewPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
