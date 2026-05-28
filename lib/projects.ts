export type ProjectType = "web" | "mobile" | "both";

export interface Project {
  id: string;
  index: number;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  type: ProjectType;
  url?: string;
  github?: string;
  year: number;
  role: string;
  desktopImage?: string;
  mobileImage?: string;
}

export const projects: Project[] = [
  {
    id: "project-01",
    index: 1,
    title: "Project Alpha",
    tagline: "End-to-end platform for X",
    description:
      "A full-stack SaaS platform with real-time collaboration, role-based access, and a mobile companion app.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Redis"],
    type: "both",
    url: "https://example.com",
    github: "https://github.com",
    year: 2024,
    role: "Lead Engineer",
    desktopImage: "/projects/alpha-desktop.png",
    mobileImage: "/projects/alpha-mobile.png",
  },
  {
    id: "project-02",
    index: 2,
    title: "Project Beta",
    tagline: "Native iOS & Android app",
    description:
      "A cross-platform mobile application with offline-first architecture and seamless sync.",
    tech: ["React Native", "Expo", "GraphQL", "SQLite"],
    type: "mobile",
    github: "https://github.com",
    year: 2024,
    role: "Mobile Lead",
    mobileImage: "/projects/beta-mobile.png",
  },
  {
    id: "project-03",
    index: 3,
    title: "Project Gamma",
    tagline: "Developer-facing API & dashboard",
    description:
      "REST + WebSocket API with a real-time monitoring dashboard and CLI tooling.",
    tech: ["Node.js", "React", "WebSockets", "InfluxDB", "Docker"],
    type: "web",
    url: "https://example.com",
    year: 2023,
    role: "Backend Engineer",
    desktopImage: "/projects/gamma-desktop.png",
  },
  {
    id: "project-04",
    index: 4,
    title: "Project Delta",
    tagline: "Consumer app, shipped to 100k+ users",
    description:
      "High-performance consumer mobile app with live data feeds and offline support.",
    tech: ["Swift", "Kotlin", "Firebase", "Node.js"],
    type: "mobile",
    year: 2023,
    role: "Senior Engineer",
    mobileImage: "/projects/delta-mobile.png",
  },
  {
    id: "project-05",
    index: 5,
    title: "Project Epsilon",
    tagline: "Headless CMS + storefront",
    description:
      "A composable e-commerce stack with a custom headless CMS and Jamstack storefront.",
    tech: ["Next.js", "Contentful", "Stripe", "Vercel", "TypeScript"],
    type: "web",
    url: "https://example.com",
    year: 2022,
    role: "Full-Stack Engineer",
    desktopImage: "/projects/epsilon-desktop.png",
  },
];
