'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Zap, Sparkles, Navigation, Globe } from 'lucide-react';
import PlannerPanel from '@/components/PlannerPanel';
import InteractiveParticles from '@/components/InteractiveParticles';
import { TripInput } from '@/types/itinerary';

interface HeroSectionProps {
  onSubmit: (data: TripInput) => void;
  isLoading: boolean;
}

const DESTINATIONS = [
  '🏔 Manali', '🌊 Goa', '🌿 Coorg', '🏜 Jaisalmer', '🧘 Rishikesh',
  '🕌 Varanasi', '🌴 Kerala', '🏛 Hampi', '🗻 Spiti', '⛩ Khajuraho',
];

const STATS = [
  { value: '10K+', label: 'Trips Planned' },
  { value: '< 10s', label: 'Generation Time' },
  { value: '500+', label: 'Destinations' },
];

const ROUTE_NODES = [
  { cx: 38, cy: 22, label: 'Delhi', color: 'var(--indigo)' },
  { cx: 28, cy: 38, label: 'Jaipur', color: 'var(--saffron)' },
  { cx: 20, cy: 55, label: 'Mumbai', color: 'var(--violet)' },
  { cx: 52, cy: 12, label: 'Manali', color: 'var(--indigo)' },
  { cx: 58, cy: 30, label: 'Lucknow', color: 'var(--saffron)' },
  { cx: 80, cy: 45, label: 'Kolkata', color: 'var(--violet)' },
  { cx: 30, cy: 70, label: 'Goa', color: 'var(--jade)' },
  { cx: 38, cy: 78, label: 'Bangalore', color: 'var(--indigo)' },
  { cx: 48, cy: 85, label: 'Chennai', color: 'var(--rose)' },
  { cx: 48, cy: 65, label: 'Hyderabad', color: 'var(--jade)' },
  { cx: 24, cy: 88, label: 'Kerala', color: 'var(--jade)' },
  { cx: 44, cy: 50, label: 'Nagpur', color: 'var(--saffron)' },
];

const ROUTE_CONNECTIONS = [
  [0, 1], [1, 2], [0, 4], [4, 5], [0, 3], [2, 6], [6, 7], [7, 8], [7, 10], [8, 9], [4, 11], [11, 7],
];

const CITY_DETAILS: Record<string, { desc: string; highlights: string; emoji: string }> = {
  Delhi: { desc: 'Capital heartland. Historic forts, spice markets & street food crawls.', highlights: 'Chandni Chowk · Red Fort', emoji: '🕌' },
  Jaipur: { desc: 'The Pink City. Palaces, massive hill fortresses & royal heritage.', highlights: 'Hawa Mahal · Amer Fort', emoji: '👑' },
  Mumbai: { desc: 'City of dreams. Bollywood, coastal drives & local street food.', highlights: 'Marine Drive · Colaba', emoji: '🏙' },
  Manali: { desc: 'Himalayan paradise. Snowy peaks, adventure sports & scenic valleys.', highlights: 'Solang Valley · Rohtang Pass', emoji: '🏔' },
  Lucknow: { desc: 'City of Nawabs. Royal architecture, kebabs & rich cultural heritage.', highlights: 'Bara Imambara · Rumi Gate', emoji: '🥙' },
  Kolkata: { desc: 'Cultural capital. Howrah Bridge, historic streets & sweet sandesh.', highlights: 'Victoria Memorial · Park Street', emoji: '🎭' },
  Goa: { desc: 'Coastal escape. Sun-kissed beaches, parties & Portuguese architecture.', highlights: 'Baga Beach · Old Goa', emoji: '🌊' },
  Bangalore: { desc: 'Silicon valley. Lush gardens, tech parks & active cafe culture.', highlights: 'Cubbon Park · Palace', emoji: '🌳' },
  Chennai: { desc: 'Gateway to South. Classical music, temples & filter coffee.', highlights: 'Marina Beach · Mylapore', emoji: '☕' },
  Hyderabad: { desc: 'City of Pearls. Fragrant biryanis, Charminar & royal history.', highlights: 'Charminar · Golconda Fort', emoji: '🍛' },
  Kerala: { desc: 'God\'s own country. Backwaters, coconut groves & houseboats.', highlights: 'Alleppey · Munnar Hills', emoji: '🌴' },
  Nagpur: { desc: 'Orange city. Geographical center marker of India.', highlights: 'Zero Mile Stone · Lakes', emoji: '🍊' },
};

