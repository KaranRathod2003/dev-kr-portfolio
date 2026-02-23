"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/skills";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SplitText from "@/components/animations/SplitText";

function SkillItem({ name, icon: Icon }: { name: string; icon: React.ComponentType<{ size?: number; color?: string }>; color: string }) {
  return (
    <div className="flex items-center gap-3 shrink-0 group cursor-default select-none">
      <span className="inline-flex text-accent-coral transition-transform duration-300 group-hover:scale-110 group-hover:text-accent-cyan">
        <Icon size={26} />
      </span>
      <span className="text-lg md:text-xl font-semibold text-text-secondary whitespace-nowrap tracking-wide transition-colors duration-300 group-hover:text-text-primary">
        {name}
      </span>
      <span className="text-text-faint/30 text-lg ml-3 select-none">&bull;</span>
    </div>
  );
}

export default function SkillsSection() {
  const tripledSkills = [...skills, ...skills, ...skills];

  return (
    <SectionWrapper id="skills" className="!overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          <span className="gradient-text">
            <SplitText text="Skills & Technologies" stagger={0.03} />
          </span>
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, ease: [0.83, 0, 0.17, 1] }}
          className="text-text-secondary text-center mt-4 max-w-xl mx-auto"
        >
          Technologies I work with to build modern web experiences
        </motion.p>
      </div>

      <div className="relative py-6">
        <div className="absolute left-0 top-0 bottom-0 w-36 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-36 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee hover:[animation-play-state:paused] gap-8">
          {tripledSkills.map((skill, i) => (
            <SkillItem key={`skill-${i}`} {...skill} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
