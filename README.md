# ariesaviles.github.io

Personal portfolio — notebook-style with an interactive swim lane timeline.

## Stack

- [Astro](https://astro.build) — static site framework
- [React](https://react.dev) — interactive component islands
- [Tailwind CSS](https://tailwindcss.com) — utility-first styling
- [Framer Motion](https://www.framer.com/motion/) — animations
- [D3.js](https://d3js.org) — swim lane timeline visualization

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/   # React component islands
  pages/        # Astro pages (index.astro is the entry point)
  styles/       # Global CSS
public/
  fonts/        # Bogart typeface (Bold, Medium, Semibold)
```

## Deployment

Deployed to GitHub Pages via the `CNAME` file pointing to the custom domain. Push to `main` to deploy.
