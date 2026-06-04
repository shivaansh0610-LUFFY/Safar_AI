'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, Mountain, Globe, TreePalm, UtensilsCrossed,
  Check, Loader2, Sparkles, MapPin, Navigation,
} from 'lucide-react';
import { Budget, TripInput, Vibe } from '@/types/itinerary';

interface Props {
  onSubmit: (data: TripInput) => void;
  isLoading: boolean;
  presetStart?: string;
  presetDest?: string;
}

const BUDGETS: { value: Budget; emoji: string; label: string; range: string }[] = [
  { value: 'Backpacker', emoji: '🎒', label: 'Budget',    range: '₹800–1,500/day' },
  { value: 'Mid-tier',   emoji: '🏨', label: 'Mid-Range', range: '₹2,000–5,000/day' },
  { value: 'Luxury',     emoji: '✨', label: 'Luxury',    range: '₹7,000+/day' },
];

const VIBES: { value: Vibe; Icon: React.ElementType; label: string; desc: string }[] = [
  { value: 'Adventure', Icon: Mountain,         label: 'Adventure', desc: 'Treks & thrills' },
  { value: 'Culture',   Icon: Globe,            label: 'Culture',   desc: 'Heritage & temples' },
  { value: 'Chill',     Icon: TreePalm,         label: 'Chill',     desc: 'Beaches & cafés' },
  { value: 'Foodie',    Icon: UtensilsCrossed,  label: 'Foodie',    desc: 'Dhabas & street food' },
];

const POPULAR_FROM = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad'];
const POPULAR_TO   = ['Manali', 'Goa', 'Kerala', 'Rishikesh', 'Jaisalmer'];

