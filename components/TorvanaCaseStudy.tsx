"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, fadeIn, revealTransition, viewport, staggerDelay } from "@/components/lib/motion";

// Same nav pattern as Certifications — this is its own route, so links
// point back to the homepage's anchored sections.
const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

const techStack = [
  "Figma",
  "Figma Auto Layout",
  "Figma Variables & Design Tokens",
  "Component Library",
  "Interactive Prototyping",
  "User Persona Mapping",
  "User Flow Diagrams",
];

// Aspect ratios (width / height) taken directly from the Figma dev code,
// in gallery order — keeps each placeholder/real screenshot sized
// correctly without layout jump once real images are swapped in.
const galleryImages = [
  { src: "/torvana/1.jpg", ratio: 627 / 2051 },
  { src: "/torvana/2.jpg", ratio: 627 / 1012 },
  { src: "/torvana/3.jpg", ratio: 628 / 863 },
  { src: "/torvana/4.jpg", ratio: 626 / 680 },
  { src: "/torvana/5.jpg", ratio: 626 / 391 },
  { src: "/torvana/6.jpg", ratio: 627 / 756 },
  { src: "/torvana/7.jpg", ratio: 626 / 620 },
  { src: "/torvana/8.jpg", ratio: 626 / 490 },
];

/**
 * Torvana case-study page — its own route (e.g. /torvana), linked to from
 * the "Torvana - Tour Guide Platform." project card on the Projects
 * section.
 *
 * Layout, from the Figma dev code:
 * - Nav + centered underlined title + centered intro paragraph up top.
 * - Below that, a two-column layout: a long scrolling gallery of project
 *   screenshots on the left, and a `sticky` info panel on the right (tech
 *   stack, contribution write-up, Figma-link CTA) that stays in view
 *   while the gallery scrolls — the info panel is far shorter than the
 *   gallery in the Figma frame (1306px vs 7011px), which only makes sense
 *   as a sticky/pinned panel, so that's how it's implemented here.
 */
export default function TorvanaCaseStudy() {
  return (
    <section className="relative w-full bg-white">
      {/* Nav */}
      <nav className="flex flex-wrap items-center gap-[clamp(16px,1.5vw,36px)] px-[clamp(20px,2.15vw,52px)] pb-[clamp(16px,1.5vw,36px)] pt-[clamp(20px,2.15vw,52px)]">
        {navLinks.map(function (link, index) {
          return (
            <motion.a
              key={link.label}
              href={link.href}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              transition={revealTransition(staggerDelay(index, 0.08))}
              className="font-display text-[clamp(13px,0.93vw,22px)] uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-60"
            >
              {link.label}
            </motion.a>
          );
        })}
      </nav>

      {/* Title */}
      <motion.h1
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={fadeUp}
        transition={revealTransition(0.1)}
        className="mt-[clamp(16px,2vw,48px)] text-center font-['Inria_Serif'] text-[clamp(40px,5.5vw,104px)] capitalize leading-[1.05] text-neutral-950 underline decoration-1 underline-offset-8"
      >
        Torvana
      </motion.h1>

      {/* Intro paragraph */}
      <motion.p
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={fadeUp}
        transition={revealTransition(0.2)}
        className="mx-auto mt-[clamp(20px,2.5vw,48px)] max-w-[900px] px-6 text-center font-sans text-[clamp(14px,1.05vw,18px)] capitalize leading-[1.9] tracking-wide text-zinc-600"
      >
        Torvana is a full-featured local tourism platform designed to connect
        travellers with experiences, events, food, accommodation, and guided
        tours in one unified ecosystem. Built as a university group project by
        a team of five, the platform serves multiple user personas — tourists,
        event managers, tour guides, food managers, hotel managers, and admins
        — each with their own dedicated dashboard and profile experience.
      </motion.p>

      {/* Two-column body */}
      <div className="mt-[clamp(32px,4vw,80px)] flex flex-col gap-[clamp(24px,2.5vw,48px)] px-[clamp(20px,2.15vw,52px)] pb-[clamp(48px,5vw,120px)] lg:flex-row lg:items-start">
        {/* Left — scrolling screenshot gallery */}
        <div className="flex flex-1 flex-col gap-[clamp(12px,1.2vw,24px)] bg-[#f9f9f9] p-[clamp(12px,1.2vw,24px)]">
          {galleryImages.map(function (img, index) {
            return (
              <motion.div
                key={img.src}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={fadeIn}
                transition={revealTransition(staggerDelay(index, 0.06))}
                className="relative w-full overflow-hidden border border-stone-300"
                style={{ aspectRatio: img.ratio }}
              >
                <Image
                  src={img.src}
                  alt={`Torvana screenshot ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Right — sticky info panel */}
        <motion.aside
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={fadeUp}
          transition={revealTransition(0.15)}
          className="flex-1 bg-[#f9f9f9]/90 p-[clamp(16px,1.6vw,32px)] backdrop-blur-[2px] lg:sticky lg:top-[clamp(20px,2vw,48px)]"
        >
          <h2 className="font-['Joan'] text-[clamp(20px,1.6vw,32px)] capitalize leading-tight tracking-[0.1em] text-neutral-700 underline">
            Tech Stack &amp; Tools
          </h2>
          <ul className="mt-[clamp(16px,1.6vw,32px)] grid grid-cols-2 gap-x-6 gap-y-1 pl-5 font-['Joan'] text-[clamp(14px,1.1vw,20px)] capitalize leading-[1.7] tracking-wider text-zinc-600">
            {techStack.map(function (item) {
              return (
                <li key={item} className="list-disc">
                  {item}
                </li>
              );
            })}
          </ul>

          <div className="mt-[clamp(20px,2vw,40px)] border-t border-stone-300 pt-[clamp(20px,2vw,40px)]">
            <div className="bg-neutral-100 p-[clamp(16px,1.6vw,32px)]">
              <h3 className="font-['Joan'] text-[clamp(18px,1.4vw,28px)] capitalize leading-tight tracking-wider text-zinc-600 underline">
                My Contribution — Event Management Module
              </h3>
              <p className="mt-[clamp(12px,1.2vw,24px)] font-['Joan'] text-[clamp(13px,1vw,18px)] capitalize leading-[1.7] tracking-wider text-zinc-600">
                Designed the full event management experience, covering the
                Manager Dashboard, Event Listings, Manager Profile, and Create
                &amp; Edit Flows with a focus on clear information hierarchy
                and progressive disclosure to reduce cognitive load.
                <br />
                <br />
                Built in Figma using Auto Layout, design tokens, and a shared
                component library to stay pixel-consistent across the team.
                Started from user journey mapping, built reusable components
                first, then prototyped key flows to validate interactions
                before finalising screens.
              </p>
            </div>
          </div>

          <a
            href="https://lnkd.in/gJqwFbnC"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-[clamp(20px,2vw,40px)] block bg-black p-[clamp(16px,1.6vw,32px)] transition-opacity hover:opacity-90"
          >
            <p className="font-sans text-[clamp(13px,1vw,20px)] capitalize leading-[1.6] tracking-[0.15em] text-white">
              Check out our full Figma design :
            </p>
            <p className="font-sans text-[clamp(13px,1vw,20px)] capitalize leading-[1.6] tracking-[0.15em] text-white underline">
              https://lnkd.in/gJqwFbnC
            </p>
          </a>
        </motion.aside>
      </div>
    </section>
  );
}