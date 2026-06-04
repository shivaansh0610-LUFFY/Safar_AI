'use client';

import { Compass, Twitter, Github, Instagram, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06]">
      {/* ── CTA BANNER ── */}
      <div
        className="py-24 px-5 sm:px-8 text-center relative overflow-hidden bg-[#0C0C18] noise"
      >
        {/* Subtle background ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full pointer-events-none opacity-25"
          style={{
            background: 'radial-gradient(circle, var(--indigo) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto relative z-10"
        >
          <p className="eyebrow mb-4">Ready to explore India?</p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-6 leading-tight">
            Your next adventure<br />
            <span className="grad-saffron">starts here.</span>
          </h2>
          <p className="text-sm text-white/50 font-medium mb-10 max-w-sm mx-auto leading-relaxed">
            Free forever. No signup needed. Real, local Indian travel intelligence at your fingertips.
          </p>
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="btn-saffron-glow inline-flex items-center gap-2"
          >
            Plan My Trip Free
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* ── FOOTER NAVIGATION ── */}
      <div className="bg-[#030309] px-5 sm:px-8 py-16 relative noise">
        {/* Border glow separator */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-12 mb-14">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-indigo-600">
                  <Compass className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-black text-lg text-white">
                  safar<span className="text-saffron-500">.</span>ai
                </span>
              </Link>
              <p className="text-xs text-white/40 leading-relaxed max-w-xs font-medium">
                Hyper-local Indian travel intelligence. Sourcing authentic transit, local food stops, and regional timelines.
              </p>
              <div className="flex gap-2.5 mt-6">
                {[Twitter, Github, Instagram].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 hover:scale-105"
                  >
                    <Icon className="w-4 h-4 text-white/60" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-white/30 mb-4">Product</p>
              <ul className="space-y-3">
                {['Planner', 'Destinations', 'How it works', 'Changelog'].map(l => (
                  <li key={l}><a href="#" className="text-xs text-white/50 font-semibold hover:text-white/80 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-white/30 mb-4">Company</p>
              <ul className="space-y-3">
                {['About', 'Contact', 'Privacy', 'Terms'].map(l => (
                  <li key={l}><a href="#" className="text-xs text-white/50 font-semibold hover:text-white/80 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5"
          >
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider">
              © {new Date().getFullYear()} Safar AI. Built with ❤️ in India.
            </p>
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider">
              Powered by Gemini AI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
