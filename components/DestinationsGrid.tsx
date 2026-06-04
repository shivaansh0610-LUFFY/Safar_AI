'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, IndianRupee } from 'lucide-react';
import Image from 'next/image';

const DESTINATIONS = [
  {
    name: 'Manali',
    state: 'Himachal Pradesh',
    tag: 'Adventure',
    tagColor: '#F5BD5C',
    days: '5D',
    from: '12,500',
    slug: 'delhi-to-manali',
    image: 'https://images.pexels.com/photos/6454059/pexels-photo-6454059.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Goa',
    state: 'Goa',
    tag: 'Coastal',
    tagColor: '#8BDDA6',
    days: '4D',
    from: '15,000',
    slug: 'mumbai-to-goa',
    image: 'https://images.pexels.com/photos/1015665/pexels-photo-1015665.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Kerala',
    state: 'Kerala',
    tag: 'Culture',
    tagColor: '#8BDDA6',
    days: '6D',
    from: '18,000',
    slug: 'bangalore-to-kerala',
    image: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Rishikesh',
    state: 'Uttarakhand',
    tag: 'Adventure',
    tagColor: '#F5BD5C',
    days: '3D',
    from: '7,800',
    slug: 'delhi-to-rishikesh',
    image: 'https://images.pexels.com/photos/7820131/pexels-photo-7820131.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Rajasthan',
    state: 'Rajasthan',
    tag: 'Heritage',
    tagColor: '#FBBF24',
    days: '7D',
    from: '35,000',
    slug: 'delhi-to-rajasthan',
    image: 'https://images.pexels.com/photos/3581361/pexels-photo-3581361.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Spiti Valley',
    state: 'Himachal Pradesh',
    tag: 'Expedition',
    tagColor: '#F5BD5C',
    days: '8D',
    from: '22,000',
    slug: 'manali-to-spiti',
    image: 'https://images.pexels.com/photos/2448754/pexels-photo-2448754.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

interface DestinationsGridProps {
  onDestinationClick?: (dest: string) => void;
}

export default function DestinationsGrid({ onDestinationClick }: DestinationsGridProps) {
  return (
    <section id="destinations" className="py-32 px-4 sm:px-6 lg:px-8 section-divider">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--accent-300)] mb-4">
              Destinations
            </span>
            <h2 className="font-display font-medium text-4xl sm:text-5xl text-[var(--text-primary)] tracking-tight">
              Curated routes.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[var(--text-secondary)] text-lg max-w-sm"
          >
            Editorial selections for the modern explorer.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DESTINATIONS.map((dest, i) => (
            <motion.div
              key={dest.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => onDestinationClick?.(dest.name)}
              className="editorial-card cursor-pointer group overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden bg-[var(--bg-surface-elevated)]">
                <Image
                  src={dest.image}
                  alt={`${dest.name} travel`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-transparent to-transparent" />

                {/* Floating tag */}
                <div
                  className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full"
                  style={{ background: `${dest.tagColor}15`, color: dest.tagColor, border: `1px solid ${dest.tagColor}30` }}
                >
                  {dest.tag}
                </div>

                {/* Arrow */}
                <div
                  className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center
                    bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300
                    group-hover:bg-[var(--accent)] group-hover:text-[#0C0A09]"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-display font-medium text-xl text-[var(--text-primary)] mb-1">{dest.name}</h3>
                <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider mb-4">{dest.state}</p>

                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                    <Clock className="w-3.5 h-3.5" /> {dest.days}
                  </span>
                  <span className="flex items-center gap-1 text-[var(--text-secondary)]">
                    from <IndianRupee className="w-3 h-3 text-[var(--accent-300)]" />
                    <span className="font-medium text-[var(--text-primary)]">{dest.from}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
