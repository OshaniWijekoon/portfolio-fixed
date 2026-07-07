import Image from "next/image";

type SkillCard = {
  title: string;
  lowercaseTitle?: boolean;
  height: string;
  items: string[];
  bracketCorners?: boolean;
};

const skillCards: SkillCard[] = [
  {
    title: "frontend",
    height: "h-[clamp(224px,15.41vw,358px)]",
    bracketCorners: true,
    items: [
      "HTML,CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind Css",
      "Angular",
      "Vue.js",
    ],
  },
  {
    title: "backend",
    height: "h-[clamp(132px,9.08vw,211px)]",
    items: ["Express", "Spring Boot", "Node.js", "Django"],
  },
  {
    title: "design",
    height: "h-[clamp(132px,9.08vw,211px)]",
    items: ["Figma", "Canva", "Prototyping"],
  },
  {
    title: "tools",
    height: "h-[clamp(131px,9.01vw,210px)]",
    items: ["GitHub", "Git", "AWS", "VS Code"],
  },
];

const stats = [
  { value: "15+", label: "skills" },
  { value: "5+", label: "projects" },
  { value: "3rd", label: "year" },
];

function CornerBrackets() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[3px] top-[3px] h-[10px] w-[10px] border-l border-t border-black"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[4px] top-[4px] h-[10px] w-[10px] border-r border-t border-black"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[4px] left-[3px] h-[10px] w-[10px] border-b border-l border-black"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[4px] right-[4px] h-[10px] w-[10px] border-b border-r border-black"
      />
    </>
  );
}

