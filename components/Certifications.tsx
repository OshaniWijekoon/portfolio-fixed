"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, fadeIn, scaleIn, revealTransition, viewport, staggerDelay } from "@/components/lib/motion";

type Certification = {
  title: string;
  issuer: string;
  logoSrc: string;
  logoAlt: string;
};

const certifications: Certification[] = [
  {
    title: "Web Design for Beginners",
    issuer: "University of Moratuwa",
    logoSrc: "/UOM.png",
    logoAlt: "University of Moratuwa",
  },
  {
    title: "Front-End Web Development",
    issuer: "University of Moratuwa",
    logoSrc: "/UOM.png",
    logoAlt: "University of Moratuwa",
  },
  {
    title: "Python for Beginners",
    issuer: "University of Moratuwa",
    logoSrc: "/UOM.png",
    logoAlt: "University of Moratuwa",
  },
  {
    title: "Python for Data Science and Machine Learning",
    issuer: "UniAthena",
    logoSrc: "/uniathena.png",
    logoAlt: "UniAthena",
  },
  {
    title: "Data Scientist Course",
    issuer: "Simplilearn",
    logoSrc: "/simplilearn.png",
    logoAlt: "Simplilearn",
  },
  {
    title: "MongoDB Learning",
    issuer: "MongoDB University",
    logoSrc: "/mongodb.png",
    logoAlt: "MongoDB University",
  },
];

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

// Percentage x-positions of the two inner "column tick" vertical lines,
// taken directly from the Figma dev code: left tick at x=356/1407≈25.3%,
// right tick at x=1028/1407≈73.1%.
const LEFT_TICK_X = "25.3%";
const RIGHT_TICK_X = "73.1%";

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="ml-2 inline-block h-[1em] w-[1em] align-middle"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

/**
 * Certifications — its own route (/certifications), linked to from the
 * Skills section's "Certifications" button.
 *
 * Line layout, taken directly from the Figma dev code (1407x1192 canvas):
 * - Far-left / far-right edge verticals, full height.
 * - Center vertical divider, full height.
 * - Two "column tick" verticals at x≈25.3% and x≈73.1% — these run
 *   CONTINUOUSLY for the section's full height (including straight
 *   through the title), sitting behind everything (z-0) so the opaque
 *   black cards mask the portions that overlap them.
 * - Top and bottom full-width horizontal borders.
 * - Two horizontal lines flanking the title, each running from an edge
 *   line to the center divider — i.e. they terminate exactly where the
 *   vertical lines are, so everything visibly connects into one grid,
 *   instead of floating with a flex gap that didn't line up with anything.
 *
 * Positioning note: this section has no fixed height (unlike About/Hero),
 * so anything needing to span the full height uses `inset-y-0` (literal,
 * not a %) — percentages can't resolve against an "auto" height parent.
 */
