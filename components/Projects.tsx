"use client";

import { useState } from "react";
import type { FocusEvent, PointerEvent } from "react";
import { motion } from "framer-motion";
import { fadeUp, revealTransition, viewport, staggerDelay } from "@/components/lib/motion";

type Project = {
  number: string;
  title?: string;
  description?: string;
  techLabel?: string;
  techItems?: string[];
  href?: string;
};

const projects: Project[] = [
  {
    number: "01",
    title: "Mobile Application UI/UX Design.",
    href: "/mobile-clothing-store-app",
    description: "Designed a user-centered mobile application interface.",
    techLabel: "Tools",
    techItems: ["Figma", "Canva"],
  },
  {
    number: "02",
    title: "Torvana - Tour Guide Platform.",
    href: "/torvana",
    description: "Developed a full-stack tour guide web application.",
    techLabel: "Tech Stack",
    techItems: ["MERN Stack"],
  },
  {
    number: "03",
    title: "Japanese Food Restaurant Mobile Application",
    description:
      "Developed a restaurant mobile application with a clean and intuitive UI.",
    techLabel: "Tech Stack",
    techItems: ["Kotlin", "Android Studio", "Firebase"],
  },
];

// Videos are in the public folder: public/project-1.mp4, project-2.mp4, project-3.mp4
const projectVideos: Record<string, { src: string; label: string }> = {
  "01": {
    src: "/project-1.mp4",
    label: "Preview video of mobile clothing store app screens",
  },
  "02": {
    src: "/project-2.mp4",
    label: "Preview video for the Torvana tour guide platform",
  },
  "03": {
    src: "/project-3.mp4",
    label: "Preview video for the Japanese food restaurant app",
  },
};

// Film-grain texture on the card videos only
const GRAIN_OPACITY = 0.28;
const GRAIN_SVG =
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
const GRAIN_URL = 'url("data:image/svg+xml,' + encodeURIComponent(GRAIN_SVG) + '")';

// Subtle background grid lines (lighter than the #b8b8b8 frame/border lines)
const BG_LINE_GRID_STYLE = {
  backgroundImage:
    "linear-gradient(to right, rgba(0,0,0,0.045) 1px, transparent 1px), " +
    "linear-gradient(to bottom, rgba(0,0,0,0.045) 1px, transparent 1px)",
  backgroundSize: "clamp(36px, 3.2vw, 64px) clamp(36px, 3.2vw, 64px)",
};

// Small architectural "+" crosshair marker at line intersections
function Crosshair(props: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={
        "pointer-events-none absolute z-10 h-[9px] w-[9px] -translate-x-1/2 " +
        (props.className ?? "")
      }
    >
      <span className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[#8a8a8a]" />
      <span className="absolute bottom-0 top-0 left-1/2 w-px -translate-x-1/2 bg-[#8a8a8a]" />
    </span>
  );
}

// How long the card takes to turn (slower = bigger number)
const FLIP_DURATION_MS = 1000;

// Card widths (sized for 9:16 vertical videos)
const DESKTOP_CARD_MAX = "w-full max-w-[clamp(180px,17vw,310px)]";
const MOBILE_CARD_MAX = "w-full max-w-[230px]";

// Card shape matches the 1080x1920 (9:16) video dimensions so the full video fits without cropping
const CARD_SHAPE = "aspect-[9/16] rounded-[clamp(14px,1.3vw,24px)]";

// Size classes for the desktop and mobile versions of the card
const SIZES = {
  desktop: {
    pill: "inset-x-[clamp(8px,0.75vw,14px)] bottom-[clamp(8px,0.75vw,14px)] rounded-[clamp(9px,0.8vw,15px)] px-[clamp(10px,0.85vw,16px)] py-[clamp(6px,0.5vw,10px)]",
    pillText: "text-[clamp(9px,0.7vw,13px)]",
    backBody:
      "gap-[clamp(8px,0.8vw,16px)] p-[clamp(14px,1.25vw,24px)]",
    number: "text-[clamp(10px,0.72vw,14px)]",
    desc: "text-[clamp(11px,0.82vw,16px)] leading-[1.55] tracking-[0.06em]",
    techLabel: "text-[clamp(10px,0.72vw,14px)] tracking-[0.12em]",
    techList: "text-[clamp(10px,0.72vw,14px)] leading-[1.6] tracking-[0.12em]",
    link: "text-[clamp(10px,0.72vw,14px)] tracking-[0.14em]",
    name: "mt-[clamp(12px,1vw,20px)] px-1 text-[clamp(14px,1.08vw,21px)] leading-[1.35] tracking-[-0.005em]",
  },
  mobile: {
    pill: "inset-x-2.5 bottom-2.5 rounded-[11px] px-3 py-1.5",
    pillText: "text-[11px]",
    backBody: "gap-3 p-4",
    number: "text-[11px]",
    desc: "text-[12.5px] leading-[1.55] tracking-[0.04em]",
    techLabel: "text-[11.5px] tracking-[0.05em]",
    techList: "text-[11.5px] leading-[1.6] tracking-[0.05em]",
    link: "text-[11.5px] tracking-[0.1em]",
    name: "mt-3 px-1 text-center text-[16px] leading-[1.35] tracking-[-0.005em]",
  },
};

