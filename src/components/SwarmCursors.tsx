'use client';

import { useEffect, useRef } from 'react';
import { useHasFinePointer, usePrefersReducedMotion } from '@/hooks/useMediaQuery';

type AgentConfig = {
  readonly name: string;
  readonly color: string;
};

// Edite nomes e cores à vontade; a ordem define quem aparece primeiro.
const AGENTS = [
  { name: 'Frontend', color: '#00d4aa' },
  { name: 'Backend', color: '#a78bfa' },
  { name: 'DevOps', color: '#f59e0b' },
  { name: 'Redes', color: '#38bdf8' },
  { name: 'Automação', color: '#f472b6' },
  { name: 'Blockchain', color: '#84cc16' },
] as const satisfies readonly AgentConfig[];

type AgentState = {
  x: number;
  y: number;
  angle: number;
  radius: number;
  ease: number;
  opacity: number;
};

type Pointer = { x: number; y: number; active: boolean };

type SwarmCursorsProps = {
  /** Quantidade máxima de cursores (1 a 6). */
  count?: number;
};

export default function SwarmCursors({ count = 5 }: SwarmCursorsProps) {
  const total = Math.min(Math.max(Math.round(count), 1), AGENTS.length);
  const elements = useRef<Array<HTMLDivElement | null>>([]);
  const hasFinePointer = useHasFinePointer();
  const reduceMotion = usePrefersReducedMotion();
  const enabled = hasFinePointer && !reduceMotion;

  useEffect(() => {
    if (!enabled) return;

    const pointer: Pointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      active: false,
    };

    const states: AgentState[] = Array.from({ length: total }, (_, i) => ({
      x: pointer.x,
      y: pointer.y,
      angle: (i / total) * Math.PI * 2,
      radius: 46 + i * 20,
      ease: 0.12 - i * 0.012, // quem está mais longe reage mais devagar
      opacity: 0,
    }));

    let raf = 0;
    let running = false;
    let time = 0;
    let lastScroll = window.scrollY;
    let energy = 0; // 0 = página parada, 1 = rolando rápido

    const frame = () => {
      time += 0.016;

      // Quanto mais rápido o scroll, mais cursores entram em cena.
      const delta = Math.abs(window.scrollY - lastScroll);
      lastScroll = window.scrollY;
      energy += (Math.min(delta / 30, 1) - energy) * 0.08;
      const visibleCount = Math.min(total, 2 + Math.round(energy * Math.max(total - 2, 0)));

      let anyVisible = false;

      states.forEach((s, i) => {
        const el = elements.current[i];
        if (!el) return;

        s.angle += 0.01 + i * 0.002;
        const wobble = Math.sin(time * 1.3 + i) * 8;
        const targetX = pointer.x + Math.cos(s.angle) * (s.radius + wobble);
        const targetY = pointer.y + Math.sin(s.angle) * (s.radius + wobble);

        s.x += (targetX - s.x) * s.ease;
        s.y += (targetY - s.y) * s.ease;

        const targetOpacity = pointer.active && i < visibleCount ? 1 : 0;
        s.opacity += (targetOpacity - s.opacity) * 0.08;
        if (s.opacity > 0.01) anyVisible = true;

        el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
        el.style.opacity = s.opacity.toFixed(3);
      });

      // Só continua o loop se houver algo para animar.
      if (pointer.active || anyVisible) {
        raf = window.requestAnimationFrame(frame);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (running || document.hidden) return;
      running = true;
      raf = window.requestAnimationFrame(frame);
    };

    const onMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
      start();
    };

    const onLeave = () => {
      pointer.active = false;
      start(); // continua até os cursores sumirem
    };

    const onVisibility = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(raf);
        running = false;
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [enabled, total]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {AGENTS.slice(0, total).map((agent, i) => (
        <div
          key={agent.name}
          ref={(el) => {
            elements.current[i] = el;
          }}
          className="absolute left-0 top-0 flex items-start opacity-0 will-change-transform"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              d="M3 2l7 19 2.5-7.5L20 11z"
              fill={agent.color}
              stroke="#0a0a0f"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className="ml-1 mt-3 rounded px-1.5 py-0.5 text-[10px] font-medium text-black"
            style={{ backgroundColor: agent.color }}
          >
            {agent.name}
          </span>
        </div>
      ))}
    </div>
  );
}
