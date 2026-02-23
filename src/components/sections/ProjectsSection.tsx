"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { HiOutlineExternalLink, HiOutlineCode, HiArrowRight } from "react-icons/hi";
import { projects } from "@/data/projects";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SplitText from "@/components/animations/SplitText";

function ProjectSlideshow({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const isMultiple = images.length > 1;

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isMultiple || !hovered) return;
    const timer = setInterval(advance, 1400);
    return () => clearInterval(timer);
  }, [isMultiple, hovered, advance]);

  if (!isMultiple) {
    return (
      <Image
        src={images[0]}
        alt={title}
        fill
        className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 1024px) 100vw, 55vw"
      />
    );
  }

  return (
    <div
      className="absolute inset-0 bg-bg-secondary"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setCurrent(0); }}
    >
      {/* Preload all images */}
      {images.map((src, i) => (
        <Image
          key={`preload-${i}`}
          src={src}
          alt=""
          fill
          className="opacity-0 pointer-events-none absolute"
          sizes="(max-width: 1024px) 100vw, 55vw"
          priority
        />
      ))}

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Image
            src={images[current]}
            alt={`${title} - screenshot ${current + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
        <motion.div
          key={current}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: hovered ? 1.4 : 0, ease: "linear" }}
          className="h-full bg-gradient-to-r from-accent-coral to-accent-cyan"
        />
      </div>

    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        delay: index * 0.15,
        duration: 0.7,
        ease: [0.83, 0, 0.17, 1],
      }}
      className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-0 group`}
    >
      {/* Image side — full bleed with 3D tilt */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, perspective: 800 }}
        className="relative lg:w-[55%] aspect-[16/10] overflow-hidden rounded-2xl lg:rounded-3xl cursor-default"
      >
        <ProjectSlideshow images={project.images} title={project.title} />

        {/* Coral/cyan gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0c0a09]/70 via-transparent to-transparent transition-opacity duration-500 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent-coral/0 to-accent-cyan/0 group-hover:from-accent-coral/10 group-hover:to-accent-cyan/10 transition-all duration-700 pointer-events-none" />

        {/* Project number watermark */}
        <span className="absolute bottom-4 right-6 font-mono text-7xl lg:text-8xl font-black text-white/[0.04] group-hover:text-white/[0.08] transition-all duration-500 select-none pointer-events-none">
          {String(index + 1).padStart(2, "0")}
        </span>
      </motion.div>

      {/* Content side */}
      <div className={`lg:w-[45%] flex flex-col justify-center ${isEven ? "lg:pl-10" : "lg:pr-10"} py-6 lg:py-0`}>
        {/* Index number */}
        <motion.span
          initial={{ opacity: 0, x: isEven ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.2, ease: [0.83, 0, 0.17, 1] }}
          className="font-mono text-xs text-accent-coral/60 tracking-widest mb-3"
        >
          PROJECT {String(index + 1).padStart(2, "0")}
        </motion.span>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.3, ease: [0.83, 0, 0.17, 1] }}
          className="text-2xl lg:text-3xl font-bold text-text-primary mb-4 leading-tight"
        >
          {project.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.4, ease: [0.83, 0, 0.17, 1] }}
          className="text-text-secondary leading-relaxed mb-6"
        >
          {project.description}
        </motion.p>

        {/* Tags as inline chips */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.5 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1.5 rounded-full bg-bg-tertiary text-text-secondary border border-glass-border font-mono tracking-wide"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Links styled as text arrows */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.6, ease: [0.83, 0, 0.17, 1] }}
          className="flex items-center gap-6"
        >
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 text-sm font-medium text-accent-coral hover:text-accent-amber transition-colors"
            >
              <HiOutlineExternalLink size={16} />
              <span className="link-underline">Live Demo</span>
              <HiArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
            </a>
          )}
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              <HiOutlineCode size={16} />
              <span className="link-underline">Source Code</span>
              <HiArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
            </a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <SectionWrapper id="projects">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          <span className="gradient-text">
            <SplitText text="Featured Projects" stagger={0.03} />
          </span>
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, ease: [0.83, 0, 0.17, 1] }}
          className="text-text-secondary text-center mb-20 max-w-xl mx-auto"
        >
          A selection of projects I&apos;ve built and shipped
        </motion.p>

        <div className="flex flex-col gap-20 lg:gap-28">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
