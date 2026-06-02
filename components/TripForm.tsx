'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Navigation, Calendar, Wallet, Zap, ArrowRight, ArrowLeft,
  Mountain, TreePalm, Coffee, UtensilsCrossed, Check, Loader2,
} from 'lucide-react';
import { Budget, TripInput, Vibe } from '@/types/itinerary';

interface TripFormProps {
  onSubmit: (data: TripInput) => void;
  isLoading: boolean;
}

const BUDGETS: { value: Budget; label: string; desc: string; icon: string }[] = [
  { value: 'Backpacker', label: 'Backpacker', desc: '₹800–1,500/day', icon: '🎒' },
  { value: 'Mid-tier', label: 'Mid-Tier', desc: '₹2,000–4,500/day', icon: '🏨' },
  { value: 'Luxury', label: 'Luxury', desc: '₹7,000+/day', icon: '✨' },
];

const VIBES: { value: Vibe; label: string; desc: string; Icon: React.ElementType }[] = [
  { value: 'Adventure', label: 'Adventure', desc: 'Treks, rafting, camping', Icon: Mountain },
  { value: 'Culture', label: 'Culture', desc: 'Temples, art, heritage', Icon: Zap },
  { value: 'Chill', label: 'Chill', desc: 'Cafés, beaches, lazy days', Icon: TreePalm },
  { value: 'Foodie', label: 'Foodie', desc: 'Dhabas, street food, local thalis', Icon: UtensilsCrossed },
];

const steps = ['Origin', 'Destination', 'Duration', 'Budget & Vibe'];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

