'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { UtensilsCrossed, Moon, MapPin, Footprints, Brain as Train, Bus } from 'lucide-react';

const PREVIEW_DAYS = [
  {
    num: 1,
    color: '#F5BD5C',
    tag: 'Transit',
    Icon: Bus,
    title: 'HRTC Volvo Semi-Sleeper',
    desc: 'Overnight journey through the Beas river gorge.',
    cost: '₹1,450',
  },
  {
    num: 2,
    color: '#FBBF24',
    tag: 'Food',
    Icon: UtensilsCrossed,
    title: 'Café 1947 & Old Village',
    desc: 'River-side seating. Try the trout or wood-fired pizza.',
    cost: '₹800',
  },
  {
    num: 3,
    color: '#8BDDA6',
    tag: 'Adventure',
    Icon: Footprints,
    title: 'Beas Kund Trail',
    desc: 'Moderate hike to the glacial lake. Start by 7 AM.',
    cost: '₹2,200',
  },
  {
    num: 4,
    color: '#a5b4fc',
    tag: 'Stay',
    Icon: Moon,
    title: 'Naggar Castle Stay',
    desc: '15th-century wood & stone heritage. Book early.',
    cost: '₹1,200',
  },
];

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: 0.6 + i * 0.2, ease: [0.22, 1, 0.36, 1] as const },
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
      <div className="editorial-card overflow-hidden rounded-xl h-[520px] flex flex-col">
        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-[var(--border-color)] flex justify-between items-start">
          <div>
            <p className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-[0.15em] font-semibold mb-1.5">
              Sample Itinerary
            </p>
            <h3 className="font-display font-medium text-lg text-[var(--text-primary)]">
              Delhi &rarr; Manali
            </h3>
          </div>
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full"
            style={{
              border: '1px solid rgba(45,155,94,0.2)',
              background: 'rgba(45,155,94,0.06)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-[var(--secondary-400)]"
              style={{ opacity: pulse ? 1 : 0.3, transition: 'opacity 0.6s' }}
            />
            <span className="text-[9px] font-semibold uppercase tracking-wider text-[var(--secondary-300)]">Live</span>
          </div>
        </div>

        {/* Days List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 scrollbar-hide">
          {PREVIEW_DAYS.map((day, i) => (
            <motion.div
              key={day.num}
              custom={i}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              className="border border-[var(--border-color)] rounded-lg flex overflow-hidden group hover:border-[var(--border-hover)] transition-colors duration-200"
            >
              <div
                className="w-10 border-r border-[var(--border-color)] flex flex-col items-center py-3 gap-2"
                style={{ background: 'rgba(20,18,16,0.5)' }}
              >
                <span className="text-[10px] font-display font-medium text-[var(--text-tertiary)]">D{day.num}</span>
                <day.Icon className="w-3.5 h-3.5" style={{ color: day.color }} />
              </div>

              <div className="flex-1 p-3">
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="text-[9px] uppercase tracking-[0.12em] font-bold"
                    style={{ color: day.color }}
                  >
                    {day.tag}
                  </span>
                  <span className="text-[10px] font-medium text-[var(--text-tertiary)]">{day.cost}</span>
                </div>
                <h4 className="text-sm font-medium text-[var(--text-primary)] mb-0.5 leading-snug">{day.title}</h4>
                <p className="text-[11px] text-[var(--text-tertiary)] leading-snug">{day.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--bg-surface)] to-transparent pointer-events-none rounded-b-xl" />
      </div>
    </div>
  );
}
