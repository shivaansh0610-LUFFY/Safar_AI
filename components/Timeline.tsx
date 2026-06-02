'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bus, Footprints, UtensilsCrossed, Moon, Sun, Sunset, ChevronDown,
  ChevronUp, IndianRupee, ExternalLink, Train, Car, Tag, MapPin,
} from 'lucide-react';
import { ItineraryDay, ItineraryResponse } from '@/types/itinerary';

interface TimelineProps {
  data: ItineraryResponse;
}

const getTransitIcon = (mode: string) => {
  const m = mode.toLowerCase();
  if (m.includes('train') || m.includes('irctc')) return Train;
  if (m.includes('bus') || m.includes('hrtc') || m.includes('ksrtc') || m.includes('redbus')) return Bus;
  return Car;
};

const foodTypeLabel: Record<string, string> = {
  dhaba: '🏕 Dhaba',
  local_eatery: '🍛 Local Eatery',
  cafe: '☕ Café',
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Timeline({ data }: TimelineProps) {
  const [openDays, setOpenDays] = useState<Set<number>>(new Set([1]));

  const toggleDay = (day: number) =>
    setOpenDays((prev) => {
      const next = new Set(prev);
      next.has(day) ? next.delete(day) : next.add(day);
      return next;
    });

  const formatINR = (n: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Trip Summary Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 mb-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-brand-400 uppercase tracking-wider font-semibold mb-1">AI-Generated Itinerary</p>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
              {data.trip_summary.destination}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-400" />
                {data.days.length} days
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-700" />
              <span className="flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-sand-400" />
                Est. {formatINR(data.trip_summary.total_estimated_cost_inr)} total
              </span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="px-3 py-2 rounded-xl text-center" style={{ background: 'rgba(48,150,102,0.1)', border: '1px solid rgba(48,150,102,0.2)' }}>
              <p className="text-brand-300 font-display font-bold text-2xl">{data.days.length}</p>
              <p className="text-gray-500 text-xs">Days</p>
            </div>
          </div>
        </div>

        {/* Cost breakdown strip */}
        <div className="mt-5 pt-5 border-t border-white/[0.06] grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <p className="text-gray-500 text-xs mb-1">Transport</p>
            <p className="font-semibold text-white">
              {formatINR(data.days.reduce((s, d) => s + d.transit_logistics.estimated_fare_inr, 0))}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-1">Daily Avg</p>
            <p className="font-semibold text-sand-400">
              {formatINR(Math.round(data.trip_summary.total_estimated_cost_inr / data.days.length))}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-1">Currency</p>
            <p className="font-semibold text-white">INR ₹</p>
          </div>
        </div>
      </motion.div>

      {/* Timeline Days */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {data.days.map((day) => (
          <DayCard
            key={day.day_number}
            day={day}
            isOpen={openDays.has(day.day_number)}
            onToggle={() => toggleDay(day.day_number)}
            formatINR={formatINR}
          />
        ))}
      </motion.div>
    </div>
  );
}

function DayCard({
  day,
  isOpen,
  onToggle,
  formatINR,
}: {
  day: ItineraryDay;
  isOpen: boolean;
  onToggle: () => void;
  formatINR: (n: number) => string;
}) {
  const TransitIcon = getTransitIcon(day.transit_logistics.mode);

  return (
    <motion.div variants={cardVariants} className="glass-card overflow-hidden">
      {/* Day Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          <div className="timeline-node timeline-node-transit flex-shrink-0">
            <span className="font-display font-bold text-white text-sm">D{day.day_number}</span>
          </div>
          <div>
            <p className="font-semibold text-white text-base leading-tight">{day.morning_activity.title}</p>
            <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
              <TransitIcon className="w-3 h-3 text-brand-400" />
              {day.transit_logistics.mode} · {formatINR(day.transit_logistics.estimated_fare_inr)}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 text-gray-500"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-5 pb-5 space-y-4 border-t border-white/[0.05] pt-4">
              {/* Transit */}
              <Section
                icon={<TransitIcon className="w-4 h-4 text-white" />}
                nodeClass="timeline-node-transit"
                tag="Transit"
                tagClass="tag-transit"
                title={day.transit_logistics.mode}
              >
                <p className="text-sm text-gray-400 leading-relaxed">{day.transit_logistics.details}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="flex items-center gap-1 text-xs text-sand-400 font-medium">
                    <IndianRupee className="w-3 h-3" />
                    {formatINR(day.transit_logistics.estimated_fare_inr)}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-700" />
                  <span className="text-xs text-gray-600">{day.transit_logistics.booking_hint_keyword}</span>
                </div>
              </Section>

              {/* Morning */}
              <Section
                icon={<Sun className="w-4 h-4 text-white" />}
                nodeClass="timeline-node-activity"
                tag="Morning"
                tagClass="tag-activity"
                title={day.morning_activity.title}
              >
                <p className="text-sm text-gray-400 leading-relaxed">{day.morning_activity.description}</p>
              </Section>

              {/* Lunch */}
              <Section
                icon={<UtensilsCrossed className="w-4 h-4 text-white" />}
                nodeClass="timeline-node-food"
                tag="Lunch"
                tagClass="tag-food"
                title={day.lunch_spot.name}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full border text-sand-400 bg-sand-400/10 border-sand-400/20">
                    {foodTypeLabel[day.lunch_spot.type]}
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  <span className="text-sand-300 font-medium">Must try:</span>{' '}
                  {day.lunch_spot.must_try_dish}
                </p>
              </Section>

              {/* Afternoon */}
              <Section
                icon={<Sunset className="w-4 h-4 text-white" />}
                nodeClass="timeline-node-activity"
                tag="Afternoon"
                tagClass="tag-activity"
                title={day.afternoon_activity.title}
              >
                <p className="text-sm text-gray-400 leading-relaxed">{day.afternoon_activity.description}</p>
              </Section>

              {/* Dinner & Stay */}
              <Section
                icon={<Moon className="w-4 h-4 text-white" />}
                nodeClass="timeline-node-stay"
                tag="Night"
                tagClass="tag-stay"
                title={day.dinner_and_stay.restaurant}
              >
                <p className="text-sm text-gray-400 leading-relaxed">
                  <span className="text-blue-300 font-medium">Stay:</span>{' '}
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
                  style={{
                    background: 'rgba(48,150,102,0.08)',
                    border: '1px solid rgba(48,150,102,0.25)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center">
                      <Tag className="w-3.5 h-3.5 text-brand-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">via {day.affiliate_cta.platform_name}</p>
                      <p className="text-sm font-semibold text-brand-300 group-hover:text-brand-200 transition-colors">
                        {day.affiliate_cta.button_label}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-brand-500 group-hover:text-brand-300 transition-colors flex-shrink-0" />
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
  icon,
  nodeClass,
  tag,
  tagClass,
  title,
  children,
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
      <div className={`timeline-node w-8 h-8 ${nodeClass} flex-shrink-0 mt-0.5`}>{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold uppercase tracking-wider ${tagClass}`}>
            {tag}
          </span>
        </div>
        <p className="font-semibold text-white text-sm mb-1.5 leading-tight">{title}</p>
        {children}
      </div>
    </div>
  );
}
