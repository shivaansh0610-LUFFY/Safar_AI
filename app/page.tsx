'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TripForm from '@/components/TripForm';
import Timeline from '@/components/Timeline';
import HowItWorks from '@/components/HowItWorks';
import PopularRoutes from '@/components/PopularRoutes';
import Footer from '@/components/Footer';
import { mockItinerary } from '@/lib/mock-data';
import { ItineraryResponse, TripInput } from '@/types/itinerary';

type AppState = 'landing' | 'planning' | 'result';

export default function HomePage() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [itinerary, setItinerary] = useState<ItineraryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const plannerRef = useRef<HTMLDivElement>(null);

  const handlePlanClick = () => {
    setAppState('planning');
    setTimeout(() => {
      plannerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleFormSubmit = async (data: TripInput) => {
    setIsLoading(true);
    // Simulate API call — replace with real Gemini endpoint later
    await new Promise((r) => setTimeout(r, 2200));
    setItinerary(mockItinerary);
    setIsLoading(false);
    setAppState('result');
    setTimeout(() => {
      plannerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleReset = () => {
    setAppState('landing');
    setItinerary(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Landing sections */}
      <AnimatePresence>
        {appState === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Hero onPlanClick={handlePlanClick} />
            <HowItWorks />
            <PopularRoutes onRouteClick={() => handlePlanClick()} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Planner / Result Panel */}
      {(appState === 'planning' || appState === 'result') && (
        <motion.main
          ref={plannerRef as React.RefObject<HTMLElement>}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 pt-24 pb-16 px-4"
          style={{ background: 'var(--color-bg-primary)' }}
        >
          {/* Aurora background for planner */}
          <div className="fixed inset-0 bg-aurora pointer-events-none -z-10" />
          <div className="fixed top-0 left-1/4 w-96 h-96 rounded-full bg-brand-500/[0.06] blur-[120px] pointer-events-none -z-10" />

          <div className="max-w-2xl mx-auto">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-xs text-brand-400 uppercase tracking-widest font-semibold mb-1">
                  {appState === 'planning' ? 'Trip Builder' : 'Your Itinerary'}
                </p>
                <h1 className="font-display font-bold text-2xl text-white">
                  {appState === 'planning' ? 'Tell us about your trip' : 'Here\'s your plan ✈️'}
                </h1>
              </div>
              <button
                onClick={handleReset}
                className="btn-ghost py-2 px-4 rounded-xl text-sm flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Start over</span>
              </button>
            </div>

            {/* Form or Timeline */}
            <AnimatePresence mode="wait">
              {appState === 'planning' && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <TripForm onSubmit={handleFormSubmit} isLoading={isLoading} />
                </motion.div>
              )}

              {appState === 'result' && itinerary && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Re-plan button */}
                  <div className="mb-6 flex justify-end">
                    <button
                      onClick={() => setAppState('planning')}
                      className="btn-primary text-sm py-2 px-5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Re-plan Trip
                    </button>
                  </div>
                  <Timeline data={itinerary} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.main>
      )}

      {/* Landing sections below fold (always visible for SEO) */}
      {appState === 'landing' && <Footer />}
    </div>
  );
}
