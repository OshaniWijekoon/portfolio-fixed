# Portfolio Sections (from Figma)

Next.js (App Router) implementation of two sections from the Figma file
`Untitled` (`gZnyj4IJ5MSUnwQLujkDFN`):

1. **Hero** — `components/Hero.tsx` (Figma node `1:1199`, "Frame 4")
   Full-screen intro with nav, the large "Oshani Wijekoon" name treatment,
   role subtitle, background photo collage, and the resume/projects links.
2. **Section Divider** — `components/SectionDivider.tsx` (Figma node `106:33`,
   "Frame 29") — the thin vertical hairline Figma uses as a seam between
   page sections.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Things to swap in

- **Hero photo**: `public/images/hero-photo.svg` is a placeholder standing in
  for the Figma image layer ("image 1 (1)"). The original asset was on
  Figma's temporary asset CDN (valid ~7 days from generation) at:
  `https://www.figma.com/api/mcp/asset/c97967e7-f55e-4e63-9fa3-28c30f5cfdc2`.
  Download it and drop it in as `public/images/hero-photo.jpg` (update the
  `src` in `Hero.tsx`), or swap in your own photo.
- **Fonts**: the design uses "Inria Serif" (loaded via `next/font/google`,
  exact match) and "JejuMyeongjo" for nav/body text, which isn't on Google
  Fonts. `layout.tsx` currently substitutes "Noto Serif KR" as a close
  stand-in — if you have the licensed JejuMyeongjo font file, load it with
  `next/font/local` instead for a pixel-exact match.
- **Resume link**: `Hero.tsx` links to `/resume.pdf` — add that file under
  `public/` or point it at wherever the real resume lives.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS for styling, with design tokens (`ink`, `muted`, `hairline`
  colors + `display`/`body` font families) set up in `tailwind.config.ts` to
  match the Figma styles.
