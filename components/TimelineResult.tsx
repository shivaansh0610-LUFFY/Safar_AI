'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bus, Train, Car, Footprints, UtensilsCrossed, Moon, Sun, Sunset,
  ChevronDown, IndianRupee, ExternalLink, MapPin, Tag, Sparkles,
  LayoutList,
} from 'lucide-react';
import { ItineraryDay, ItineraryResponse, TripInput } from '@/types/itinerary';
import SpotlightCard from '@/components/SpotlightCard';
import InteractiveParticles from '@/components/InteractiveParticles';

interface Props {
  data: ItineraryResponse;
  tripInput?: TripInput;
  onReplan: () => void;
}

const getTransitIcon = (mode: string) => {
  const m = mode.toLowerCase();
  if (m.includes('train') || m.includes('irctc')) return Train;
  if (m.includes('bus') || m.includes('hrtc') || m.includes('ksrtc')) return Bus;
  if (m.includes('walk') || m.includes('trek')) return Footprints;
  return Car;
};

const foodLabel: Record<string, string> = {
  dhaba: '🏕 Dhaba',
  local_eatery: '🍛 Local Eatery',
  cafe: '☕ Café',
};

const DAY_GRADIENTS = [
  'linear-gradient(135deg, #4F46E5, #7C3AED)',
  'linear-gradient(135deg, #F97316, #EF4444)',
  'linear-gradient(135deg, #10B981, #0891B2)',
  'linear-gradient(135deg, #D97706, #F59E0B)',
  'linear-gradient(135deg, #7C3AED, #4F46E5)',
  'linear-gradient(135deg, #0891B2, #10B981)',
  'linear-gradient(135deg, #EF4444, #F97316)',
];

const DAY_GLOWS = [
  'rgba(99, 102, 241, 0.2)',
  'rgba(249, 115, 22, 0.2)',
  'rgba(16, 185, 129, 0.2)',
  'rgba(217, 119, 6, 0.2)',
  'rgba(124, 58, 237, 0.2)',
  'rgba(8, 145, 178, 0.2)',
  'rgba(239, 68, 68, 0.2)',
];

