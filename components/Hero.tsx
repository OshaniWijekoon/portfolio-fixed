"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, revealTransition, viewport, staggerDelay } from "@/components/lib/motion";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const bottomLinks = [
  { href: "/resume.pdf", label: "View Resume ↗", external: true },
  { href: "#projects", label: "See Projects", external: false },
];

/**
 * Hero / landing section.
 * Full-bleed background photo with a faint center divider line running
 * through it (same visual language as the hairlines used on the other
 * sections), a nav bar top-left, the stacked name treatment centered,
 * and resume/projects links bottom-right.
 *
 * Sizing uses the same fluid clamp() approach as the rest of the site,
 * scaled off a 1512px design reference (vw = value / 1512 * 100).
 *
 * Mobile: the 900/500 aspect ratio is too wide/short on narrow screens
 * (crops the photo and squeezes the name), so below `sm` it switches to a
 * taller 3/4 ratio and the bottom links stack instead of sitting inline.
 * Desktop (`sm:` and up) is untouched — every class active at `sm:` and
 * above resolves to exactly what the original markup had.
 */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex aspect-[3/4] w-full flex-col overflow-hidden bg-[#f4f4f2] sm:aspect-[900/500]"
    >
      {/* Background photo */}
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Faint center divider, matching the hairline style used elsewhere */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 top-0 z-10 hidden w-px -translate-x-1/2 bg-[#a4a4a4]/60 sm:block"
      />

      {/* Nav */}
      <nav className="relative z-20 flex flex-wrap items-center gap-[clamp(20px,1.85vw,44px)] px-[clamp(24px,2.65vw,64px)] pt-[clamp(24px,2.65vw,64px)]">
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

      {/* Centered name block */}
      <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.h1
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          transition={revealTransition(0.15)}
          className="text-center"
        >
          <span className="block font-['Inria_Serif'] text-[clamp(40px,6.35vw,154px)] uppercase leading-[clamp(48px,7.41vw,180px)] text-black">
            Oshani
            <br />
          </span>
          <span className="block font-['Inria_Serif'] text-[clamp(40px,6.35vw,154px)] uppercase leading-[clamp(48px,7.41vw,180px)] text-neutral-400">
            Wijekoon
          </span>
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          transition={revealTransition(0.35)}
          className="mt-[clamp(12px,1.06vw,26px)] font-joan text-[clamp(15px,1.59vw,38px)] text-black"
        >
          UI/UX &amp; Web Developer
        </motion.p>
      </div>

      {/* Bottom links — stacked/centered on mobile, inline right on sm+ */}
      <div className="relative z-20 flex flex-col items-center gap-[clamp(12px,1.85vw,44px)] px-[clamp(24px,2.65vw,64px)] pb-[clamp(24px,2.65vw,64px)] sm:flex-row sm:items-stretch sm:justify-end sm:gap-[clamp(20px,1.85vw,44px)]">
        {bottomLinks.map(function (link, index) {
          return (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              transition={revealTransition(staggerDelay(index, 0.08, 0.4))}
              className="font-display text-[clamp(13px,0.93vw,22px)] uppercase tracking-[0.15em] text-black transition-opacity hover:opacity-60"
            >
              {link.label}
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}