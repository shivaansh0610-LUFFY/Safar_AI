'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bus, Train, Car, Footprints, UtensilsCrossed, Moon, Sun, Sunset,
  ChevronDown, IndianRupee, ExternalLink, MapPin, Tag, Sparkles,
} from 'lucide-react';
import { ItineraryDay, ItineraryResponse, TripInput } from '@/types/itinerary';

interface TimelineResultProps {
  data: ItineraryResponse;
  tripInput?: TripInput;
  onReplan: () => void;
}

const getTransitIcon = (mode: string) => {
  const m = mode.toLowerCase();
  if (m.includes('train') || m.includes('irctc')) return Train;
  if (m.includes('bus') || m.includes('hrtc') || m.includes('ksrtc') || m.includes('redbus')) return Bus;
  if (m.includes('walk') || m.includes('trek')) return Footprints;
  return Car;
};

const foodTypeLabel: Record<string, string> = {
  dhaba: '🏕 Dhaba',
  local_eatery: '🍛 Local Eatery',
  cafe: '☕ Café',
};

const DAY_COLORS = ['#F4845F', '#F5A623', '#a78bfa', '#34d399', '#60a5fa', '#f472b6', '#fb923c'];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function TimelineResult({ data, tripInput, onReplan }: TimelineResultProps) {
  const [openDays, setOpenDays] = useState<Set<number>>(new Set([1]));

  const toggleDay = (day: number) =>
    setOpenDays(prev => {
      const next = new Set(prev);
      next.has(day) ? next.delete(day) : next.add(day);
      return next;
    });

  const formatINR = (n: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

  const totalTransport = data.days.reduce((s, d) => s + d.transit_logistics.estimated_fare_inr, 0);
  const dailyAvg = Math.round(data.trip_summary.total_estimated_cost_inr / data.days.length);

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-12">

          {/* ── SIDEBAR ── */}
          <div className="lg:sticky lg:top-28 self-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="editorial-card p-6"
            >
              <p className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider font-semibold mb-1">
                AI-Generated Safar
              </p>
              <h2 className="font-display font-medium text-2xl text-[var(--text-primary)] mb-1">
                {data.trip_summary.destination}
              </h2>
              <div className="flex items-center gap-2 text-sm mb-5 text-[var(--text-secondary)]">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>{data.days.length} days</span>
                {tripInput && (
                  <>
                    <span className="w-1 h-1 bg-[var(--border-color)]" />
                    <span>{tripInput.budget}</span>
                    <span className="w-1 h-1 bg-[var(--border-color)]" />
                    <span>{tripInput.vibe}</span>
                  </>
                )}
              </div>

              {/* Cost breakdown */}
              <div className="space-y-3 mb-6">
                <CostRow label="Total Estimate" value={formatINR(data.trip_summary.total_estimated_cost_inr)} highlight />
                <CostRow label="Transport" value={formatINR(totalTransport)} />
                <CostRow label="Daily Average" value={formatINR(dailyAvg)} />
                <CostRow label="Currency" value="INR ₹" />
              </div>

              {/* Re-plan */}
              <button onClick={onReplan} className="btn-editorial w-full text-sm py-3 mt-4">
                <Sparkles className="w-4 h-4" />
                Re-plan This Trip
              </button>
            </motion.div>
          </div>

          {/* ── MAIN TIMELINE ── */}
          <div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {data.days.map((day, i) => (
                <DayCard
                  key={day.day_number}
                  day={day}
                  accentColor={DAY_COLORS[i % DAY_COLORS.length]}
                  isOpen={openDays.has(day.day_number)}
                  onToggle={() => toggleDay(day.day_number)}
                  formatINR={formatINR}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CostRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2 last:border-0 last:pb-0">
      <span className="text-xs text-[var(--text-secondary)]">{label}</span>
      <span
        className="text-sm font-medium"
        style={{ color: highlight ? 'var(--accent)' : 'var(--text-primary)' }}
      >
        {value}
      </span>
    </div>
  );
}

function DayCard({
  day, accentColor, isOpen, onToggle, formatINR,
}: {
  day: ItineraryDay;
  accentColor: string;
  isOpen: boolean;
  onToggle: () => void;
  formatINR: (n: number) => string;
}) {
  const TransitIcon = getTransitIcon(day.transit_logistics.mode);

  return (
    <motion.div variants={cardVariants} className="editorial-card overflow-hidden">
      {/* Day header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left transition-colors duration-200 border-b border-[var(--border-color)]"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 border border-[var(--border-color)] flex items-center justify-center flex-shrink-0 font-display font-medium text-sm text-[var(--text-primary)]"
            style={{ background: 'var(--bg-base)' }}
          >
            D{day.day_number}
          </div>
          <div>
            <p className="font-display text-[var(--text-primary)] text-lg leading-tight">
              {day.morning_activity.title}
            </p>
            <p className="text-xs mt-1 flex items-center gap-1.5 text-[var(--text-secondary)]">
              <TransitIcon className="w-3 h-3 text-[var(--accent)]" />
              {day.transit_logistics.mode} · {formatINR(day.transit_logistics.estimated_fare_inr)}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 text-[var(--text-tertiary)]"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="px-5 pb-5 space-y-4 pt-4"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
            >
              {/* Transit */}
              <Section
                icon={<TransitIcon className="w-4 h-4 text-white" />}
                nodeClass="node-transit"
                tag="Transit"
                tagClass="tag-transit"
                title={day.transit_logistics.mode}
              >
                <p className="text-sm leading-relaxed" style={{ color: '#8B8B8B' }}>
                  {day.transit_logistics.details}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="flex items-center gap-1 text-xs font-medium" style={{ color: '#F5A623' }}>
                    <IndianRupee className="w-3 h-3" />
                    {formatINR(day.transit_logistics.estimated_fare_inr)}
                  </span>
                  <span className="w-1 h-1 rounded-full" style={{ background: '#4B4B4B' }} />
                  <span className="text-xs" style={{ color: '#4B4B4B' }}>
                    {day.transit_logistics.booking_hint_keyword}
                  </span>
                </div>
              </Section>

              {/* Morning */}
              <Section
                icon={<Sun className="w-4 h-4 text-white" />}
                nodeClass="node-activity"
                tag="Morning"
                tagClass="tag-activity"
                title={day.morning_activity.title}
              >
                <p className="text-sm leading-relaxed" style={{ color: '#8B8B8B' }}>
                  {day.morning_activity.description}
                </p>
              </Section>

              {/* Lunch */}
              <Section
                icon={<UtensilsCrossed className="w-4 h-4 text-white" />}
                nodeClass="node-food"
                tag="Lunch"
                tagClass="tag-food"
                title={day.lunch_spot.name}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(245,166,35,0.1)', color: '#F5A623', border: '1px solid rgba(245,166,35,0.2)' }}>
                    {foodTypeLabel[day.lunch_spot.type] ?? day.lunch_spot.type}
                  </span>
                </div>
                <p className="text-sm" style={{ color: '#8B8B8B' }}>
                  <span className="font-medium" style={{ color: '#F9C86A' }}>Must try: </span>
                  {day.lunch_spot.must_try_dish}
                </p>
              </Section>

              {/* Afternoon */}
              <Section
                icon={<Sunset className="w-4 h-4 text-white" />}
                nodeClass="node-activity"
                tag="Afternoon"
                tagClass="tag-activity"
                title={day.afternoon_activity.title}
              >
                <p className="text-sm leading-relaxed" style={{ color: '#8B8B8B' }}>
                  {day.afternoon_activity.description}
                </p>
              </Section>

              {/* Night */}
              <Section
                icon={<Moon className="w-4 h-4 text-white" />}
                nodeClass="node-stay"
                tag="Night"
                tagClass="tag-stay"
                title={day.dinner_and_stay.restaurant}
              >
                <p className="text-sm leading-relaxed" style={{ color: '#8B8B8B' }}>
                  <span className="font-medium" style={{ color: '#6ee7b7' }}>Stay: </span>
                  {day.dinner_and_stay.stay_recommendation}
                </p>
              </Section>

              {/* Affiliate CTA */}
              {day.affiliate_cta && (
                <motion.a
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  href={day.affiliate_cta.target_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl mt-1 transition-all duration-300 group"
                  style={{ background: 'rgba(244,132,95,0.07)', border: '1px solid rgba(244,132,95,0.2)' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(244,132,95,0.15)' }}>
                      <Tag className="w-3.5 h-3.5" style={{ color: '#F4845F' }} />
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: '#8B8B8B' }}>via {day.affiliate_cta.platform_name}</p>
                      <p className="text-sm font-semibold group-hover:text-[#F8A98A] transition-colors" style={{ color: '#F4845F' }}>
                        {day.affiliate_cta.button_label}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 flex-shrink-0 group-hover:text-[#F4845F] transition-colors" style={{ color: '#4B4B4B' }} />
                </motion.a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Section({
  icon, nodeClass, tag, tagClass, title, children,
}: {
  icon: React.ReactNode;
  nodeClass: string;
  tag: string;
  tagClass: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className={`timeline-node ${nodeClass} flex-shrink-0 mt-0.5`}>{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold uppercase tracking-wider ${tagClass}`}>
            {tag}
          </span>
        </div>
        <p className="font-semibold text-[#F5F0E8] text-sm mb-1.5 leading-tight">{title}</p>
        {children}
      </div>
    </div>
  );
}
