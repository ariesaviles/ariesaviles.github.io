"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#1c1917 1px, transparent 1px), linear-gradient(90deg, #1c1917 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 pt-20">
        {/* Status badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.1}
          className="inline-flex items-center gap-2 mb-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-sm text-stone-500 tracking-wide">
            Open to new opportunities
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.2}
          className="text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[1.05] tracking-tight text-stone-900 max-w-4xl"
        >
          Aries Aviles
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.3}
          className="mt-4 text-[clamp(1.25rem,3vw,2rem)] font-light text-stone-500 tracking-tight"
        >
          Senior Software Engineer — Web & Mobile
        </motion.p>

        {/* Descriptor */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.4}
          className="mt-8 text-base lg:text-lg text-stone-500 max-w-xl leading-relaxed"
        >
          I build full-stack products and native mobile experiences — from API
          design to pixel-perfect UIs. Focused on performance, reliability, and
          the craft of shipping.
        </motion.p>

        {/* CTA row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.5}
          className="mt-10 flex items-center gap-6"
        >
          <a
            href="#work"
            className="inline-flex items-center gap-2 bg-stone-900 text-stone-50 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-stone-700 transition-colors"
            data-cursor-hover
          >
            View work
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="opacity-70"
            >
              <path
                d="M2 12L12 2M12 2H5M12 2V9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="#contact"
            className="text-sm text-stone-500 hover:text-stone-900 transition-colors"
            data-cursor-hover
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-6 lg:left-12 flex items-center gap-3 text-stone-400"
      >
        <motion.div
          className="w-px h-10 bg-stone-300 origin-top"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="text-xs tracking-widest uppercase rotate-0">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
