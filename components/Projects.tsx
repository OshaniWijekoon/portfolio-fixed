"use client";

import { motion } from "framer-motion";
import { fadeUp, revealTransition, viewport, staggerDelay } from "@/components/lib/motion";

type Project = {
  number: string;
  title?: string;
  description?: string;
  techLabel?: string;
  techItems?: string[];
  href?: string;
  className: string;
};

const projects: Project[] = [
  {
    number: "01",
    title: "Mobile Application UI/UX Design.",
    href: "/mobile-clothing-store-app",
    description: "Designed a user-centered mobile application interface.",
    techLabel: "Tools",
    techItems: ["Figma", "Canva"],
    className: "left-[2.1%] top-[39%] w-[28.2%]",
  },
  {
    number: "02",
    title: "Torvana - Tour Guide Platform.",
    href: "/torvana",
    description: "Developed a full-stack tour guide web application.",
    techLabel: "Tech Stack",
    techItems: ["MERN Stack"],
    className: "left-[36.4%] top-[27.5%] w-[28.2%]",
  },
  {
    number: "03",
    title: "Japanese Food Restaurant Mobile Application",
    description:
      "Developed a restaurant mobile application with a clean and intuitive UI.",
    techLabel: "Tech Stack",
    techItems: ["Kotlin", "Android Studio", "Firebase"],
    className: "left-[70.7%] top-[39%] w-[28.2%]",
  },
];

// Design scale reference, same approach used on the About page: every size
// that used to jump once at the `sm` breakpoint now scales continuously with
// viewport width (vw), floored at the old mobile value and ceilinged well
// above the old desktop value so it keeps growing on wide screens instead of
// plateauing. Tracking (letter-spacing) is expressed in `em` so it scales
// automatically with its paired font-size instead of needing its own clamp.
//
// Motion: each card fades/rises in with a staggered delay based on its
// index, using the same shared timing as every other section.
//
// Card count / spacing: originally 4 cards (the 4th, ".04", was an empty
// placeholder) sat close together with a tight 3.3% gap. When it was
// removed, the 3 remaining cards were first stretched out to a 15.8% gap
// to fill the row — that read as too much empty space. The gap is now
// pulled back in to ~6.1%, and card width increased slightly (21.7% ->
// 28.2%) to compensate, so the row still reads as evenly filled without
// the wide gaps.
//
// Card sizing: the bottom text panel used to be `min-h-*`, so cards with
// more content (e.g. card 03's 3-item tech list) grew visibly taller than
// the others. It's now a fixed `h-*` (same clamp values) so all three
// cards share one uniform height regardless of content length, matching
// the already-uniform width.
//
// Number / title spacing in the black panel: the number was top-anchored
// and the title bottom-anchored inside a fairly tall black box, so the
// wider cards left a long empty gap between them. The black box height is
// now scaled down (~25% shorter, clamp(106,12.56vw,300) ->
// clamp(80,9.4vw,225)) so the top-anchored number and bottom-anchored
// title sit closer together, without needing to guess each title's
// wrapped-line height. The number's own font size is scaled up to match
// (clamp(26,2.6vw,62) -> clamp(34,3.4vw,80)) roughly proportional to how
// much wider the cards got when the 4th card was removed.
//
// Text spacing: description/tech-list tracking and line-height were quite
// wide (tracking-[0.29em]/[0.24em], leading-[2]/[1.9]), which is part of
// what made the text panel feel oversized. Tightened to tracking-[0.15em]
// and leading-[1.6] throughout so the copy sits more compactly.
//
// Mobile: the desktop layout below is absolutely-positioned 3-up grid that
// only works down to a certain width. Below `sm` it's replaced entirely by
// a simple full-width stacked list (MobileProjectCard) with fixed, legible
// font sizes instead of the vw-scaled desktop values — left untouched.

