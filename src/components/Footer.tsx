export default function Footer() {
  return (
    <footer className="py-8 bg-card text-center">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-muted-foreground">
          Desenvolvido 👨‍💻 por <a href="https://github.com/LucasdoCondo" className="text-accent hover:underline" target="_blank" rel="noopener">
            Lucas do Condo
          </a>
        </p>

        <p className="mt-2 text-xs text-muted-foreground">
          Licença: <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener">
            MIT
          </a>
        </p>
      </div>
    </footer>
  );
}