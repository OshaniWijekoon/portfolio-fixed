"use client";

import Image from "next/image";
import { useState } from "react";
import type { PointerEvent } from "react";
import { motion } from "framer-motion";
import { fadeUp, revealTransition, viewport, staggerDelay } from "@/components/lib/motion";

type FocusArea = {
  title: string;
  description: string;
};

const focusAreas: FocusArea[] = [
  {
    title: "UI/UX Design",
    description: "Crafting experiences that users love, one pixel at a time.",
  },
  {
    title: "Web Development",
    description:
      "Bringing designs to life through modern, responsive web solutions.",
  },
  {
    title: "Software Engineering",
    description:
      "Building smart systems that solve real-world challenges with code.",
  },
];

// ---- Original Text styles (exact sizes, fonts & colors from your code) ----
const labelText =
  "text-[clamp(11px,0.95vw,20px)] font-['Instrument_Sans'] font-normal tracking-wide text-zinc-500";
const bodyText =
  "text-[clamp(11px,1.02vw,22px)] font-['Instrument_Sans'] capitalize tracking-wide leading-[1.7] text-zinc-700";
const introText =
  "text-[clamp(14px,1.3vw,28px)] font-['Instrument_Sans'] capitalize tracking-wide leading-[1.55] text-black";
const subheadingText =
  "text-[clamp(13px,1.2vw,28px)] font-['JejuMyeongjo'] tracking-[0.12em]";

// ---- Film-grain texture (applied ONLY inside the portrait image container) ----
const IMAGE_GRAIN_OPACITY = 0.32;
const IMAGE_GRAIN_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>" +
  "<filter id='n' x='0' y='0' width='100%' height='100%'>" +
  "<feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/>" +
  "<feColorMatrix type='saturate' values='0'/>" +
  "<feComponentTransfer>" +
  "<feFuncR type='linear' slope='1.8' intercept='-0.4'/>" +
  "<feFuncG type='linear' slope='1.8' intercept='-0.4'/>" +
  "<feFuncB type='linear' slope='1.8' intercept='-0.4'/>" +
  "</feComponentTransfer>" +
  "</filter>" +
  "<rect width='100%' height='100%' filter='url(#n)'/>" +
  "</svg>";
const IMAGE_GRAIN_URL =
  'url("data:image/svg+xml,' + encodeURIComponent(IMAGE_GRAIN_SVG) + '")';

// ---- Subtle background grid lines (exact same grid background as Projects section) ----
const BG_LINE_GRID_STYLE = {
  backgroundImage:
    "linear-gradient(to right, rgba(0,0,0,0.045) 1px, transparent 1px), " +
    "linear-gradient(to bottom, rgba(0,0,0,0.045) 1px, transparent 1px)",
  backgroundSize: "clamp(36px, 3.2vw, 64px) clamp(36px, 3.2vw, 64px)",
};

// ---- Reveal helper ----
function reveal(delay?: number) {
  return {
    initial: "hidden",
    whileInView: "show",
    viewport: viewport,
    variants: fadeUp,
    transition: revealTransition(delay),
  };
}

// Small architectural "+" corner marker that fades in when the box is hovered
function CornerCrosshair(props: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={
        "pointer-events-none absolute z-20 h-[9px] w-[9px] opacity-0 transition-opacity duration-500 group-hover/box:opacity-100 " +
        (props.className ?? "")
      }
    >
      <span className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-black" />
      <span className="absolute bottom-0 top-0 left-1/2 w-px -translate-x-1/2 bg-black" />
    </span>
  );
}

