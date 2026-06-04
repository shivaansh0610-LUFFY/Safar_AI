'use client';

import { MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="section-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <MapPin className="w-4 h-4 text-[#0C0A09]" />
              </div>
              <span className="font-display font-semibold text-lg tracking-tight text-[var(--text-primary)]">
                Safar<span className="text-[var(--accent)]">AI</span>
              </span>
            </Link>
            <p className="text-[var(--text-secondary)] text-sm max-w-xs leading-relaxed mb-6">
              Hyper-local itineraries driven by local intelligence. Stop traveling like a tourist.
            </p>
            <div className="flex items-center gap-3">
              {['Complimentary', 'No Signup', 'AI-Powered'].map((t, i) => (
                <span key={t} className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)] flex items-center gap-1.5">
                  {i > 0 && <span className="w-1 h-1 bg-[var(--border-hover)] rounded-full" />}
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-[var(--text-primary)] font-display font-medium mb-5 text-sm uppercase tracking-wider">Product</h4>
            <ul className="space-y-3">
              {['Planner', 'Destinations', 'Pricing', 'Methodology'].map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-300)] transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-[var(--text-primary)] font-display font-medium mb-5 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {['About', 'Contact', 'Privacy', 'Terms'].map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-300)] transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--border-color)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[var(--text-muted)] text-xs">
            &copy; {new Date().getFullYear()} Safar AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[10px] text-[var(--text-muted)] uppercase tracking-[0.15em] font-semibold">
            <span>Built in India</span>
            <span className="w-1 h-1 bg-[var(--border-hover)] rounded-full" />
            <span>Powered by Gemini</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
