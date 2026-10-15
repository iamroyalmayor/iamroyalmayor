import { Nav } from "@/components/Nav";
import { Hero } from "@/components/home/Hero";
import { Capabilities } from "@/components/home/Capabilities";
import { WorkIndex } from "@/components/home/WorkIndex";
import { Products } from "@/components/home/Products";
import { About } from "@/components/home/About";
import { Approach } from "@/components/home/Approach";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Capabilities />
        <WorkIndex />
        <Products />
        <About />
        <Approach />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
