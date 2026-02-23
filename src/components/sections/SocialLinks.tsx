"use client";

import { motion } from "framer-motion";
import { socials } from "@/data/socials";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { ScrambleOnHover } from "@/components/animations/TextScramble";

export default function SocialLinks() {
  return (
    <SectionWrapper className="!py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {socials.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, ease: [0.83, 0, 0.17, 1] }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl glass text-text-secondary hover:text-accent-coral hover:border-accent-coral/30 transition-all duration-300"
              aria-label={social.name}
            >
              <social.icon size={20} />
              <ScrambleOnHover
                text={social.name}
                className="text-sm font-medium"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
