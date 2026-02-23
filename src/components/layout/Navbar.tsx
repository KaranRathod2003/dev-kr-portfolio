"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { FaGithub } from "react-icons/fa6";
import { useSession, signIn, signOut } from "next-auth/react";
import MagneticButton from "@/components/ui/MagneticButton";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Canvas", href: "/canvas" },
  { name: "Board", href: "/board" },
];

function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-8 h-8 rounded-full bg-bg-tertiary animate-pulse" />
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {session.user.image && (
            <Image
              src={session.user.image}
              alt={session.user.name || "User"}
              width={28}
              height={28}
              className="rounded-full border border-glass-border"
            />
          )}
          <span className="text-xs text-text-secondary hidden lg:inline">
            {session.user.name}
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => signOut()}
          className="text-xs text-text-muted hover:text-text-primary transition-colors"
        >
          Sign out
        </motion.button>
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => signIn("github")}
      className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm text-text-secondary hover:text-text-primary border border-glass-border hover:border-glass-border-hover transition-all"
    >
      <FaGithub size={16} />
      <span className="hidden sm:inline">Sign in</span>
    </motion.button>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.span
              className="gradient-text text-xl font-bold tracking-tight"
              whileHover={{ scale: 1.05 }}
            >
              &lt;KR /&gt;
            </motion.span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <span className="link-underline px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                  {link.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Auth + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <AuthButton />
            <MagneticButton>
              <Link href="/canvas">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg bg-accent-coral/20 px-4 py-2 text-sm font-medium text-accent-coral border border-accent-coral/30 hover:bg-accent-coral/30 transition-colors"
                >
                  Create on Canvas
                </motion.button>
              </Link>
            </MagneticButton>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <HiX size={24} /> : <HiOutlineMenuAlt3 size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-glass-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="block px-4 py-3 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-white/5 rounded-lg transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="px-4 py-3"
              >
                <AuthButton />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
