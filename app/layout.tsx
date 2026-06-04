import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Safar AI — Hyper-local Indian Travel Planner',
  description: 'AI-powered, hyper-local itineraries for India. Street-level detail, real dhabas, exact transit routes — in seconds.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
