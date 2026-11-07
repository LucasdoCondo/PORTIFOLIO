import Image from 'next/image';
import Link from 'next/link';
import { AiFillGithub } from 'react-icons/ai';
import FigmaReveal from '@/components/FigmaReveal';

export default function Hackathon() {
  return (
    <section id="hackathon" className="py-24 bg-bg/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-accent mb-4">
              Hackathon ZecHub
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Participação ativa no ZecHub Hackathon, construindo soluções
              alinhadas às trilhas oficiais do ecossistema Zcash (como
              ferramentas de infraestrutura, utilitários de pagamento e
              experiências descentralizadas). O projeto foca em expandir a
              adoção de criptografia voltada à privacidade, garantindo código
              totalmente open-source, arquitetura modular e documentação
              técnica detalhada para a comunidade global de desenvolvedores.
            </p>

            <details className="mt-6">
              <summary className="text-sm hover:underline cursor-pointer">
                Mais detalhes
              </summary>
              <ul className="mt-2 text-sm text-muted-foreground list-disc pl-5 space-y-1">
                <li>Data: 15 de março a 05 de maio de 2026</li>
                <li>Participantes: 42 voluntários (devs, escritores, designers)</li>
                <li>Resultado: 12 tutoriais em vídeo, 8 artigos de wiki, 1 podcast</li>
                <li>Premiação: destaque no site oficial da ZecHub e certificado de contribuição CC‑BY‑SA 4.0</li>
              </ul>

              <div className="mt-6">
                <video
                  src="/SAVANNA.mp4"
                  controls
                  className="w-full max-w-md rounded-lg border border-accent/30"
                  poster="/hackathon-zehub-2026.jpg"
                >
                  Seu navegador não suporta reprodução de vídeo.
                </video>
              </div>
            </details>

            <div className="mt-6">
              <h4 className="text-xl font-medium text-accent mb-3">
                Repositório do projeto
              </h4>
              <Link
                href="https://github.com/LucasdoCondo/zechub"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-accent hover:underline"
              >
                <AiFillGithub className="h-4 w-4 mr-1" />
                Ver no GitHub
              </Link>
            </div>
          </div>

          <FigmaReveal radius="0.75rem" className="mx-auto w-fit max-w-full">
            <Image
              src="/hackathon-zehub-2026.jpg"
              alt="Capa do Hackathon ZecHub 2026"
              width={1600}
              height={1600}
              className="block h-auto max-w-full rounded-xl border border-accent/30 object-cover"
              priority
            />
          </FigmaReveal>
        </div>
      </div>
    </section>
  );
}
