"use client";

import { motion } from "framer-motion";

const links = [
  {
    label: "Email",
    href: "mailto:hello@ariesaviles.com",
    display: "hello@ariesaviles.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/ariesaviles",
    display: "github.com/ariesaviles",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/ariesaviles",
    display: "linkedin.com/in/ariesaviles",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32 border-t border-stone-200"
    >
      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-mono tracking-widest text-stone-400 uppercase">
            Contact
          </span>
          <h2 className="mt-4 text-2xl lg:text-3xl font-semibold tracking-tight text-stone-900 leading-snug">
            Let&apos;s build something together.
          </h2>
          <p className="mt-4 text-stone-500 leading-relaxed text-sm lg:text-base">
            Open to senior and staff-level engineering roles, consulting
            engagements, and interesting projects. If you want to collaborate or
            just say hi, reach out.
          </p>

          <ul className="mt-10 space-y-4">
            {links.map((link, i) => (
              <motion.li
                key={link.label}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <a
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-3 border-b border-stone-200 hover:border-stone-900 transition-all duration-200"
                  data-cursor-hover
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-stone-400 w-16">
                      {link.label}
                    </span>
                    <span className="text-sm text-stone-700 group-hover:text-stone-900 transition-colors">
                      {link.display}
                    </span>
                  </div>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="text-stone-300 group-hover:text-stone-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <path
                      d="M2 12L12 2M12 2H5M12 2V9"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
