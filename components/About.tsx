"use client";

import Image from "next/image";
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

// ---- Text styles (same fonts as before) ----
const labelText =
  "text-[clamp(11px,0.95vw,20px)] font-['Instrument_Sans'] font-normal tracking-wide text-zinc-500";
const bodyText =
  "text-[clamp(11px,1.02vw,22px)] font-['Instrument_Sans'] capitalize tracking-wide leading-[1.7] text-zinc-700";
const introText =
  "text-[clamp(14px,1.3vw,28px)] font-['Instrument_Sans'] capitalize tracking-wide leading-[1.55] text-black";
const subheadingText =
  "text-[clamp(13px,1.2vw,28px)] font-['JejuMyeongjo'] tracking-[0.12em]";

// ---- Grid lines (light white) + "+" marks, like the reference ----
const LINE_OFFSET = "clamp(14px,1.2vw,28px)";
const LINE_X = ["2.7%", "58.7%", "96.8%"];

function Plus(props: { x: string; edge: "top" | "bottom" }) {
  const style =
    props.edge === "top"
      ? { left: props.x, top: LINE_OFFSET }
      : { left: props.x, bottom: LINE_OFFSET };
  const translate =
    props.edge === "top"
      ? "-translate-x-1/2 -translate-y-1/2"
      : "-translate-x-1/2 translate-y-1/2";

  return (
    <span
      aria-hidden="true"
      className={"absolute h-[13px] w-[13px] " + translate}
      style={style}
    >
      <span className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white" />
      <span className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-white" />
    </span>
  );
}

function GridLines() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[5] hidden sm:block"
    >
      {/* horizontal lines */}
      <span
        className="absolute left-0 right-0 h-px bg-white"
        style={{ top: LINE_OFFSET }}
      />
      <span
        className="absolute left-0 right-0 h-px bg-white"
        style={{ bottom: LINE_OFFSET }}
      />
      {/* vertical lines */}
      {LINE_X.map(function (x) {
        return (
          <span
            key={x}
            className="absolute bottom-0 top-0 w-px bg-white"
            style={{ left: x }}
          />
        );
      })}
      {/* "+" marks at the intersections */}
      {LINE_X.map(function (x) {
        return <Plus key={"t" + x} x={x} edge="top" />;
      })}
      {LINE_X.map(function (x) {
        return <Plus key={"b" + x} x={x} edge="bottom" />;
      })}
    </div>
  );
}

// ---- Grain texture for the background ----
const GRAIN_OPACITY = 0.35;
const GRAIN_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'>" +
  "<filter id='n' x='0' y='0' width='100%' height='100%'>" +
  "<feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/>" +
  "<feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.6 0 0 0 -0.5'/>" +
  "</filter>" +
  "<rect width='100%' height='100%' filter='url(#n)'/>" +
  "</svg>";
const GRAIN_URL = 'url("data:image/svg+xml,' + encodeURIComponent(GRAIN_SVG) + '")';

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-[#e3e3e1]"
    >
      {/* Grainy background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: GRAIN_URL,
          backgroundSize: "260px 260px",
          opacity: GRAIN_OPACITY,
        }}
      />

      <GridLines />

      <div className="relative z-10 flex flex-col gap-10 py-12 sm:grid sm:grid-cols-[58.7fr_41.3fr] sm:gap-0 sm:py-[4.5vw]">
        {/* ===================== LEFT COLUMN ===================== */}
        <div className="flex flex-col gap-10 px-6 sm:gap-[2.6vw] sm:pl-[5.9vw] sm:pr-[3vw]">
          {/* 1. Main heading */}
          <motion.h2
            className="font-display text-[40px] uppercase leading-none tracking-[-0.06em] text-black sm:text-[clamp(25px,3.77vw,90px)]"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp}
            transition={revealTransition()}
          >
            About Me.
          </motion.h2>

          {/* 2. Intro */}
          <motion.p
            className={`max-w-[40vw] max-sm:max-w-none ${introText}`}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp}
            transition={revealTransition(0.1)}
          >
            I am a third-year Information Technology undergraduate passionate
            about UI/UX design, web development, and software engineering. I
            enjoy transforming unique ideas into user-friendly and visually
            appealing digital solutions.
          </motion.p>

          {/* 3. Focus areas */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-[1.8vw]">
            {focusAreas.map(function (area, index) {
              return (
                <motion.div
                  key={area.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                  variants={fadeUp}
                  transition={revealTransition(staggerDelay(index, 0.1, 0.2))}
                >
                  <h3
                    className={`${subheadingText} inline-block font-normal text-black underline underline-offset-[3px]`}
                  >
                    {area.title}
                  </h3>
                  <p className={`mt-[0.5vw] max-sm:mt-1 ${bodyText}`}>
                    {area.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* 4. Education + Present */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-[1fr_1.2fr] sm:gap-[2.5vw]">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={fadeUp}
              transition={revealTransition()}
            >
              <h3 className={labelText}>Education</h3>
              <p className={`mt-[0.8vw] max-sm:mt-2 ${bodyText}`}>
                SLIIT - 2023-2027
                <br />
                BSc (Hons) in IT Specializing Information Technology
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={fadeUp}
              transition={revealTransition(0.1)}
            >
              <h3 className={labelText}>Present</h3>
              <p className={`mt-[0.8vw] max-sm:mt-2 ${bodyText}`}>
                Currently a 3rd Year, 2nd Semester Information Technology
                Undergraduate, continuously developing technical, creative, and
                problem-solving skills while preparing for a career in software
                engineering and UI/UX design.
              </p>
            </motion.div>
          </div>

          {/* 5. Resume button */}
          <motion.a
            href="/resume.pdf"
            className="flex h-[clamp(56px,3.7vw,90px)] w-[clamp(180px,11.9vw,290px)] items-center justify-center rounded-tl-[clamp(12px,0.79vw,19px)] rounded-br-[clamp(12px,0.79vw,19px)] bg-black transition-opacity hover:opacity-80"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp}
            transition={revealTransition(0.3)}
          >
            <span className="font-['JejuMyeongjo'] text-[clamp(15px,0.9vw,21px)] capitalize tracking-[0.03em] text-white">
              View Resume
            </span>
          </motion.a>
        </div>

        {/* ===================== RIGHT COLUMN (image) ===================== */}
        <div className="px-6 max-sm:order-first sm:flex sm:pl-[3.3vw] sm:pr-[6.5vw]">
          <motion.div
            className="group relative aspect-[9/10] w-full overflow-hidden rounded-[clamp(6px,0.55vw,14px)] bg-[#f2f2f2] sm:self-center"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp}
            transition={revealTransition(0.2)}
          >
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
            {/* Only the photo zooms on hover; the rounded frame stays put */}
            <Image
              src={encodeURI("/Analysis output 2.png")}
              alt="Oshani Wijekoon"
              fill
              sizes="(min-width: 640px) 32vw, 100vw"
              quality={100}
              unoptimized
              style={{ filter: "url(#about-sharpen) contrast(1.04)" }}
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}