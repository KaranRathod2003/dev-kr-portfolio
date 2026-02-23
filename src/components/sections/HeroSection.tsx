"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SplitText from "@/components/animations/SplitText";
import { ScrambleOnScroll } from "@/components/animations/TextScramble";
import MagneticButton from "@/components/ui/MagneticButton";

const techStack = [
  "JavaScript", "TypeScript", "Java", "React", "Next.js",
  "Tailwind CSS", "Node.js", "Express.js", "Socket.IO",
  "MongoDB", "Redis", "MySQL", "Zod", "JWT", "Vercel",
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const doubledTech = [...techStack, ...techStack];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden dot-grid"
    >
      {/* Static radial gradients — no infinite JS animation, pure CSS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full animate-pulse-glow-bg"
          style={{
            background: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] rounded-full animate-pulse-glow-bg"
          style={{
            background: "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)",
            animationDelay: "3s",
          }}
        />
      </div>

      {/* Content with parallax */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* "Hello, I'm" label */}
        <div className="mb-6">
          <ScrambleOnScroll
            text="Hello, I'm"
            className="font-mono text-sm md:text-base text-accent-coral tracking-wider"
          />
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          <span className="gradient-text">
            <SplitText text="Creative" delay={0.3} stagger={0.04} />
          </span>
          <br />
          <SplitText text="Developer" delay={0.6} stagger={0.04} className="text-text-primary" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
          className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Full-Stack Developer with hands-on experience in MERN stack, Next.js,
          TypeScript, and real-time systems. Building scalable, high-performance applications.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-accent-coral to-accent-cyan text-white font-medium text-sm glow-purple transition-all"
            >
              View Projects
            </motion.a>
          </MagneticButton>
          <MagneticButton>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-3 rounded-lg border border-glass-border-hover text-text-secondary hover:text-text-primary hover:bg-white/5 font-medium text-sm transition-all"
            >
              Get in Touch
            </motion.a>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Tech ticker — positioned at bottom, outside parallax content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-20 left-0 right-0 z-10 overflow-hidden"
      >
        <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee gap-10 py-2">
          {doubledTech.map((tech, i) => (
            <span
              key={`tech-${i}`}
              className="font-mono text-sm text-text-muted/50 whitespace-nowrap tracking-[0.2em] uppercase"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-text-muted">
          Scroll
        </span>
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-text-muted origin-top"
        />
      </motion.div>
    </section>
  );
}
