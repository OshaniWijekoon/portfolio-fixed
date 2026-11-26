"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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

// Main PC monitor image from your public/ folder
const PC_BG_IMAGE = "/unnamed.webp_15740045_2K.jpg";

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

// Just a little longer vertically (`height: "34.5%"`, up from `"31.5%"`)
// while keeping the exact same width (`14.2%`), outer bezel distance (`25.4%` / `60.1%`), and perspective tilt:
const SCREEN_BOX_POSITIONS: Record<
  number,
  {
    left: string;
    top: string;
    width: string;
    height: string;
    transform: string;
    parallaxDepth: number;
  }
> = {
  0: {
    left: "25.4%",
    top: "15.2%",
    width: "14.2%",
    height: "34.5%",
    transform: "rotate(1.1deg) skewX(-1.3deg)",
    parallaxDepth: -1,
  },
  1: {
    left: "42.75%",
    top: "20.0%",
    width: "14.2%",
    height: "34.5%",
    transform: "rotate(0deg)",
    parallaxDepth: 1.35,
  },
  2: {
    left: "60.1%",
    top: "15.2%",
    width: "14.2%",
    height: "34.5%",
    transform: "rotate(-1.5deg) skewX(1.6deg)",
    parallaxDepth: -1,
  },
};

// Subtle film-grain texture on the card videos
const GRAIN_OPACITY = 0.18;
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

// Subtle background grid lines across the entire section outside the main image
const BG_LINE_GRID_STYLE = {
  backgroundImage:
    "linear-gradient(to right, rgba(0,0,0,0.048) 1px, transparent 1px), " +
    "linear-gradient(to bottom, rgba(0,0,0,0.048) 1px, transparent 1px)",
  backgroundSize: "clamp(36px, 3.2vw, 64px) clamp(36px, 3.2vw, 64px)",
};

// How long the card takes to turn
const FLIP_DURATION_MS = 1000;

const MOBILE_CARD_MAX = "w-full max-w-[250px]";

// Size classes for the desktop (inside PC screen) and mobile versions of the card
const SIZES = {
  desktop: {
    backBody:
      "gap-[clamp(5px,0.45vw,10px)] p-[clamp(9px,0.85vw,16px)]",
    number: "text-[clamp(8px,0.55vw,11px)]",
    desc: "text-[clamp(8.5px,0.62vw,12px)] leading-[1.42] tracking-[0.03em]",
    techLabel: "text-[clamp(8px,0.58vw,11px)] tracking-[0.08em]",
    techList: "text-[clamp(8px,0.58vw,11px)] leading-[1.42] tracking-[0.06em]",
    link: "text-[clamp(8px,0.58vw,11px)] tracking-[0.1em]",
    name: "mt-[clamp(6px,0.5vw,11px)] text-center text-[clamp(9px,0.72vw,13.5px)] leading-[1.22] tracking-[-0.005em] text-white/95 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]",
  },
  mobile: {
    backBody: "gap-3 p-4",
    number: "text-[11.5px]",
    desc: "text-[12.5px] leading-[1.55] tracking-[0.05em]",
    techLabel: "text-[11.5px] tracking-[0.05em]",
    techList: "text-[11.5px] leading-[1.6] tracking-[0.05em]",
    link: "text-[11.5px] tracking-[0.1em]",
    name: "mt-2.5 px-1 text-center text-[15px] leading-[1.3] tracking-[-0.005em] text-[#12182b]",
  },
};

