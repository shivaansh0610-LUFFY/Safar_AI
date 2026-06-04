'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Calendar, Wallet, Zap, ArrowRight, ArrowLeft, Mountain, TreePalm, UtensilsCrossed, Check, Loader as Loader2, Globe, Sparkles } from 'lucide-react';

import { Budget, TripInput, Vibe } from '@/types/itinerary';

interface PlannerPanelProps {
  onSubmit: (data: TripInput) => void;
  isLoading: boolean;
}

const BUDGETS: { value: Budget; label: string; desc: string; emoji: string }[] = [
  { value: 'Backpacker', label: 'Budget',    desc: '₹800–1,500/day',  emoji: '🎒' },
  { value: 'Mid-tier',   label: 'Mid-Range', desc: '₹2,000–5,000/day', emoji: '🏨' },
  { value: 'Luxury',     label: 'Luxury',    desc: '₹7,000+/day',     emoji: '✨' },
];

const VIBES: { value: Vibe; label: string; desc: string; Icon: React.ElementType }[] = [
  { value: 'Adventure', label: 'Adventure', desc: 'Treks & thrills',     Icon: Mountain },
  { value: 'Culture',   label: 'Culture',   desc: 'Temples & heritage',  Icon: Globe },
  { value: 'Chill',     label: 'Chill',     desc: 'Beaches & cafés',     Icon: TreePalm },
  { value: 'Foodie',    label: 'Foodie',    desc: 'Dhabas & street food', Icon: UtensilsCrossed },
];

const POPULAR_ORIGINS = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Kolkata'];
const POPULAR_DESTS   = ['Manali', 'Goa', 'Kerala', 'Rishikesh', 'Jaisalmer', 'Spiti'];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

