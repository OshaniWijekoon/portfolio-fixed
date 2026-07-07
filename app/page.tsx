import Hero from "@/components/Hero";
import Perspective from "@/components/Perspective";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Perspective />
      <Projects />
      <About />
      <Skills />
      <Contact />
    </main>
  );
}