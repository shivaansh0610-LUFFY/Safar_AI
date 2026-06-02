import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Yatra — AI-Powered Travel Planner for India',
  description:
    'Plan hyper-local Indian itineraries in seconds. From Himalayan treks to coastal backpacker trails — powered by AI, priced for every budget.',
  keywords: 'India travel planner, itinerary generator, AI travel, Manali, Goa, Kerala, budget travel India',
  openGraph: {
    title: 'Yatra — AI-Powered Travel Planner for India',
    description: 'Plan hyper-local Indian itineraries in seconds.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body style={{ backgroundColor: '#0d1117' }} className="text-gray-100 antialiased">
        {children}
      </body>
    </html>
  );
}