export default function PlannerPanel({ onSubmit, isLoading }: PlannerPanelProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<Partial<TripInput>>({ days: 5 });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (key: keyof TripInput, value: string | number) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const validate = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!form.starting_city?.trim()) e.starting_city = 'Enter your starting city';
      if (!form.destination?.trim())   e.destination   = 'Enter your destination';
      if (!form.days || form.days < 1 || form.days > 30) e.days = '1–30 days only';
    }
    if (s === 1) {
      if (!form.budget) e.budget = 'Pick a budget';
      if (!form.vibe)   e.vibe   = 'Pick a vibe';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    if (step === 1) { onSubmit(form as TripInput); return; }
    setDirection(1);
    setStep(s => s + 1);
    setErrors({});
  };

  const back = () => { setDirection(-1); setStep(s => s - 1); setErrors({}); };

  return (
    <div className="w-full">
      {/* Step progress */}
      <div className="flex items-center gap-2 mb-5">
        {[0, 1].map(i => (
          <div key={i} className="flex items-center gap-2 flex-1">
            <div className={`step-dot ${i < step ? 'step-dot-done' : i === step ? 'step-dot-active' : 'step-dot-inactive'}`}>
              {i < step ? <Check className="w-3.5 h-3.5" /> : <span>{i + 1}</span>}
            </div>
            {i < 1 && (
              <div className="flex-1 h-px relative bg-[var(--border-color)]">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[var(--accent)]"
                  animate={{ width: i < step ? '100%' : '0%' }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}
          </div>
        ))}
        <span className="text-[11px] text-[var(--text-tertiary)] font-medium ml-1 uppercase tracking-wider">
          {step === 0 ? 'Trip Details' : 'Preferences'}
        </span>
      </div>

      <div
        className="editorial-card overflow-hidden rounded-xl"
        style={{ minHeight: '320px', padding: '1.75rem' }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* STEP 0 */}
            {step === 0 && (
              <div>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div>
                    <label className="text-[11px] text-[var(--text-tertiary)] font-semibold uppercase tracking-[0.1em] mb-1.5 flex items-center gap-1.5">
                      <Navigation className="w-3 h-3" /> From
                    </label>
                    <input
                      type="text"
                      placeholder="Delhi, Mumbai..."
                      value={form.starting_city || ''}
                      onChange={e => update('starting_city', e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && next()}
                      className="input-field"
                      autoFocus
                    />
                    {errors.starting_city && <ErrMsg msg={errors.starting_city} />}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {POPULAR_ORIGINS.slice(0, 4).map(c => (
                        <button
                          key={c}
                          onClick={() => update('starting_city', c)}
                          className={`chip text-xs py-0.5 px-2.5 ${form.starting_city === c ? 'chip-selected' : ''}`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] text-[var(--text-tertiary)] font-semibold uppercase tracking-[0.1em] mb-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" /> To
                    </label>
                    <input
                      type="text"
                      placeholder="Manali, Goa..."
                      value={form.destination || ''}
                      onChange={e => update('destination', e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && next()}
                      className="input-field"
                    />
                    {errors.destination && <ErrMsg msg={errors.destination} />}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {POPULAR_DESTS.slice(0, 4).map(d => (
                        <button
                          key={d}
                          onClick={() => update('destination', d)}
                          className={`chip text-xs py-0.5 px-2.5 ${form.destination === d ? 'chip-selected' : ''}`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Days */}
                <div>
                  <label className="text-[11px] text-[var(--text-tertiary)] font-semibold uppercase tracking-[0.1em] mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" /> Duration
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => update('days', Math.max(1, (form.days || 5) - 1))}
                      className="w-10 h-10 rounded-lg border border-[var(--border-color)] flex items-center justify-center text-xl font-light text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-white/[0.02] transition-all duration-200"
                    >
                      &minus;
                    </button>
                    <div className="flex-1 text-center">
                      <motion.span
                        key={form.days}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="font-display font-medium text-5xl text-[var(--text-primary)]"
                      >
                        {form.days}
                      </motion.span>
                      <p className="text-[var(--text-tertiary)] text-sm">days</p>
                    </div>
                    <button
                      onClick={() => update('days', Math.min(30, (form.days || 5) + 1))}
                      className="w-10 h-10 rounded-lg border border-[var(--border-color)] flex items-center justify-center text-xl font-light text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-white/[0.02] transition-all duration-200"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3 justify-center">
                    {[3, 5, 7, 10].map(d => (
                      <button
                        key={d}
                        onClick={() => update('days', d)}
                        className={`chip text-xs py-0.5 px-2.5 ${form.days === d ? 'chip-selected' : ''}`}
                      >
                        {d}d
                      </button>
                    ))}
                  </div>
                  {errors.days && <ErrMsg msg={errors.days} />}
                </div>
              </div>
            )}

            {/* STEP 1 */}
            {step === 1 && (
              <div>
                <div className="mb-6">
                  <p className="text-[11px] text-[var(--text-tertiary)] font-semibold uppercase tracking-[0.1em] mb-3 flex items-center gap-1.5">
                    <Wallet className="w-3 h-3" /> Budget
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {BUDGETS.map(b => (
                      <button
                        key={b.value}
                        onClick={() => update('budget', b.value)}
                        className={`card-select rounded-xl ${form.budget === b.value ? 'selected' : ''}`}
                      >
                        <span className="text-2xl">{b.emoji}</span>
                        <span className="text-xs font-semibold" style={{ color: form.budget === b.value ? 'var(--accent-300)' : 'var(--text-secondary)' }}>
                          {b.label}
                        </span>
                        <span className="text-[10px] text-[var(--text-tertiary)]">{b.desc}</span>
                      </button>
                    ))}
                  </div>
                  {errors.budget && <ErrMsg msg={errors.budget} />}
                </div>

                <div>
                  <p className="text-[11px] text-[var(--text-tertiary)] font-semibold uppercase tracking-[0.1em] mb-3 flex items-center gap-1.5">
                    <Zap className="w-3 h-3" /> Trip Vibe
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {VIBES.map(v => (
                      <button
                        key={v.value}
                        onClick={() => update('vibe', v.value)}
                        className={`card-select-row rounded-xl ${form.vibe === v.value ? 'selected' : ''}`}
                      >
                        <v.Icon
                          className="w-4 h-4 flex-shrink-0 transition-colors duration-200"
                          style={{ color: form.vibe === v.value ? 'var(--accent-300)' : 'var(--text-tertiary)' }}
                        />
                        <div>
                          <p className="text-xs font-semibold" style={{ color: form.vibe === v.value ? 'var(--accent-300)' : 'var(--text-secondary)' }}>
                            {v.label}
                          </p>
                          <p className="text-[10px] text-[var(--text-tertiary)]">{v.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  {errors.vibe && <ErrMsg msg={errors.vibe} />}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3 mt-5">
        {step > 0 && (
          <button onClick={back} className="btn-outline flex-none py-3 px-5 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        )}
        <button
          onClick={next}
          disabled={isLoading}
          className="btn-primary flex-1 py-3 text-sm"
        >
          {isLoading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Generating your safar...</>
          ) : step === 1 ? (
            <><Sparkles className="w-4 h-4" /> Generate My Safar</>
          ) : (
            <>Continue <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </div>
    </div>
  );
}

function ErrMsg({ msg }: { msg: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-1.5 text-xs flex items-center gap-1 text-[var(--error-400)]"
    >
      {msg}
    </motion.p>
  );
}
