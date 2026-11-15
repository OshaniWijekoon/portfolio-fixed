"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useAnimationControls } from "framer-motion";
import { fadeUp, fadeIn, revealTransition, viewport } from "@/components/lib/motion";

const socialLinks = [
  {
    href: "https://wa.me/94775257094",
    label: "WhatsApp",
    icon: "/icon-whatsapp.svg",
  },
  {
    href: "https://www.linkedin.com/in/oshani-wijekoon-81227b343",
    label: "LinkedIn",
    icon: "/icon-linkedin.svg",
  },
  {
    href: "https://github.com/OshaniWijekoon",
    label: "GitHub",
    icon: "/icon-github.svg",
  },
];

// Scroll zoom for the background image only:
// scrolling down zooms the image IN, scrolling up zooms it back OUT.
const MAX_SCALE = 1.15; // 1 = no zoom — raise for a stronger zoom

// Footer headline click animation: "Let's Work Together." does a small, slow
// "pulse" only when you click the words.
const HEADLINE_CLICK_SCALE = 1.05; // how much it grows on click (1 = none)
const HEADLINE_CLICK_DURATION = 1.4; // seconds — raise for slower

/**
 * Contact section — Figma node 181:18. Two-column layout with a
 * horizontal "get in touch" rule, underline-style form fields, and
 * the black footer credit bar with a large "Let's Work Together."
 * headline above the copyright line.
 *
 * Sizing note: same fix applied to About/Projects/Skills — this used to be
 * capped at max-w-[1512px] with fixed px sizes, so anything wider than that
 * stopped growing. The cap is removed (grid uses `fr` units instead of a
 * fixed left column), and every size below is a clamp() scaled off the
 * original 1512px design reference (vw = value / 1512 * 100), floored at
 * the original size and ceilinged well above it.
 *
 * Motion: "get in touch" fades in, the left column content rises up, and
 * form fields stagger in one by one — same shared timing/easing as every
 * other section. The left background image also has a scroll-linked zoom
 * (down = zoom in, up = zoom out). The footer headline only animates when
 * you click it.
 *
 * Form submission: posts to /api/contact (a Next.js API route using
 * Nodemailer) which emails the message to oshaniwijekoon28@gmail.com. See
 * setup notes for the API route — it needs a Gmail App Password in your
 * environment variables to actually send mail.
 */
