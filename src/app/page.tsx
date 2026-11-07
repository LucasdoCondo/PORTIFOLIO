import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Hackathon from '@/components/Hackathon';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SwarmCursors from '@/components/SwarmCursors';

export default function Home() {
  return (
    <main className="min-h-screen">
      <SwarmCursors count={5} />
      <Header />
      <Hero />
      <About />
      <Projects />
      <Hackathon />
      <Contact />
      <Footer />
    </main>
  );
}
