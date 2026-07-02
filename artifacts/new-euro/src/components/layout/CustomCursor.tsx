import { useEffect, useRef, useState } from 'react';

type CursorState = 'default' | 'hover' | 'seal';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>('default');

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 6}px, ${mouseY - 6}px, 0)`;
      }
      if (sealRef.current) {
        sealRef.current.style.transform = `translate3d(${mouseX - 24}px, ${mouseY - 24}px, 0)`;
      }

      // Check if cursor is in hero section
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const inHero = el?.closest('#hero-section') !== null;
      const isButton = el?.closest('button, a, [role="button"]') !== null;

      if (inHero && !isButton) {
        setCursorState('seal');
      } else if (isButton) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    const render = () => {
      // Smooth lerp for ring
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0)`;
      }
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (isTouch) return null;

  const isHover = cursorState === 'hover';
  const isSeal = cursorState === 'seal';

  return (
    <>
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-150"
        style={{
          width: isHover ? 48 : 32,
          height: isHover ? 48 : 32,
          borderRadius: '50%',
          border: isSeal ? '1.5px solid rgba(212,175,55,0.6)' : isHover ? '1.5px solid rgba(212,175,55,0.8)' : '1.5px solid rgba(212,175,55,0.5)',
          mixBlendMode: 'normal',
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
          opacity: isSeal ? 0 : 1,
        }}
      />

      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width: 12,
          height: 12,
          background: 'rgba(212,175,55,0.9)',
          transition: 'width 0.15s ease, height 0.15s ease, opacity 0.2s ease',
          opacity: isSeal ? 0 : 1,
        }}
      />

      {/* Wax seal cursor — only in hero */}
      <div
        ref={sealRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-200 select-none"
        style={{
          width: 48,
          height: 48,
          opacity: isSeal ? 1 : 0,
          fontSize: 40,
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        {/* Gold seal emoji approximation */}
        <svg viewBox="0 0 48 48" width="48" height="48">
          <defs>
            <radialGradient id="sealGrad" cx="50%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#F0D78A" />
              <stop offset="60%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8F7115" />
            </radialGradient>
          </defs>
          {/* 16-point star border */}
          {Array.from({ length: 16 }, (_, i) => {
            const a = (i / 16) * Math.PI * 2;
            const r1 = 22, r2 = 18;
            const x1 = 24 + r1 * Math.cos(a);
            const y1 = 24 + r1 * Math.sin(a);
            const am = a + Math.PI / 16;
            const x2 = 24 + r2 * Math.cos(am);
            const y2 = 24 + r2 * Math.sin(am);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#sealGrad)" strokeWidth="1.5" />;
          })}
          <circle cx="24" cy="24" r="17" fill="url(#sealGrad)" />
          <circle cx="24" cy="24" r="13" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
          <text x="24" y="27" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#050E1F" fontFamily="Satoshi, sans-serif">NE</text>
        </svg>
      </div>
    </>
  );
}
