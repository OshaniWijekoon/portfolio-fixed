"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { fadeUp, scaleIn, revealTransition, viewport, staggerDelay } from "@/components/lib/motion";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const bottomLinks = [
  { href: "/resume.pdf", label: "View Resume", external: false, showArrow: true },
  { href: "#projects", label: "See Projects", external: false, showArrow: false },
];

function ArrowUpRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ml-1 inline-block h-[0.85em] w-[0.85em] align-middle"
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

// 3D scroll + mouse animation for the hero image.
// Scroll down: image zooms in and tilts back in 3D (rotateX / rotateY).
// Scroll up: it reverses. Moving the mouse adds a soft 3D parallax tilt.
const MAX_SCALE = 1.25; // extra zoom hides the edges while the image is tilted
const SCROLL_TILT_X = 10; // degrees
const SCROLL_TILT_Y = -8; // degrees
const MOUSE_TILT = 6; // degrees
const PERSPECTIVE = 1200; // px — lower = more dramatic 3D

const spring = { stiffness: 110, damping: 22, mass: 0.4 };

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // scroll-linked values
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1, MAX_SCALE]), spring);
  const scrollX = useTransform(scrollYProgress, [0, 1], [0, SCROLL_TILT_X]);
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, SCROLL_TILT_Y]);

  // mouse-linked values (-0.5 .. 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, spring);
  const smoothMouseY = useSpring(mouseY, spring);

  // combine scroll + mouse into the final 3D rotation
  const rotateX = useSpring(
    useTransform([scrollX, smoothMouseY], (v: number[]) => v[0] - v[1] * MOUSE_TILT * 2),
    spring
  );
  const rotateY = useSpring(
    useTransform([scrollY, smoothMouseX], (v: number[]) => v[0] + v[1] * MOUSE_TILT * 2),
    spring
  );

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="home"
      className="relative flex aspect-[3/4] w-full flex-col overflow-hidden bg-[#f4f4f2] sm:aspect-auto sm:h-screen"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ perspective: PERSPECTIVE }}
      >
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{
            scale,
            rotateX,
            rotateY,
            transformOrigin: "center center",
            transformStyle: "preserve-3d",
          }}
        >
          <Image
            src="/hero.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
      </div>

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

      <div className="flex flex-1 flex-col items-center justify-center gap-y-[clamp(24px,7vw,56px)] sm:contents">
        <div className="relative z-20 flex flex-col items-center justify-center px-6 text-center sm:flex-1">
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
                {link.showArrow ? <ArrowUpRightIcon /> : null}
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}