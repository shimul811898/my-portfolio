import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ThemeToggle from "@/components/ThemeToggle";
import AboutPage from "./about/page";
import ExpertisePage from "./expertise/page";
import EducationPage from "./education/page";
import ProjectsPage from "./project/page";
import GitHubPage from "./github/page";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <AboutPage />
      </section>
      <section id="expertise">
        <ExpertisePage />
      </section>
      <section id="education">
        <EducationPage />
      </section>
      <section id="project">
        <ProjectsPage />
      </section>
      <section id="github">
        <GitHubPage />
      </section>
   
      <ThemeToggle />
      <Footer />
    </>
  );
}
