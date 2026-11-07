import { AiFillGithub } from 'react-icons/ai';
import FigmaReveal from '@/components/FigmaReveal';

type Project = {
  title: string;
  desc: string;
  tech: string[];
  href: string;
  destaque?: boolean;
};

const projects: Project[] = [
  {
    title: 'ZecHub',
    desc:
      'Plataforma descentralizada de educação para Zcash. Tutoriais, wiki-docs, podcast e newsletter semanal – tudo open-source hospedado no GitHub.',
    tech: ['TypeScript', 'React', 'Node.js', 'Tailwind CSS'],
    href: 'https://github.com/LucasdoCondo/zechub',
    destaque: true,
  },
  {
    title: 'ROTINA',
    desc:
      'Plataforma SaaS B2B multi-tenant de gestão financeira e empresarial. Gestão de fluxo de caixa, relatórios e automação de e-mails transacionais.',
    tech: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Prisma', 'Redis', 'Tailwind CSS'],
    href: 'https://github.com/LucasdoCondo/rotina',
  },
  {
    title: 'Mídia Visual Studio',
    desc:
      'Ferramenta multi-platforma de engajamento para streaming e redes sociais. Integração com APIs externas, gerenciamento de filas assíncronas e autenticação OAuth 2.0.',
    tech: ['TypeScript', 'React', 'Node.js', 'Prisma', 'Redis', 'OAuth 2.0', 'Tailwind CSS'],
    href: 'https://github.com/LucasdoCondo/midia-visual-studio',
  },
  {
    title: 'Hãn',
    desc:
      'Aplicação desktop nativa de CRM e ERP local de alta performance com persistência local otimizada e interface moderna.',
    tech: ['TypeScript', 'React', 'Tauri', 'SQLite', 'Shadcn UI', 'Tailwind CSS'],
    href: 'https://github.com/LucasdoCondo/han',
  },
];

export default function Projects() {
  return (
    <section id="projetos" className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-accent text-center mb-12">
          Meus Projetos
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, i) => (
            <FigmaReveal key={proj.title} delay={i * 150} className="h-full">
              <article
                className={`h-full rounded-2xl p-6 ${
                  proj.destaque
                    ? 'bg-card border-2 border-accent shadow-lg'
                    : 'bg-bg border border-border/50'
                }`}
              >
                <h4 className="text-xl font-medium text-accent mb-2">
                  {proj.title}
                </h4>
                <p className="text-muted-foreground line-clamp-3 mb-4">
                  {proj.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center px-2 py-0.5 bg-border/30 rounded text-xs text-accent"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={proj.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center text-accent hover:underline"
                >
                  <AiFillGithub className="mr-1 h-4 w-4" />
                  GitHub
                </a>
              </article>
            </FigmaReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
