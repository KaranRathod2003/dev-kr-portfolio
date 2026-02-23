"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SplitText from "@/components/animations/SplitText";
import MagneticButton from "@/components/ui/MagneticButton";

type Status = "idle" | "loading" | "success" | "error";

function PaperPlaneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
    </svg>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => {
        setStatus("idle");
        setSent(false);
      }, 5000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to send");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <SectionWrapper id="contact">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          <span className="gradient-text">
            <SplitText text="Send a Message" stagger={0.03} />
          </span>
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, ease: [0.83, 0, 0.17, 1] }}
          className="text-text-secondary text-center mb-14 max-w-lg mx-auto"
        >
          Have a project in mind? Drop me a line.
        </motion.p>

        {/* Compose window frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
          className="relative rounded-2xl border border-glass-border bg-bg-secondary/60 backdrop-blur-sm overflow-hidden"
        >
          {/* Window title bar */}
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-glass-border bg-bg-tertiary/50">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <span className="text-xs font-mono text-text-muted tracking-wide ml-2">
              New Message
            </span>
            <div className="ml-auto">
              <PaperPlaneIcon className="w-4 h-4 text-text-faint" />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {sent ? (
              /* Success state — paper plane animation */
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 px-6"
              >
                <motion.div
                  initial={{ y: 0, x: 0, rotate: 0 }}
                  animate={{
                    y: [0, -30, -80],
                    x: [0, 20, 60],
                    rotate: [0, -15, -30],
                    opacity: [1, 1, 0],
                  }}
                  transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1] }}
                  className="mb-6"
                >
                  <PaperPlaneIcon className="w-12 h-12 text-accent-coral" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-center"
                >
                  <h3 className="text-xl font-semibold text-text-primary mb-2">Message Sent</h3>
                  <p className="text-sm text-text-secondary">
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                </motion.div>
              </motion.div>
            ) : (
              /* Form state */
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-0"
              >
                {/* To / From fields — email style */}
                <div className="border-b border-glass-border/50">
                  <div className="flex items-center gap-3 px-5 py-3 border-b border-glass-border/30">
                    <span className="text-xs font-mono text-text-muted w-14 shrink-0">From:</span>
                    <div className="flex gap-3 flex-1">
                      <input
                        type="text"
                        required
                        maxLength={100}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="flex-1 bg-transparent text-sm text-text-primary placeholder-text-faint focus:outline-none"
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-5 py-3">
                    <span className="text-xs font-mono text-text-muted w-14 shrink-0">Email:</span>
                    <input
                      type="email"
                      required
                      maxLength={254}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="flex-1 bg-transparent text-sm text-text-primary placeholder-text-faint focus:outline-none"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Message body */}
                <div className="px-5 pt-4 pb-2">
                  <textarea
                    required
                    maxLength={2000}
                    rows={7}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-transparent text-sm text-text-primary placeholder-text-faint focus:outline-none resize-none leading-relaxed"
                    placeholder="Write your message here..."
                  />
                </div>

                {/* Bottom bar with send button */}
                <div className="flex items-center justify-between px-5 py-4 border-t border-glass-border/50">
                  {/* Status text */}
                  <div className="text-xs font-mono text-text-faint">
                    {status === "loading" && (
                      <motion.span
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      >
                        Sending...
                      </motion.span>
                    )}
                    {status === "error" && (
                      <span className="text-red-400">{errorMsg || "Failed to send"}</span>
                    )}
                    {status === "idle" && (
                      <span>{form.message.length}/2000</span>
                    )}
                  </div>

                  <MagneticButton>
                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      whileHover={{ scale: status === "loading" ? 1 : 1.05 }}
                      whileTap={{ scale: status === "loading" ? 1 : 0.95 }}
                      animate={
                        status === "error"
                          ? { x: [-6, 6, -6, 6, 0] }
                          : {}
                      }
                      transition={status === "error" ? { duration: 0.3 } : {}}
                      className="flex items-center gap-2.5 px-6 py-2.5 rounded-lg bg-gradient-to-r from-accent-coral to-accent-rose text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-shadow hover:shadow-lg hover:shadow-accent-coral/20"
                    >
                      <span>Send</span>
                      <PaperPlaneIcon className="w-4 h-4" />
                    </motion.button>
                  </MagneticButton>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
