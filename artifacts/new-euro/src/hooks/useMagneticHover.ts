import { useRef, useCallback } from 'react';

interface MagneticOptions {
  maxOffset?: number;   // max px the element can move
  radius?: number;      // pull radius in px
  spring?: number;      // lerp factor (0.1 = soft, 0.5 = snappy)
}

/**
 * Returns ref and event handlers for magnetic hover effect.
 * Attach `ref` to the element and spread `handlers` onto it.
 */
export function useMagneticHover<T extends HTMLElement>(opts: MagneticOptions = {}) {
  const { maxOffset = 14, spring = 0.12 } = opts;
  const ref = useRef<T>(null);
  const rafRef = useRef<number | null>(null);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const isAnimating = useRef(false);

  const animate = useCallback(() => {
    if (!ref.current) return;
    currentX.current += (targetX.current - currentX.current) * spring;
    currentY.current += (targetY.current - currentY.current) * spring;

    ref.current.style.transform = `translate(${currentX.current}px, ${currentY.current}px)`;

    const dist = Math.hypot(targetX.current - currentX.current, targetY.current - currentY.current);
    if (dist > 0.01 || targetX.current !== 0 || targetY.current !== 0) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      ref.current.style.transform = 'translate(0px, 0px)';
      isAnimating.current = false;
    }
  }, [spring]);

  const onMouseMove = useCallback((e: React.MouseEvent<T>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    targetX.current = Math.max(-maxOffset, Math.min(maxOffset, dx * 0.4));
    targetY.current = Math.max(-maxOffset, Math.min(maxOffset, dy * 0.4));

    if (!isAnimating.current) {
      isAnimating.current = true;
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [maxOffset, animate]);

  const onMouseLeave = useCallback(() => {
    targetX.current = 0;
    targetY.current = 0;
    if (!isAnimating.current) {
      isAnimating.current = true;
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  return {
    ref,
    handlers: { onMouseMove, onMouseLeave } as {
      onMouseMove: React.MouseEventHandler<T>;
      onMouseLeave: React.MouseEventHandler<T>;
    },
  };
}
