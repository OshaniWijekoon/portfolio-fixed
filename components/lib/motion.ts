// Shared scroll-reveal motion config, used across every section
// (Hero, About, Projects, Skills, Contact) so the animation feels like one
// consistent system rather than a different style per page.
//
// Usage:
//   import { motion } from "framer-motion";
//   import { fadeUp, revealTransition, viewport } from "@/lib/motion";
//
//   <motion.div
//     variants={fadeUp}
//     initial="hidden"
//     whileInView="show"
//     viewport={viewport}
//     transition={revealTransition(0.1)}   // 0.1s stagger delay, optional
//     className="..."
//   >

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1 },
};

// Same duration + easing curve everywhere — this consistency is what makes
// the motion read as "one design system" rather than mismatched animations.
export function revealTransition(delay = 0) {
  return {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1] as const, // soft "posh" ease-out, no bounce
    delay,
  };
}

// Trigger once, a bit before the element is fully in view, so it doesn't
// feel late on fast scrolls.
export const viewport = { once: true, amount: 0.25 } as const;

// Helper for evenly-staggered lists/grids (project cards, skill cards,
// stat cards, form fields, focus areas, milestones).
export function staggerDelay(index: number, step = 0.1, base = 0) {
  return base + index * step;
}