function ProjectCard(props: { project: Project; index: number }) {
  const project = props.project;

  return (
    <motion.article
      className={"absolute " + project.className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={fadeUp}
      transition={revealTransition(staggerDelay(props.index, 0.12))}
    >
      <div className="relative h-[clamp(88px,10.3vw,247px)] bg-black">
        <span
          aria-hidden="true"
          className="absolute right-[clamp(6px,0.66vw,16px)] top-[clamp(10px,0.99vw,24px)] z-10 text-[clamp(40px,4vw,94px)] leading-none text-white [writing-mode:vertical-rl]"
          style={{ fontFamily: '"Times New Roman", serif' }}
        >
          {project.number}
        </span>

        {project.title ? (
          <a
            href={project.href ?? "#"}
            className="absolute bottom-[clamp(13px,1.59vw,38px)] right-[clamp(8px,0.93vw,22px)] max-w-[86%] text-right font-body text-[clamp(7px,0.86vw,21px)] uppercase leading-[1.55] tracking-[0.15em] text-white underline decoration-[0.5px] underline-offset-[3px] transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            {project.title}
          </a>
        ) : null}
      </div>

      <div className="h-[clamp(112px,14.2vw,340px)] bg-[#f7f7f7] px-[clamp(10px,1.19vw,29px)] py-[clamp(14px,1.85vw,45px)] text-right">
        {project.description ? (
          <p className="ml-auto max-w-[92%] font-sans text-[clamp(8px,0.92vw,22px)] leading-[1.6] tracking-[0.15em] text-[#3e3e3e]">
            {project.description}
          </p>
        ) : null}

        {project.techItems && project.techItems.length > 0 ? (
          <div className="mt-[clamp(9px,1.19vw,29px)]">
            <p className="font-sans text-[clamp(7px,0.82vw,20px)] font-bold leading-none tracking-[0.12em] text-[#3e3e3e] underline decoration-[0.5px] underline-offset-[2px]">
              {project.techLabel}:
            </p>
            <ul className="mt-[clamp(5px,0.6vw,14px)] font-sans text-[clamp(7px,0.82vw,20px)] leading-[1.6] tracking-[0.15em] text-[#3e3e3e]">
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
      <div className="relative flex h-[140px] items-start justify-end bg-black p-3">
        <span
          aria-hidden="true"
          className="text-[44px] leading-none text-white [writing-mode:vertical-rl]"
          style={{ fontFamily: '"Times New Roman", serif' }}
        >
          {project.number}
        </span>
        {project.title ? (
          <a
            href={project.href ?? "#"}
            className="absolute bottom-3 right-3 max-w-[80%] text-right font-body text-[13px] uppercase leading-[1.4] tracking-[0.1em] text-white underline decoration-[0.5px] underline-offset-[3px]"
          >
            {project.title}
          </a>
        ) : null}
      </div>

      <div className="bg-[#f7f7f7] px-4 py-5 text-right">
        {project.description ? (
          <p className="ml-auto max-w-[92%] font-sans text-[13px] leading-[1.6] tracking-[0.05em] text-[#3e3e3e]">
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
          <div className="relative mx-auto aspect-[596/354] w-full max-w-[3000px] min-h-[354px] overflow-hidden bg-white">
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 top-[2.2%] h-px bg-[#a4a4a4]"
            />

            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 right-0 h-px bg-[#a4a4a4]"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-[1.5%] top-0 w-px bg-[#a4a4a4]"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-0 right-[1%] top-0 w-px bg-[#a4a4a4]"
            />
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-[2.2%] h-[18.8%] w-px bg-[#6b6b6b]"
            />
            <span
              aria-hidden="true"
              className="absolute left-[47%] top-[20.8%] h-px w-[7%] bg-[#d9d9d9]"
            />
            <span
              aria-hidden="true"
              className="absolute right-[11.2%] top-[18.9%] h-px w-[1%] bg-[#a4a4a4]"
            />

            <motion.h2
              className="absolute left-[4.2%] top-[14.2%] font-display text-[clamp(25px,3.77vw,90px)] uppercase leading-none tracking-[-0.06em] text-black"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={revealTransition()}
            >
              Projects
            </motion.h2>

            <div className="absolute inset-x-[2.1%] bottom-0 top-0">
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
              className="absolute bottom-[4.8%] right-[5.3%] font-sans text-[clamp(6px,0.73vw,18px)] tracking-[0.16em] text-[#3e3e3e] underline decoration-[0.5px] underline-offset-[2px] transition-opacity hover:opacity-70"
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