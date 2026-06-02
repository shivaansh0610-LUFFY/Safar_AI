'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Clock, IndianRupee } from 'lucide-react';

type RouteTheme = 'brand' | 'dusk' | 'sand';

const routes: {
  from: string; to: string; days: string; budget: string; cost: string;
  tag: string; slug: string; theme: RouteTheme;
}[] = [
  { from: 'Delhi', to: 'Manali', days: '5D', budget: 'Backpacker', cost: '₹12,500', tag: '🏔 Adventure', slug: 'delhi-to-manali-backpacker-5-days', theme: 'brand' },
  { from: 'Mumbai', to: 'Goa', days: '4D', budget: 'Mid-tier', cost: '₹18,000', tag: '🌊 Chill', slug: 'mumbai-to-goa-midtier-4-days', theme: 'dusk' },
  { from: 'Bangalore', to: 'Coorg', days: '3D', budget: 'Backpacker', cost: '₹8,200', tag: '🌿 Culture', slug: 'bangalore-to-coorg-backpacker-3-days', theme: 'sand' },
  { from: 'Delhi', to: 'Rishikesh', days: '3D', budget: 'Backpacker', cost: '₹7,800', tag: '🧘 Adventure', slug: 'delhi-to-rishikesh-backpacker-3-days', theme: 'brand' },
  { from: 'Hyderabad', to: 'Hampi', days: '4D', budget: 'Backpacker', cost: '₹9,500', tag: '🏛 Culture', slug: 'hyderabad-to-hampi-backpacker-4-days', theme: 'dusk' },
  { from: 'Jaipur', to: 'Jaisalmer', days: '5D', budget: 'Luxury', cost: '₹45,000', tag: '🏜 Luxury', slug: 'jaipur-to-jaisalmer-luxury-5-days', theme: 'sand' },
];

export default function PopularRoutes({ onRouteClick }: { onRouteClick?: (slug: string) => void }) {
  return (
    <section id="routes" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p style={{ color: '#54b285', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '1rem' }}>Popular Routes</p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-4">
            Trending itineraries
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Jump-start your plan with pre-built routes loved by Indian travellers
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {routes.map((route, i) => (
            <motion.div
              key={route.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              onClick={() => onRouteClick?.(route.slug)}
              className={`glass-card p-5 cursor-pointer group route-card-${route.theme}`}
            >
              {/* Route */}
              <div className="flex items-center gap-2 mb-4">
                <span className="font-display font-bold text-white text-lg">{route.from}</span>
                <ArrowRight className="w-4 h-4 text-gray-600 flex-shrink-0" />
                <span className="font-display font-bold text-white text-lg">{route.to}</span>
              </div>

              {/* Tags row */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium pill-${route.theme}`}
                >
                  {route.tag}
                </span>
                <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.625rem', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: '#9ca3af', fontWeight: 500 }}>
                  {route.budget}
                </span>
              </div>

              {/* Footer stats */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Clock className="w-3.5 h-3.5" />
                  {route.days}
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-white">
                  <IndianRupee style={{ width: '0.75rem', height: '0.75rem', color: '#e0a84e' }} />
                  {route.cost.replace('₹', '')}
                </div>
                <span style={{ fontSize: '0.75rem', color: '#54b285', opacity: 0, transition: 'opacity 0.3s', fontWeight: 500 }}
                  className="group-hover:opacity-100">
                  View →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
