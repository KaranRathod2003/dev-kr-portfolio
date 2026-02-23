"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { socials } from "@/data/socials";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Canvas", href: "/canvas" },
  { label: "Board", href: "/board" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Top gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent-coral/40 to-transparent" />

      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link href="/" className="group flex items-center gap-2">
              <span className="text-2xl font-bold gradient-text">
                &lt;KR /&gt;
              </span>
            </Link>
            <p className="text-sm text-text-muted max-w-[260px] text-center md:text-left leading-relaxed">
              Full-Stack Developer building scalable web experiences with modern
              technologies.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-text-muted">
              Navigation
            </span>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-accent-coral link-underline transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-text-muted">
              Connect
            </span>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center w-10 h-10 rounded-xl glass text-text-secondary hover:text-accent-coral border border-glass-border hover:border-accent-coral/40 hover:shadow-[0_0_16px_rgba(249,115,22,0.2)] transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-glass-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Karan Rathod. All rights reserved.
          </p>
          <p className="text-xs text-text-faint">
            Built with{" "}
            <span className="gradient-text font-medium">Next.js</span>
            {" "}&{" "}
            <span className="gradient-text font-medium">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
