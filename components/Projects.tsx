"use client";

import { motion } from "framer-motion";
import { fadeUp, revealTransition, viewport, staggerDelay } from "@/components/lib/motion";

type Project = {
  number: string;
  title?: string;
  description?: string;
  techLabel?: string;
  techItems?: string[];
  href?: string;
  className: string;
};

const projects: Project[] = [
  {
    number: "01",
    title: "Mobile Application UI/UX Design.",
    href: "/mobile-clothing-store-app",
    description: "Designed a user-centered mobile application interface.",
    techLabel: "Tools",
    techItems: ["Figma", "Canva"],
    className: "left-[2.1%] top-[39%] w-[28.2%]",
  },
  {
    number: "02",
    title: "Torvana - Tour Guide Platform.",
    href: "/torvana",
    description: "Developed a full-stack tour guide web application.",
    techLabel: "Tech Stack",
    techItems: ["MERN Stack"],
    className: "left-[36.4%] top-[27.5%] w-[28.2%]",
  },
  {
    number: "03",
    title: "Japanese Food Restaurant Mobile Application",
    description:
      "Developed a restaurant mobile application with a clean and intuitive UI.",
    techLabel: "Tech Stack",
    techItems: ["Kotlin", "Android Studio", "Firebase"],
    className: "left-[70.7%] top-[39%] w-[28.2%]",
  },
];

