"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, revealTransition, viewport, staggerDelay } from "@/components/lib/motion";

const frameImages = [
  "/frames/frame_001.jpg",
  "/frames/frame_002.jpg",
  "/frames/frame_003.jpg",
  "/frames/frame_004.jpg",
  "/frames/frame_005.jpg",
  "/frames/frame_006.jpg",
  "/frames/frame_007.jpg",
  "/frames/frame_008.jpg",
  "/frames/frame_009.jpg",
  "/frames/frame_010.jpg",
  "/frames/frame_011.jpg",
  "/frames/frame_012.jpg",
  "/frames/frame_013.jpg",
  "/frames/frame_014.jpg",
  "/frames/frame_015.jpg",
  "/frames/frame_016.jpg",
  "/frames/frame_017.jpg",
  "/frames/frame_018.jpg",
  "/frames/frame_019.jpg",
  "/frames/frame_020.jpg",
  "/frames/frame_021.jpg",
  "/frames/frame_022.jpg",
  "/frames/frame_023.jpg",
  "/frames/frame_024.jpg",
  "/frames/frame_025.jpg",
  "/frames/frame_026.jpg",
  "/frames/frame_027.jpg",
  "/frames/frame_028.jpg",
  "/frames/frame_029.jpg",
  "/frames/frame_030.jpg",
  "/frames/frame_031.jpg",
  "/frames/frame_032.jpg",
  "/frames/frame_033.jpg",
  "/frames/frame_034.jpg",
  "/frames/frame_035.jpg",
  "/frames/frame_036.jpg",
  "/frames/frame_037.jpg",
  "/frames/frame_038.jpg",
  "/frames/frame_039.jpg",
  "/frames/frame_040.jpg",
  "/frames/frame_041.jpg",
  "/frames/frame_042.jpg",
  "/frames/frame_043.jpg",
  "/frames/frame_044.jpg",
  "/frames/frame_045.jpg",
  "/frames/frame_046.jpg",
  "/frames/frame_047.jpg",
  "/frames/frame_048.jpg",
  "/frames/frame_049.jpg",
  "/frames/frame_050.jpg",
  "/frames/frame_051.jpg",
  "/frames/frame_052.jpg",
  "/frames/frame_053.jpg",
  "/frames/frame_054.jpg",
  "/frames/frame_055.jpg",
  "/frames/frame_056.jpg",
  "/frames/frame_057.jpg",
  "/frames/frame_058.jpg",
  "/frames/frame_059.jpg",
  "/frames/frame_060.jpg",
];

// Slightly slower than the first version (10 -> 13)
const PIXELS_PER_FRAME = 13;

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

export default function Hero() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [baseFolder, setBaseFolder] = useState("/frames");
  const virtualScrollRef = useRef(0);

  useEffect(function () {
    const folders = ["/frames", "/images", "/images(frames)", ""];
    folders.forEach(function (folder) {
      const testImg = new window.Image();
      testImg.onload = function () {
        setBaseFolder(folder);
        for (let i = 1; i <= 60; i++) {
          const preloadImg = new window.Image();
          preloadImg.src = `${folder}/frame_${String(i).padStart(3, "0")}.jpg`;
        }
      };
      testImg.src = `${folder}/frame_001.jpg`;
    });

    function updateFromScroll() {
      const scrollTop = window.scrollY;
      virtualScrollRef.current = scrollTop;
      const frameIndex =
        ((Math.floor(scrollTop / PIXELS_PER_FRAME) % frameImages.length) +
          frameImages.length) %
        frameImages.length;
      setCurrentFrame(frameIndex);
    }

    function handleWheel(e: WheelEvent) {
      virtualScrollRef.current = Math.max(
        0,
        virtualScrollRef.current + e.deltaY * 0.45
      );
      const frameIndex =
        ((Math.floor(virtualScrollRef.current / PIXELS_PER_FRAME) %
          frameImages.length) +
          frameImages.length) %
        frameImages.length;
      setCurrentFrame(frameIndex);
    }

    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    updateFromScroll();

    return function () {
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const currentFrameSrc = `${baseFolder}/frame_${String(currentFrame + 1).padStart(3, "0")}.jpg`;

  return (
    <section
      id="home"
      className="relative flex aspect-[3/4] w-full flex-col overflow-hidden bg-[#f4f4f2] sm:aspect-auto sm:h-screen"
    >
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src={currentFrameSrc}
          alt=""
          fill
          priority
          unoptimized
          className="object-cover object-center"
          sizes="100vw"
        />
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