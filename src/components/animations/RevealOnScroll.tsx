"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  clipPath?: boolean;
}

const clipVariants: Variants = {
  hidden: {
    clipPath: "inset(100% 0 0 0)",
    opacity: 0,
  },
  visible: {
    clipPath: "inset(0 0 0 0)",
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.83, 0, 0.17, 1],
    },
  },
};

const directionMap = {
  up: { y: 80, x: 0 },
  down: { y: -80, x: 0 },
  left: { x: -80, y: 0 },
  right: { x: 80, y: 0 },
};

export default function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  direction = "up",
  clipPath = false,
}: RevealOnScrollProps) {
  if (clipPath) {
    return (
      <motion.div
        className={className}
        variants={clipVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay }}
      >
        {children}
      </motion.div>
    );
  }

  const offset = directionMap[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.83, 0, 0.17, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
