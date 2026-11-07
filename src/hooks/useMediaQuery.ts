'use client';

import { useSyncExternalStore } from 'react';

/**
 * Lê uma media query de forma segura para SSR/hidratação.
 * No servidor retorna `false`; no cliente passa a refletir o valor real
 * e reage a mudanças (ex.: o usuário liga "reduzir movimento" no sistema).
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

export function useHasFinePointer(): boolean {
  return useMediaQuery('(pointer: fine)');
}
