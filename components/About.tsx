"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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

const marqueeItems = [
  "Welcome to my portfolio",
  "UI/UX Design",
  "Web Development",
  "Software Engineering",
];

// ---- Text styles (same as the other sections) ----
const labelText =
  "text-[clamp(11px,0.95vw,20px)] font-['Instrument_Sans'] font-normal tracking-wide text-zinc-500";
const bodyText =
  "text-[clamp(11px,1.02vw,22px)] font-['Instrument_Sans'] capitalize tracking-wide leading-[1.7] text-zinc-700";
const introText =
  "text-[clamp(14px,1.3vw,28px)] font-['Instrument_Sans'] capitalize tracking-wide leading-[1.55] text-black";
const subheadingText =
  "text-[clamp(13px,1.2vw,28px)] font-['JejuMyeongjo'] tracking-[0.12em]";

// ---- Reveal helper (same motion settings as before) ----
function reveal(delay?: number) {
  return {
    initial: "hidden",
    whileInView: "show",
    viewport: viewport,
    variants: fadeUp,
    transition: revealTransition(delay),
  };
}

// ---- Grain texture ----
const GRAIN_OPACITY = 0.4;
const GRAIN_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'>" +
  "<filter id='n' x='0' y='0' width='100%' height='100%'>" +
  "<feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/>" +
  "<feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.6 0 0 0 -0.5'/>" +
  "</filter>" +
  "<rect width='100%' height='100%' filter='url(#n)'/>" +
  "</svg>";
const GRAIN_URL = 'url("data:image/svg+xml,' + encodeURIComponent(GRAIN_SVG) + '")';

// ---- Checkerboard: small real squares, so each gray one can zoom on hover ----
// Fallback (before measuring): the same small checks drawn with CSS only.
const CHECK_FALLBACK_STYLE = {
  backgroundColor: "#f5f5f5",
  backgroundImage:
    "conic-gradient(#d6d6d6 25%, #f5f5f5 0 50%, #d6d6d6 0 75%, #f5f5f5 0)",
  backgroundSize: "clamp(56px,5.5vw,120px) clamp(56px,5.5vw,120px)",
};

type CheckGrid = { cols: number; rows: number; size: number };

