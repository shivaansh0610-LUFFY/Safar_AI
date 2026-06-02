# Safar AI — Hyper-Local Travel Planner for India 🇮🇳

An AI-powered itinerary engine built for real Indian travel — not generic listicles. Get day-by-day plans with actual local buses, hidden dhabas, and terrain-adjusted timings.

## Tech Stack
- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS v3
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI**: Gemini API (coming soon)
- **DB**: Supabase (coming soon)

## Getting Started

```bash
npm install
node_modules/.bin/next dev --port 3001
```

Open [http://localhost:3001](http://localhost:3001)

## Features (Current)
- ✅ Multi-step trip planning form (Origin → Destination → Days → Budget & Vibe)
- ✅ AI-generated itinerary timeline (currently mocked)
- ✅ Transit / Activity / Food / Stay categorized day cards
- ✅ Affiliate CTA blocks per day
- ✅ Popular routes grid
- ✅ Glassmorphism dark UI with brand-green accents
- 🔲 Gemini API integration
- 🔲 Supabase persistence
- 🔲 Razorpay premium paywall
- 🔲 PDF export

## Routes
- `/` — Landing page + trip planner
- `/itinerary/[route]` — SEO-optimized pre-built itinerary pages (planned)