export default function Certifications() {
  const firstHalf = certifications.slice(0, 2);
  const secondHalf = certifications.slice(2);

  return (
    <section
      id="certifications"
      className="relative w-full overflow-hidden bg-white pb-[clamp(40px,4.3vw,104px)]"
    >
      {/* ===== Vertical lines — all full height, all behind content ===== */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-[clamp(20px,2.15vw,52px)] z-0 hidden w-px bg-[#d9d9d9] sm:block"
      />
      <span
        aria-hidden="true"
        className="absolute inset-y-0 right-[clamp(20px,2.15vw,52px)] z-0 hidden w-px bg-[#d9d9d9] sm:block"
      />
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-1/2 z-0 hidden w-px -translate-x-1/2 bg-[#d9d9d9] sm:block"
      />
      <span
        aria-hidden="true"
        className="absolute inset-y-0 z-0 hidden w-px bg-[#d9d9d9] sm:block"
        style={{ left: LEFT_TICK_X }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-y-0 z-0 hidden w-px bg-[#d9d9d9] sm:block"
        style={{ left: RIGHT_TICK_X }}
      />

      {/* ===== Top border — normal document flow ===== */}
      <div aria-hidden="true" className="relative z-10 hidden h-px w-full bg-[#d9d9d9] sm:block" />

      {/* Nav */}
      <nav className="relative z-20 flex flex-wrap items-center gap-[clamp(16px,1.5vw,36px)] px-[clamp(20px,2.15vw,52px)] pb-[clamp(20px,2.15vw,52px)] pt-[clamp(20px,2.15vw,52px)]">
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

      <CertRow certs={firstHalf} startIndex={0} emptySlots={2} />

      {/* ===== Title, with flanking lines that terminate exactly at the
          edge lines and the center divider ===== */}
      <div className="relative z-20 my-[clamp(26px,3.4vw,82px)] flex items-center">
        <span
          aria-hidden="true"
          className="absolute left-[clamp(20px,2.15vw,52px)] right-1/2 top-1/2 hidden h-px -translate-y-1/2 bg-[#e8e8e8] sm:block"
        />
        <motion.h2
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          transition={revealTransition(0.1)}
          className="relative z-10 mx-auto text-center font-['Inria_Serif'] text-[clamp(34px,4.76vw,104px)] uppercase leading-none text-black"
        >
          Certifications
        </motion.h2>
        <span
          aria-hidden="true"
          className="absolute right-[clamp(20px,2.15vw,52px)] left-1/2 top-1/2 hidden h-px -translate-y-1/2 bg-[#d9d9d9] sm:block"
        />
      </div>

      <CertRow certs={secondHalf} startIndex={firstHalf.length} />

      {/* ===== Bottom border — normal document flow ===== */}
      <div aria-hidden="true" className="relative z-10 mt-[clamp(26px,3.4vw,82px)] hidden h-px w-full bg-[#d9d9d9] sm:block" />

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        transition={revealTransition(0.2)}
        className="relative z-20 mt-[clamp(20px,2.4vw,52px)] flex items-center justify-center gap-1 px-6 text-center font-display text-[clamp(11px,0.7vw,16px)] tracking-[0.15em] text-black sm:mt-[clamp(20px,2.4vw,36px)]"
      >
        <a
          href="https://www.linkedin.com/in/oshani-wijekoon-81227b343"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center transition-opacity hover:opacity-60"
        >
          All Certificates Are Verifiable On My LinkedIn Profile
          <LinkedInIcon />
        </a>
      </motion.p>
    </section>
  );
}

function EmptyCertSlot({ delay }: { delay: number }) {
  return (
    <motion.div
      aria-hidden="true"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      transition={revealTransition(delay)}
      className="relative z-10 h-[clamp(42px,3.8vw,74px)] bg-black"
    />
  );
}

function CertRow({
  certs,
  startIndex,
  emptySlots = 0,
}: {
  certs: Certification[];
  startIndex: number;
  emptySlots?: number;
}) {
  return (
    <div className="relative z-10 grid grid-cols-1 gap-x-[clamp(20px,2.9vw,66px)] gap-y-[clamp(16px,2.1vw,46px)] px-[clamp(20px,2.15vw,52px)] py-[clamp(20px,2.15vw,52px)] sm:grid-cols-2">
      {certs.map(function (cert, index) {
        return (
          <motion.div
            key={cert.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            transition={revealTransition(staggerDelay(startIndex + index, 0.08))}
            className="relative z-10 flex items-center justify-between gap-3 bg-black px-[clamp(14px,1.3vw,26px)] py-[clamp(12px,1.15vw,23px)]"
          >
            <div className="min-w-0">
              <p className="font-display text-[clamp(11px,0.7vw,16px)] tracking-[0.1em] text-white">
                {cert.title}
              </p>
              <p className="mt-1 font-joan text-[clamp(10px,0.64vw,15px)] text-white/70">
                · {cert.issuer}
              </p>
            </div>
            <div className="relative h-[clamp(30px,2.4vw,52px)] w-[clamp(30px,2.4vw,52px)] shrink-0">
              <Image
                src={cert.logoSrc}
                alt={cert.logoAlt}
                fill
                className="object-contain"
                sizes="52px"
              />
            </div>
          </motion.div>
        );
      })}
      {Array.from({ length: emptySlots }).map(function (_, i) {
        return (
          <EmptyCertSlot
            key={"empty-" + i}
            delay={staggerDelay(startIndex + certs.length + i, 0.08)}
          />
        );
      })}
    </div>
  );
}