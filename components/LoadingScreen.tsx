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
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4 bg-[var(--bg-base)]"
    >
      <div className="flex flex-col items-center">
        {/* Simple elegant spinner */}
        <div className="relative w-12 h-12 mb-8">
          <div className="absolute inset-0 rounded-full border border-[var(--border-color)]" />
          <div className="absolute inset-0 rounded-full border-t border-[var(--accent)] animate-spin" />
        </div>

        <h2 className="font-display font-medium text-2xl text-[var(--text-primary)] mb-3">
          Preparing Issue
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
              className="text-sm text-[var(--text-secondary)] text-center font-medium uppercase tracking-wider"
            >
              {MESSAGES[msgIdx]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
