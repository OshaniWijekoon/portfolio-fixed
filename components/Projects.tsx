"use client";

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
const GRAIN_OPACITY = 0.25;
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

// How long the card takes to turn
const FLIP_DURATION_MS = 1000;

// Slightly smaller than `w-[25%] max-w-[360px]` (reduced by ~10% to `w-[22.5%] max-w-[315px]`)
// `justify-evenly` keeps all 4 horizontal spaces 100% equal.
const DESKTOP_CARD_WIDTH = "w-[22.5%] max-w-[315px] shrink-0";
const MOBILE_CARD_MAX = "w-full max-w-[245px]";

// Balanced portrait ratio (`aspect-[3/4]`)
const CARD_SHAPE = "aspect-[3/4] rounded-[clamp(14px,1.35vw,24px)]";

// Size classes for the desktop and mobile versions of the card
const SIZES = {
  desktop: {
    backBody:
      "gap-[clamp(8px,0.75vw,16px)] p-[clamp(14px,1.3vw,26px)]",
    number: "text-[clamp(10px,0.72vw,15px)]",
    desc: "text-[clamp(11px,0.85vw,17px)] leading-[1.55] tracking-[0.07em]",
    techLabel: "text-[clamp(10px,0.75vw,15px)] tracking-[0.12em]",
    techList: "text-[clamp(10px,0.75vw,15px)] leading-[1.6] tracking-[0.12em]",
    link: "text-[clamp(10px,0.75vw,15px)] tracking-[0.14em]",
    name: "mt-[clamp(11px,1vw,20px)] px-[clamp(2px,0.35vw,6px)] text-[clamp(14px,1.12vw,23px)] leading-[1.3] tracking-[-0.005em]",
  },
  mobile: {
    backBody: "gap-3 p-4",
    number: "text-[11.5px]",
    desc: "text-[12.5px] leading-[1.55] tracking-[0.05em]",
    techLabel: "text-[11.5px] tracking-[0.05em]",
    techList: "text-[11.5px] leading-[1.6] tracking-[0.05em]",
    link: "text-[11.5px] tracking-[0.1em]",
    name: "mt-2.5 px-1 text-[16px] leading-[1.3] tracking-[-0.005em]",
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
  }, []);

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
        className="pointer-events-none absolute inset-0 h-full w-full rounded-[inherit] object-cover object-center"
      />
      {/* Grain overlay on top of the video */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          backgroundImage: GRAIN_URL,
          backgroundSize: "240px 240px",
          opacity: GRAIN_OPACITY,
        }}
      />
      {/* Diagonal glass reflection sheen across the card face */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(130deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.06)_38%,transparent_58%,rgba(255,255,255,0.16)_100%)]"
      />
      {/* Frosted glass inner bezel highlight + crisp outer edge ring */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/55 ring-1 ring-black/15 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.85),inset_0_-1.5px_2px_rgba(0,0,0,0.2)]"
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
          {/* ---------- FRONT: video with glassy bezel & soft glass elevation shadow ---------- */}
          <div
            className={
              "absolute inset-0 overflow-hidden bg-[#d8d8d8] shadow-[0_14px_32px_-10px_rgba(0,0,0,0.18)] [clip-path:inset(0_round_clamp(14px,1.35vw,24px))] " +
              CARD_SHAPE
            }
            style={hidden}
          >
            <EditorialVisual number={project.number} />
          </div>

          {/* ---------- BACK: dark smoked-glass finish with specular glass rim ---------- */}
          <div
            className={
              "absolute inset-0 flex flex-col overflow-hidden border border-white/25 bg-zinc-950/90 text-white shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.35),0_14px_32px_-10px_rgba(0,0,0,0.28)] backdrop-blur-xl [clip-path:inset(0_round_clamp(14px,1.35vw,24px))] " +
              CARD_SHAPE +
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
      className={"relative z-10 flex flex-col " + DESKTOP_CARD_WIDTH}
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
  const sectionRef = useRef<HTMLElement>(null);

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
    // Outer section (outside the architectural frame) has a subtle light-gray background (#f3f3f3)
    <section
      ref={sectionRef}
      id="projects"
      className="w-full overflow-hidden bg-[#f3f3f3]"
    >
      {/* ===================== MOBILE ===================== */}
      <div className="relative flex flex-col gap-8 px-6 py-12 sm:hidden">
        {/* Inside of the mobile architectural frame stays pure white with grid lines */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-4 left-3 right-3 top-4 bg-white"
          style={BG_LINE_GRID_STYLE}
        />

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

        <div className="relative z-10 flex flex-col gap-8">
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
          {/* Outer area outside the 1.5% / 18px frame lines is light gray (#f3f3f3), while the inner box is pure white */}
          <div className="relative mx-auto w-full max-w-[3000px] overflow-hidden bg-[#f3f3f3] pb-[clamp(64px,4.8vw,108px)] pt-[clamp(24px,2.2vw,48px)]">
            {/* Pure white inner box + architectural background line grid clipped strictly inside the symmetric outer frame */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[18px] left-[1.5%] right-[1.5%] top-[18px] bg-white"
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

            {/* Top Header Row */}
            <div className="relative z-10 mx-[1.5%] mb-[clamp(18px,1.8vw,38px)] flex items-end justify-between px-[6.25%] pt-[clamp(12px,1.4vw,32px)]">
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

            {/* 3 equal cards (each 22.5% wide) inside the 1.5% architectural frame using `justify-evenly`:
                Guarantees all 4 horizontal spaces are 100% equal */}
            <div className="relative mx-[1.5%] flex items-start justify-evenly pt-[clamp(12px,1.2vw,28px)]">
              {projects.map(function (project, index) {
                return (
                  <ProjectCard key={project.number} project={project} index={index} />
                );
              })}
            </div>

            {/* GitHub link in the bottom-right corner */}
            <div className="absolute bottom-[32px] right-[3.2%] z-10 translate-y-1/2">
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