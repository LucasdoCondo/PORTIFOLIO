export default function Contact() {
  return (
    <section id="contato" className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-accent text-center mb-8">
          Contato
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Formulário simples */}
          <form
            className="space-y-4"
            action="/api/contact"
            method="POST"
          >
            <input
              type="text"
              name="name"
              placeholder="Seu nome"
              required
              className="w-full px-4 py-2 border rounded bg-card text-white"
            />
            <input
              type="email"
              name="email"
              placeholder="E‑mail"
              required
              className="w-full px-4 py-2 border rounded bg-card text-white"
            />
            <textarea
              name="message"
              rows={4}
              placeholder="Sua mensagem"
              required
              className="w-full px-4 py-2 border rounded bg-card text-white resize-none"
            ></textarea>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-accent text-black font-medium rounded-lg hover:opacity-90 transition"
            >
              Enviar
            </button>
          </form>

          {/* Redes sociais */}
          <div>
            <h4 className="text-base font-medium mb-3 text-white">Redes sociais</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <a
                  href="https://www.linkedin.com/in/lucas-de-sousa-099337179/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/LucasdoCondo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  X (Twitter)
                </a>
              </li>
            </ul>
          </div>

          {/* E‑mail direto */}
          <div>
            <h4 className="text-base font-medium mb-3 text-white">E-mail</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a
                  href="mailto:ldc.214@hotmail.com"
                  className="text-accent hover:underline"
                >
                  ldc.214@hotmail.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:Lucasdocondoll@gmail.com"
                  className="text-accent hover:underline"
                >
                  Lucasdocondoll@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:Lucasdocondolll@gmail.com"
                  className="text-accent hover:underline"
                >
                  Lucasdocondolll@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}