"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, fadeIn, revealTransition, viewport, staggerDelay } from "@/components/lib/motion";

// Same nav pattern as the other case-study pages — this is its own route,
// so links point back to the homepage's anchored sections.
const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

// 12 screenshots, uniform narrow phone-mockup aspect ratio (~164/338 from
// the Figma dev code). The last one gets rounded corners, matching the
// one image in the source design that had rounded-[20px].
const screens = Array.from({ length: 12 }, function (_, i) {
  return {
    src: `/clothing-app/${i + 1}.jpg`,
    rounded: i === 11,
  };
});

/**
 * Mobile Clothing Store App case-study page — its own route (e.g.
 * /mobile-clothing-store-app), linked to from the "Mobile Application
 * UI/UX Design." project card on the Projects section.
 *
 * Layout, from the Figma dev code:
 * - Nav + centered underlined title + centered two-paragraph intro.
 * - Below that: a 2-column grid of phone-mockup screenshots on the left,
 *   and a `sticky` info panel on the right (tech stack, a "How I Built
 *   the UI" write-up box, and a black CTA box linking to the LinkedIn
 *   post) — same sticky-panel pattern as the Torvana case study, since
 *   the panel here is also far shorter than the image column.
 *
 * Mobile: the two-column body stacks to a single column (images above,
 * panel below, sticky disabled) below the `lg` breakpoint.
 */
export default function MobileClothingStoreCaseStudy() {
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
        className="mt-[clamp(16px,2vw,48px)] px-6 text-center font-['Inria_Serif'] text-[clamp(36px,5.5vw,104px)] capitalize leading-[1.05] text-black underline decoration-1 underline-offset-8"
      >
        Mobile Clothing Store App
      </motion.h1>

      {/* Intro paragraph */}
      <motion.p
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={fadeUp}
        transition={revealTransition(0.2)}
        className="mx-auto mt-[clamp(20px,2.5vw,48px)] max-w-[1000px] px-6 text-center font-sans text-[clamp(14px,1.05vw,18px)] capitalize leading-[1.8] tracking-wider text-zinc-600"
      >
        My first UI/UX project, built for the Mobile Application Development
        module (Year 2, Sem 2). Designed a modern, minimal e-commerce mobile
        app for a clothing store, focused on making the shopping experience
        feel effortless and visually cohesive.
        <br />
        Covered core app screens including onboarding, product browsing,
        product detail, cart, and checkout with consistent typography, a
        clean colour palette, and intuitive bottom navigation throughout.
      </motion.p>

      {/* Two-column body */}
      <div className="mt-[clamp(32px,4vw,80px)] flex flex-col gap-[clamp(24px,2.5vw,48px)] px-[clamp(20px,2.15vw,52px)] pb-[clamp(48px,5vw,120px)] lg:flex-row lg:items-start">
        {/* Left — 2-column grid of phone-mockup screenshots */}
        <div className="grid flex-1 grid-cols-2 gap-[clamp(10px,1.2vw,24px)] bg-[#f9f9f9] p-[clamp(12px,1.2vw,24px)]">
          {screens.map(function (screen, index) {
            return (
              <motion.div
                key={screen.src}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={fadeIn}
                transition={revealTransition(staggerDelay(index, 0.05))}
                className={
                  "relative w-full overflow-hidden " +
                  (screen.rounded ? "rounded-[20px]" : "")
                }
                style={{ aspectRatio: 164 / 338 }}
              >
                <Image
                  src={screen.src}
                  alt={`Mobile clothing store app screen ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 22vw, 45vw"
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
          className="flex-1 bg-[#f9f9f9] p-[clamp(16px,1.6vw,32px)] lg:sticky lg:top-[clamp(20px,2vw,48px)]"
        >
          <h2 className="font-['Joan'] text-[clamp(20px,1.6vw,32px)] capitalize leading-tight tracking-[0.1em] text-neutral-700 underline">
            Tech Stack &amp; Tools:
          </h2>
          <p className="mt-[clamp(12px,1.2vw,24px)] font-['Joan'] text-[clamp(18px,1.4vw,28px)] capitalize leading-tight tracking-[0.1em] text-neutral-700">
            Figma
          </p>
          <p className="mt-[clamp(10px,1vw,20px)] font-['Joan'] text-[clamp(13px,1vw,18px)] capitalize leading-[1.6] tracking-wider text-neutral-700">
            Wireframing, UI design, and prototyping. Used Auto Layout for
            responsive mobile frames, a self-built component library
            (buttons, cards, nav bars, input fields), and a defined colour
            and type system to keep every screen visually consistent.
          </p>

          <div className="mt-[clamp(20px,2vw,40px)] bg-neutral-100 p-[clamp(16px,1.6vw,32px)] outline outline-1 outline-offset-[-1px] outline-gray-200">
            <h3 className="font-['Joan'] text-[clamp(18px,1.4vw,28px)] capitalize leading-tight tracking-wider text-neutral-700 underline">
              How I Built The UI
            </h3>
            <p className="mt-[clamp(12px,1.2vw,24px)] font-['Joan'] text-[clamp(13px,1vw,18px)] capitalize leading-[1.6] tracking-wider text-zinc-600">
              I started by sketching the core user flow, from landing to
              checkout, to understand what screens were needed before opening
              Figma. I then established the design foundations first: colour
              palette, typography scale, and spacing rules. From there I
              built reusable components and assembled each screen using
              those building blocks, ensuring nothing felt one-off or
              inconsistent.
              <br />
              <br />
              The result is an interface where every screen feels like it
              belongs to the same product.
              <br />
              This project marked the start of my UI/UX journey and taught
              me that design isn&apos;t just about aesthetics — it&apos;s
              about how every decision shapes the user&apos;s experience.
            </p>
          </div>

          <a
            href="https://www.linkedin.com/posts/oshani-wijekoon-81227b343_uiux-uidesign-figma-activity-7367088226760605696--Vph"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-[clamp(20px,2vw,40px)] block bg-black p-[clamp(16px,1.6vw,32px)] transition-opacity hover:opacity-90"
          >
            <p className="font-sans text-[clamp(13px,1vw,20px)] capitalize leading-[1.6] tracking-[0.15em] text-white">
              Check out :
            </p>
            <p className="mt-1 break-words font-sans text-[clamp(11px,0.85vw,16px)] capitalize leading-[1.6] tracking-[0.1em] text-white underline">
              https://www.linkedin.com/posts/oshani-wijekoon-81227b343_uiux-uidesign-figma-activity-7367088226760605696--Vph
            </p>
          </a>
        </motion.aside>
      </div>
    </section>
  );
}