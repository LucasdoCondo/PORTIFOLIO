'use client';

import React, { useState, useEffect } from 'react';

type TypingEffectProps = {
  texts: string[];
  speed?: number;
  pause?: number;
  loop?: boolean;
};

export const TypingEffect: React.FC<TypingEffectProps> = ({
  texts = [],
  speed = 100,
  pause = 2000,
  loop = true,
}) => {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const currentText = texts[textIndex] ?? '';
  const displayText = currentText.slice(0, charIndex);
  const finished = charIndex >= currentText.length;

  useEffect(() => {
    if (finished) return;
    const id = setTimeout(() => setCharIndex((c) => c + 1), speed);
    return () => clearTimeout(id);
  }, [finished, charIndex, speed]);

  useEffect(() => {
    if (!finished) return;
    if (!loop && textIndex === texts.length - 1) return;
    const id = setTimeout(() => {
      setTextIndex((i) => (i + 1) % texts.length);
      setCharIndex(0);
    }, pause);
    return () => clearTimeout(id);
  }, [finished, pause, loop, textIndex, texts.length]);

  return (
    <p className="text-xl md:text-2xl text-white/80 mb-8 min-h-[2rem]" aria-live="polite">
      {displayText}
      <span className="ml-1 inline-block h-5 w-0.5 bg-accent animate-pulse align-middle" />
    </p>
  );
};