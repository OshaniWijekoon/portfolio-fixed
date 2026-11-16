"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, revealTransition, viewport, staggerDelay } from "@/components/lib/motion";

type Project = {
  number: string;
  title?: string;
  description?: string;
  techLabel?: string;
  techItems?: string[];
  href?: string;
  colSpanClass: string;
  imageAspectClass: string;
};

const projects: Project[] = [
  {
    number: "01",
    title: "Mobile Application UI/UX Design.",
    href: "/mobile-clothing-store-app",
    description: "Designed a user-centered mobile application interface.",
    techLabel: "Tools",
    techItems: ["Figma", "Canva"],
    colSpanClass: "sm:col-span-2",
    imageAspectClass: "aspect-[21/10]",
  },
  {
    number: "02",
    title: "Torvana - Tour Guide Platform.",
    href: "/torvana",
    description: "Developed a full-stack tour guide web application.",
    techLabel: "Tech Stack",
    techItems: ["MERN Stack"],
    colSpanClass: "sm:col-span-1",
    imageAspectClass: "aspect-[224/150]",
  },
  {
    number: "03",
    title: "Japanese Food Restaurant Mobile Application",
    description:
      "Developed a restaurant mobile application with a clean and intuitive UI.",
    techLabel: "Tech Stack",
    techItems: ["Kotlin", "Android Studio", "Firebase"],
    colSpanClass: "sm:col-span-1",
    imageAspectClass: "aspect-[7/4]",
  },
];

// Images go in:  public/projects/
// Make sure the file names / extensions match your files.
const projectImages: Record<string, { src: string; alt: string }> = {
  "01": {
    src: "/projects/project-1.jpg",
    alt: "Mobile clothing store app UI/UX screens designed in Figma",
  },
  "02": {
    src: "/projects/project-2.jpg",
    alt: "Torvana tour guide platform shown on a laptop",
  },
  "03": {
    src: "/projects/project-3.jpg",
    alt: "Japanese food restaurant mobile application shown on a laptop",
  },
};

// Film-grain texture (SVG noise). Tweak GRAIN_OPACITY to make it stronger / softer.
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