function Checkerboard() {
  const ref = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState<CheckGrid | null>(null);

  useEffect(function () {
    const el = ref.current;
    if (!el) return;

    function measure() {
      if (!el) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return;
      // Small squares: half of the old size (28px to 60px)
      const size = Math.min(60, Math.max(28, w * 0.0275));
      setGrid({
        cols: Math.ceil(w / size),
        rows: Math.ceil(h / size),
        size: size,
      });
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return function () {
      observer.disconnect();
    };
  }, []);

  const cells: number[] = [];
  if (grid) {
    for (let i = 0; i < grid.cols * grid.rows; i++) {
      cells.push(i);
    }
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden"
      style={grid ? { backgroundColor: "#f5f5f5" } : CHECK_FALLBACK_STYLE}
    >
      {grid ? (
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(" + grid.cols + ", " + grid.size + "px)",
            gridAutoRows: grid.size + "px",
          }}
        >
          {cells.map(function (i) {
            const row = Math.floor(i / grid.cols);
            const col = i % grid.cols;
            const isGray = (row + col) % 2 === 1;
            return isGray ? (
              <div
                key={i}
                className="bg-[#d6d6d6] transition-transform duration-500 ease-out hover:z-[1] hover:scale-[1.12]"
              />
            ) : (
              <div key={i} />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

// ---- Editorial scrolling ticker strip (no '*' icons, slow & smooth) ----
// Increase MARQUEE_DURATION_SEC (e.g. 90) to make it even slower, or decrease (e.g. 60) to speed it up
const MARQUEE_DURATION_SEC = 75;

function Marquee() {
  const repeated = [...marqueeItems, ...marqueeItems];

  const group = repeated.map(function (text, i) {
    const num = String((i % marqueeItems.length) + 1).padStart(2, "0");
    return (
      <span key={i} className="flex items-center">
        <span className="px-[clamp(18px,2vw,44px)]">{text}</span>
        {/* Editorial hairline + index separator */}
        <span
          aria-hidden="true"
          className="flex items-center gap-[clamp(8px,0.7vw,14px)] select-none"
        >
          <span className="h-px w-[clamp(16px,1.6vw,32px)] bg-white/35" />
          <span className="rounded-full border border-white/25 px-[clamp(7px,0.55vw,11px)] py-[2px] font-mono text-[clamp(9px,0.68vw,13px)] tracking-[0.18em] text-white/60">
            {num}
          </span>
          <span className="h-px w-[clamp(16px,1.6vw,32px)] bg-white/35" />
        </span>
      </span>
    );
  });

  return (
    <div
      className="relative overflow-hidden border-y-2 border-black bg-black py-[clamp(9px,0.85vw,18px)]"
      aria-label="Welcome to my portfolio"
    >
      {/* Subtle left/right edge fade for a polished editorial finish */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-black to-transparent sm:w-24"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-black to-transparent sm:w-24"
      />

      <motion.div
        className="flex w-max whitespace-nowrap font-display text-[clamp(13px,1.35vw,30px)] uppercase tracking-[0.06em] text-white"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: MARQUEE_DURATION_SEC, ease: "linear", repeat: Infinity }}
      >
        <div className="flex shrink-0 items-center">{group}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {group}
        </div>
      </motion.div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative w-full overflow-hidden">
      {/* Ticker */}
      <Marquee />

      {/* Checkerboard area */}
      <div className="relative">
        <Checkerboard />

        {/* Content sits above the squares; only the card catches the mouse */}
        <div className="pointer-events-none relative z-10 px-6 py-12 sm:px-[5vw] sm:py-[5vw]">
          {/* ===================== CARD ===================== */}
          <div className="pointer-events-auto relative mx-auto w-full max-w-[1500px] rounded-[clamp(10px,1vw,22px)] border-2 border-black bg-white p-6 shadow-[6px_6px_0_0_#000] sm:p-[3.2vw] sm:shadow-[10px_10px_0_0_#000]">
            {/* Grid starts at "About Me." and ends at "View Resume", aligned with the "Present" column line */}
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-[1fr_1.2fr] sm:gap-[4vw]">
              {/* ---------- LEFT: title + role + text + button ---------- */}
              <div className="flex flex-col">
                <div className="mb-8 sm:mb-[2.6vw]">
                  <motion.h2
                    className="font-display text-[40px] uppercase leading-none tracking-[-0.06em] text-black sm:text-[clamp(25px,3.77vw,90px)]"
                    {...reveal()}
                  >
                    About Me.
                  </motion.h2>
                  <motion.p
                    className="mt-2 font-['JejuMyeongjo'] text-[clamp(14px,1.5vw,34px)] tracking-[0.12em] text-[#7a7a7a] sm:mt-[0.8vw]"
                    {...reveal(0.05)}
                  >
                    UI/UX Designer
                  </motion.p>
                </div>

                <motion.p
                  className={"max-w-[44ch] " + introText}
                  {...reveal(0.1)}
                >
                  I am a third-year Information Technology undergraduate
                  passionate about UI/UX design, web development, and software
                  engineering. I enjoy transforming unique ideas into
                  user-friendly and visually appealing digital solutions.
                </motion.p>

                {/* Focus areas as an arrow list */}
                <ul className="mt-[clamp(16px,1.6vw,34px)] flex flex-col gap-[clamp(10px,1vw,22px)]">
                  {focusAreas.map(function (area, index) {
                    return (
                      <motion.li
                        key={area.title}
                        className="flex items-start gap-[clamp(8px,0.8vw,18px)]"
                        {...reveal(staggerDelay(index, 0.1, 0.15))}
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.1em] text-[clamp(16px,1.5vw,34px)] leading-none text-black"
                        >
                          →
                        </span>
                        <div>
                          <h3
                            className={`${subheadingText} inline-block font-normal text-black underline underline-offset-[3px]`}
                          >
                            {area.title}
                          </h3>
                          <p className={"mt-[0.5vw] max-sm:mt-1 " + bodyText}>
                            {area.description}
                          </p>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>

                {/* Resume button (same as the other About page) */}
                <motion.a
                  href="/resume.pdf"
                  className="mt-[clamp(18px,1.8vw,40px)] flex h-[clamp(56px,3.7vw,90px)] w-[clamp(180px,11.9vw,290px)] items-center justify-center rounded-tl-[clamp(12px,0.79vw,19px)] rounded-br-[clamp(12px,0.79vw,19px)] bg-black transition-opacity hover:opacity-80"
                  {...reveal(0.3)}
                >
                  <span className="font-['JejuMyeongjo'] text-[clamp(15px,0.9vw,21px)] capitalize tracking-[0.03em] text-white">
                    View Resume
                  </span>
                </motion.a>
              </div>

              {/* ---------- RIGHT: starts at "About Me." top, ends at "View Resume" bottom, aligned with "Present" line ---------- */}
              <motion.div className="relative sm:min-h-[280px]" {...reveal(0.2)}>
                <div className="group relative aspect-[9/10] w-full overflow-hidden border border-black bg-[#d8d8d8] sm:absolute sm:inset-0 sm:aspect-auto sm:h-full sm:w-full">
                  {/* Sharpening filter: adds crispness to the stretched photo */}
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
                  {/* Only the photo zooms on hover; the frame stays put */}
                  <Image
                    src={encodeURI("/Analysis output 2.png")}
                    alt="Oshani Wijekoon"
                    fill
                    sizes="(min-width: 640px) 45vw, 100vw"
                    quality={100}
                    unoptimized
                    style={{ filter: "url(#about-sharpen) grayscale(1) contrast(1.06)" }}
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                </div>
              </motion.div>
            </div>

            {/* Divider */}
            <span
              aria-hidden="true"
              className="my-[clamp(24px,2.6vw,56px)] block h-px w-full bg-black/40"
            />

            {/* ---------- Education + Present ---------- */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1fr_1.2fr] sm:gap-[4vw]">
              <motion.div {...reveal()}>
                <h3 className={labelText}>Education</h3>
                <p className={"mt-[0.8vw] max-sm:mt-2 " + bodyText}>
                  SLIIT - 2023-2027
                  <br />
                  BSc (Hons) in IT Specializing Information Technology
                </p>
              </motion.div>

              <motion.div {...reveal(0.1)}>
                <h3 className={labelText}>Present</h3>
                <p className={"mt-[0.8vw] max-sm:mt-2 " + bodyText}>
                  Currently a 3rd Year, 2nd Semester Information Technology
                  Undergraduate, continuously developing technical, creative,
                  and problem-solving skills while preparing for a career in
                  software engineering and UI/UX design.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Grain overlay over the whole section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 mix-blend-multiply"
        style={{
          backgroundImage: GRAIN_URL,
          backgroundSize: "260px 260px",
          opacity: GRAIN_OPACITY,
        }}
      />
    </section>
  );
}