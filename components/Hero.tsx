import Image from "next/image";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
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
 */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex aspect-[1050/500] w-full flex-col overflow-hidden bg-[#f4f4f2]"
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
        className="absolute bottom-0 left-1/2 top-0 z-10 w-px -translate-x-1/2 bg-[#a4a4a4]/60"
      />

      {/* Nav */}
      <nav className="relative z-20 flex flex-wrap items-center gap-[clamp(20px,1.85vw,44px)] px-[clamp(24px,2.65vw,64px)] pt-[clamp(24px,2.65vw,64px)]">
        {navLinks.map(function (link) {
          return (
            <a
              key={link.label}
              href={link.href}
              className="font-display text-[clamp(13px,0.93vw,22px)] uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-60"
            >
              {link.label}
            </a>
          );
        })}
      </nav>

      {/* Centered name block */}
      <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <h1 className="text-center">
          <span className="block font-['Inria_Serif'] text-[clamp(40px,6.35vw,154px)] uppercase leading-[clamp(48px,7.41vw,180px)] text-black">
            Oshani
            <br />
          </span>
          <span className="block font-['Inria_Serif'] text-[clamp(40px,6.35vw,154px)] uppercase leading-[clamp(48px,7.41vw,180px)] text-neutral-400">
            Wijekoon
          </span>
        </h1>
        <p className="mt-[clamp(12px,1.06vw,26px)] font-joan text-[clamp(15px,1.59vw,38px)] text-black">
          UI/UX &amp; Web Developer
        </p>
      </div>

      {/* Bottom-right links */}
      <div className="relative z-20 flex justify-end gap-[clamp(20px,1.85vw,44px)] px-[clamp(24px,2.65vw,64px)] pb-[clamp(24px,2.65vw,64px)]">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="font-display text-[clamp(13px,0.93vw,22px)] uppercase tracking-[0.15em] text-black transition-opacity hover:opacity-60"
        >
          View Resume ↗
        </a>
        <a
          href="#projects"
          className="font-display text-[clamp(13px,0.93vw,22px)] uppercase tracking-[0.15em] text-black transition-opacity hover:opacity-60"
        >
          See Projects
        </a>
      </div>
    </section>
  );
}