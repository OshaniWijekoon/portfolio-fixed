"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, revealTransition, viewport, staggerDelay } from "@/components/lib/motion";

const frameImages = [
  "/frame_001.webp",
  "/frame_002.webp",
  "/frame_003.webp",
  "/frame_004.webp",
  "/frame_005.webp",
  "/frame_006.webp",
  "/frame_007.webp",
  "/frame_008.webp",
  "/frame_009.webp",
  "/frame_010.webp",
  "/frame_011.webp",
  "/frame_012.webp",
  "/frame_013.webp",
  "/frame_014.webp",
  "/frame_015.webp",
  "/frame_016.webp",
  "/frame_017.webp",
  "/frame_018.webp",
  "/frame_019.webp",
  "/frame_020.webp",
  "/frame_021.webp",
  "/frame_022.webp",
  "/frame_023.webp",
  "/frame_024.webp",
  "/frame_025.webp",
  "/frame_026.webp",
  "/frame_027.webp",
  "/frame_028.webp",
  "/frame_029.webp",
  "/frame_030.webp",
  "/frame_031.webp",
  "/frame_032.webp",
  "/frame_033.webp",
  "/frame_034.webp",
  "/frame_035.webp",
  "/frame_036.webp",
  "/frame_037.webp",
  "/frame_038.webp",
  "/frame_039.webp",
  "/frame_040.webp",
  "/frame_041.webp",
  "/frame_042.webp",
  "/frame_043.webp",
  "/frame_044.webp",
  "/frame_045.webp",
  "/frame_046.webp",
  "/frame_047.webp",
  "/frame_048.webp",
  "/frame_049.webp",
  "/frame_050.webp",
  "/frame_051.webp",
  "/frame_052.webp",
  "/frame_053.webp",
  "/frame_054.webp",
  "/frame_055.webp",
  "/frame_056.webp",
  "/frame_057.webp",
  "/frame_058.webp",
  "/frame_059.webp",
  "/frame_060.webp",
];

// Slightly slower than the first version (10 -> 13)
const PIXELS_PER_FRAME = 13;

// Frame sharpening (makes the stretched frames look crisper).
// Set SHARPEN to false to turn it off. SHARPEN_AMOUNT: 0.3 = soft, 0.6 = strong.
const SHARPEN = true;
const SHARPEN_AMOUNT = 0.45;
const SHARPEN_KERNEL =
  "0 -" + SHARPEN_AMOUNT + " 0 -" + SHARPEN_AMOUNT + " " + (1 + 4 * SHARPEN_AMOUNT) +
  " -" + SHARPEN_AMOUNT + " 0 -" + SHARPEN_AMOUNT + " 0";

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
  const [baseFolder, setBaseFolder] = useState("");
  const virtualScrollRef = useRef(0);

  useEffect(function () {
    const folders = ["", "/frames", "/images", "/images(frames)"];
    folders.forEach(function (folder) {
      const testImg = new window.Image();
      testImg.onload = function () {
        setBaseFolder(folder);
        for (let i = 1; i <= frameImages.length; i++) {
          const preloadImg = new window.Image();
          preloadImg.src = `${folder}/frame_${String(i).padStart(3, "0")}.webp`;
        }
      };
      testImg.src = `${folder}/frame_001.webp`;
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

  const currentFrameSrc = `${baseFolder}/frame_${String(currentFrame + 1).padStart(3, "0")}.webp`;

  return (
    <section
      id="home"
      className="relative flex aspect-[3/4] w-full flex-col overflow-hidden bg-[#f4f4f2] sm:aspect-auto sm:h-screen"
    >
      <div aria-hidden="true" className="absolute inset-0">
        {SHARPEN ? (
          <svg
            aria-hidden="true"
            width="0"
            height="0"
            className="absolute"
            focusable="false"
          >
            <filter id="hero-sharpen" colorInterpolationFilters="sRGB">
              <feConvolveMatrix
                order="3"
                preserveAlpha="true"
                kernelMatrix={SHARPEN_KERNEL}
              />
            </filter>
          </svg>
        ) : null}
        <Image
          src={currentFrameSrc}
          alt=""
          fill
          priority
          unoptimized
          quality={100}
          className="object-cover object-center"
          style={SHARPEN ? { filter: "url(#hero-sharpen)" } : undefined}
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