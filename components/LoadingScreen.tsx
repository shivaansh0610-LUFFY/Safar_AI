'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MESSAGES = [
  'Mapping your route...',
  'Compiling local topography...',
  'Retrieving transit schedules...',
  'Finalizing itinerary...',
];

export default function LoadingScreen() {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setMsgIdx(i => (i + 1) % MESSAGES.length);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4"
      style={{ background: 'var(--bg-base)' }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,128,48,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative flex flex-col items-center">
        {/* Animated rings */}
        <div className="relative w-20 h-20 mb-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-[var(--border-color)]"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-1 rounded-full border-t-2 border-[var(--accent)]"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-3 rounded-full border-b border-[var(--accent-300)] opacity-50"
          />
          {/* Center dot */}
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
          </motion.div>
        </div>

        <h2 className="font-display font-medium text-2xl text-[var(--text-primary)] mb-3">
          Preparing Your Safar
        </h2>

        {/* Cycling message */}
        <div className="h-6 flex items-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={msgIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-[var(--text-secondary)] text-center font-medium uppercase tracking-[0.12em]"
            >
              {MESSAGES[msgIdx]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-2 mt-6">
          {MESSAGES.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                backgroundColor: i === msgIdx ? 'var(--accent)' : 'var(--border-color)',
                scale: i === msgIdx ? 1.3 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="w-1.5 h-1.5 rounded-full"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
