import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { DataWork } from "@/components/sections/DataWork";
import { TechStack } from "@/components/sections/TechStack";
import { Timeline } from "@/components/sections/Timeline";
import { GithubActivity } from "@/components/sections/GithubActivity";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <FeaturedProjects />
        <DataWork />
        <TechStack />
        <Timeline />
        <GithubActivity />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