// Neatly fitted and aligned across all 3 cards using preserveAspectRatio="xMidYMax meet"
// inside the upper 63% band (top-0 bottom-[37%]) so nothing is ever clipped at the top,
// all 3 studio step lines & lamps align across cards, and all titles remain 100% clear below.
function CreativeCharacterIllustration(props: { number: string }) {
  const num = props.number;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-[37%] top-0 z-0 overflow-hidden"
    >
      <svg
        viewBox="0 0 420 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        preserveAspectRatio="xMidYMax meet"
      >
        {/* Shared aligned studio step architecture across all 3 cards */}
        <line x1="0" y1="114" x2="335" y2="114" stroke="#ffffff" strokeOpacity="0.65" strokeWidth="1.5" />
        <line x1="28" y1="12" x2="28" y2="114" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.4" />
        <line x1="28" y1="72" x2="322" y2="72" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.4" />
        <line x1="28" y1="77" x2="322" y2="77" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.1" />

        {/* Shared aligned Hanging Studio Pendant Lamp (drops cleanly from top edge y=0) */}
        <line x1="276" y1="0" x2="276" y2="16" stroke="#ffffff" strokeWidth="1.6" />
        <path d="M270 16 C270 12, 282 12, 282 16 L296 31 L256 31 Z" fill="#ffffff" />

        {num === "01" ? (
          /* 01: UI/UX Designer in Beanbag Sketching Mobile App Wireframes on Tablet */
          <>
            {/* Mobile Wireframe Screen on Left (fits cleanly inside y=16..64) */}
            <rect x="46" y="16" width="38" height="48" rx="4.5" fill="#ffffff" stroke="#111111" strokeWidth="1.4" />
            <line x1="59" y1="20.5" x2="71" y2="20.5" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="51" y="24.5" width="28" height="12" rx="1.5" fill="#ffffff" stroke="#111111" strokeWidth="1.2" />
            <line x1="51" y1="24.5" x2="79" y2="36.5" stroke="#111111" strokeWidth="1" />
            <line x1="79" y1="24.5" x2="51" y2="36.5" stroke="#111111" strokeWidth="1" />
            <rect x="51" y="40" width="12" height="11" rx="1.5" stroke="#111111" strokeWidth="1.2" />
            <rect x="67" y="40" width="12" height="11" rx="1.5" stroke="#111111" strokeWidth="1.2" />
            <rect x="51" y="54.5" width="28" height="4" rx="2" fill="#111111" />

            {/* Beanbag Lounge Chair resting on y=114 floor */}
            <path
              d="M116 74 C102 82, 100 104, 116 111 C134 116, 182 116, 198 111 C207 106, 205 95, 192 92 C170 89, 144 83, 128 70 C123 67, 119 68, 116 74 Z"
              fill="#ffffff"
              stroke="#111111"
              strokeWidth="1.8"
            />

            {/* Designer Legs & Sneakers */}
            <path
              d="M162 93 C175 80, 191 79, 202 87 L222 106 L213 110 L189 98 L156 102 Z"
              fill="#181818"
              stroke="#ffffff"
              strokeWidth="1.3"
            />
            <path
              d="M176 87 C189 74, 204 74, 214 85 L231 104 L220 108 L196 90 L169 97 Z"
              fill="#181818"
              stroke="#ffffff"
              strokeWidth="1.3"
            />
            <path d="M213 107 L226 112 C229 113, 227 114, 222 114 L210 112 Z" fill="#ffffff" />
            <path d="M226 104 L239 109 C242 110, 240 112, 235 112 L223 109 Z" fill="#ffffff" />

            {/* Designer Torso & Arms */}
            <path
              d="M125 60 C136 58, 149 65, 158 77 L176 68 L182 75 L160 88 C149 93, 134 88, 123 75 Z"
              fill="#ffffff"
              stroke="#111111"
              strokeWidth="1.8"
            />

            {/* Hair & Head (top at y=36, plenty of headroom) */}
            <path
              d="M123 38 C113 38, 109 47, 113 55 C106 58, 105 67, 111 72 C117 76, 127 74, 130 67 C136 60, 143 43, 130 38 Z"
              fill="#181818"
              stroke="#ffffff"
              strokeWidth="1.4"
            />
            <path
              d="M125 42 C131 42, 136 47, 135 54 C134 60, 128 63, 123 61 C119 59, 118 52, 121 46 Z"
              fill="#ffffff"
              stroke="#111111"
              strokeWidth="1.5"
            />
            <circle cx="128.5" cy="49" r="1.1" fill="#111111" />
            <circle cx="132.5" cy="49" r="1.1" fill="#111111" />
            <path d="M128.5 54.5 Q130.5 56.5 132.5 54.5" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" fill="none" />

            {/* Drawing Tablet & Stylus Pen */}
            <rect
              x="171"
              y="60"
              width="23"
              height="15.5"
              rx="2.5"
              transform="rotate(24 171 60)"
              fill="#ffffff"
              stroke="#111111"
              strokeWidth="1.6"
            />
            <circle cx="178" cy="71" r="1.8" stroke="#111111" strokeWidth="1.2" />
            <line x1="168" y1="53" x2="175" y2="64" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          </>
        ) : num === "02" ? (
          /* 02: Full-Stack Developer Seated on Studio Steps with Laptop & Route Map Board */
          <>
            {/* Extra upper studio step line */}
            <line x1="28" y1="46" x2="322" y2="46" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="1.3" />

            {/* Tour Guide Route Map Card on Left (fits cleanly inside y=14..46) */}
            <rect x="46" y="14" width="50" height="32" rx="4" fill="#ffffff" stroke="#111111" strokeWidth="1.4" />
            <path d="M53 39 C61 27, 75 38, 84 24" stroke="#111111" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
            <circle cx="53" cy="39" r="2" fill="#111111" />
            <path d="M84 17 C81 17, 79 19, 79 21.5 C79 24.5, 84 28.5, 84 28.5 C84 28.5, 89 24.5, 89 21.5 C89 19, 87 17, 84 17 Z" fill="#111111" />
            <circle cx="84" cy="21" r="1.3" fill="#ffffff" />

            {/* Cushion behind on step */}
            <path d="M138 72 C138 60, 210 60, 210 72" fill="#ffffff" stroke="#111111" strokeWidth="1.5" />

            {/* Patterned Sweater Torso & Arms */}
            <path
              d="M144 68 C142 48, 156 38, 174 38 C192 38, 206 48, 204 68 C202 73, 193 76, 174 76 C155 76, 146 73, 144 68 Z"
              fill="#ffffff"
              stroke="#111111"
              strokeWidth="1.8"
            />
            <circle cx="154" cy="49" r="2" fill="#111111" />
            <circle cx="194" cy="49" r="2" fill="#111111" />
            <polygon points="164,42 168,48 160,48" fill="#111111" />
            <polygon points="184,42 188,48 180,48" fill="#111111" />
            <circle cx="150" cy="59" r="2" fill="#111111" />
            <circle cx="198" cy="59" r="2" fill="#111111" />

            {/* Head & Hair (top at y=13, never clipped) */}
            <path
              d="M163 17 C160 12, 167 9, 174 10 C181 9, 188 12, 185 17 C189 19, 188 25, 183 26 L165 26 C160 25, 159 19, 163 17 Z"
              fill="#181818"
              stroke="#ffffff"
              strokeWidth="1.3"
            />
            <rect x="165" y="20" width="18" height="18" rx="8" fill="#ffffff" stroke="#111111" strokeWidth="1.6" />
            <circle cx="171" cy="28" r="1.2" fill="#111111" />
            <circle cx="177" cy="28" r="1.2" fill="#111111" />
            <path d="M171.5 33 Q174 35 176.5 33" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" fill="none" />

            {/* Laptop Open on Lap */}
            <rect x="155" y="50" width="38" height="22" rx="3" fill="#ffffff" stroke="#111111" strokeWidth="1.8" />
            <circle cx="174" cy="61" r="2.6" stroke="#111111" strokeWidth="1.4" />
            <line x1="152" y1="72" x2="196" y2="72" stroke="#111111" strokeWidth="2" strokeLinecap="round" />

            {/* Trousers & White Shoes (feet end cleanly at y=109 above y=114 floor) */}
            <path
              d="M148 76 C144 85, 149 97, 156 104 L163 102 L166 84 L182 84 L185 102 L192 104 C199 97, 204 85, 200 76 Z"
              fill="#181818"
              stroke="#ffffff"
              strokeWidth="1.4"
            />
            <ellipse cx="159" cy="106" rx="3.2" ry="5" fill="#ffffff" stroke="#111111" strokeWidth="1.4" />
            <ellipse cx="189" cy="106" rx="3.2" ry="5" fill="#ffffff" stroke="#111111" strokeWidth="1.4" />
          </>
        ) : (
          /* 03: Mobile App Creator on Studio Step with Laptop + Steaming Ramen Bowl */
          <>
            {/* Steaming Ramen Bowl & Chopsticks on Left Step (sits right on y=72 step) */}
            <path d="M58 46 Q61 40 58 35 M67 44 Q70 38 67 33 M76 46 Q79 40 76 35" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" fill="none" />
            <line x1="48" y1="51" x2="88" y2="45" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M46 57 L86 57 C84 67, 76 72, 66 72 C56 72, 48 67, 46 57 Z" fill="#ffffff" />
            <ellipse cx="66" cy="57" rx="20" ry="3.2" fill="#181818" stroke="#ffffff" strokeWidth="1.4" />

            {/* Cushion on step */}
            <path d="M188 72 C199 58, 218 61, 220 72" fill="#ffffff" stroke="#111111" strokeWidth="1.5" />

            {/* Back Leg */}
            <path
              d="M132 69 C130 47, 143 40, 156 51 L147 69 Z"
              fill="#181818"
              stroke="#ffffff"
              strokeWidth="1.4"
            />
            <path
              d="M123 70 L134 70 C136 73, 132 75, 125 75 C121 75, 120 72, 123 70 Z"
              fill="#ffffff"
            />

            {/* Torso & Sweater */}
            <path
              d="M169 29 C186 29, 199 43, 195 64 C191 71, 180 73, 169 67 L167 36 Z"
              fill="#ffffff"
              stroke="#111111"
              strokeWidth="1.7"
            />

            {/* Head & Beard/Hair (top at y=9, never clipped!) */}
            <circle cx="174" cy="19" r="9.5" fill="#ffffff" stroke="#111111" strokeWidth="1.6" />
            <path d="M165 14 C166 8, 180 8, 185 12 C180 14, 172 14, 165 14 Z" fill="#111111" />
            <circle cx="171" cy="19" r="1.1" fill="#111111" />
            <circle cx="176" cy="19" r="1.1" fill="#111111" />
            <path d="M166.5 22 C167.5 27.5, 178.5 27.5, 181 21 C176.5 23.5, 170 23.5, 166.5 22 Z" fill="#111111" />

            {/* Front Hanging Leg (ends at y=102 above y=114 floor) */}
            <path
              d="M191 65 C173 59, 150 61, 148 75 L152 97 L160 95 L165 74 L188 72 Z"
              fill="#181818"
              stroke="#ffffff"
              strokeWidth="1.4"
            />
            <path
              d="M152 97 L160 95 C162 99, 156 103, 149 102 C146 101, 148 98, 152 97 Z"
              fill="#ffffff"
            />

            {/* Laptop on Knee */}
            <path d="M145 43 L168 41 L172 59 L149 61 Z" fill="#ffffff" stroke="#111111" strokeWidth="1.6" />
            <circle cx="158" cy="51" r="2.2" stroke="#111111" strokeWidth="1.3" />
            <path d="M176 36 L187 36 L185 54 L168 57" fill="#ffffff" stroke="#111111" strokeWidth="1.6" />
          </>
        )}
      </svg>
    </div>
  );
}

