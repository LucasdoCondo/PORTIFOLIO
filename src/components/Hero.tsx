import Image from 'next/image';
import Link from 'next/link';
import { IoLogoGithub } from 'react-icons/io';
import { TypingEffect } from '@/components/TypingEffect';
import Parallax from '@/components/Parallax';

const ROLES: string[] = [
  'Desenvolvedor Full‑Stack',
  'Systems Analyst',
  'IT Support Engineer / N3 Support Specialist',
  'Application Developer',
];

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-4 pt-20"
    >
      {/* Camada 1: brilho de fundo (move mais devagar, dá profundidade) */}
      <Parallax
        decorative
        speed={0.3}
        maxOffset={140}
        className="pointer-events-none absolute inset-0"
        innerClassName="h-full w-full"
      >
        <div className="absolute left-1/2 top-1/4 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      </Parallax>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center text-center">
        {/* Camada 2: foto */}
        <Parallax speed={0.1} maxOffset={80}>
          <Image
            src="/profile.jpeg"
            alt="Foto de Lucas do Condo"
            width={160}
            height={160}
            priority
            className="mb-6 aspect-square rounded-full border-2 border-accent/40 object-cover object-center"
          />
        </Parallax>

        {/* Camada 3: título, texto digitado e botão */}
        <Parallax speed={0.04} maxOffset={60}>
          <h1 className="mb-4 text-5xl font-bold text-accent md:text-7xl">
            Lucas do Condo Dev
          </h1>

          <TypingEffect texts={ROLES} speed={100} pause={2500} loop />

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="https://github.com/LucasdoCondo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-accent px-6 py-3 font-medium text-black transition hover:opacity-90"
            >
              <IoLogoGithub className="mr-2 h-5 w-5" />
              Ver no GitHub
            </Link>
          </div>
        </Parallax>
      </div>
    </section>
  );
}
