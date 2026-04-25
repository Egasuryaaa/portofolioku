import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";
import HeroSection from "@/components/HeroSection";
import LiquidChrome from "@/components/LiquidChrome";
import LogoLoop from "@/components/LogoLoop";
import Navbar from "@/components/Navbar";
import ProjectsSection from "@/components/ProjectsSection";
import ScrollVelocityDivider from "@/components/ScrollVelocityDivider";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip text-slate-100">
      <LiquidChrome baseColor={[0.04, 0.0, 0.1]} speed={0.25} amplitude={0.35} interactive />
      <Navbar />

      <main className="relative z-10">
        <HeroSection />
        <ScrollVelocityDivider />
        <LogoLoop />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <GallerySection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
