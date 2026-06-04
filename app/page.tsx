'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import DestinationsGrid from '@/components/DestinationsGrid';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import TimelineResult from '@/components/TimelineResult';

import { ItineraryResponse, TripInput } from '@/types/itinerary';
import { mockItinerary } from '@/lib/mock-data';

type AppState = 'landing' | 'loading' | 'result';

export default function HomePage() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [itinerary, setItinerary] = useState<ItineraryResponse | null>(null);
  const [tripInput, setTripInput] = useState<TripInput | undefined>();
  const [error, setError] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);

  const scrollToHero = () => {
    heroRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (data: TripInput) => {
    setTripInput(data);
    setError(null);
    setAppState('loading');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const res = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        const errMsg = errJson.error as string | undefined;

        if (res.status === 503 || errMsg?.includes('GEMINI_API_KEY')) {
          console.warn('[SafarAI] API key not configured — using mock data for demo');
          await delay(2000);
          setItinerary(mockItinerary);
          setAppState('result');
          return;
        }

        throw new Error(errMsg ?? `HTTP ${res.status}`);
      }

      const json: ItineraryResponse = await res.json();
      setItinerary(json);
      setAppState('result');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setAppState('landing');
    }
  };

  const handleReset = () => {
    setAppState('landing');
    setItinerary(null);
    setTripInput(undefined);
    setError(null);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
  };

  return (
    <div className="bg-[var(--bg-base)] min-h-screen">
      {/* LOADING STATE */}
      <AnimatePresence>
        {appState === 'loading' && <LoadingScreen />}
      </AnimatePresence>

      {/* RESULT STATE */}
      {appState === 'result' && itinerary && (
        <>
          <Navbar showBack onBackClick={handleReset} />
          <TimelineResult data={itinerary} tripInput={tripInput} onReplan={handleReset} />
        </>
      )}

      {/* LANDING STATE */}
      {appState === 'landing' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Navbar onPlanClick={scrollToHero} />

          {/* Error toast */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-20 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
              >
                <div
                  className="px-6 py-3 rounded-xl text-sm font-medium max-w-md text-center backdrop-blur-xl"
                  style={{
                    background: 'rgba(127,29,29,0.4)',
                    border: '1px solid rgba(248,113,113,0.2)',
                    color: '#fca5a5',
                  }}
                >
                  {error}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={heroRef}>
            <HeroSection onSubmit={handleSubmit} isLoading={false} />
          </div>

          <FeaturesSection />
          <DestinationsGrid onDestinationClick={(dest) => {
            heroRef.current?.scrollIntoView({ behavior: 'smooth' });
          }} />
          <TestimonialsSection />
          <FAQSection />
          <Footer />
        </motion.div>
      )}
    </div>
  );
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