function EditorialVisual(props: { number: string }) {
  const vid = projectVideos[props.number];
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(function () {
    const el = videoRef.current;
    if (!el) return;
    el.defaultMuted = true;
    el.muted = true;
    el.playsInline = true;
    if (el.paused) {
      el.play().catch(function () {});
    }
  }, [vid.src]);

  return (
    <>
      <video
        ref={videoRef}
        data-project-video={props.number}
        src={vid.src}
        aria-label={vid.label}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          filter: "url(#projects-video-sharpen) contrast(1.06) brightness(1.02)",
        }}
        className="pointer-events-none absolute inset-0 h-full w-full rounded-none object-cover object-center [backface-visibility:hidden]"
      />
      {/* Subtle grain overlay on top of the video */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-none"
        style={{
          backgroundImage: GRAIN_URL,
          backgroundSize: "240px 240px",
          opacity: GRAIN_OPACITY,
        }}
      />
      {/* Diagonal glass reflection sheen across the card face */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-none bg-[linear-gradient(130deg,rgba(255,255,255,0.32)_0%,rgba(255,255,255,0.06)_38%,transparent_58%,rgba(255,255,255,0.16)_100%)]"
      />
      {/* Crisp square border (0 radius) matching the wireframe box on the PC monitor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-none border border-white/50 ring-1 ring-black/45 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.8)]"
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
    <div className="flex h-full w-full flex-col">
      {/* The video frame box */}
      <div
        className={
          "relative w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1 " +
          (props.mobile ? "aspect-[4/4.85] rounded-none" : "h-full w-full rounded-none")
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
          {/* ---------- FRONT: sharp square corners (0 radius) + glassy bezel ---------- */}
          <div
            className="absolute inset-0 overflow-hidden rounded-none bg-[#2a2a2a] shadow-[0_14px_30px_-8px_rgba(0,0,0,0.6)] [clip-path:inset(0)]"
            style={hidden}
          >
            <EditorialVisual number={project.number} />
          </div>

          {/* ---------- BACK: sharp square corners (0 radius) + dark smoked-glass finish ---------- */}
          <div
            className={
              "absolute inset-0 flex flex-col overflow-hidden rounded-none border border-white/30 bg-zinc-950/92 text-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.35),0_14px_30px_-8px_rgba(0,0,0,0.65)] backdrop-blur-xl [clip-path:inset(0)]" +
              (flipped ? "" : " pointer-events-none")
            }
            style={{ ...hidden, transform: "rotateY(180deg)" }}
            aria-hidden={!flipped}
          >
            {/* Subtle diagonal glass sheen on the back of the card */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.03)_42%,transparent_65%,rgba(255,255,255,0.08)_100%)]"
            />

            <div className={"relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto " + s.backBody}>
              <span
                className={
                  "font-mono uppercase tracking-[0.14em] text-white/60 " + s.number
                }
              >
                No. {project.number}
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
                  <ul className={"mt-[0.35em] font-sans text-white/80 " + s.techList}>
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

      {/* Project name under the card */}
      {project.title ? (
        <h3 className={"font-body font-medium " + s.name}>
          {project.title}
        </h3>
      ) : null}
    </div>
  );
}

