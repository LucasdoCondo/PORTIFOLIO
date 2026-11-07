'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

type ParallaxProps = {
  children?: ReactNode;
  /**
   * Intensidade do efeito.
   *  > 0  : move mais devagar que a rolagem (parece estar ao fundo)
   *  < 0  : move mais rápido que a rolagem (parece estar à frente)
   *  Valores úteis: entre -0.3 e 0.4.
   */
  speed?: number;
  /** Deslocamento máximo em px, para o elemento nunca "fugir" do layout. */
  maxOffset?: number;
  /** Classes do contêiner externo (posicionamento e tamanho). */
  className?: string;
  /** Classes do elemento interno, que é o que se move. */
  innerClassName?: string;
  /** Marque como true para camadas puramente decorativas. */
  decorative?: boolean;
};

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export default function Parallax({
  children,
  speed = 0.2,
  maxOffset = 120,
  className = '',
  innerClassName = '',
  decorative = false,
}: ParallaxProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner || reduceMotion) return;

    let raf = 0;
    let visible = false;

    const update = () => {
      raf = 0;
      // Mede o contêiner externo (sem transform) para evitar efeito de retroalimentação.
      const rect = outer.getBoundingClientRect();
      const distanceFromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
      const offset = clamp(-distanceFromCenter * speed, -maxOffset, maxOffset);
      inner.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };

    const request = () => {
      if (!visible || raf) return;
      raf = window.requestAnimationFrame(update);
    };

    // Só calcula enquanto o elemento está perto da tela.
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) request();
      },
      { rootMargin: '20% 0px' },
    );
    observer.observe(outer);

    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
      if (raf) window.cancelAnimationFrame(raf);
      inner.style.transform = '';
    };
  }, [speed, maxOffset, reduceMotion]);

  return (
    <div ref={outerRef} className={className} aria-hidden={decorative || undefined}>
      <div ref={innerRef} className={`will-change-transform ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
}
