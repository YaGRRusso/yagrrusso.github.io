"use client";

import { Separator } from "@/components/ui/separator";
import { AboutSection } from "./_components/sections/about-section";
import { ContactSection } from "./_components/sections/contact-section";
import { CoursesSection } from "./_components/sections/courses-section";
import { EducationSection } from "./_components/sections/education-section";
import { ExperienceSection } from "./_components/sections/experience-section";
import { HeroSection } from "./_components/sections/hero-section";
import { PortfolioSection } from "./_components/sections/portfolio-section";
import { SkillsMarqueeSection } from "./_components/sections/skills-marquee-section";
import { SkillsSection } from "./_components/sections/skills-section";

export function ClientPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <HeroSection />
      <Separator />
      <SkillsMarqueeSection />
      <Separator />
      <AboutSection />
      <Separator />
      <ExperienceSection />
      <Separator />
      <PortfolioSection />
      <Separator />
      <SkillsSection />
      <Separator />
      <EducationSection />
      <Separator />
      <CoursesSection />
      <Separator />
      <SkillsMarqueeSection />
      <Separator />
      <ContactSection />
    </div>
  );
}
