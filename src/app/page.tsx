import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";

// Lazy-load below-fold sections so the hero paints fast
const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection"));
const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"));
const ExperienceSection = dynamic(() => import("@/components/sections/ExperienceSection"));
const SocialLinks = dynamic(() => import("@/components/sections/SocialLinks"));
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"));

export default function Home() {
  return (
    <div className="dot-grid">
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <SocialLinks />
      <ContactSection />
    </div>
  );
}