function EditorialVisual(props: { number: string }) {
  const img = projectImages[props.number];

  return (
    <>
      {/* Card 01 only: show the whole image (no cropping) on a matching light backdrop */}
      {props.number === "01" ? (
        <div aria-hidden="true" className="absolute inset-0 bg-[#f4f4f4]" />
      ) : null}
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes="(min-width: 640px) 50vw, 100vw"
        className={props.number === "01" ? "object-contain" : "object-cover"}
      />
      {/* Grain overlay on top of the image */}
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

function ProjectCard(props: { project: Project; index: number }) {
  const project = props.project;

  return (
    <motion.article
      className={"flex flex-col " + project.colSpanClass}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={fadeUp}
      transition={revealTransition(staggerDelay(props.index, 0.12))}
    >
      {/* Top Black Strip (matches reference layout with existing text & black/white colors) */}
      <div className="flex items-center justify-between bg-black px-[clamp(10px,0.9vw,18px)] py-[clamp(5px,0.42vw,9px)]">
        <span
          className="text-[clamp(10px,0.72vw,15px)] uppercase tracking-[0.14em] text-white"
          style={{ fontFamily: '"Times New Roman", serif' }}
        >
          {project.number}
        </span>
      </div>

      {/* Editorial Monochrome Visual Block */}
      <div className={"relative w-full overflow-hidden bg-black " + project.imageAspectClass}>
        <EditorialVisual number={project.number} />
      </div>

      {/* Text Content Below Image (preserves exact text, links, and colors) */}
      <div className="bg-[#f7f7f7] px-[clamp(12px,1.1vw,24px)] py-[clamp(14px,1.4vw,30px)]">
        {project.title ? (
          <a
            href={project.href ?? "#"}
            className="block font-body text-[clamp(14px,1.15vw,24px)] uppercase leading-[1.35] tracking-[0.08em] text-black underline decoration-[0.5px] underline-offset-[4px] transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-1 focus-visible:ring-black"
          >
            {project.title}
          </a>
        ) : null}

        {project.description ? (
          <p className="mt-[clamp(8px,0.75vw,16px)] font-sans text-[clamp(11px,0.88vw,19px)] leading-[1.6] tracking-[0.12em] text-[#3e3e3e]">
            {project.description}
          </p>
        ) : null}

        {project.techItems && project.techItems.length > 0 ? (
          <div className="mt-[clamp(10px,0.95vw,20px)]">
            <p className="font-sans text-[clamp(10px,0.78vw,17px)] font-bold leading-none tracking-[0.12em] text-[#3e3e3e] underline decoration-[0.5px] underline-offset-[2px]">
              {project.techLabel}:
            </p>
            <ul className="mt-[clamp(5px,0.5vw,10px)] font-sans text-[clamp(10px,0.78vw,17px)] leading-[1.6] tracking-[0.14em] text-[#3e3e3e]">
              {project.techItems.map(function (item) {
                return <li key={item}>- {item}</li>;
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}

function MobileProjectCard(props: { project: Project; index: number }) {
  const project = props.project;

  return (
    <motion.article
      className="w-full"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={fadeUp}
      transition={revealTransition(staggerDelay(props.index, 0.1))}
    >
      <div className="flex items-center justify-between bg-black px-3.5 py-2">
        <span
          className="text-[13px] uppercase tracking-[0.14em] text-white"
          style={{ fontFamily: '"Times New Roman", serif' }}
        >
          {project.number}
        </span>
      </div>

      <div className={"relative w-full overflow-hidden bg-black " + project.imageAspectClass}>
        <EditorialVisual number={project.number} />
      </div>

      <div className="bg-[#f7f7f7] px-4 py-5">
        {project.title ? (
          <a
            href={project.href ?? "#"}
            className="block font-body text-[15px] uppercase leading-[1.4] tracking-[0.08em] text-black underline decoration-[0.5px] underline-offset-[3px]"
          >
            {project.title}
          </a>
        ) : null}

        {project.description ? (
          <p className="mt-2.5 font-sans text-[13px] leading-[1.6] tracking-[0.05em] text-[#3e3e3e]">
            {project.description}
          </p>
        ) : null}

        {project.techItems && project.techItems.length > 0 ? (
          <div className="mt-3">
            <p className="font-sans text-[12px] font-bold leading-none tracking-[0.05em] text-[#3e3e3e] underline decoration-[0.5px] underline-offset-[2px]">
              {project.techLabel}:
            </p>
            <ul className="mt-2 font-sans text-[12px] leading-[1.8] tracking-[0.05em] text-[#3e3e3e]">
              {project.techItems.map(function (item) {
                return <li key={item}>- {item}</li>;
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="w-full overflow-hidden bg-white">
      {/* ===================== MOBILE ===================== */}
      <div className="flex flex-col gap-8 px-6 py-12 sm:hidden">
        <motion.h2
          className="font-display text-[40px] uppercase leading-none tracking-[-0.03em] text-black"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={revealTransition()}
        >
          Projects
        </motion.h2>

        {projects.map(function (project, index) {
          return (
            <MobileProjectCard key={project.number} project={project} index={index} />
          );
        })}

        <motion.a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="self-end font-sans text-[13px] tracking-[0.1em] text-[#3e3e3e] underline decoration-[0.5px] underline-offset-[2px]"
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
          <div className="relative mx-auto w-full max-w-[3000px] overflow-hidden bg-white pb-[clamp(48px,4.2vw,96px)] pt-[clamp(24px,2.2vw,48px)]">
            {/* Outer & Architectural Grid Hairlines */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 right-0 top-[2.2%] h-px bg-[#a4a4a4]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-[#a4a4a4]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-[1.5%] top-0 w-px bg-[#a4a4a4]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 right-[1%] top-0 w-px bg-[#a4a4a4]"
            />


            {/* Top Header Row */}
            <div className="relative mb-[clamp(22px,2.2vw,48px)] flex items-end justify-between px-[3.2%] pt-[clamp(12px,1.4vw,32px)]">
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

            {/* Horizontal hairline right above the 3 top-aligned editorial cards */}
            <span
              aria-hidden="true"
              className="block h-px w-full bg-[#e2e2e2]"
            />

            {/* 4-Column Asymmetric Grid: Card 01 spans 2 cols, Card 02 spans 1 col, Card 03 spans 1 col */}
            <div className="grid grid-cols-4 items-start gap-[clamp(14px,1.4vw,32px)] px-[3.2%] pt-[clamp(10px,0.9vw,20px)]">
              {projects.map(function (project, index) {
                return (
                  <ProjectCard key={project.number} project={project} index={index} />
                );
              })}
            </div>

            <motion.a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-[2.8%] right-[3.2%] font-sans text-[clamp(10px,0.78vw,18px)] tracking-[0.16em] text-[#3e3e3e] underline decoration-[0.5px] underline-offset-[2px] transition-opacity hover:opacity-70"
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
    </section>
  );
}