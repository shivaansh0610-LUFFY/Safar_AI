'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Clock, IndianRupee } from 'lucide-react';

const DESTINATIONS = [
  { name: 'Manali', state: 'Himachal Pradesh', tag: 'Adventure', days: '5D', from: '12,500', slug: 'delhi-to-manali' },
  { name: 'Goa', state: 'Goa', tag: 'Coastal', days: '4D', from: '15,000', slug: 'mumbai-to-goa' },
  { name: 'Kerala', state: 'Kerala', tag: 'Culture', days: '6D', from: '18,000', slug: 'bangalore-to-kerala' },
  { name: 'Rishikesh', state: 'Uttarakhand', tag: 'Adventure', days: '3D', from: '7,800', slug: 'delhi-to-rishikesh' },
  { name: 'Rajasthan', state: 'Rajasthan', tag: 'Heritage', days: '7D', from: '35,000', slug: 'delhi-to-rajasthan' },
  { name: 'Spiti Valley', state: 'Himachal Pradesh', tag: 'Expedition', days: '8D', from: '22,000', slug: 'manali-to-spiti' },
];

interface DestinationsGridProps {
  onDestinationClick?: (dest: string) => void;
}

export default function DestinationsGrid({ onDestinationClick }: DestinationsGridProps) {
  return (
    <section id="destinations" className="py-32 px-4 sm:px-6 lg:px-8 border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-display font-medium text-4xl sm:text-5xl text-[var(--text-primary)] mb-4">
              Curated routes.
            </h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-xl">
              Editorial selections for the modern explorer.
            </p>
          </div>
          <button className="text-sm font-medium text-[var(--accent)] hover:text-white transition-colors flex items-center gap-2">
            View all guides <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS.map((dest, i) => (
            <motion.div
              key={dest.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => onDestinationClick?.(dest.name)}
              className="editorial-card group cursor-pointer"
            >
              <div className="p-6 border-b border-[var(--border-color)] bg-[#171614] flex justify-between items-start">
                <div>
                  <h3 className="font-display font-medium text-2xl text-[var(--text-primary)] mb-1">{dest.name}</h3>
                  <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider">{dest.state}</p>
                </div>
                <div className="w-8 h-8 rounded-full border border-[var(--border-color)] flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] group-hover:text-[#13110E] transition-all duration-300">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
              
              <div className="p-6 flex items-center justify-between text-sm">
                <span className="text-[var(--accent)] font-medium">{dest.tag}</span>
                <div className="flex items-center gap-4 text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {dest.days}</span>
                  <span className="flex items-center gap-1"><IndianRupee className="w-3 h-3" /> {dest.from}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