function SkillCardBlock(props: {
  card: SkillCard;
  className?: string;
}) {
  const card = props.card;
  const extraClass = props.className ?? "border border-[#d9d9d9]";
  const titleClass = card.lowercaseTitle
    ? "inline-block border-b border-black pb-1 font-body text-[clamp(18px,1.24vw,29px)] lowercase tracking-[0.15em] text-black"
    : "inline-block border-b border-black pb-1 font-body text-[clamp(18px,1.24vw,29px)] tracking-[0.15em] text-black";

  return (
    <div
      className={
        "relative px-[clamp(20px,1.38vw,32px)] py-[clamp(24px,1.65vw,38px)] " +
        card.height +
        " " +
        extraClass
      }
    >
      {card.bracketCorners ? <CornerBrackets /> : null}
      <h3 className={titleClass}>{card.title}</h3>
      <ul className="mt-[clamp(16px,1.1vw,26px)] grid grid-cols-2 gap-x-[clamp(16px,1.1vw,26px)] font-sans text-[clamp(12px,0.83vw,20px)] leading-[clamp(27px,1.86vw,43px)] tracking-[0.22em] text-[#3e3e3e]">
        {card.items.map(function (item) {
          return (
            <li key={item} className="list-disc marker:text-[#3e3e3e]">
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const statFrontRotations = ["-rotate-2", "rotate-1", "-rotate-1"];
const statBackRotations = ["rotate-2", "-rotate-1", "rotate-2"];

function StatCard(props: { value: string; label: string; index: number }) {
  const frontRotate = statFrontRotations[props.index % statFrontRotations.length];
  const backRotate = statBackRotations[props.index % statBackRotations.length];

  return (
    <div className="relative flex flex-1 items-center justify-center py-[clamp(40px,2.75vw,64px)]">
      <div className="relative h-[clamp(98px,6.74vw,157px)] w-[clamp(105px,7.22vw,168px)]">
        {/* back frame — a second plain sheet peeking out behind the front card */}
        <span
          aria-hidden="true"
          className={
            "absolute inset-0 bg-white shadow-[0_4px_10px_rgba(0,0,0,0.2)] " +
            backRotate
          }
        />
        {/* front frame */}
        <div
          className={
            "absolute inset-0 flex flex-col items-center justify-center bg-white text-center shadow-[0_6px_16px_rgba(0,0,0,0.25)] " +
            frontRotate
          }
        >
          {/* folded top-right corner */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 h-[14px] w-[14px]"
            style={{
              background:
                "linear-gradient(135deg, transparent 50%, #d4d4d4 50%)",
            }}
          />
          <span className="font-joan text-[clamp(40px,2.75vw,64px)] uppercase leading-none tracking-[-0.08em] text-black">
            {props.value}
          </span>
          <span className="mt-1 font-joan text-[clamp(18px,1.24vw,29px)] capitalize tracking-[0.19em] text-black">
            {props.label}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Skills & Certifications — Figma frame 106:74.
 * Three-column editorial grid with shared vertical hairlines (#D9D9D9)
 * and the black stats panel with inner vertical (#6B6B6B) and horizontal
 * (#5D5D5D) rules.
 *
 * Sizing note: the desktop grid used to be capped at max-w-[1454px] with
 * fixed px sizes throughout, so on any screen wider than that it stopped
 * growing — same issue fixed on the About/Projects sections. The cap is
 * removed, grid columns use `fr` units so they scale with the container,
 * and every fixed size below is a clamp() scaled off the original 1454px
 * design reference (vw = value / 1454 * 100), floored at the original size
 * and ceilinged well above it so it keeps growing on wide screens.
 */
export default function Skills() {
  return (
    <section id="skills" className="relative w-full bg-[#f0f0ee]">
      {/* Mobile layout — unchanged, this is a fixed small-viewport layout
          shown only below the sm breakpoint. */}
      <div className="px-6 py-16 sm:hidden">
        <div className="bg-black px-4 py-5 text-center">
          <p
            className="text-[20px] uppercase leading-[1.25] tracking-[-1.5px] text-white"
            style={{ fontFamily: '"Times New Roman", serif' }}
          >
            design with purpose, building with precision
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-4">
          {skillCards.map(function (card) {
            return <SkillCardBlock key={card.title} card={card} />;
          })}
          <div className="border border-[#d9d9d9] px-5 py-6">
            <h3 className="inline-block border-b border-black pb-1 font-body text-[24px] lowercase tracking-[3.5px] text-black">
              Mobile Development
            </h3>
            <ul className="mt-3 list-disc pl-6 font-sans text-[16px] leading-[27px] tracking-[3.5px] text-[#3e3e3e]">
              <li>Kotlin</li>
            </ul>
            <h3 className="mt-6 inline-block border-b border-black pb-1 font-body text-[24px] tracking-[3.5px] text-black">
              database
            </h3>
            <ul className="mt-3 list-disc pl-6 font-sans text-[16px] leading-[27px] tracking-[3.5px] text-[#3e3e3e]">
              <li>MongoDB</li>
              <li>MySQL</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border border-[#d9d9d9] px-4 py-10 text-center">
          <h2 className="font-display text-[36px] uppercase leading-[1.1] tracking-[-2px] text-black">
            Skills &amp;
            <br />
            Certifications
          </h2>
        </div>
        <div className="relative mt-4 h-[320px] w-full overflow-hidden">
          <Image
            src="/images/skills-hand.jpg"
            alt=""
            fill
            className="object-cover object-center"
          />
        </div>
        <a
          href="#certifications"
          className="mt-6 flex h-[73px] w-[226px] items-center justify-center rounded-tl-[15px] rounded-br-[15px] bg-black font-body text-[16px] capitalize tracking-[0.5px] text-white"
        >
          Certifications
        </a>
        <div className="relative mt-4 border border-[#d9d9d9] bg-black">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[34px] left-[40px] top-[34px] w-px bg-[#6b6b6b]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[34px] right-[43px] top-[34px] w-px bg-[#6b6b6b]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-[34px] h-px border-t border-[#5d5d5d]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[34px] left-0 right-0 h-px border-t border-[#5d5d5d]"
          />
          {stats.map(function (stat, index) {
            return (
              <StatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                index={index}
              />
            );
          })}
        </div>
      </div>

      {/* Desktop: Figma grid — no more max-w cap; columns use fr units and
          every size is a fluid clamp() so it keeps scaling on wide screens. */}
      <div className="relative mx-auto hidden w-full px-[clamp(55px,3.78vw,88px)] pb-20 pt-10 sm:block">
        <div className="relative grid grid-cols-[82fr_186fr_82fr]">
          {/* Black banner spanning all columns */}
          <div className="pointer-events-none absolute left-0 right-0 top-[clamp(47px,3.23vw,75px)] z-20 flex h-[clamp(86px,5.92vw,138px)] items-center justify-center bg-black px-[clamp(24px,1.65vw,38px)]">
            <p
              className="text-center text-[clamp(32px,2.2vw,51px)] uppercase leading-[clamp(40px,2.75vw,64px)] tracking-[-0.11em] text-[#fffefe]"
              style={{ fontFamily: '"Times New Roman", serif' }}
            >
              design with purpose, building with precision
            </p>
          </div>

          {/* ── Column 1: skill categories ── */}
          <div className="flex flex-col border-l border-[#d9d9d9]">
            <div className="h-[clamp(250px,17.19vw,400px)] border-r border-t border-[#d9d9d9]" />
            {skillCards.map(function (card) {
              return (
                <SkillCardBlock
                  key={card.title}
                  card={card}
                  className="border-r border-t border-[#d9d9d9]"
                />
              );
            })}
            <div className="h-[clamp(224px,15.41vw,358px)] border border-[#d9d9d9] px-[clamp(20px,1.38vw,32px)] py-[clamp(24px,1.65vw,38px)]">
              <h3 className="inline-block border-b border-black pb-1 font-body text-[clamp(18px,1.24vw,29px)] lowercase tracking-[0.15em] text-black">
                Mobile Development
              </h3>
              <ul className="mt-3 list-disc pl-6 font-sans text-[clamp(12px,0.83vw,20px)] leading-[clamp(27px,1.86vw,43px)] tracking-[0.22em] text-[#3e3e3e]">
                <li>Kotlin</li>
              </ul>
              <h3 className="mt-[clamp(32px,2.2vw,51px)] inline-block border-b border-black pb-1 font-body text-[clamp(18px,1.24vw,29px)] tracking-[0.15em] text-black">
                database
              </h3>
              <ul className="mt-3 list-disc pl-6 font-sans text-[clamp(12px,0.83vw,20px)] leading-[clamp(27px,1.86vw,43px)] tracking-[0.22em] text-[#3e3e3e]">
                <li>MongoDB</li>
                <li>MySQL</li>
              </ul>
            </div>
          </div>

          {/* ── Column 2: title + image + bottom cell ── */}
          <div className="flex flex-col border-[#d9d9d9]">
            <div className="h-[clamp(132px,9.08vw,211px)] border-r border-t border-[#d9d9d9]" />
            <div className="flex h-[clamp(140px,9.6vw,224px)] items-center justify-center border border-[#d9d9d9] px-[clamp(24px,1.65vw,38px)] text-center">
              <h2 className="font-display text-[clamp(46px,3.2vw,74px)] uppercase leading-[clamp(52px,3.55vw,83px)] tracking-[-0.05em] text-black">
                Skills &amp;
                <br />
                Certifications
              </h2>
            </div>
            <div className="relative min-h-[clamp(513px,35.28vw,821px)] flex-1 border border-[#d9d9d9]">
              <Image
                src="/images/skills-hand.jpg"
                alt=""
                fill
                className="object-cover object-center"
                sizes="(min-width: 640px) 51vw, 744px"
              />
            </div>
          </div>

          {/* ── Column 3: certifications + stats ── */}
          <div className="flex flex-col border-r border-[#d9d9d9]">
            <div className="h-[clamp(249px,17.13vw,398px)] border border-[#d9d9d9]" />
            <div className="flex h-[clamp(224px,15.41vw,358px)] items-center justify-center border-x border-b border-[#d9d9d9]">
              <a
                href="#certifications"
                className="flex h-[clamp(73px,5.02vw,117px)] w-[clamp(226px,15.54vw,362px)] items-center justify-center rounded-tl-[clamp(15px,1.03vw,24px)] rounded-br-[clamp(15px,1.03vw,24px)] bg-black font-body text-[clamp(12px,0.83vw,20px)] capitalize tracking-[0.03em] text-white transition-opacity hover:opacity-80"
              >
                Certifications
              </a>
            </div>
            <div className="relative flex min-h-[clamp(616px,42.37vw,986px)] flex-1 flex-col border border-[#d9d9d9] bg-black">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[clamp(34px,2.34vw,54px)] left-[clamp(40px,2.75vw,64px)] top-[clamp(34px,2.34vw,54px)] w-px bg-[#6b6b6b]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[clamp(34px,2.34vw,54px)] right-[clamp(43px,2.96vw,69px)] top-[clamp(34px,2.34vw,54px)] w-px bg-[#6b6b6b]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 right-0 top-[clamp(34px,2.34vw,54px)] h-px border-t border-[#5d5d5d]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[clamp(34px,2.34vw,54px)] left-0 right-0 h-px border-t border-[#5d5d5d]"
              />
              {stats.map(function (stat, index) {
                return (
                  <StatCard
                    key={stat.label}
                    value={stat.value}
                    label={stat.label}
                    index={index}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}