export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Scroll-linked zoom for the background image
  const bgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: bgRef,
    offset: ["start end", "end start"],
  });
  const rawScale = useTransform(scrollYProgress, [0, 1], [1, MAX_SCALE]);
  const bgScale = useSpring(rawScale, { stiffness: 120, damping: 24, mass: 0.4 });

  // Click animation for the footer headline (small + slow)
  const headlineControls = useAnimationControls();
  function handleHeadlineClick() {
    headlineControls.start({
      scale: [1, HEADLINE_CLICK_SCALE, 1],
      transition: { duration: HEADLINE_CLICK_DURATION, ease: "easeInOut" },
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-[#f7f7f7] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
    >
      <div className="relative px-6 py-16 sm:px-14 sm:py-20 lg:px-0 lg:py-0">
        {/* "get in touch" horizontal rule */}
        <motion.div
          className="relative mx-auto flex w-full items-center justify-center py-4 lg:absolute lg:left-0 lg:right-0 lg:top-0 lg:z-10 lg:pt-4"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={fadeIn}
          transition={revealTransition()}
        >
          <span
            aria-hidden="true"
            className="block h-px min-w-0 flex-1 max-w-[clamp(610px,40.34vw,976px)] border-t border-[#a4a4a4]"
          />
          <span className="font-joan px-[clamp(14px,0.93vw,22px)] text-[clamp(12px,0.8vw,18px)] uppercase tracking-[0.2em] text-[#3e3e3e]">
            get in touch
          </span>
          <span
            aria-hidden="true"
            className="block h-px min-w-0 flex-1 max-w-[clamp(680px,44.97vw,1088px)] border-t border-[#a4a4a4]"
          />
        </motion.div>

        <div className="mx-auto grid w-full grid-cols-1 lg:grid-cols-[736fr_776fr]">
          {/* Left column — heading, location, contact details */}
          <div className="relative flex min-h-[480px] flex-col px-2 pb-10 lg:min-h-[clamp(480px,47.6vw,1150px)] lg:px-[clamp(40px,2.5vw,62px)] lg:pb-[clamp(50px,3.3vw,80px)] lg:pt-[clamp(32px,2.1vw,51px)]">
            <motion.div
              ref={bgRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden opacity-60 grayscale"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.6 }}
              viewport={viewport}
              transition={revealTransition()}
            >
              {/* Zoom layer — only the image scales, the frame stays put */}
              <motion.div
                className="absolute inset-0 will-change-transform"
                style={{ scale: bgScale, transformOrigin: "center center" }}
              >
                <Image
                  src="/contact-bg.jpg"
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 49vw, 100vw"
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="relative z-10"
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={fadeUp}
              transition={revealTransition(0.1)}
            >
              <h2 className="font-display text-[clamp(25px,3.77vw,90px)] uppercase leading-none tracking-[-0.05em] text-black">
                Contact Me
              </h2>
              <p className="mt-6 font-joan text-[clamp(13px,0.93vw,22px)] capitalize tracking-[0.15em] text-[#3e3e3e]">
                based in sri lanka
              </p>
            </motion.div>

            <motion.div
              className="relative z-10 mt-auto flex flex-col gap-[clamp(12px,0.79vw,19px)] pt-16 lg:pt-0"
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={fadeUp}
              transition={revealTransition(0.2)}
            >
              <a
                href="mailto:oshaniwijekoon28@gmail.com"
                className="font-joan text-[clamp(14px,1.06vw,26px)] lowercase tracking-[0.13em] text-[#3e3e3e] transition-opacity hover:opacity-70"
              >
                oshaniwijekoon28@gmail.com
              </a>
              <a
                href="tel:+94775257094"
                className="font-joan text-[clamp(14px,1.06vw,26px)] lowercase tracking-[0.13em] text-[#3e3e3e] transition-opacity hover:opacity-70"
              >
                +94 77 5257 094
              </a>
              <div className="mt-4 flex items-center gap-[clamp(20px,1.32vw,32px)]">
                {socialLinks.map(function (link) {
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="block h-[clamp(18px,1.19vw,28px)] w-[clamp(18px,1.19vw,28px)] transition-opacity hover:opacity-70"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={link.icon}
                        alt=""
                        className="h-full w-full"
                      />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right column — contact form */}
          <div className="flex flex-col justify-center px-2 lg:px-[clamp(40px,2.5vw,62px)] lg:py-[clamp(50px,3.3vw,80px)]">
            <motion.form
              onSubmit={handleSubmit}
              className="mx-auto flex w-full max-w-[clamp(420px,27.8vw,672px)] flex-col gap-[clamp(32px,2.12vw,51px)]"
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
            >
              <motion.div
                className="grid grid-cols-1 gap-[clamp(32px,2.12vw,51px)] sm:grid-cols-2 sm:gap-[clamp(24px,1.59vw,38px)]"
                variants={fadeUp}
                transition={revealTransition()}
              >
                <label className="flex flex-col gap-[clamp(6px,0.4vw,10px)] text-center sm:text-left">
                  <span className="font-sans text-[clamp(13px,0.93vw,20px)] capitalize tracking-[0.13em] text-[#3e3e3e]">
                    First name
                  </span>
                  <input
                    type="text"
                    name="firstName"
                    required
                    className="border-b border-[#a4a4a4] bg-transparent pb-1 font-sans text-[clamp(13px,0.79vw,18px)] text-[#3e3e3e] outline-none focus:border-black"
                  />
                </label>
                <label className="flex flex-col gap-[clamp(6px,0.4vw,10px)] text-center sm:text-left">
                  <span className="font-sans text-[clamp(13px,0.93vw,20px)] capitalize tracking-[0.13em] text-[#3e3e3e]">
                    last name
                  </span>
                  <input
                    type="text"
                    name="lastName"
                    className="border-b border-[#a4a4a4] bg-transparent pb-1 font-sans text-[clamp(13px,0.79vw,18px)] text-[#3e3e3e] outline-none focus:border-black"
                  />
                </label>
              </motion.div>

              <motion.label
                className="flex flex-col gap-[clamp(6px,0.4vw,10px)] text-center sm:text-left"
                variants={fadeUp}
                transition={revealTransition()}
              >
                <span className="font-sans text-[clamp(13px,0.93vw,20px)] capitalize tracking-[0.13em] text-[#3e3e3e]">
                  your email
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  className="border-b border-[#a4a4a4] bg-transparent pb-1 font-sans text-[clamp(13px,0.79vw,18px)] text-[#3e3e3e] outline-none focus:border-black"
                />
              </motion.label>

              <motion.label
                className="flex flex-col gap-[clamp(6px,0.4vw,10px)] text-center sm:text-left"
                variants={fadeUp}
                transition={revealTransition()}
              >
                <span className="font-sans text-[clamp(13px,0.93vw,20px)] capitalize tracking-[0.13em] text-[#3e3e3e]">
                  your message
                </span>
                <textarea
                  name="message"
                  rows={1}
                  required
                  className="resize-none border-b border-[#a4a4a4] bg-transparent pb-1 font-sans text-[clamp(13px,0.79vw,18px)] text-[#3e3e3e] outline-none focus:border-black"
                />
              </motion.label>

              <motion.button
                type="submit"
                disabled={status === "sending"}
                className="ml-auto flex h-[clamp(56px,3.7vw,90px)] w-[clamp(180px,11.9vw,290px)] items-center justify-center rounded-tl-[clamp(12px,0.79vw,19px)] rounded-br-[clamp(12px,0.79vw,19px)] bg-black font-body text-[clamp(13px,0.79vw,18px)] capitalize tracking-[0.03em] text-white transition-opacity hover:opacity-80 disabled:opacity-50"
                variants={fadeUp}
                transition={revealTransition()}
                whileTap={{ scale: 0.96 }}
              >
                {status === "sending" ? "Sending..." : "send"}
              </motion.button>

              {status === "success" ? (
                <p className="text-right font-sans text-[clamp(12px,0.85vw,16px)] text-green-700">
                  Message sent — thank you! I&apos;ll get back to you soon.
                </p>
              ) : null}
              {status === "error" ? (
                <p className="text-right font-sans text-[clamp(12px,0.85vw,16px)] text-red-600">
                  Something went wrong. Please try again, or email me directly.
                </p>
              ) : null}
            </motion.form>
          </div>
        </div>
      </div>

      {/* Footer — big "Let's Work Together." headline + horizontal rule
          + copyright credit line underneath. */}
      <div className="flex min-h-[340px] flex-col items-center justify-center gap-[clamp(32px,2.1vw,51px)] bg-black px-6 pb-[clamp(32px,2.1vw,51px)] pt-[clamp(50px,3.3vw,80px)] text-center lg:min-h-[clamp(340px,29.6vw,720px)] lg:pb-[clamp(44px,2.9vw,72px)]">
        <div className="relative">
          <div>
            <motion.h2
              className="cursor-pointer select-none font-display text-[clamp(40px,7.2vw,112px)] uppercase leading-[1.1] tracking-[-0.03em] text-white"
              animate={headlineControls}
              onClick={handleHeadlineClick}
            >
              Let&apos;s
              <br />
              Work
              <br />
              Together.
            </motion.h2>
          </div>
          <motion.span
            aria-hidden="true"
            className="absolute left-1/2 top-[33%] h-px w-[92vw] max-w-[1800px] bg-white/30"
            initial={{ scaleX: 0, opacity: 0, x: "-50%" }}
            whileInView={{ scaleX: 1, opacity: 1, x: "-50%" }}
            viewport={viewport}
            transition={revealTransition(0.3)}
          />
        </div>
        <motion.p
          className="font-sans text-[clamp(11px,0.73vw,17px)] leading-[clamp(16px,1.06vw,26px)] text-white"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={fadeUp}
          transition={revealTransition(0.35)}
        >
          @2026 Created by Oshani Wijekoon
        </motion.p>
      </div>
    </section>
  );
}