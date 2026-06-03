'use client';

import { Navigation } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-base)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <span className="font-display font-medium text-xl tracking-tight text-[var(--text-primary)]">
                Safar<span className="text-[var(--accent)] font-semibold">AI</span>
              </span>
            </Link>
            <p className="text-[var(--text-secondary)] text-sm max-w-xs leading-relaxed">
              Hyper-local itineraries driven by local intelligence. Stop traveling like a tourist.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-[var(--text-primary)] font-display font-medium mb-4">Product</h4>
            <ul className="space-y-3">
              {['Planner', 'Destinations', 'Pricing', 'Methodology'].map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-[var(--text-primary)] font-display font-medium mb-4">Company</h4>
            <ul className="space-y-3">
              {['About', 'Contact', 'Privacy', 'Terms'].map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--border-color)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[var(--text-tertiary)] text-xs">
            © {new Date().getFullYear()} Safar AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-[var(--text-tertiary)] uppercase tracking-wider font-semibold">
            <span>Built in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