export default function TripForm({ onSubmit, isLoading }: TripFormProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<Partial<TripInput>>({
    days: 5,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (key: keyof TripInput, value: string | number) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validate = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0 && !form.starting_city?.trim()) e.starting_city = 'Enter a starting city';
    if (s === 1 && !form.destination?.trim()) e.destination = 'Enter a destination';
    if (s === 2 && (!form.days || form.days < 1 || form.days > 30)) e.days = 'Choose between 1–30 days';
    if (s === 3) {
      if (!form.budget) e.budget = 'Pick a budget';
      if (!form.vibe) e.vibe = 'Pick a vibe';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    if (step === steps.length - 1) {
      onSubmit(form as TripInput);
    } else {
      setDirection(1);
      setStep((s) => s + 1);
    }
  };

  const back = () => {
    setDirection(-1);
    setStep((s) => s - 1);
    setErrors({});
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Step Progress */}
      <div className="flex items-center mb-8 gap-2">
        {steps.map((label, i) => (
          <div key={i} className="flex items-center gap-2 flex-1">
            <div className="relative flex flex-col items-center">
              <motion.div
                animate={{
                  scale: i === step ? 1.1 : 1,
                }}
                className={`step-dot ${
                  i < step
                    ? 'step-dot-done'
                    : i === step
                    ? 'step-dot-active'
                    : 'step-dot-inactive'
                }`}
              >
                {i < step ? <Check className="w-3.5 h-3.5" /> : <span>{i + 1}</span>}
              </motion.div>
              <span
                className={`mt-1 text-[10px] font-medium whitespace-nowrap hidden sm:block transition-colors duration-300 ${
                  i === step ? 'text-brand-400' : i < step ? 'text-gray-500' : 'text-gray-700'
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-px bg-white/[0.06] relative -mt-4 sm:mt-0">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-brand-500/50"
                  animate={{ width: i < step ? '100%' : '0%' }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Form Card */}
      <div
        className="glass-card p-6 sm:p-8 overflow-hidden"
        style={{ minHeight: '340px' }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Step 0 — Starting City */}
            {step === 0 && (
              <StepWrapper title="Where are you starting from?" icon={<Navigation className="w-5 h-5 text-brand-400" />}>
                <input
                  id="starting_city"
                  type="text"
                  placeholder="e.g. Delhi, Mumbai, Bangalore..."
                  value={form.starting_city || ''}
                  onChange={(e) => update('starting_city', e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && next()}
                  className="input-field text-base"
                  autoFocus
                />
                {errors.starting_city && <ErrorMsg msg={errors.starting_city} />}
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Kolkata'].map((city) => (
                    <button
                      key={city}
                      onClick={() => update('starting_city', city)}
                      className={`chip ${form.starting_city === city ? 'chip-selected' : ''}`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </StepWrapper>
            )}

            {/* Step 1 — Destination */}
            {step === 1 && (
              <StepWrapper title="Where do you want to go?" icon={<MapPin className="w-5 h-5 text-brand-400" />}>
                <input
                  id="destination"
                  type="text"
                  placeholder="e.g. Manali, Goa, Kerala, Jaisalmer..."
                  value={form.destination || ''}
                  onChange={(e) => update('destination', e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && next()}
                  className="input-field text-base"
                  autoFocus
                />
                {errors.destination && <ErrorMsg msg={errors.destination} />}
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Manali', 'Goa', 'Kerala', 'Rishikesh', 'Jaisalmer', 'Spiti'].map((d) => (
                    <button
                      key={d}
                      onClick={() => update('destination', d)}
                      className={`chip ${form.destination === d ? 'chip-selected' : ''}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </StepWrapper>
            )}

            {/* Step 2 — Duration */}
            {step === 2 && (
              <StepWrapper title="How many days?" icon={<Calendar className="w-5 h-5 text-brand-400" />}>
                <div className="flex items-center gap-6 mt-2">
                  <button
                    onClick={() => update('days', Math.max(1, (form.days || 5) - 1))}
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-light text-gray-300 hover:text-white hover:bg-white/[0.07] transition-all border border-white/[0.08]"
                  >
                    −
                  </button>
                  <div className="flex-1 text-center">
                    <motion.span
                      key={form.days}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="font-display font-bold text-6xl text-white"
                    >
                      {form.days}
                    </motion.span>
                    <p className="text-gray-500 text-sm mt-1">days</p>
                  </div>
                  <button
                    onClick={() => update('days', Math.min(30, (form.days || 5) + 1))}
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-light text-gray-300 hover:text-white hover:bg-white/[0.07] transition-all border border-white/[0.08]"
                  >
                    +
                  </button>
                </div>
                {errors.days && <ErrorMsg msg={errors.days} />}
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {[3, 5, 7, 10, 14].map((d) => (
                    <button
                      key={d}
                      onClick={() => update('days', d)}
                      className={`chip ${form.days === d ? 'chip-selected' : ''}`}
                    >
                      {d}d
                    </button>
                  ))}
                </div>
              </StepWrapper>
            )}

            {/* Step 3 — Budget + Vibe */}
            {step === 3 && (
              <StepWrapper title="Budget & trip vibe" icon={<Wallet className="w-5 h-5 text-brand-400" />}>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">Budget</p>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {BUDGETS.map((b) => (
                    <button
                      key={b.value}
                      onClick={() => update('budget', b.value)}
                      className={`card-select ${form.budget === b.value ? 'selected' : ''}`}
                    >
                      <span className="text-2xl">{b.icon}</span>
                      <span style={{ color: form.budget === b.value ? '#8acead' : '#d1d5db', fontSize: '0.75rem', fontWeight: 600 }}>{b.label}</span>
                      <span style={{ color: '#4b5563', fontSize: '0.625rem' }}>{b.desc}</span>
                    </button>
                  ))}
                </div>
                {errors.budget && <ErrorMsg msg={errors.budget} />}

                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">Trip Vibe</p>
                <div className="grid grid-cols-2 gap-2">
                  {VIBES.map((v) => (
                    <button
                      key={v.value}
                      onClick={() => update('vibe', v.value)}
                      className={`card-select-row ${form.vibe === v.value ? 'selected' : ''}`}
                    >
                      <v.Icon style={{ width: '1rem', height: '1rem', flexShrink: 0, color: form.vibe === v.value ? '#54b285' : '#6b7280' }} />
                      <div>
                        <p style={{ fontSize: '0.75rem', fontWeight: 600, color: form.vibe === v.value ? '#8acead' : '#d1d5db' }}>{v.label}</p>
                        <p style={{ fontSize: '0.625rem', color: '#4b5563', marginTop: '0.125rem' }}>{v.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
                {errors.vibe && <ErrorMsg msg={errors.vibe} />}
              </StepWrapper>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3 mt-5">
        {step > 0 && (
          <button onClick={back} className="btn-ghost flex-none py-3.5 px-5 rounded-xl text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        )}
        <button
          onClick={next}
          disabled={isLoading}
          className="btn-primary flex-1 py-3.5 rounded-xl text-sm disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating your itinerary...
            </>
          ) : step === steps.length - 1 ? (
            <>
              Generate Itinerary
              <Zap className="w-4 h-4" />
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function StepWrapper({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(48,150,102,0.1)', border: '1px solid rgba(48,150,102,0.2)' }}>
          {icon}
        </div>
        <h2 className="font-display font-semibold text-xl text-white">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function ErrorMsg({ msg }: { msg: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-2 text-xs text-red-400 flex items-center gap-1"
    >
      ⚠ {msg}
    </motion.p>
  );
}
