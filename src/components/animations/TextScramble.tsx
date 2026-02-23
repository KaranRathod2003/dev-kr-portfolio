"use client";

import { useState, useRef } from "react";
import { useInView } from "framer-motion";
import { useTextScramble } from "@/hooks/useTextScramble";

interface ScrambleOnScrollProps {
  text: string;
  className?: string;
}

export function ScrambleOnScroll({ text, className = "" }: ScrambleOnScrollProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const displayText = useTextScramble(text, isInView);

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
}

interface ScrambleOnHoverProps {
  text: string;
  className?: string;
}

export function ScrambleOnHover({ text, className = "" }: ScrambleOnHoverProps) {
  const [hovered, setHovered] = useState(false);
  const [key, setKey] = useState(0);
  const displayText = useTextScramble(text, hovered);

  return (
    <span
      key={key}
      className={className}
      onMouseEnter={() => {
        setKey((k) => k + 1);
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
    >
      {displayText}
    </span>
  );
}
