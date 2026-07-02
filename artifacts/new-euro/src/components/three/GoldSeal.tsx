/**
 * GoldSeal — animated circular emblem badge
 * Uses pure CSS + SVG with rotating highlight for the "18 Years" credential.
 */
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GoldSealProps {
  years?: number;
  size?: number;
  className?: string;
}

export default function GoldSeal({ years = 18, size = 96, className = '' }: GoldSealProps) {
  const dotCount = 36;
  const r = 44; // ring radius in SVG units (viewBox 0 0 100 100)
  const cx = 50;
  const cy = 50;

  const dots = Array.from({ length: dotCount }, (_, i) => {
    const angle = (i / dotCount) * 2 * Math.PI - Math.PI / 2;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      delay: i * (1.5 / dotCount),
    };
  });

  return (
    <motion.div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.35) 0%, transparent 70%)',
          animation: 'goldPulse 2.5s ease-in-out infinite',
        }}
      />

      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Definitions */}
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F0D78A" />
            <stop offset="40%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8F7115" />
          </linearGradient>
          <linearGradient id="goldGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F0D78A" />
            <stop offset="100%" stopColor="#E5C25D" />
          </linearGradient>
          <filter id="goldGlow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          {/* Rotating highlight gradient */}
          <linearGradient id="highlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* Outer ring */}
        <circle cx={cx} cy={cy} r={48} fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" />

        {/* Dot ring */}
        {dots.map((dot, i) => (
          <circle key={i} cx={dot.x} cy={dot.y} r={1.2} fill="url(#goldGradLight)" filter="url(#goldGlow)" />
        ))}

        {/* Inner filled circle */}
        <circle cx={cx} cy={cy} r={37} fill="url(#goldGrad)" />

        {/* Rotating highlight overlay */}
        <circle
          cx={cx}
          cy={cy}
          r={37}
          fill="url(#highlight)"
          style={{ transformOrigin: '50px 50px', animation: 'sealRotate 4s linear infinite' }}
        />

        {/* Inner ring line */}
        <circle cx={cx} cy={cy} r={33} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7" />

        {/* Years number */}
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="22"
          fontWeight="bold"
          fontFamily="'Satoshi', sans-serif"
          fill="#050E1F"
          letterSpacing="-1"
        >
          {years}
        </text>

        {/* "YEARS" label */}
        <text
          x={cx}
          y={cy + 11}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="6.5"
          fontWeight="600"
          fontFamily="'Inter', sans-serif"
          fill="#0A1A33"
          letterSpacing="2"
        >
          YEARS
        </text>

        {/* "EXCELLENCE" arc text (approximate with straight text below) */}
        <text
          x={cx}
          y={cy + 21}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="4.5"
          fontWeight="500"
          fontFamily="'Inter', sans-serif"
          fill="#0A1A33"
          letterSpacing="1"
        >
          EXCELLENCE
        </text>

        {/* Star dividers */}
        <text x={cx - 16} y={cy + 21} textAnchor="middle" fontSize="5" fill="#0A1A33">✦</text>
        <text x={cx + 16} y={cy + 21} textAnchor="middle" fontSize="5" fill="#0A1A33">✦</text>
      </svg>

      <style>{`
        @keyframes goldPulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.12); opacity: 1; }
        }
        @keyframes sealRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
}
