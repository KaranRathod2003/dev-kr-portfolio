"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function useTextScramble(finalText: string, trigger: boolean) {
  const [displayText, setDisplayText] = useState(finalText);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const scramble = useCallback(() => {
    const duration = 350; // faster resolve
    const chars = finalText.split("");
    const totalChars = chars.length;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      const resolvedCount = Math.floor(progress * totalChars);

      const result = chars
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < resolvedCount) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayText(result);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(finalText);
      }
    };

    startTimeRef.current = 0;
    frameRef.current = requestAnimationFrame(animate);
  }, [finalText]);

  useEffect(() => {
    if (trigger) {
      scramble();
    }
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [trigger, scramble]);

  return displayText;
}
