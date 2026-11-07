// src/components/About.tsx
import Image from 'next/image';
import FigmaReveal from '@/components/FigmaReveal';

type StackGroup = {
  title: string;
  items: string[];
};

const formacao: string[] = [
  'Gestão da Tecnologia da Informação',
  'Análise e Desenvolvimento de Sistemas',
  'Gestão de Recursos Humanos',
];

const stack: StackGroup[] = [
  {
    title: 'Linguagens & Ecossistemas',
    items: ['TypeScript', 'JavaScript', 'Rust', 'GDScript', 'HTML5', 'CSS3', 'SQL'],
  },
  {
    title: 'Frameworks & Bibliotecas',
    items: [
      'React',
      'Vite',
      'Next.js',
      'Node.js',
      'Express',
      'Tailwind CSS',
      'Shadcn UI',
      'Flutter',
      'Android (Kotlin/Compose)',
    ],
  },
  {
    title: 'Bancos de Dados & ORM',
    items: ['PostgreSQL', 'Prisma ORM', 'SQLite', 'Redis (BullMQ)'],
  },
  {
    title: 'DevOps, Ferramentas & Cloud',
    items: [
      'Git',
      'GitHub',
      'Docker',
      'Linux',
      'Oracle Cloud (VPS)',
      'Tauri',
      'Inno Setup',
      'Godot Engine 4',
      'OAuth 2.0',
      'gRPC',
      'JWT',
    ],
  },
];

export default function About() {
  return (
    <section id="sobre" className="py-24 bg-bg/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-start">
          <div>
            <h3 className="text-3xl font-bold text-accent mb-2">Sobre mim</h3>
            <p className="text-xl font-medium text-white mb-6">
              Desenvolvedor Full Stack
            </p>

            <ul className="flex flex-wrap gap-2 mb-6" aria-label="Formação">
              {formacao.map((f) => (
                <li
                  key={f}
                  className="px-3 py-1 rounded-full border border-accent/40 text-sm text-accent"
                >
                  {f}
                </li>
              ))}
            </ul>

            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Atuação destacada em operações de redes, automação, suporte
                técnico avançado e desenvolvimento de software end-to-end.
              </p>
              <p>
                Forte domínio na criação de arquiteturas escaláveis, aplicações
                web modernas e ecossistemas descentralizados, unindo eficiência
                de infraestrutura, governança de TI e metodologias de melhoria
                contínua.
              </p>
            </div>
          </div>

          <FigmaReveal
            radius="0.75rem"
            className="mx-auto w-full max-w-[280px] md:max-w-[320px]"
          >
            <Image
              src="/profile2.jpg"
              alt="Foto de Lucas do Condo"
              width={1536}
              height={2730}
              priority
              sizes="(min-width: 768px) 320px, 80vw"
              className="block h-auto w-full rounded-xl border border-accent/30"
            />
          </FigmaReveal>
        </div>

        <div className="mt-16">
          <h4 className="text-2xl font-bold text-accent mb-8">
            Tecnologias, Frameworks &amp; Stack Técnica
          </h4>

          <div className="grid gap-6 sm:grid-cols-2">
            {stack.map((group, i) => (
              <FigmaReveal key={group.title} delay={i * 150} className="h-full">
                <div className="h-full rounded-2xl border border-white/10 bg-card p-6">
                  <h5 className="text-base font-medium text-white mb-4">
                    {group.title}
                  </h5>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="px-2.5 py-1 rounded bg-white/5 text-sm text-accent"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FigmaReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
