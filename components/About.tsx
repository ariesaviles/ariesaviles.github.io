"use client";

import { motion } from "framer-motion";

const skills = [
  {
    category: "Languages",
    items: ["TypeScript", "Swift", "Kotlin", "Python", "SQL"],
  },
  {
    category: "Web",
    items: ["React", "Next.js", "Node.js", "GraphQL", "REST"],
  },
  {
    category: "Mobile",
    items: ["React Native", "Expo", "SwiftUI", "Jetpack Compose"],
  },
  {
    category: "Infra",
    items: ["AWS", "Docker", "PostgreSQL", "Redis", "Vercel"],
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32 border-t border-stone-200"
    >
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Left — label + bio */}
        <div className="lg:w-2/5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-mono tracking-widest text-stone-400 uppercase">
              About
            </span>
            <h2 className="mt-4 text-2xl lg:text-3xl font-semibold tracking-tight text-stone-900 leading-snug">
              Building across the full stack, from server to screen.
            </h2>
            <div className="mt-6 space-y-4 text-stone-500 leading-relaxed text-sm lg:text-base">
              <p>
                I&apos;m a senior software engineer with deep experience in both web
                and mobile product development. I care about architecture that
                scales, interfaces that feel effortless, and shipping things that
                work.
              </p>
              <p>
                I&apos;ve led engineering on consumer apps, developer tools, and
                enterprise platforms — always with a focus on performance,
                reliability, and the end user.
              </p>
              <p>
                Outside of code: mechanical keyboards, specialty coffee, and
                spending too much time thinking about typography.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right — skills grid */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-8"
          >
            {skills.map((group) => (
              <div key={group.category}>
                <span className="text-xs font-mono tracking-widest text-stone-400 uppercase">
                  {group.category}
                </span>
                <ul className="mt-3 space-y-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-stone-600"
                    >
                      <span className="w-1 h-1 rounded-full bg-stone-300 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
