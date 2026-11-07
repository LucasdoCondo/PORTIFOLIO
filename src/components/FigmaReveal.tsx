'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

type Phase = 'hidden' | 'drawing' | 'done';

type Size = { w: number; h: number };

type FigmaRevealProps = {
  children: ReactNode;
  /** Atraso (ms) antes de começar a desenhar. Use `index * 150` para escalonar. */
  delay?: number;
  /** Raio do contorno; deve acompanhar o `rounded-*` do conteúdo. */
  radius?: string;
  className?: string;
};

const HANDLES = [
  '-left-[3px] -top-[3px]',
  '-right-[3px] -top-[3px]',
  '-bottom-[3px] -left-[3px]',
  '-bottom-[3px] -right-[3px]',
] as const;

export default function FigmaReveal({
  children,
  delay = 0,
  radius = '1rem',
  className = '',
}: FigmaRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>('hidden');
  const [hover, setHover] = useState<boolean>(false);
  const [size, setSize] = useState<Size>({ w: 0, h: 0 });

  // Mede o tamanho real para o selo "L × A".
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      const next: Size = { w: Math.round(el.offsetWidth), h: Math.round(el.offsetHeight) };
      setSize((prev) => (prev.w === next.w && prev.h === next.h ? prev : next));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Dispara a animação quando o bloco entra na tela (uma única vez).
  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;

    const timers: number[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timers.push(
          window.setTimeout(() => {
            setPhase('drawing');
            timers.push(window.setTimeout(() => setPhase('done'), 750));
          }, delay),
        );
      },
      { threshold: 0.2 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [delay, reduceMotion]);

  // Com "reduzir movimento", o conteúdo aparece direto, sem animação de montagem.
  const done = reduceMotion || phase === 'done';
  const drawing = !reduceMotion && phase === 'drawing';
  const revealed = reduceMotion || phase !== 'hidden';
  const showOutline = drawing || (done && hover);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="h-full"
        style={{
          opacity: done ? 1 : 0,
          transform: done ? 'none' : 'translateY(6px)',
          transition: 'opacity 0.45s ease, transform 0.45s ease',
        }}
      >
        {children}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ opacity: showOutline ? 1 : 0, transition: 'opacity 0.25s ease' }}
      >
        <div
          className="absolute inset-0 border border-accent"
          style={{
            borderRadius: radius,
            backgroundColor: drawing ? 'rgba(0, 212, 170, 0.06)' : 'transparent',
            clipPath: revealed ? 'inset(0 0 0 0)' : 'inset(0 100% 100% 0)',
            transition: 'clip-path 0.65s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />

        {HANDLES.map((position) => (
          <span
            key={position}
            className={`absolute h-[7px] w-[7px] border border-accent bg-white ${position}`}
          />
        ))}

      </div>
    </div>
  );
}
