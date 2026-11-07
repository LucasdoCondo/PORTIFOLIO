'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';

const links = [
  { href: '/#inicio', label: 'Início' },
  { href: '/#sobre', label: 'Sobre' },
  { href: '/#projetos', label: 'Projetos' },
  { href: '/#hackathon', label: 'Hackathon ZecHub' },
  { href: '/#contato', label: 'Contato' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-white/10 bg-card/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-accent">
          Lucas do Condo Dev
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium hover:underline">
              {l.label}
            </Link>
          ))}
          <a
            href="https://github.com/LucasdoCondo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-accent hover:underline"
          >
            GitHub
            <AiFillGithub className="ml-1 h-4 w-4 inline-flex" />
          </a>
        </nav>

        <button
          className="md:hidden p-2"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          ☰
        </button>
      </div>

      {open && (
        <nav className="md:hidden px-4 pb-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}