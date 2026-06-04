'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Terminal, Cpu, CheckCircle, Database } from 'lucide-react';
import InteractiveParticles from '@/components/InteractiveParticles';

const LOG_MESSAGES = [
  { text: 'Initializing Safar Travel Engine v2.4...', type: 'sys' },
  { text: 'Establishing secure gateway to Gemini Pro API...', type: 'sys' },
  { text: 'Analyzing altitude gradients & seasonal weather...', type: 'info' },
  { text: 'Querying local transport schedules (IRCTC & HRTC Volvo)...', type: 'db' },
  { text: 'Filtering street dhabas and heritage dining nodes...', type: 'db' },
  { text: 'Synthesizing travel distance to time ratio optimizations...', type: 'info' },
  { text: 'Applying cost estimates and currency conversions...', type: 'sys' },
  { text: 'Hyper-local travel itinerary mapped successfully.', type: 'success' },
];

export default function LoadingScreen() {
  const [progress, setProgress] = useState(5);
  const [logs, setLogs] = useState<string[]>([]);
  const logIndexRef = useRef(0);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Increase progress bar smoothly
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        const step = Math.random() * 8 + 3;
        return Math.min(p + step, 95);
      });
    }, 600);

    return () => clearInterval(progressInterval);
  }, []);

  // Print logs sequentially
  useEffect(() => {
    const addLog = () => {
      if (logIndexRef.current < LOG_MESSAGES.length) {
        const nextLog = LOG_MESSAGES[logIndexRef.current];
        let prefix = '[LOG]';
        if (nextLog.type === 'sys') prefix = '⚙️ [SYS]';
        if (nextLog.type === 'info') prefix = 'ℹ️ [INF]';
        if (nextLog.type === 'db') prefix = '📦 [DB]';
        if (nextLog.type === 'success') prefix = '✅ [OK]';

        setLogs((prev) => [...prev, `${prefix} ${nextLog.text}`]);
        logIndexRef.current += 1;

        // Schedule next log
        const delay = Math.random() * 1000 + 600;
        setTimeout(addLog, delay);
      }
    };

    const initialTimeout = setTimeout(addLog, 400);
    return () => clearTimeout(initialTimeout);
  }, []);

  // Scroll terminal logs to bottom automatically
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-5 bg-[#030309] noise overflow-hidden"
    >
      {/* Dynamic Background Particles */}
      <InteractiveParticles />

      {/* Grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />

      {/* Floating Orbs */}
      <div className="orb orb-1 absolute top-[-10%] left-[-10%] opacity-40 pointer-events-none" />
      <div className="orb orb-2 absolute bottom-[-10%] right-[-10%] opacity-30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 rounded-t-2xl border-t border-x border-white/10 bg-[#0C0C18]/90 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span className="text-[10px] uppercase tracking-widest font-black text-white/50">
              Safar AI - Process Console
            </span>
          </div>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
        </div>

        {/* Terminal Body */}
        <div
          className="h-64 overflow-y-auto px-5 py-4 border-x border-b border-white/10 bg-black/60 backdrop-blur-md font-mono text-[11px] text-indigo-300/90 leading-relaxed scrollbar-thin select-none"
          style={{ scrollbarWidth: 'thin' }}
        >
          <div className="space-y-2">
            {logs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={log.includes('✅') ? 'text-emerald-400 font-bold' : log.includes('⚙️') ? 'text-white/40' : 'text-indigo-300/80'}
              >
                {log}
              </motion.div>
            ))}
            <div ref={terminalEndRef} />
          </div>
        </div>

        {/* Bottom Panel Card */}
        <div className="mt-6 glass rounded-2xl p-6 glow-border-indigo text-center flex flex-col items-center">
          {/* Custom rotating multi-layer compass graphic */}
          <div className="relative w-16 h-16 mb-5">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-dashed border-indigo-500/40"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-2 rounded-full border border-indigo-400/20"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Compass className="w-8 h-8 text-white drop-shadow-[0_0_10px_var(--indigo)]" />
            </div>
          </div>

          <h2 className="font-display font-black text-xl text-white mb-2">
            Synthesizing Your Safar
          </h2>
          <p className="text-[11px] text-white/50 font-medium mb-6">
            Drawing hyper-local routes. This may take up to 8 seconds.
          </p>

          {/* Progress bar container */}
          <div className="w-full rounded-full overflow-hidden h-2 bg-white/5 border border-white/5">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, var(--indigo) 0%, var(--violet) 50%, var(--saffron) 100%)' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          
          <div className="flex justify-between items-center w-full mt-2 text-[10px] text-white/40 font-bold uppercase tracking-wider">
            <span>Compilation State</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
