import Image from "next/image";

/**
 * "World full of movement, focus on perspective" intro section.
 * Figma node 106:79 ("Frame 44").
 *
 * The vertical hairline and the photo are centered on the viewport
 * (`left-1/2 -translate-x-1/2`) independently of the text column, so it
 * lines up exactly with the SectionDivider above it. The text is
 * positioned relative to that same center line (`left-[calc(50%+155px)]`),
 * matching the Figma spec instead of being centered as a flex group.
 */
export default function Perspective() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-black"
    >
      {/* ---------- Desktop / tablet: pixel-accurate Figma layout ---------- */}
      <div className="relative hidden h-[759px] w-full sm:block">
        {/* full-height vertical hairline, centered on the viewport */}
        <span className="pointer-events-none absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 border-l border-r border-white" />

        {/* portrait photo, centered on the viewport, painted over the line */}
        <div className="absolute left-1/2 top-1/2 z-10 h-[339px] w-[238px] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
          <Image
            src="/images/movement-section.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {/* heading */}
        <div className="absolute left-[calc(50%+155px)] top-[222px] w-[340px] -translate-y-1/2">
          <p className="font-display text-[20px] font-light leading-[23px] text-white">
            World full of movement, focus on perspective
          </p>
        </div>

        {/* supporting paragraph */}
        <div className="absolute left-[calc(50%+155px)] top-[485px] w-[340px] -translate-y-1/2">
          <p className="font-sans text-[16px] leading-[26.4px] tracking-[0.35px] text-[#cccccc]">
            As a UI/UX designer, I create digital experiences that challenge
            assumptions, simplify complexity, and leave a lasting impression
          </p>
        </div>
      </div>

      {/* ---------- Mobile: simple stacked layout ---------- */}
      <div className="flex flex-col items-center gap-8 px-6 py-16 text-center sm:hidden">
        <div className="relative h-[280px] w-[196px] overflow-hidden">
          <Image
            src="/images/movement-section.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <p className="font-display text-[20px] font-light leading-[23px] text-white">
          World full of movement, focus on perspective
        </p>
        <p className="max-w-[340px] font-sans text-[16px] leading-[26.4px] tracking-[0.35px] text-[#cccccc]">
          As a UI/UX designer, I create digital experiences that challenge
          assumptions, simplify complexity, and leave a lasting impression
        </p>
      </div>
    </section>
  );
}