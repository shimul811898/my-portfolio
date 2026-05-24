import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ThemeToggle from "@/components/ThemeToggle";
import ExpertisePage from "./expertise/page";
import AboutPage from "./about/page";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <AboutPage />
      <ExpertisePage />
      <ThemeToggle />
    </>
  );
}