function ScreenProjectCard(props: {
  project: Project;
  index: number;
  pcCursorNorm: { nx: number; ny: number } | null;
}) {
  const project = props.project;
  const pos = SCREEN_BOX_POSITIONS[props.index] ?? SCREEN_BOX_POSITIONS[1];

  // Multi-layered magnetic depth parallax ONLY when the cursor is moving inside the PC monitor
  const shiftX = props.pcCursorNorm
    ? props.pcCursorNorm.nx * 7 * pos.parallaxDepth
    : 0;
  const shiftY = props.pcCursorNorm
    ? props.pcCursorNorm.ny * 6 * pos.parallaxDepth
    : 0;

  return (
    <motion.article
      style={{
        left: pos.left,
        top: pos.top,
        width: pos.width,
        height: pos.height,
      }}
      className="absolute z-20"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={fadeUp}
      animate={{
        x: shiftX,
        y: shiftY,
      }}
      transition={{
        x: { type: "spring", stiffness: 180, damping: 22 },
        y: { type: "spring", stiffness: 180, damping: 22 },
      }}
    >
      <div
        className="h-full w-full"
        style={{
          transform: pos.transform,
          transformOrigin: "center center",
        }}
      >
        <FlipCard project={project} mobile={false} />
      </div>
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
  const sectionRef = useRef<HTMLElement>(null);
  const pcScreenRef = useRef<HTMLDivElement>(null);

  // Tracks cursor position ONLY inside the PC monitor for the interactive studio HUD & magnetic depth parallax
  const [pcCursor, setPcCursor] = useState<{
    x: number;
    y: number;
    nx: number;
    ny: number;
  } | null>(null);

  function updatePcCursor(clientX: number, clientY: number) {
    const el = pcScreenRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const nx = (x / rect.width - 0.5) * 2; // -1 to 1
    const ny = (y / rect.height - 0.5) * 2; // -1 to 1
    setPcCursor({ x, y, nx, ny });
  }

  function handlePcLeave() {
    setPcCursor(null);
  }

  // Ensure all visible card videos start and play simultaneously
  useEffect(function () {
    const section = sectionRef.current;
    if (!section) return;

    function getAllVideos(): HTMLVideoElement[] {
      if (!section) return [];
      return Array.from(
        section.querySelectorAll<HTMLVideoElement>("video[data-project-video]")
      );
    }

    function getVisibleVideos(): HTMLVideoElement[] {
      return getAllVideos().filter(function (v) {
        return v.offsetParent !== null;
      });
    }

    let syncedOnce = false;

    function playAllVisible(restartTogether: boolean) {
      const visible = getVisibleVideos();
      const hidden = getAllVideos().filter(function (v) {
        return v.offsetParent === null;
      });

      hidden.forEach(function (v) {
        if (!v.paused) v.pause();
      });

      if (visible.length === 0) return;

      const allReady = visible.every(function (v) {
        return v.readyState >= 2;
      });

      visible.forEach(function (v) {
        v.defaultMuted = true;
        v.muted = true;
        if (restartTogether && allReady && !syncedOnce) {
          try {
            v.currentTime = 0;
          } catch {
            // ignore seek error before metadata
          }
        }
        if (v.paused) {
          v.play().catch(function () {});
        }
      });

      if (restartTogether && allReady) {
        syncedOnce = true;
      }
    }

    const allVideos = getAllVideos();
    function onCanPlay() {
      playAllVisible(true);
    }

    allVideos.forEach(function (v) {
      v.addEventListener("loadeddata", onCanPlay);
      v.addEventListener("canplay", onCanPlay);
      v.addEventListener("pause", function () {
        if (v.offsetParent !== null && document.visibilityState === "visible") {
          v.play().catch(function () {});
        }
      });
    });

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            playAllVisible(true);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(section);

    function onResize() {
      playAllVisible(false);
    }
    window.addEventListener("resize", onResize);

    playAllVisible(true);

    return function () {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      allVideos.forEach(function (v) {
        v.removeEventListener("loadeddata", onCanPlay);
        v.removeEventListener("canplay", onCanPlay);
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full overflow-hidden bg-white"
      style={BG_LINE_GRID_STYLE}
    >
      {/* High-Definition SVG Upscale / Sharpening Filters for the Main PC Image and Videos */}
      <svg
        aria-hidden="true"
        width="0"
        height="0"
        className="pointer-events-none absolute"
        focusable="false"
      >
        <defs>
          {/* Crisp upscale convolution filter for the 2K PC monitor image */}
          <filter id="projects-hd-upscale" colorInterpolationFilters="sRGB">
            <feConvolveMatrix
              order="3"
              preserveAlpha="true"
              kernelMatrix="0 -0.45 0 -0.45 2.8 -0.45 0 -0.45 0"
            />
          </filter>
          {/* Subtle micro-sharpening filter for the card videos */}
          <filter id="projects-video-sharpen" colorInterpolationFilters="sRGB">
            <feConvolveMatrix
              order="3"
              preserveAlpha="true"
              kernelMatrix="0 -0.28 0 -0.28 2.12 -0.28 0 -0.28 0"
            />
          </filter>
        </defs>
      </svg>

      {/* ===================== MOBILE ===================== */}
      <div className="relative flex flex-col gap-7 px-6 py-12 sm:hidden">
        <motion.h2
          className="relative z-10 font-display text-[40px] uppercase leading-none tracking-[-0.03em] text-black"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={revealTransition()}
        >
          Projects
        </motion.h2>

        <div className="relative z-10 flex flex-col gap-7">
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
      <div className="hidden px-[2vw] py-[clamp(28px,2.8vw,56px)] sm:block">
        {/* Main PC Monitor Stage centered inside the line-check background */}
        <div className="relative z-10 mx-auto w-[95%] max-w-[1760px]">
          <div className="relative aspect-[1024/571] w-full overflow-hidden">
            {/* ---------- TOPIC "PROJECTS" IN THE TOP-LEFT CORNER ---------- */}
            <div className="pointer-events-none absolute left-[clamp(20px,2.4vw,48px)] top-[clamp(18px,2vw,40px)] z-30">
              <motion.h2
                className="font-display text-[clamp(28px,3.8vw,86px)] uppercase leading-none tracking-[-0.06em] text-black"
                initial={{ opacity: 0, y: -16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={revealTransition()}
              >
                Projects
              </motion.h2>
            </div>

            {/* Main PC Monitor Image with HD Upscale Sharpening Filter */}
            <Image
              src={PC_BG_IMAGE}
              alt="PC Monitor Display Stage"
              fill
              sizes="95vw"
              quality={100}
              unoptimized
              priority
              style={{
                filter: "url(#projects-hd-upscale) contrast(1.04)",
              }}
              className="pointer-events-none object-cover object-center select-none"
            />

            {/* ---------- CREATIVE PC MONITOR SCREEN INTERACTION (activates ONLY when cursor is on the PC monitor) ---------- */}
            <div
              ref={pcScreenRef}
              onPointerMove={function (e) {
                updatePcCursor(e.clientX, e.clientY);
              }}
              onPointerLeave={handlePcLeave}
              className="absolute left-[21.4%] top-[6.8%] z-10 h-[55.5%] w-[57%] overflow-hidden"
            >
              {/* 1. Subtle architectural grid wake-up inside the PC screen when hovered */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                style={{
                  opacity: pcCursor ? 0.22 : 0,
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,0.22) 1px, transparent 1px), " +
                    "linear-gradient(to bottom, rgba(255,255,255,0.22) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                  maskImage: pcCursor
                    ? `radial-gradient(240px circle at ${pcCursor.x}px ${pcCursor.y}px, black 0%, transparent 80%)`
                    : "none",
                  WebkitMaskImage: pcCursor
                    ? `radial-gradient(240px circle at ${pcCursor.x}px ${pcCursor.y}px, black 0%, transparent 80%)`
                    : "none",
                }}
              />

              {/* 2. Precision cursor-tracking X / Y architectural laser hairlines across the PC screen */}
              {pcCursor ? (
                <>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
                    style={{ top: pcCursor.y }}
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-white/25 to-transparent"
                    style={{ left: pcCursor.x }}
                  />
                  {/* Small target reticle ring at cursor intersection on the monitor */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 transition-transform duration-150"
                    style={{ left: pcCursor.x, top: pcCursor.y }}
                  />
                </>
              ) : null}

              {/* 3. Studio monitor HUD status bar & corner viewfinder brackets that power on when cursor is on the PC */}
              <div
                aria-hidden="true"
                className={
                  "pointer-events-none absolute inset-3 transition-opacity duration-500 " +
                  (pcCursor ? "opacity-100" : "opacity-0")
                }
              >
                {/* Top-left corner bracket */}
                <span className="absolute left-0 top-0 h-2.5 w-2.5 border-l border-t border-white/45" />
                {/* Top-right corner bracket */}
                <span className="absolute right-0 top-0 h-2.5 w-2.5 border-r border-t border-white/45" />
                {/* Bottom-left corner bracket */}
                <span className="absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l border-white/45" />
                {/* Bottom-right corner bracket */}
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-white/45" />

                {/* Minimal studio telemetry readout at top-right of the PC screen */}
                <div className="absolute right-3 top-1.5 flex items-center gap-2 font-mono text-[clamp(7px,0.52vw,10px)] uppercase tracking-[0.18em] text-white/55">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/80" />
                  <span>
                    STUDIO DISPLAY //{" "}
                    {pcCursor
                      ? `${Math.round(pcCursor.x)}×${Math.round(pcCursor.y)}`
                      : "IDLE"}
                  </span>
                </div>
              </div>
            </div>

            {/* 3 Slightly Longer Video Cards (`height: "34.5%"`) with multi-depth magnetic parallax when cursor is on the PC */}
            <div
              onPointerMove={function (e) {
                updatePcCursor(e.clientX, e.clientY);
              }}
              onPointerLeave={handlePcLeave}
              className="contents"
            >
              {projects.map(function (project, index) {
                return (
                  <ScreenProjectCard
                    key={project.number}
                    project={project}
                    index={index}
                    pcCursorNorm={
                      pcCursor ? { nx: pcCursor.nx, ny: pcCursor.ny } : null
                    }
                  />
                );
              })}
            </div>

            {/* ---------- GITHUB LINK ON THE BOTTOM-RIGHT SIDE OF THE MAIN IMAGE ---------- */}
            <div className="absolute bottom-[clamp(20px,2.4vw,44px)] right-[clamp(24px,3vw,58px)] z-30">
              <motion.a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-sans text-[clamp(11px,0.88vw,19px)] tracking-[0.16em] text-black underline decoration-[0.5px] underline-offset-[3px] drop-shadow-[0_1px_6px_rgba(255,255,255,0.95)] transition-opacity hover:opacity-70"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={fadeUp}
                transition={revealTransition(0.4)}
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