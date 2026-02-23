"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SplitText from "@/components/animations/SplitText";
import { ScrambleOnScroll } from "@/components/animations/TextScramble";

export default function ExperienceSection() {
  return (
    <SectionWrapper id="experience">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          <span className="gradient-text">
            <SplitText text="Experience" stagger={0.03} />
          </span>
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, ease: [0.83, 0, 0.17, 1] }}
          className="text-text-secondary text-center mb-16 max-w-xl mx-auto"
        >
          My journey so far
        </motion.p>

        {/* Timeline */}
        <div className="relative">
          {/* Animated vertical line — clip-path reveal */}
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1] }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-coral via-accent-rose to-accent-cyan"
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                x: i % 2 === 0 ? -40 : 40,
              }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: i * 0.2,
                duration: 0.6,
                ease: [0.83, 0, 0.17, 1],
              }}
              className={`relative flex items-center mb-12 last:mb-0 ${
                i % 2 === 0
                  ? "md:flex-row"
                  : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.3, type: "spring", stiffness: 300 }}
                className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent-coral border-4 border-bg-primary z-10 glow-purple"
              />

              {/* Card */}
              <div
                className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                  i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:ml-auto"
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass glass-hover rounded-xl p-6"
                >
                  <h3 className="text-lg font-semibold text-text-primary">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-text-secondary mt-1">
                    {exp.company}
                  </p>
                  <p className="text-sm text-accent-coral font-mono mt-1">
                    <ScrambleOnScroll text={exp.years} />
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