export default function About() {
  // Tracks cursor position inside the right-side box for a subtle monochrome grid glow (no zoom)
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(
    null
  );

  function handleBoxMove(e: PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  function handleBoxLeave() {
    setCursorPos(null);
  }

  return (
    <section id="about" className="relative w-full overflow-hidden bg-white">
      {/* ===================== WHITE ARCHITECTURAL GRID SECTION ===================== */}
      <div className="mx-auto w-full max-w-[1560px] px-6 py-12 sm:px-[5vw] sm:py-[4.8vw]">
        {/* ---------- TOP HEADING: "ABOUT ME" ---------- */}
        <div className="pb-6 sm:pb-[2.2vw]">
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end">
            <motion.h2
              className="font-display text-[40px] uppercase leading-none tracking-[-0.06em] text-black sm:text-[clamp(25px,3.77vw,90px)]"
              {...reveal()}
            >
              About Me
            </motion.h2>
            <motion.p
              className="font-['JejuMyeongjo'] text-[clamp(14px,1.5vw,34px)] tracking-[0.12em] text-[#7a7a7a]"
              {...reveal(0.05)}
            >
              UI/UX Designer
            </motion.p>
          </div>
        </div>

        {/* ---------- TOP HORIZONTAL LIGHT GRAY LINE ---------- */}
        <div className="border-t border-[#d4d4d4]">
          {/* ===================== ROW 1: Portrait (Left) | Bio + Focus Areas + Quote Box on Line Grid (Right) ===================== */}
          <div className="grid grid-cols-1 sm:grid-cols-[0.88fr_1.12fr] sm:items-stretch">
            {/* Left Cell: Framed Monochrome Portrait (with film grain ONLY on this image) */}
            <motion.div
              className="flex items-start justify-center py-8 sm:border-r sm:border-[#d4d4d4] sm:py-[3.2vw] sm:pr-[3.4vw]"
              {...reveal(0.1)}
            >
              <div className="group relative aspect-[4/4.6] w-full overflow-hidden border border-[#d4d4d4] bg-[#d8d8d8]">
                {/* Sharpening filter */}
                <svg
                  aria-hidden="true"
                  width="0"
                  height="0"
                  className="absolute"
                  focusable="false"
                >
                  <filter id="about-sharpen" colorInterpolationFilters="sRGB">
                    <feConvolveMatrix
                      order="3"
                      preserveAlpha="true"
                      kernelMatrix="0 -0.6 0 -0.6 3.4 -0.6 0 -0.6 0"
                    />
                  </filter>
                </svg>

                <Image
                  src={encodeURI("/Analysis output 2.png")}
                  alt="Oshani Wijekoon"
                  fill
                  sizes="(min-width: 640px) 40vw, 100vw"
                  quality={100}
                  unoptimized
                  style={{
                    filter: "url(#about-sharpen) grayscale(1) contrast(1.06)",
                  }}
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />

                {/* Film-grain texture ONLY on the portrait image */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-10 mix-blend-overlay"
                  style={{
                    backgroundImage: IMAGE_GRAIN_URL,
                    backgroundSize: "240px 240px",
                    opacity: IMAGE_GRAIN_OPACITY,
                  }}
                />
              </div>
            </motion.div>

            {/* Right Cell: Same top line as portrait + subtle cursor-following grid animation (no zoom, no grain) */}
            <div className="flex border-t border-[#d4d4d4] py-8 sm:border-t-0 sm:py-[3.2vw] sm:pl-[3.4vw]">
              <div
                onPointerMove={handleBoxMove}
                onPointerLeave={handleBoxLeave}
                className="group/box relative flex w-full flex-col justify-between border border-[#d4d4d4] bg-white p-6 transition-colors duration-500 hover:border-[#8a8a8a] sm:p-[2.4vw]"
                style={BG_LINE_GRID_STYLE}
              >
                {/* Architectural corner "+" crosshairs that gently fade in on cursor hover */}
                <CornerCrosshair className="-left-[5px] -top-[5px]" />
                <CornerCrosshair className="-right-[5px] -top-[5px]" />
                <CornerCrosshair className="-bottom-[5px] -left-[5px]" />
                <CornerCrosshair className="-bottom-[5px] -right-[5px]" />

                {/* Subtle cursor-following monochrome spotlight across the grid lines (no scaling/zoom) */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
                  style={{
                    opacity: cursorPos ? 1 : 0,
                    background: cursorPos
                      ? `radial-gradient(320px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(0,0,0,0.045), transparent 75%)`
                      : "none",
                  }}
                />

                {/* Top: Full-width Bio + Focus Areas */}
                <div className="relative z-10 flex flex-col">
                  <motion.p
                    className={"w-full " + introText}
                    {...reveal(0.12)}
                  >
                    I am a third-year Information Technology undergraduate
                    passionate about UI/UX design, web development, and software
                    engineering. I enjoy transforming unique ideas into
                    intuitive, user-friendly, and visually appealing digital
                    solutions that blend thoughtful aesthetics with seamless
                    functionality across web and mobile platforms.
                  </motion.p>

                  {/* Focus areas as an arrow list (arrows glide gently right on hover, no zoom) */}
                  <ul className="mt-[clamp(16px,1.6vw,32px)] flex flex-col gap-[clamp(10px,1vw,20px)]">
                    {focusAreas.map(function (area, index) {
                      return (
                        <motion.li
                          key={area.title}
                          className="group/item flex items-start gap-[clamp(8px,0.8vw,18px)]"
                          {...reveal(staggerDelay(index, 0.1, 0.16))}
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[0.1em] text-[clamp(16px,1.5vw,34px)] leading-none text-black transition-transform duration-300 ease-out group-hover/box:translate-x-1 group-hover/item:translate-x-2"
                          >
                            →
                          </span>
                          <div>
                            <h3
                              className={`${subheadingText} inline-block font-normal text-black underline decoration-black/40 underline-offset-[3px] transition-colors duration-300 group-hover/item:decoration-black`}
                            >
                              {area.title}
                            </h3>
                            <p className={"mt-[0.4vw] max-sm:mt-1 " + bodyText}>
                              {area.description}
                            </p>
                          </div>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>

                {/* Bottom Space: UI/UX Designer Quote Box with animated top progress line on hover */}
                <motion.div
                  className="relative z-10 mt-8 overflow-hidden border border-[#d4d4d4] bg-white/90 px-5 py-4 backdrop-blur-[2px] transition-colors duration-500 group-hover/box:border-[#9e9e9e] sm:mt-[2vw] sm:px-[1.8vw] sm:py-[1.3vw]"
                  {...reveal(0.32)}
                >
                  {/* Animated thin top sweep line that glides across when cursor enters the box */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-0 h-[1.5px] w-0 bg-black transition-all duration-700 ease-out group-hover/box:w-full"
                  />

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="font-mono text-[clamp(9px,0.7vw,12px)] uppercase tracking-[0.18em] text-zinc-400 transition-colors duration-500 group-hover/box:text-zinc-600">
                        Design Philosophy · UI/UX
                      </span>
                      <p className="mt-1.5 font-['JejuMyeongjo'] text-[clamp(12px,0.95vw,18px)] italic leading-[1.6] tracking-[0.04em] text-zinc-700 transition-colors duration-500 group-hover/box:text-black">
                        &ldquo;Good design is where empathy meets clarity —
                        turning complex problems into effortless human
                        experiences.&rdquo;
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="shrink-0 font-['JejuMyeongjo'] text-[clamp(24px,2.2vw,42px)] leading-none text-zinc-300 transition-colors duration-500 select-none group-hover/box:text-zinc-500"
                    >
                      &rdquo;
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- MIDDLE HORIZONTAL LIGHT GRAY LINE ---------- */}
        <div className="border-y border-[#d4d4d4]">
          {/* ===================== ROW 2: Education + Present + Aligned Framed Text Box (Left) | Offset Vertical Line | Resume Action (Right) ===================== */}
          <div className="grid grid-cols-1 sm:grid-cols-[1.28fr_0.72fr] sm:items-stretch">
            {/* Left Cell: 2-Column split — Education/Present on left, Extended-Border Gray Text Box on right */}
            <div className="grid grid-cols-1 items-stretch gap-8 py-8 sm:border-r sm:border-[#d4d4d4] sm:py-[3.2vw] sm:pr-[3.4vw] lg:grid-cols-[1.22fr_0.78fr] lg:gap-[2.6vw]">
              {/* Text column: Education & Present */}
              <div className="flex flex-col justify-between gap-8">
                <motion.div {...reveal(0.15)}>
                  <h3 className={labelText}>Education</h3>
                  <p className={"mt-[0.6vw] max-sm:mt-2 " + bodyText}>
                    SLIIT - 2023-2027
                    <br />
                    BSc (Hons) in IT Specializing Information Technology
                  </p>
                </motion.div>

                <motion.div {...reveal(0.22)}>
                  <h3 className={labelText}>Present</h3>
                  <p className={"mt-[0.6vw] max-sm:mt-2 " + bodyText}>
                    Currently a 3rd Year, 2nd Semester Information Technology
                    Undergraduate, continuously developing technical, creative,
                    and problem-solving skills while preparing for a career in
                    software engineering and UI/UX design.
                  </p>
                </motion.div>
              </div>

              {/* Extended-Corner '#' Frame Box with Gray Text:
                  Starts on the exact line of "SLIIT - 2023-2027" (below the "Education" label)
                  and ends on the exact bottom line of "Engineering And UI/UX Design." */}
              <motion.div
                className="flex flex-col px-3 lg:pt-[calc(clamp(11px,0.95vw,20px)*1.5+0.6vw)] lg:pb-[0.35em]"
                {...reveal(0.25)}
              >
                <div className="relative flex flex-1 flex-col justify-between p-5 sm:p-[1.5vw]">
                  {/* 4 Extended Architectural Frame Lines in light-gray (#d4d4d4) that cross at the corners */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-x-[10px] top-0 z-20 h-px bg-[#d4d4d4]"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-x-[10px] bottom-0 z-20 h-px bg-[#d4d4d4]"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-y-[10px] left-0 z-20 w-px bg-[#d4d4d4]"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-y-[10px] right-0 z-20 w-px bg-[#d4d4d4]"
                  />

                  {/* Gray Text Inside the Frame */}
                  <span className="font-mono text-[clamp(9px,0.68vw,12px)] uppercase tracking-[0.16em] text-zinc-400">
                    Creative Approach
                  </span>

                  <p className="my-2 font-['Instrument_Sans'] text-[clamp(11px,0.92vw,17px)] capitalize leading-[1.65] tracking-wide text-zinc-500">
                    Bridging human-centered design and clean engineering to
                    craft thoughtful, minimal, and accessible digital products
                    with lasting impact.
                  </p>

                  <span className="font-mono text-[clamp(9px,0.65vw,11px)] tracking-[0.14em] text-zinc-400">
                    UI/UX · Web · Software
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right Cell: Framed Editorial Box / View Resume Button */}
            <motion.div
              className="flex flex-col items-center justify-center border-t border-[#d4d4d4] py-8 sm:border-t-0 sm:py-[3.2vw] sm:pl-[3.4vw]"
              {...reveal(0.28)}
            >
              <div
                className="flex h-full w-full flex-col items-start justify-between gap-6 border border-[#d4d4d4] bg-white p-6 sm:p-[2.2vw]"
                style={BG_LINE_GRID_STYLE}
              >
                <div>
                  <p className={labelText}>Curriculum Vitae</p>
                  <p className={"mt-2 " + bodyText}>
                    Explore my academic background, design projects, and
                    technical experience.
                  </p>
                </div>

                {/* Original View Resume Button */}
                <a
                  href="/resume.pdf"
                  className="flex h-[clamp(56px,3.7vw,90px)] w-[clamp(180px,11.9vw,290px)] items-center justify-center rounded-tl-[clamp(12px,0.79vw,19px)] rounded-br-[clamp(12px,0.79vw,19px)] bg-black transition-opacity hover:opacity-80"
                >
                  <span className="font-['JejuMyeongjo'] text-[clamp(15px,0.9vw,21px)] capitalize tracking-[0.03em] text-white">
                    View Resume
                  </span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}