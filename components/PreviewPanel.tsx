'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { UtensilsCrossed, Moon, MapPin, Footprints } from 'lucide-react';

const PREVIEW_DAYS = [
  {
    num: 1,
    color: '#D48030', // Turmeric
    label: 'Delhi → Manali',
    cost: '₹1450',
    tag: 'Transit',
    icon: MapPin,
    title: 'HRTC Volvo Semi-Sleeper',
    desc: 'Overnight journey through the Beas river gorge. Book seats on left side for views.',
  },
  {
    num: 2,
    color: '#6E685F', // Muted
    label: 'Old Manali Exploration',
    cost: '₹800',
    tag: 'Food',
    icon: UtensilsCrossed,
    title: 'Café 1947 & Old Village',
    desc: 'River-side seating. Try the trout or wood-fired pizza.',
  },
  {
    num: 3,
    color: '#A69F95', // Muted tan
    label: 'Solang & Trek',
    cost: '₹2200',
    tag: 'Adventure',
    icon: Footprints,
    title: 'Beas Kund Trail',
    desc: 'Moderate hike to the glacial lake. Start by 7am to beat crowds.',
  },
  {
    num: 4,
    color: '#D48030',
    label: 'Naggar Heritage',
    cost: '₹1200',
    tag: 'Stay',
    icon: Moon,
    title: 'Naggar Castle Stay',
    desc: '15th-century wood & stone architecture. Book well in advance.',
  },
];

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: 0.6 + i * 0.22, ease: 'easeOut' as const },
  }),
};

export default function PreviewPanel() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const i = setInterval(() => setPulse(p => !p), 1200);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="editorial-card overflow-hidden h-[520px] flex flex-col">
        
        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-[var(--border-color)] flex justify-between items-start">
          <div>
            <p className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-widest font-semibold mb-1">
              Sample Itinerary
            </p>
            <h3 className="font-display font-medium text-lg text-[var(--text-primary)]">
              Delhi → Manali
            </h3>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 border border-[var(--border-color)]">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
              style={{ opacity: pulse ? 1 : 0.3, transition: 'opacity 0.6s' }}
            />
            <span className="text-[9px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Live</span>
          </div>
        </div>

        {/* Days List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {PREVIEW_DAYS.map((day, i) => {
            const Icon = day.icon;
            return (
              <motion.div
                key={day.num}
                custom={i}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                className="border border-[var(--border-color)] flex"
              >
                <div className="w-10 border-r border-[var(--border-color)] flex flex-col items-center py-3 bg-[#171614]">
                  <span className="text-xs font-display font-medium text-[var(--text-secondary)]">D{day.num}</span>
                  <div className="mt-auto">
                    <Icon className="w-3.5 h-3.5" style={{ color: day.color }} />
                  </div>
                </div>
                
                <div className="flex-1 p-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] uppercase tracking-wider font-semibold" style={{ color: day.color }}>
                      {day.tag}
                    </span>
                    <span className="text-[10px] font-medium text-[var(--text-secondary)]">{day.cost}</span>
                  </div>
                  <h4 className="text-sm font-medium text-[var(--text-primary)] mb-0.5">{day.title}</h4>
                  <p className="text-xs text-[var(--text-tertiary)] leading-snug">{day.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[var(--bg-surface)] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
