import Image from "next/image";

const socialLinks = [
  {
    href: "https://wa.me/94775257094",
    label: "WhatsApp",
    icon: "/images/icon-whatsapp.svg",
  },
  {
    href: "https://www.linkedin.com/",
    label: "LinkedIn",
    icon: "/images/icon-linkedin.svg",
  },
  {
    href: "https://github.com/",
    label: "GitHub",
    icon: "/images/icon-github.svg",
  },
];

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
 */
export default function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-[#f7f7f7] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
    >
      <div className="relative px-6 py-16 sm:px-14 sm:py-20 lg:px-0 lg:py-0">
        {/* "get in touch" horizontal rule */}
        <div className="relative mx-auto flex w-full items-center justify-center py-4 lg:absolute lg:left-0 lg:right-0 lg:top-0 lg:z-10 lg:pt-4">
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
        </div>

        <div className="mx-auto grid w-full grid-cols-1 lg:grid-cols-[736fr_776fr]">
          {/* Left column — heading, location, contact details */}
          <div className="relative flex min-h-[480px] flex-col px-2 pb-10 lg:min-h-[clamp(480px,47.6vw,1150px)] lg:px-[clamp(40px,2.5vw,62px)] lg:pb-[clamp(50px,3.3vw,80px)] lg:pt-[clamp(32px,2.1vw,51px)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden opacity-60 grayscale"
            >
              <Image
                src="/images/contact-bg.jpg"
                alt=""
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 49vw, 100vw"
              />
            </div>

            <div className="relative z-10">
              <h2 className="font-display text-[clamp(32px,3.5vw,78px)] uppercase leading-none tracking-[-0.05em] text-black">
                Contact Me
              </h2>
              <p className="mt-6 font-joan text-[clamp(13px,0.93vw,22px)] capitalize tracking-[0.15em] text-[#3e3e3e]">
                based in sri lanka
              </p>
            </div>

            <div className="relative z-10 mt-auto flex flex-col gap-[clamp(12px,0.79vw,19px)] pt-16 lg:pt-0">
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
                      <Image
                        src={link.icon}
                        alt=""
                        width={28}
                        height={28}
                        className="h-full w-full"
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right column — contact form */}
          <div className="flex flex-col justify-center px-2 lg:px-[clamp(40px,2.5vw,62px)] lg:py-[clamp(50px,3.3vw,80px)]">
            <form className="mx-auto flex w-full max-w-[clamp(420px,27.8vw,672px)] flex-col gap-[clamp(32px,2.12vw,51px)]">
              <div className="grid grid-cols-1 gap-[clamp(32px,2.12vw,51px)] sm:grid-cols-2 sm:gap-[clamp(24px,1.59vw,38px)]">
                <label className="flex flex-col gap-[clamp(6px,0.4vw,10px)] text-center sm:text-left">
                  <span className="font-sans text-[clamp(13px,0.93vw,20px)] capitalize tracking-[0.13em] text-[#3e3e3e]">
                    First name
                  </span>
                  <input
                    type="text"
                    name="firstName"
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
              </div>

              <label className="flex flex-col gap-[clamp(6px,0.4vw,10px)] text-center sm:text-left">
                <span className="font-sans text-[clamp(13px,0.93vw,20px)] capitalize tracking-[0.13em] text-[#3e3e3e]">
                  your email
                </span>
                <input
                  type="email"
                  name="email"
                  className="border-b border-[#a4a4a4] bg-transparent pb-1 font-sans text-[clamp(13px,0.79vw,18px)] text-[#3e3e3e] outline-none focus:border-black"
                />
              </label>

              <label className="flex flex-col gap-[clamp(6px,0.4vw,10px)] text-center sm:text-left">
                <span className="font-sans text-[clamp(13px,0.93vw,20px)] capitalize tracking-[0.13em] text-[#3e3e3e]">
                  your message
                </span>
                <textarea
                  name="message"
                  rows={1}
                  className="resize-none border-b border-[#a4a4a4] bg-transparent pb-1 font-sans text-[clamp(13px,0.79vw,18px)] text-[#3e3e3e] outline-none focus:border-black"
                />
              </label>

              <button
                type="submit"
                className="ml-auto flex h-[clamp(56px,3.7vw,90px)] w-[clamp(180px,11.9vw,290px)] items-center justify-center rounded-tl-[clamp(12px,0.79vw,19px)] rounded-br-[clamp(12px,0.79vw,19px)] bg-black font-body text-[clamp(13px,0.79vw,18px)] capitalize tracking-[0.03em] text-white transition-opacity hover:opacity-80"
              >
                send
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer — big "Let's Work Together." headline + horizontal rule
          + copyright credit line underneath. */}
      <div className="flex min-h-[340px] flex-col items-center justify-center gap-[clamp(32px,2.1vw,51px)] bg-black px-6 pb-[clamp(32px,2.1vw,51px)] pt-[clamp(50px,3.3vw,80px)] text-center lg:min-h-[clamp(340px,29.6vw,720px)] lg:pb-[clamp(44px,2.9vw,72px)]">
        <div className="relative">
          <h2 className="font-display text-[clamp(40px,7.2vw,112px)] uppercase leading-[1.1] tracking-[-0.03em] text-white">
            Let&apos;s
            <br />
            Work
            <br />
            Together.
          </h2>
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[33%] h-px w-[92vw] max-w-[1800px] -translate-x-1/2 bg-white/30"
          />
        </div>
        <p className="font-sans text-[clamp(11px,0.73vw,17px)] leading-[clamp(16px,1.06vw,26px)] text-white">
          @2026 Created by Oshani Wijekoon
        </p>
      </div>
    </section>
  );
}