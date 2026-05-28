# ariesaviles.com

Personal portfolio — built with Next.js 14, TypeScript, Framer Motion, and Tailwind CSS. Deployed to GitHub Pages via GitHub Actions.

## Concept

**Device Stage** — a two-column layout where hovering a project activates browser and mobile device frame previews, reflecting a fullstack + mobile engineering background. Pointer-driven interactions throughout with a custom cursor.

## Stack

- **Framework** — [Next.js 14](https://nextjs.org) (App Router, static export)
- **Language** — TypeScript
- **Animations** — [Framer Motion](https://www.framer.com/motion/)
- **Styling** — [Tailwind CSS](https://tailwindcss.com)
- **Deployment** — GitHub Pages via GitHub Actions

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customizing

### Projects

Edit `lib/projects.ts` to add your own work. Each project takes:

```ts
{
  id: string           // unique slug
  index: number        // display order
  title: string
  tagline: string      // one-liner shown in the list
  description: string  // longer description (used in future detail view)
  tech: string[]       // tech badges shown on hover
  type: 'web' | 'mobile' | 'both'  // controls which device frame activates
  url?: string         // live site link
  github?: string      // repo link
  year: number
  role: string
  desktopImage?: string  // path relative to /public, e.g. /projects/foo-desktop.png
  mobileImage?: string   // path relative to /public, e.g. /projects/foo-mobile.png
}
```

### Project screenshots

Drop screenshots into `public/projects/` and reference them in `lib/projects.ts`:

```
public/
  projects/
    my-project-desktop.png   # ~1280×800 recommended
    my-project-mobile.png    # ~390×844 recommended (iPhone aspect ratio)
```

If no image is set, the frame renders a styled placeholder with the project name.

### Personal info

| File | What to update |
|---|---|
| `app/layout.tsx` | Page title, meta description, OG/Twitter tags |
| `components/Hero.tsx` | Name, title, tagline, availability status |
| `components/About.tsx` | Bio paragraphs, skills list |
| `components/Contact.tsx` | Email, GitHub, LinkedIn links |
| `components/Footer.tsx` | Name in copyright |
| `components/Nav.tsx` | Your name in the top-left |

## Deployment

Pushes to `main` automatically deploy to GitHub Pages via `.github/workflows/nextjs.yml`. The custom domain is set via `CNAME` (`ariesaviles.com`).

To deploy manually:

```bash
npm run build   # outputs to /out
```

Then push — GitHub Actions handles the rest.

## Project structure

```
├── app/
│   ├── globals.css       # Base styles, custom cursor, scrollbar
│   ├── layout.tsx        # Root layout, fonts, metadata
│   └── page.tsx          # Page composition
├── components/
│   ├── CustomCursor.tsx  # Dot + ring cursor with spring physics
│   ├── Nav.tsx           # Sticky nav, blur on scroll
│   ├── Hero.tsx          # Full-screen intro section
│   ├── ProjectsSection.tsx  # Two-column project list + device stage
│   ├── DeviceStage.tsx   # Orchestrates both device frames
│   ├── BrowserFrame.tsx  # Browser chrome mockup
│   ├── MobileFrame.tsx   # Phone mockup with status bar
│   ├── About.tsx         # Bio + skills
│   ├── Contact.tsx       # Contact links
│   └── Footer.tsx
├── lib/
│   └── projects.ts       # All project data lives here
└── public/
    └── projects/         # Drop screenshot images here
```
