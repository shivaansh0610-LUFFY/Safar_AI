'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, Menu, X, Sparkles, ArrowLeft, MapPin } from 'lucide-react';
import Link from 'next/link';

interface NavbarProps {
  onPlanClick?: () => void;
  showBack?: boolean;
  onBackClick?: () => void;
}

export default function Navbar({ onPlanClick, showBack, onBackClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Destinations', href: '#destinations' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 inset-x-0 z-50 bg-[var(--bg-base)] border-b border-[var(--border-color)] py-4"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <span className="font-display font-medium text-xl tracking-tight text-[var(--text-primary)]">
              Safar<span className="text-[var(--accent)] font-semibold">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          {!showBack && (
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}

          {/* Right side */}
          <div className="flex items-center gap-4">
            {showBack ? (
              <button
                onClick={onBackClick}
                className="btn-outline flex items-center gap-2 px-4 py-2 text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Planner
              </button>
            ) : (
              <button
                onClick={onPlanClick}
                className="btn-editorial flex items-center gap-2 px-5 py-2 text-sm"
              >
                <MapPin className="w-4 h-4" />
                Plan a Trip
              </button>
            )}
            
            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-[var(--text-primary)]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="fixed top-[60px] inset-x-4 z-40 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(17, 17, 24, 0.98)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-4 py-3 rounded-xl text-base font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-200"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.18 }}
                className="mt-3 pt-3"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
              >
                <button
                  onClick={() => { onPlanClick?.(); setMobileOpen(false); }}
                  className="btn-editorial w-full py-2.5 text-sm flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Plan a Trip
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
