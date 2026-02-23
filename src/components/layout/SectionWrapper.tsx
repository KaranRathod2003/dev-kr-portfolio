"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const directionVariants = {
  up: { y: 80, opacity: 0 },
  down: { y: -80, opacity: 0 },
  left: { x: -80, opacity: 0 },
  right: { x: 80, opacity: 0 },
};

export default function SectionWrapper({
  children,
  className = "",
  id,
  delay = 0,
  direction = "up",
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={directionVariants[direction]}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.83, 0, 0.17, 1],
      }}
      className={`section-padding ${className}`}
    >
      {children}
    </motion.section>
  );
}
