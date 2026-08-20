import Capabilities from "@/components/Capabilities";
import FinalCTA from "@/components/FinalCTA";
import Hero from "@/components/Hero";
import Impact from "@/components/Impact";
import Innovation from "@/components/Innovation";
import Research from "@/components/Research";

export default function Home() {
  return (
    <main>
      <Hero />
      <Innovation />
      <Research />
      <Capabilities />
      <Impact />
      <FinalCTA />
    </main>
  );
}