"use client";

import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  mode?: "chars" | "words";
}

export default function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 0.03,
  mode = "chars",
}: SplitTextProps) {
  if (mode === "words") {
    const words = text.split(" ");
    return (
      <span className={className}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.25em]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: delay + i * stagger * 3,
              ease: [0.83, 0, 0.17, 1],
            }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    );
  }

  // Character mode — each char animated individually
  const chars = text.split("");
  return (
    <span className={className} style={{ display: "inline" }}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.35,
            delay: delay + i * stagger,
            ease: [0.83, 0, 0.17, 1],
          }}
          style={char === " " ? { whiteSpace: "pre" } : undefined}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