export default function TimelineResult({ data, tripInput, onReplan }: Props) {
  const [openDays, setOpenDays] = useState<Set<number>>(new Set([1]));

  const toggle = (d: number) =>
    setOpenDays(prev => { const n = new Set(prev); n.has(d) ? n.delete(d) : n.add(d); return n; });

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

  const totalTransport = data.days.reduce((s, d) => s + d.transit_logistics.estimated_fare_inr, 0);
  const dailyAvg = Math.round(data.trip_summary.total_estimated_cost_inr / data.days.length);

  return (
    <div className="min-h-screen bg-[#030309] noise pb-24 relative">
      {/* Background Particles */}
      <InteractiveParticles />

      {/* Ambient Grid */}
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

      {/* Ambient glows */}
      <div className="orb orb-1 absolute top-[-5%] left-[-10%] opacity-35 pointer-events-none" />
      <div className="orb orb-2 absolute top-[25%] right-[-15%] opacity-25 pointer-events-none" />

      {/* ── HERO BANNER ── */}
      <div
        className="pt-28 pb-16 px-5 sm:px-8 border-b border-white/[0.06] relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow mb-3">AI-Generated Itinerary</p>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-4 leading-tight">
              {tripInput?.starting_city && `${tripInput.starting_city} → `}
              <span className="grad-multi">{data.trip_summary.destination}</span>
            </h1>
            <div className="flex flex-wrap items-center gap-3 mb-8">
              {[
                { label: `${data.days.length} Days` },
                tripInput?.budget ? { label: tripInput.budget } : null,
                tripInput?.vibe   ? { label: tripInput.vibe }   : null,
              ].filter(Boolean).map((b, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/5 border border-white/10 text-white/70"
                >
                  {(b as { label: string }).label}
                </span>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 max-w-lg">
              {[
                { label: 'Total Budget', value: fmt(data.trip_summary.total_estimated_cost_inr), color: 'grad-saffron' },
                { label: 'Transport', value: fmt(totalTransport), color: 'text-white' },
                { label: 'Per Day', value: fmt(dailyAvg), color: 'text-white/80' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl p-4 border border-white/[0.06] bg-white/[0.02] backdrop-blur-md"
                >
                  <p className="text-[9px] font-black uppercase tracking-wider text-white/30 mb-1">{s.label}</p>
                  <p className={`font-display font-bold text-lg ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 relative z-10">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">

          {/* ── SIDEBAR NAVIGATOR ── */}
          <div className="lg:sticky lg:top-24 self-start space-y-4">
            <div className="border border-white/[0.06] bg-white/[0.02] backdrop-blur-md rounded-2xl p-5">
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                <LayoutList className="w-4 h-4 text-indigo-400" />
                Days Overview
              </h3>
              <div className="space-y-2">
                {data.days.map((day, i) => (
                  <button
                    key={day.day_number}
                    onClick={() => toggle(day.day_number)}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 text-left border border-transparent hover:border-white/5"
                    style={{
                      background: openDays.has(day.day_number) ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-[10px] flex-shrink-0"
                      style={{ background: DAY_GRADIENTS[i % DAY_GRADIENTS.length] }}
                    >
                      {day.day_number}
                    </div>
                    <p className="text-xs font-semibold text-white/70 truncate">{day.morning_activity.title}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={onReplan}
              className="btn-glow w-full py-3.5 text-xs flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Re-plan This Trip
            </button>
          </div>

          {/* ── TIMELINE RESULT CARDS ── */}
          <div className="space-y-6">
            {data.days.map((day, i) => (
              <DayCard
                key={day.day_number}
                day={day}
                gradient={DAY_GRADIENTS[i % DAY_GRADIENTS.length]}
                glowColor={DAY_GLOWS[i % DAY_GLOWS.length]}
                isOpen={openDays.has(day.day_number)}
                onToggle={() => toggle(day.day_number)}
                fmt={fmt}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DayCard({
  day, gradient, glowColor, isOpen, onToggle, fmt,
}: {
  day: ItineraryDay;
  gradient: string;
  glowColor: string;
  isOpen: boolean;
  onToggle: () => void;
  fmt: (n: number) => string;
}) {
  const TransitIcon = getTransitIcon(day.transit_logistics.mode);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <SpotlightCard
        glowColor={glowColor}
        className="w-full"
      >
        <button
          onClick={onToggle}
          className="w-full flex items-center gap-4 p-5 text-left transition-colors cursor-pointer select-none"
          aria-expanded={isOpen}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-display font-black text-lg flex-shrink-0"
            style={{ background: gradient }}
          >
            {day.day_number}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display font-bold text-white text-base leading-tight truncate">{day.morning_activity.title}</p>
            <p className="text-xs text-white/50 font-semibold mt-1 flex items-center gap-1.5">
              <TransitIcon className="w-3.5 h-3.5 opacity-60" />
              {day.transit_logistics.mode} · {fmt(day.transit_logistics.estimated_fare_inr)}
            </p>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10"
          >
            <ChevronDown className="w-4 h-4 text-white/60" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="px-5 pb-6 space-y-6 border-t border-white/[0.06] pt-6">

                {/* Transit Details */}
                <Row
                  icon={<TransitIcon className="w-4 h-4 text-white" />}
                  bg="var(--saffron)"
                  tag="Transit"
                  tagClass="pill pill-saffron"
                  title={day.transit_logistics.mode}
                >
                  <p className="text-sm text-white/60 leading-relaxed font-medium">{day.transit_logistics.details}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-xs font-bold text-orange-400">
                      <IndianRupee className="w-3 h-3" />{fmt(day.transit_logistics.estimated_fare_inr)}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    <span className="text-xs text-white/40 font-semibold">{day.transit_logistics.booking_hint_keyword}</span>
                  </div>
                </Row>

                {/* Morning Activity */}
                <Row
                  icon={<Sun className="w-4 h-4 text-white" />}
                  bg="var(--indigo)"
                  tag="Morning"
                  tagClass="pill pill-indigo"
                  title={day.morning_activity.title}
                >
                  <p className="text-sm text-white/60 leading-relaxed font-medium">{day.morning_activity.description}</p>
                </Row>

                {/* Lunch Spot */}
                <Row
                  icon={<UtensilsCrossed className="w-4 h-4 text-white" />}
                  bg="#D97706"
                  tag="Lunch"
                  tagClass="pill bg-amber-500/10 text-amber-300 border border-amber-500/35"
                  title={day.lunch_spot.name}
                >
                  <span className="inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2 bg-amber-500/15 text-amber-300 border border-amber-500/20">
                    {foodLabel[day.lunch_spot.type] ?? day.lunch_spot.type}
                  </span>
                  <p className="text-sm text-white/60 font-medium">
                    <span className="font-bold text-white">Must try: </span>
                    {day.lunch_spot.must_try_dish}
                  </p>
                </Row>

                {/* Afternoon Activity */}
                <Row
                  icon={<Sunset className="w-4 h-4 text-white" />}
                  bg="#7C3AED"
                  tag="Afternoon"
                  tagClass="pill bg-violet-500/10 text-violet-300 border border-violet-500/35"
                  title={day.afternoon_activity.title}
                >
                  <p className="text-sm text-white/60 leading-relaxed font-medium">{day.afternoon_activity.description}</p>
                </Row>

                {/* Dinner & Stay Details */}
                <Row
                  icon={<Moon className="w-4 h-4 text-white" />}
                  bg="#059669"
                  tag="Night"
                  tagClass="pill pill-jade"
                  title={day.dinner_and_stay.restaurant}
                >
                  <p className="text-sm text-white/60 font-medium leading-relaxed">
                    <span className="font-bold text-white">Stay: </span>
                    {day.dinner_and_stay.stay_recommendation}
                  </p>
                </Row>

                {/* Custom booking affiliate banner */}
                {day.affiliate_cta && (
                  <motion.a
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    href={day.affiliate_cta.target_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/[0.03] hover:bg-indigo-500/[0.08] hover:border-indigo-500/40 transition-all duration-300 cursor-pointer select-none group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-indigo-600/20 border border-indigo-500/20">
                        <Tag className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">via {day.affiliate_cta.platform_name}</p>
                        <p className="text-sm font-bold text-indigo-300 group-hover:text-indigo-200 transition-colors">{day.affiliate_cta.button_label}</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors" />
                  </motion.a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SpotlightCard>
    </motion.div>
  );
}

function Row({
  icon, bg, tag, tagClass, title, children,
}: {
  icon: React.ReactNode;
  bg: string;
  tag: string;
  tagClass: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: bg }}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <span className={`${tagClass} mb-2`}>
          {tag}
        </span>
        <p className="font-display font-bold text-sm text-white mb-1.5 leading-tight">{title}</p>
        {children}
      </div>
    </div>
  );
}
