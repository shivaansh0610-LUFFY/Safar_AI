'use client';

import { Compass, Heart, Twitter, Github, Instagram } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-gradient-to-br from-brand-500 to-brand-700">
                <Compass className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                Yatra<span className="text-brand-400">.</span>
              </span>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
              AI-powered hyper-local itineraries for every corner of incredible India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 mb-4">Navigate</p>
            <div className="space-y-2.5">
              {['Plan a Trip', 'Popular Routes', 'How it Works'].map((l) => (
                <a key={l} href="#" className="block text-sm text-gray-500 hover:text-white transition-colors duration-200">
                  {l}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 mb-4">Follow the Journey</p>
            <div className="flex gap-3">
              {[Twitter, Github, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 hover:text-white transition-all duration-200 hover:bg-white/[0.06]"
                  style={{ border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-700">
          <span>© 2026 Yatra. Built for Indian travellers.</span>
          <span className="flex items-center gap-1.5">
            Made with <Heart className="w-3 h-3 text-brand-500 fill-brand-500" /> in India
          </span>
        </div>
      </div>
    </footer>
  );
}
