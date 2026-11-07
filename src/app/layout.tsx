import '@/styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lucas do Condo | Desenvolvedor Full‑Stack',
  description: 'Portfólio de Lucas do Condo: TypeScript, React, Next.js e Zcash.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-bg text-white antialiased">{children}</body>
    </html>
  );
}
