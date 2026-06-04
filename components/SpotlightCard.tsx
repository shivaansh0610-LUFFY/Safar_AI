'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function SpotlightCard({
  children,
  className = '',
  glowColor = 'rgba(99, 102, 241, 0.15)',
  onClick,
  style = {},
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Use motion values for spring-interpolated coordinates to make mouse movement look extremely smooth
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.5 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - left);
    y.set(e.clientY - top);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md transition-all duration-500 ${className}`}
      style={{
        ...style,
        boxShadow: isHovered
          ? `0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px ${glowColor.replace(/[\d.]+\)$/, '0.08)')}`
          : 'none',
        transform: isHovered ? 'translateY(-2px)' : 'none',
      }}
    >
      {/* Animated Spotlight Overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 80%)`,
        }}
      />

      {/* Edge border glow highlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.6 : 0,
          background: `radial-gradient(150px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.12), transparent 60%)`,
        }}
      />

      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
