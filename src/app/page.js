import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ThemeToggle from "@/components/ThemeToggle";
import AboutPage from "./about/page";
import ExpertisePage from "./expertise/page";
import ProjectsPage from "./project/page";
import BlogPage from "./Blog/page";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <AboutPage />
      <ExpertisePage />
      <ProjectsPage />
      <BlogPage />
      <ThemeToggle />
      <Footer />
    </>
  );
}