export default function HeroSection({ onSubmit, isLoading }: HeroSectionProps) {
  const [tagIdx, setTagIdx] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [presetStart, setPresetStart] = useState<string | undefined>(undefined);
  const [presetDest, setPresetDest] = useState<string | undefined>(undefined);

  useEffect(() => {
    const id = setInterval(() => setTagIdx(i => (i + 1) % DESTINATIONS.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#030309] noise">
      {/* ── INTERACTIVE CANVAS PARTICLES ── */}
      <InteractiveParticles />

      {/* Background grids */}
      <div className="absolute inset-0 dot-grid opacity-35 pointer-events-none" />

      {/* Ambient Orbs */}
      <div className="orb orb-1 absolute top-[-10%] left-[-10%] opacity-40 pointer-events-none" />
      <div className="orb orb-2 absolute top-[30%] right-[-15%] opacity-35 pointer-events-none" />
      <div className="orb orb-3 absolute bottom-[15%] left-[20%] opacity-20 pointer-events-none" />

      {/* ── INTERACTIVE INDIA SVG MAP ── */}
      <div className="absolute inset-0 flex items-center justify-end pr-4 lg:pr-12 pointer-events-none overflow-hidden select-none">
        <div className="w-[85%] sm:w-[60%] lg:w-[50%] max-w-2xl h-auto relative pointer-events-auto">
          
          <svg viewBox="0 0 100 100" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background connection lines - low opacity */}
            {ROUTE_CONNECTIONS.map(([a, b], i) => (
              <motion.line
                key={`line-${i}`}
                x1={`${ROUTE_NODES[a].cx}%`} y1={`${ROUTE_NODES[a].cy}%`}
                x2={`${ROUTE_NODES[b].cx}%`} y2={`${ROUTE_NODES[b].cy}%`}
                stroke="rgba(99, 102, 241, 0.25)"
                strokeWidth="0.35"
                strokeDasharray="1.5 1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.8, delay: i * 0.1, ease: 'easeOut' }}
              />
            ))}

            {/* Glowing path lines when hovering nodes */}
            {hoveredNode !== null && ROUTE_CONNECTIONS.map(([a, b], i) => {
              const isConnected = a === hoveredNode || b === hoveredNode;
              return isConnected ? (
                <motion.line
                  key={`glow-${i}`}
                  x1={`${ROUTE_NODES[a].cx}%`} y1={`${ROUTE_NODES[a].cy}%`}
                  x2={`${ROUTE_NODES[b].cx}%`} y2={`${ROUTE_NODES[b].cy}%`}
                  stroke={ROUTE_NODES[hoveredNode].color}
                  strokeWidth="0.75"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              ) : null;
            })}

            {/* Inactive pulse ring indicators */}
            {ROUTE_NODES.map((node, idx) => (
              <motion.circle
                key={`ring-${idx}`}
                cx={`${node.cx}%`}
                cy={`${node.cy}%`}
                r="3.2"
                stroke={node.color}
                strokeWidth="0.4"
                fill="none"
                animate={{ r: [3.2, 5.8], opacity: [0.6, 0] }}
                transition={{ duration: 2, delay: idx * 0.15, repeat: Infinity, ease: 'easeOut' }}
              />
            ))}

            {/* City dots */}
            {ROUTE_NODES.map((node, idx) => (
              <circle
                key={`dot-${idx}`}
                cx={`${node.cx}%`}
                cy={`${node.cy}%`}
                r="1.8"
                fill={node.color}
                className="cursor-pointer transition-all duration-300 hover:r-[3.2]"
                style={{ filter: hoveredNode === idx ? `drop-shadow(0 0 8px ${node.color})` : 'none' }}
                onMouseEnter={() => setHoveredNode(idx)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => {
                  setPresetDest(node.label);
                }}
              />
            ))}
          </svg>

          {/* Interactive Floating Detail Panel relative to Map Nodes */}
          {ROUTE_NODES.map((node, idx) => {
            const details = CITY_DETAILS[node.label];
            const isHovered = hoveredNode === idx;

            return (
              <AnimatePresence key={`panel-${idx}`}>
                {isHovered && details && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 15 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="absolute z-40 w-52 p-4 rounded-xl border border-white/10 glass-strong pointer-events-auto text-left shadow-2xl"
                    style={{
                      left: `${node.cx}%`,
                      top: `${node.cy - 20}%`,
                      transform: 'translate(-50%, -100%)',
                    }}
                    onMouseEnter={() => setHoveredNode(idx)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xl">{details.emoji}</span>
                      <h4 className="font-display font-black text-sm text-white">{node.label}</h4>
                    </div>
                    <p className="text-[10px] text-white/60 font-medium leading-relaxed mb-3">
                      {details.desc}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setPresetStart(node.label)}
                        className="flex-1 py-1 rounded bg-white/10 hover:bg-indigo-600/35 border border-white/10 transition-colors text-[9px] text-center font-bold text-white cursor-pointer"
                      >
                        Start Here
                      </button>
                      <button
                        onClick={() => setPresetDest(node.label)}
                        className="flex-1 py-1 rounded bg-saffron-600/30 hover:bg-saffron-500/50 border border-saffron-500/30 transition-colors text-[9px] text-center font-bold text-[var(--saffron-2)] cursor-pointer"
                      >
                        Visit Here
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </div>
      </div>

      {/* ── CONTENT CONTAINER ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 pt-28 pb-10 text-center">
        {/* Glowing Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="pill pill-indigo mb-6 cursor-default glow-border-indigo"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          India's Interactive Travel OS
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-extrabold leading-[1.0] mb-5 max-w-5xl tracking-tight"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
        >
          <span className="text-white">Plan your Safar</span>
          <br />
          <span className="grad-multi">without the generic.</span>
        </motion.h1>

        {/* Cycling destination */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 mb-8"
        >
          <span style={{ color: 'var(--text-3)', fontSize: '0.95rem', fontWeight: 500 }}>
            Ready to explore
          </span>
          <div className="overflow-hidden h-7 flex items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={tagIdx}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="font-display font-bold text-base grad-saffron"
              >
                {DESTINATIONS[tagIdx]}
              </motion.span>
            </AnimatePresence>
          </div>
          <span style={{ color: 'var(--text-3)', fontSize: '0.95rem', fontWeight: 500 }}>?</span>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full max-w-lg relative"
        >
          {/* Card Ambient backglow */}
          <div
            className="absolute -inset-4 rounded-3xl pointer-events-none opacity-20"
            style={{
              background: 'radial-gradient(ellipse at center, var(--indigo) 0%, transparent 75%)',
              filter: 'blur(24px)',
            }}
          />
          <PlannerPanel
            onSubmit={onSubmit}
            isLoading={isLoading}
            presetStart={presetStart}
            presetDest={presetDest}
          />
        </motion.div>

        {/* Tips / Instructions */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xs text-white/40 mt-6 font-semibold flex items-center gap-1.5"
        >
          <Globe className="w-3.5 h-3.5 text-indigo-400" />
          Tip: Hover and click cities on the map to pre-fill your trip destinations!
        </motion.p>
      </div>

      {/* ── STATS BAR ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative z-10 mx-5 sm:mx-8 mb-10 rounded-2xl overflow-hidden max-w-4xl lg:mx-auto lg:w-full"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="grid grid-cols-3 divide-x divide-white/5">
          {STATS.map((s) => (
            <div key={s.label} className="py-5 text-center">
              <p className="font-display font-black text-xl grad-saffron" style={{ fontSize: '1.4rem' }}>{s.value}</p>
              <p className="text-[10px] font-bold mt-0.5 tracking-wider uppercase" style={{ color: 'var(--text-3)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Fade bottom gradient to next section */}
      <div
        className="absolute bottom-0 inset-x-0 h-20 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, var(--surface))` }}
      />
    </section>
  );
}