function ProjectCard(props: { project: Project; index: number }) {
  const project = props.project;

  return (
    <motion.article
      className={"absolute " + project.className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={fadeUp}
      transition={revealTransition(staggerDelay(props.index, 0.12))}
    >
      <div className="relative h-[clamp(88px,10.3vw,247px)] overflow-hidden bg-black">
        <CreativeCharacterIllustration number={project.number} />

        <span
          aria-hidden="true"
          className="absolute right-[clamp(6px,0.66vw,16px)] top-[clamp(10px,0.99vw,24px)] z-10 text-[clamp(40px,4vw,94px)] leading-none text-white [writing-mode:vertical-rl]"
          style={{ fontFamily: '"Times New Roman", serif' }}
        >
          {project.number}
        </span>

        {project.title ? (
          <a
            href={project.href ?? "#"}
            className="absolute bottom-[clamp(13px,1.59vw,38px)] right-[clamp(8px,0.93vw,22px)] z-10 max-w-[86%] text-right font-body text-[clamp(7px,0.86vw,21px)] uppercase leading-[1.55] tracking-[0.15em] text-white underline decoration-[0.5px] underline-offset-[3px] transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            {project.title}
          </a>
        ) : null}
      </div>

      <div className="h-[clamp(112px,14.2vw,340px)] bg-[#f7f7f7] px-[clamp(10px,1.19vw,29px)] py-[clamp(14px,1.85vw,45px)] text-right">
        {project.description ? (
          <p className="ml-auto max-w-[92%] font-sans text-[clamp(8px,0.92vw,22px)] leading-[1.6] tracking-[0.15em] text-[#3e3e3e]">
            {project.description}
          </p>
        ) : null}

        {project.techItems && project.techItems.length > 0 ? (
          <div className="mt-[clamp(9px,1.19vw,29px)]">
            <p className="font-sans text-[clamp(7px,0.82vw,20px)] font-bold leading-none tracking-[0.12em] text-[#3e3e3e] underline decoration-[0.5px] underline-offset-[2px]">
              {project.techLabel}:
            </p>
            <ul className="mt-[clamp(5px,0.6vw,14px)] font-sans text-[clamp(7px,0.82vw,20px)] leading-[1.6] tracking-[0.15em] text-[#3e3e3e]">
              {project.techItems.map(function (item) {
                return <li key={item}>- {item}</li>;
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}

function MobileProjectCard(props: { project: Project; index: number }) {
  const project = props.project;

  return (
    <motion.article
      className="w-full"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={fadeUp}
      transition={revealTransition(staggerDelay(props.index, 0.1))}
    >
      <div className="relative flex h-[140px] items-start justify-end overflow-hidden bg-black p-3">
        <CreativeCharacterIllustration number={project.number} />

        <span
          aria-hidden="true"
          className="relative z-10 text-[44px] leading-none text-white [writing-mode:vertical-rl]"
          style={{ fontFamily: '"Times New Roman", serif' }}
        >
          {project.number}
        </span>
        {project.title ? (
          <a
            href={project.href ?? "#"}
            className="absolute bottom-3 right-3 z-10 max-w-[80%] text-right font-body text-[13px] uppercase leading-[1.4] tracking-[0.1em] text-white underline decoration-[0.5px] underline-offset-[3px]"
          >
            {project.title}
          </a>
        ) : null}
      </div>

      <div className="bg-[#f7f7f7] px-4 py-5 text-right">
        {project.description ? (
          <p className="ml-auto max-w-[92%] font-sans text-[13px] leading-[1.6] tracking-[0.05em] text-[#3e3e3e]">
            {project.description}
          </p>
        ) : null}

        {project.techItems && project.techItems.length > 0 ? (
          <div className="mt-3">
            <p className="font-sans text-[12px] font-bold leading-none tracking-[0.05em] text-[#3e3e3e] underline decoration-[0.5px] underline-offset-[2px]">
              {project.techLabel}:
            </p>
            <ul className="mt-2 font-sans text-[12px] leading-[1.8] tracking-[0.05em] text-[#3e3e3e]">
              {project.techItems.map(function (item) {
                return <li key={item}>- {item}</li>;
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="w-full overflow-hidden bg-white">
      {/* ===================== MOBILE ===================== */}
      <div className="flex flex-col gap-8 px-6 py-12 sm:hidden">
        <motion.h2
          className="font-display text-[40px] uppercase leading-none tracking-[-0.03em] text-black"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={revealTransition()}
        >
          Projects
        </motion.h2>

        {projects.map(function (project, index) {
          return (
            <MobileProjectCard key={project.number} project={project} index={index} />
          );
        })}

        <motion.a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="self-end font-sans text-[13px] tracking-[0.1em] text-[#3e3e3e] underline decoration-[0.5px] underline-offset-[2px]"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={fadeUp}
          transition={revealTransition(0.4)}
        >
          GitHub
        </motion.a>
      </div>

      {/* ===================== DESKTOP ===================== */}
      <div className="hidden px-0 py-4 sm:block sm:py-6">
        <div className="mx-auto w-full px-[2.6vw]">
          <div className="relative mx-auto aspect-[596/354] w-full max-w-[3000px] min-h-[354px] overflow-hidden bg-white">
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 top-[2.2%] h-px bg-[#a4a4a4]"
            />

            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 right-0 h-px bg-[#a4a4a4]"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-[1.5%] top-0 w-px bg-[#a4a4a4]"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-0 right-[1%] top-0 w-px bg-[#a4a4a4]"
            />
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-[2.2%] h-[18.8%] w-px bg-[#6b6b6b]"
            />
            <span
              aria-hidden="true"
              className="absolute left-[47%] top-[20.8%] h-px w-[7%] bg-[#d9d9d9]"
            />
            <span
              aria-hidden="true"
              className="absolute right-[11.2%] top-[18.9%] h-px w-[1%] bg-[#a4a4a4]"
            />

            <motion.h2
              className="absolute left-[4.2%] top-[14.2%] font-display text-[clamp(25px,3.77vw,90px)] uppercase leading-none tracking-[-0.06em] text-black"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={revealTransition()}
            >
              Projects
            </motion.h2>

            <div className="absolute inset-x-[2.1%] bottom-0 top-0">
              {projects.map(function (project, index) {
                return (
                  <ProjectCard key={project.number} project={project} index={index} />
                );
              })}
            </div>

            <motion.a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-[4.8%] right-[5.3%] font-sans text-[clamp(6px,0.73vw,18px)] tracking-[0.16em] text-[#3e3e3e] underline decoration-[0.5px] underline-offset-[2px] transition-opacity hover:opacity-70"
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={fadeUp}
              transition={revealTransition(0.5)}
            >
              GitHub
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}