const slideVariant = {
  enter: (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
};

export default function PlannerPanel({ onSubmit, isLoading, presetStart, presetDest }: Props) {
  const [step, setStep] = useState(0);
  const [dir, setDir]   = useState(1);
  const [form, setForm] = useState<Partial<TripInput>>({ days: 5 });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (presetStart) {
      setForm(p => ({ ...p, starting_city: presetStart }));
      // Focus/go to step 0 if needed
      setStep(0);
    }
  }, [presetStart]);

  useEffect(() => {
    if (presetDest) {
      setForm(p => ({ ...p, destination: presetDest }));
      setStep(0);
    }
  }, [presetDest]);

  const set = (k: keyof TripInput, v: string | number) =>
    setForm(p => ({ ...p, [k]: v }));

  const validate = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!form.starting_city?.trim()) e.starting_city = 'Enter origin city';
      if (!form.destination?.trim())   e.destination   = 'Enter destination';
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
    setDir(1); setStep(s => s + 1); setErrors({});
  };
  const back = () => { setDir(-1); setStep(s => s - 1); setErrors({}); };

  return (
    <div
      className="rounded-2xl overflow-hidden glass-strong"
      style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)' }}
    >
      {/* Progress tabs */}
      <div
        className="flex border-b"
        style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      >
        {['Route & Duration', 'Budget & Vibe'].map((label, i) => (
          <div
            key={i}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-bold uppercase tracking-widest relative cursor-default transition-colors"
            style={{ color: step === i ? 'white' : 'var(--text-3)' }}
          >
            <div className={`sdot ${step > i ? 'sdot-done' : step === i ? 'sdot-active' : 'sdot-idle'}`}>
              {step > i ? <Check className="w-3 h-3" /> : i + 1}
            </div>
            <span className="hidden sm:inline">{label}</span>
            {step === i && (
              <motion.div
                layoutId="tab-bar"
                className="absolute bottom-0 inset-x-0 h-px"
                style={{ background: 'linear-gradient(90deg, var(--indigo), var(--violet))' }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form content */}
      <div className="p-5 overflow-hidden" style={{ minHeight: '290px' }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={slideVariant}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >

            {/* ── STEP 0 ── */}
            {step === 0 && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  {/* From */}
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-3)' }}>
                      From
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'var(--text-3)' }} />
                      <input
                        className="input-dark pl-9"
                        placeholder="Delhi..."
                        value={form.starting_city || ''}
                        onChange={e => set('starting_city', e.target.value)}
                        autoFocus
                      />
                    </div>
                    {errors.starting_city && <ErrMsg msg={errors.starting_city} />}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {POPULAR_FROM.map(c => (
                        <QuickChip key={c} label={c} active={form.starting_city === c} onClick={() => set('starting_city', c)} />
                      ))}
                    </div>
                  </div>

                  {/* To */}
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-3)' }}>
                      To
                    </label>
                    <div className="relative">
                      <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'var(--text-3)' }} />
                      <input
                        className="input-dark pl-9"
                        placeholder="Manali..."
                        value={form.destination || ''}
                        onChange={e => set('destination', e.target.value)}
                      />
                    </div>
                    {errors.destination && <ErrMsg msg={errors.destination} />}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {POPULAR_TO.slice(0, 4).map(c => (
                        <QuickChip key={c} label={c} active={form.destination === c} onClick={() => set('destination', c)} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Days */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-2.5" style={{ color: 'var(--text-3)' }}>
                    Duration
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => set('days', Math.max(1, (form.days || 5) - 1))}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-xl font-light transition-all"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-2)' }}
                    >−</button>
                    <div className="flex-1 text-center">
                      <motion.span
                        key={form.days}
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="font-display font-black text-5xl text-white block"
                      >
                        {form.days}
                      </motion.span>
                      <p className="text-xs font-bold mt-0.5" style={{ color: 'var(--text-3)' }}>days</p>
                    </div>
                    <button
                      onClick={() => set('days', Math.min(30, (form.days || 5) + 1))}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-xl font-light transition-all"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-2)' }}
                    >+</button>
                    <div className="flex gap-1.5">
                      {[3, 5, 7, 10].map(d => (
                        <QuickChip key={d} label={`${d}d`} active={form.days === d} onClick={() => set('days', d)} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 1 ── */}
            {step === 1 && (
              <div className="space-y-5">
                {/* Budget */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-2.5" style={{ color: 'var(--text-3)' }}>
                    Budget Range
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {BUDGETS.map(b => (
                      <button
                        key={b.value}
                        onClick={() => set('budget', b.value)}
                        className={`sel-dark sel-dark-saffron ${form.budget === b.value ? 'active' : ''} flex flex-col items-center gap-1.5 p-4`}
                      >
                        <span className="text-2xl">{b.emoji}</span>
                        <span className="font-bold text-xs text-white">{b.label}</span>
                        <span className="text-[9px] font-medium" style={{ color: 'var(--text-3)' }}>{b.range}</span>
                      </button>
                    ))}
                  </div>
                  {errors.budget && <ErrMsg msg={errors.budget} />}
                </div>

                {/* Vibe */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-2.5" style={{ color: 'var(--text-3)' }}>
                    Trip Vibe
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {VIBES.map(v => (
                      <button
                        key={v.value}
                        onClick={() => set('vibe', v.value)}
                        className={`sel-dark ${form.vibe === v.value ? 'active' : ''} flex items-center gap-3 p-3 text-left`}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                          style={{ background: form.vibe === v.value ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.05)' }}
                        >
                          <v.Icon className="w-4 h-4" style={{ color: form.vibe === v.value ? '#A5B4FC' : 'var(--text-3)' }} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">{v.label}</p>
                          <p className="text-[10px]" style={{ color: 'var(--text-3)' }}>{v.desc}</p>
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

      {/* Footer */}
      <div
        className="px-5 pb-5 flex gap-2.5"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}
      >
        {step > 0 && (
          <button onClick={back} className="btn-ghost-dark w-11 h-11 flex-none p-0 rounded-xl">
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={next}
          disabled={isLoading}
          className="btn-saffron-glow flex-1 disabled:opacity-50"
          style={{ paddingTop: '12px', paddingBottom: '12px' }}
        >
          {isLoading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
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

function QuickChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-200"
      style={{
        background: active ? 'rgba(99,102,241,0.18)' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${active ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.08)'}`,
        color: active ? '#A5B4FC' : 'var(--text-3)',
      }}
    >
      {label}
    </button>
  );
}

function ErrMsg({ msg }: { msg: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-1.5 text-xs font-semibold text-red-400 flex items-center gap-1"
    >
      ⚠ {msg}
    </motion.p>
  );
}