function EditorialVisual(props: { number: string }) {
  const vid = projectVideos[props.number];

  return (
    <>
      <video
        src={vid.src}
        aria-label={vid.label}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Grain overlay on top of the video */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: GRAIN_URL,
          backgroundSize: "240px 240px",
          opacity: GRAIN_OPACITY,
        }}
      />
    </>
  );
}

// ---- Card that flips to show the project details ----
function FlipCard(props: { project: Project; mobile: boolean }) {
  const project = props.project;
  const s = props.mobile ? SIZES.mobile : SIZES.desktop;
  const [flipped, setFlipped] = useState(false);

  const hidden = {
    backfaceVisibility: "hidden" as const,
    WebkitBackfaceVisibility: "hidden" as const,
  };

  function onEnter(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse") setFlipped(true);
  }
  function onLeave(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse") setFlipped(false);
  }
  function onUp(e: PointerEvent<HTMLDivElement>) {
    // Touch / pen: tap to flip back and forth
    if (e.pointerType !== "mouse") setFlipped(function (f) { return !f; });
  }
  function onFocus(e: FocusEvent<HTMLDivElement>) {
    // Keyboard users: flip when the card (or its link) gets keyboard focus
    if (e.target.matches(":focus-visible")) setFlipped(true);
  }
  function onBlur(e: FocusEvent<HTMLDivElement>) {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFlipped(false);
  }

  return (
    <div className="flex w-full flex-col">
      {/* The card itself: only this area reacts to the cursor */}
      <div
        className={
          "relative w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 " +
          CARD_SHAPE
        }
        style={{ perspective: "1400px" }}
        tabIndex={0}
        role="group"
        aria-label={(project.title ?? "Project") + " details"}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        onPointerUp={onUp}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <div
          className="relative h-full w-full ease-in-out motion-reduce:transition-none"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transitionProperty: "transform",
            transitionDuration: FLIP_DURATION_MS + "ms",
          }}
        >
          {/* ---------- FRONT: video + glass bar ---------- */}
          <div
            className={"absolute inset-0 overflow-hidden bg-[#d8d8d8] " + CARD_SHAPE}
            style={hidden}
          >
            <EditorialVisual number={project.number} />

            {/* Frosted-glass bar: only shows "Project No - 01" */}
            <div
              className={
                "absolute flex items-center justify-center border border-white/40 bg-white/65 shadow-[0_2px_14px_rgba(0,0,0,0.08)] backdrop-blur-md " +
                s.pill
              }
            >
              <span
                className={
                  "shrink-0 font-mono uppercase tracking-[0.08em] text-[#1a1a1a] " +
                  s.pillText
                }
              >
                Project No - {project.number}
              </span>
            </div>
          </div>

          {/* ---------- BACK: all the details ---------- */}
          <div
            className={
              "absolute inset-0 flex flex-col overflow-hidden bg-black text-white " +
              CARD_SHAPE +
              (flipped ? "" : " pointer-events-none")
            }
            style={{ ...hidden, transform: "rotateY(180deg)" }}
            aria-hidden={!flipped}
          >
            <div className={"flex min-h-0 flex-1 flex-col overflow-y-auto " + s.backBody}>
              <span
                className={
                  "font-mono uppercase tracking-[0.14em] text-white/60 " + s.number
                }
              >
                Project No - {project.number}
              </span>

              {project.description ? (
                <p className={"font-sans text-white/90 " + s.desc}>
                  {project.description}
                </p>
              ) : null}

              {project.techItems && project.techItems.length > 0 ? (
                <div>
                  <p
                    className={
                      "font-sans font-bold leading-none text-white underline decoration-[0.5px] underline-offset-[2px] " +
                      s.techLabel
                    }
                  >
                    {project.techLabel}:
                  </p>
                  <ul className={"mt-[0.5em] font-sans text-white/80 " + s.techList}>
                    {project.techItems.map(function (item) {
                      return <li key={item}>- {item}</li>;
                    })}
                  </ul>
                </div>
              ) : null}

              {project.href ? (
                <a
                  href={project.href}
                  tabIndex={flipped ? 0 : -1}
                  className={
                    "mt-auto inline-block w-fit font-sans uppercase text-white underline decoration-[0.5px] underline-offset-[3px] transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-1 focus-visible:ring-white " +
                    s.link
                  }
                >
                  View project &rarr;
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Project name under the card (outside the flip area, so hovering it does nothing) */}
      {project.title ? (
        <h3 className={"font-body font-medium text-[#12182b] " + s.name}>
          {project.title}
        </h3>
      ) : null}
    </div>
  );
}

function ProjectCard(props: { project: Project; index: number }) {
  const project = props.project;

  return (
    <motion.article
      className={"relative z-10 flex flex-col " + DESKTOP_CARD_MAX}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={fadeUp}
      transition={revealTransition(staggerDelay(props.index, 0.12))}
    >
      <FlipCard project={project} mobile={false} />
    </motion.article>
  );
}

function MobileProjectCard(props: { project: Project; index: number }) {
  const project = props.project;

  return (
    <motion.article
      className={"relative z-10 mx-auto " + MOBILE_CARD_MAX}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={fadeUp}
      transition={revealTransition(staggerDelay(props.index, 0.1))}
    >
      <FlipCard project={project} mobile />
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="w-full overflow-hidden bg-white">
      {/* ===================== MOBILE ===================== */}
      <div
        className="relative flex flex-col gap-10 px-6 py-12 sm:hidden"
        style={BG_LINE_GRID_STYLE}
      >
        {/* Symmetric Mobile architectural border lines (all #b8b8b8) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-4 h-px bg-[#b8b8b8]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-4 h-px bg-[#b8b8b8]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-3 w-px bg-[#b8b8b8]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-3 w-px bg-[#b8b8b8]"
        />
        <Crosshair className="left-3 top-4 -translate-y-1/2" />
        <Crosshair className="left-[calc(100%-12px)] top-4 -translate-y-1/2" />
        <Crosshair className="left-3 bottom-4 translate-y-1/2" />
        <Crosshair className="left-[calc(100%-12px)] bottom-4 translate-y-1/2" />

        <motion.h2
          className="relative z-10 font-display text-[40px] uppercase leading-none tracking-[-0.03em] text-black"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={revealTransition()}
        >
          Projects
        </motion.h2>

        <div className="flex flex-col gap-10">
          {projects.map(function (project, index) {
            return (
              <MobileProjectCard key={project.number} project={project} index={index} />
            );
          })}
        </div>

        <motion.a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 self-end font-sans text-[13px] tracking-[0.1em] text-[#3e3e3e] underline decoration-[0.5px] underline-offset-[2px]"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={fadeUp}
          transition={revealTransition(0.4)}
        >
          GitHub
        </motion.a>
      </div>

      {/* ===================== DESKTOP ===================== */}
      <div className="hidden px-0 py-4 sm:block sm:py-6">
        <div className="mx-auto w-full px-[2.6vw]">
          <div className="relative mx-auto w-full max-w-[3000px] overflow-hidden bg-white py-[18px]">
            {/* Architectural background line grid clipped inside the symmetric outer frame */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[18px] left-[1.5%] right-[1.5%] top-[18px]"
              style={BG_LINE_GRID_STYLE}
            />

            {/* Symmetric Outer Architectural Frame Hairlines (exact integer pixels so all 4 lines render at identical darkness: #b8b8b8) */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 right-0 top-[18px] h-px bg-[#b8b8b8]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[18px] left-0 right-0 h-px bg-[#b8b8b8]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-[1.5%] top-0 w-px bg-[#b8b8b8]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 right-[1.5%] top-0 w-px bg-[#b8b8b8]"
            />

            {/* Corner "+" Crosshairs */}
            <Crosshair className="left-[1.5%] top-[18px] -translate-y-1/2" />
            <Crosshair className="left-[98.5%] top-[18px] -translate-y-1/2" />
            <Crosshair className="left-[1.5%] bottom-[18px] translate-y-1/2" />
            <Crosshair className="left-[98.5%] bottom-[18px] translate-y-1/2" />

            {/* Inner content box with symmetric padding inside the 1.5% / 18px frame */}
            <div className="relative z-10 mx-[1.5%] flex flex-col px-[clamp(24px,4vw,72px)] pb-[clamp(44px,4.2vw,84px)] pt-[clamp(28px,3vw,60px)]">
              {/* Top Header Row */}
              <div className="mb-[clamp(28px,3vw,56px)] flex items-end justify-between">
                <motion.h2
                  className="font-display text-[clamp(25px,3.77vw,90px)] uppercase leading-none tracking-[-0.06em] text-black"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={revealTransition()}
                >
                  Projects
                </motion.h2>
              </div>

              {/* 3 equal cards with uniform spacing between cards and outer edges */}
              <div className="mx-auto grid w-full max-w-[1280px] grid-cols-3 items-start justify-items-center gap-[clamp(24px,4.5vw,80px)]">
                {projects.map(function (project, index) {
                  return (
                    <ProjectCard key={project.number} project={project} index={index} />
                  );
                })}
              </div>
            </div>

            {/* GitHub link in the bottom-right corner */}
            <div className="absolute bottom-[34px] right-[3.2%] z-10 translate-y-1/2">
              <motion.a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-sans text-[clamp(10px,0.78vw,18px)] tracking-[0.16em] text-[#3e3e3e] underline decoration-[0.5px] underline-offset-[2px] transition-opacity hover:opacity-70"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={fadeUp}
                transition={revealTransition(0.5)}
              >
                GitHub
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}