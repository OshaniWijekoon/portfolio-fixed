import Image from "next/image";

type FocusArea = {
  title: string;
  description: string;
};

type Milestone = {
  year: string;
  description: string;
};

const focusAreas: FocusArea[] = [
  {
    title: "UI/UX Design",
    description: "Crafting experiences that users love, one pixel at a time.",
  },
  {
    title: "Web Development",
    description:
      "Bringing designs to life through modern, responsive web solutions.",
  },
  {
    title: "Software Engineering",
    description:
      "Building smart systems that solve real-world challenges with code.",
  },
];

const milestones: Milestone[] = [
  {
    year: "1st year - 2023-2024",
    description:
      "Started my BSc (Hons) in Information Technology journey, building a strong foundation in programming, databases, and software development fundamentals.",
  },
  {
    year: "2nd year - 2025",
    description:
      "Expanded my knowledge in web development, object-oriented programming, and software engineering while working on collaborative university projects.",
  },
  {
    year: "3rd year - 2026",
    description:
      "Focused on UI/UX design, web development, and software engineering through academic and personal projects. Gained hands-on experience with modern technologies and user-centered design practices.",
  },
];

// Design scale reference: the Figma frame is 1513 x 1631px, and the container
// below now has no max-width cap — it fills the page. So font sizes use a
// viewport-relative value (vw) as the primary driver, with a legible floor
// for narrow windows and a generous ceiling that's well above the original
// design size (so text keeps growing on very wide screens instead of
// plateauing early).
const headingText =
  "text-[clamp(16px,1.98vw,44px)] font-['JejuMyeongjo'] tracking-[0.12em]";
const subheadingText =
  "text-[clamp(13px,1.59vw,36px)] font-['JejuMyeongjo'] tracking-[0.12em]";
const milestoneHeadText =
  "text-[clamp(12px,1.32vw,30px)] font-['JejuMyeongjo'] tracking-[0.12em]";
const bodyText =
  "text-[clamp(10px,1.06vw,22px)] font-['Instrument_Sans'] capitalize tracking-wide leading-[1.75] text-zinc-600";
const buttonText =
  "text-[clamp(10px,1.06vw,22px)] font-['JejuMyeongjo'] capitalize tracking-wide text-white";

function AboutContent() {
  return (
    <>
      {/* ===================== LEFT COLUMN ===================== */}
      <div className="absolute left-0 top-[6.5%] h-[93.5%] w-[50.1%] overflow-hidden bg-white">
        <div className="absolute left-[8.18%] top-0 h-[20.98%] w-[27.44%] bg-[#f2f2f2]">
          <Image
            src="/images/profile.jpg"
            alt="Oshani Wijekoon"
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute left-[7.65%] top-[27.28%] w-[42.2%]">
          <h3 className={`${headingText} font-normal uppercase text-black`}>
            Profile
          </h3>
          <p className={`mt-[4.2%] ${bodyText}`}>
            I am a third-year Information Technology undergraduate passionate
            about UI/UX design, web development, and software engineering. I
            enjoy transforming unique ideas into user-friendly and visually
            appealing digital solutions.
          </p>
        </div>

        <div className="absolute left-[7.65%] top-[50.03%] w-[70.45%]">
          <h3 className={`${headingText} font-normal uppercase text-black`}>
            My Focus Areas
          </h3>
          <div className="mt-[3%] flex items-stretch gap-[2.64%]">
            <span aria-hidden="true" className="w-px bg-gray-200" />
            <div className="flex flex-1 flex-col gap-[6.33%]">
              {focusAreas.map(function (area) {
                return (
                  <div key={area.title} className="flex flex-col gap-[1.06%]">
                    <h4
                      className={`${subheadingText} inline-block font-normal text-black underline underline-offset-[3px]`}
                    >
                      {area.title}
                    </h4>
                    <p className={bodyText}>{area.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-[16.79%] w-full bg-black px-[5.8%] py-[8%]">
          <h4 className={`${subheadingText} font-normal text-white`}>
            Present
          </h4>
          <p className="mt-[6%] text-[clamp(11px,1.19vw,26px)] font-['Instrument_Sans'] leading-[1.75] tracking-wide text-white">
            Currently a 3rd Year, 2nd Semester Information Technology
            Undergraduate, continuously developing technical, creative, and
            problem-solving skills while preparing for a career in software
            engineering and UI/UX design.
          </p>
        </div>
      </div>

      {/* ===================== RIGHT COLUMN ===================== */}
      <div className="absolute left-[50.23%] top-[6.5%] h-[93.5%] w-[49.77%] overflow-hidden bg-white">
        <div className="absolute left-[24.17%] top-[7.48%] w-[66.5%]">
          <h3 className={`${headingText} font-normal uppercase text-black`}>
            Education
          </h3>
          <p className={`mt-[1.3%] ${bodyText}`}>
            SLIIT - 2023-2027
            <br />
            BSc (Hons) in IT Specializing Information Technology
          </p>
        </div>

        <div className="absolute left-[24.17%] top-[21.31%] w-[66.8%]">
          <h3 className={`${headingText} font-normal uppercase text-black`}>
            Academic Journy
          </h3>
          <div className="mt-[3.19%] flex flex-col gap-[2.1%]">
            {milestones.map(function (item) {
              return (
                <div key={item.year} className="flex flex-col gap-[1.06%]">
                  <h4
                    className={`${milestoneHeadText} inline-block font-normal text-black underline underline-offset-[3px]`}
                  >
                    {item.year}
                  </h4>
                  <p className={bodyText}>{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-[24.17%] top-[60.07%] flex h-[5.25%] w-[29.75%] items-center justify-center rounded-tl-2xl rounded-br-2xl bg-black transition-opacity hover:opacity-80"
        >
          <span className={buttonText}>View Resume</span>
        </a>
      </div>

      {/* ===================== TITLE + DIVIDER + DECORATIVE TICK ===================== */}
      <h2 className="absolute left-1/2 top-0 -translate-x-1/2 text-[clamp(34px,4.76vw,104px)] font-['Inria_Serif'] font-normal uppercase leading-tight text-black">
        About
      </h2>
      {/* Full-height vertical divider between the two columns. Drawn as its
          own element (same approach as the tick below) rather than as a
          border on the column divs, since the column-border approach wasn't
          rendering reliably. */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-[6.5%] h-[93.5%] w-px -translate-x-1/2 bg-neutral-500"
      />
      {/* Short decorative tick just under the title. */}
      <span
        aria-hidden="true"
        className="absolute left-[47.3%] top-[6.44%] h-px w-[5.29%] bg-neutral-500"
      />
    </>
  );
}

export default function About() {
  return (
    <section id="about" className="w-full bg-white">
      {/* Real Figma frame is 1513 x 1631px — NOT square. Using the correct
          aspect ratio is what keeps every absolutely-positioned child aligned
          as the container scales. No max-width cap here anymore — it fills
          the full width of its parent/page, and the font sizes below scale
          up right along with it instead of maxing out early. */}
      <div className="relative mx-auto aspect-[1513/1631] w-full bg-white max-sm:hidden">
        <AboutContent />
      </div>

      {/* ===================== MOBILE ===================== */}
      <div className="bg-white px-6 py-16 sm:hidden">
        <h2 className="text-center text-[42px] font-['Inria_Serif'] uppercase leading-none text-black">
          About
        </h2>
        <div className="mx-auto mt-8 h-[190px] w-[140px] overflow-hidden bg-[#f2f2f2]">
          <Image
            src="/images/profile.jpg"
            alt="Oshani Wijekoon"
            width={140}
            height={190}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="mx-auto mt-10 max-w-[420px] space-y-8">
          <div>
            <h3 className="text-[22px] font-['JejuMyeongjo'] uppercase tracking-[0.12em] text-black">
              Profile
            </h3>
            <p className="mt-4 text-[14px] font-['Instrument_Sans'] capitalize leading-[1.8] tracking-wide text-zinc-600">
              I am a third-year Information Technology undergraduate
              passionate about UI/UX design, web development, and software
              engineering. I enjoy transforming unique ideas into
              user-friendly and visually appealing digital solutions.
            </p>
          </div>

          <div>
            <h3 className="text-[18px] font-['JejuMyeongjo'] uppercase tracking-[0.12em] text-black">
              My Focus Areas
            </h3>
            <div className="mt-4 flex flex-col gap-5">
              {focusAreas.map(function (area) {
                return (
                  <div key={area.title}>
                    <h4 className="inline-block text-[15px] font-['JejuMyeongjo'] uppercase tracking-[0.12em] text-black underline underline-offset-[3px]">
                      {area.title}
                    </h4>
                    <p className="mt-1 text-[13px] font-['Instrument_Sans'] capitalize leading-[1.7] tracking-wide text-zinc-600">
                      {area.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-black px-6 py-6 text-white">
            <h4 className="text-[16px] font-['JejuMyeongjo'] tracking-[0.12em]">
              Present
            </h4>
            <p className="mt-2 text-[13px] font-['Instrument_Sans'] leading-[1.7] tracking-wide">
              Currently a 3rd year, 2nd semester Information Technology
              undergraduate, continuously developing technical, creative, and
              problem-solving skills while preparing for a career in software
              engineering and UI/UX design.
            </p>
          </div>

          <div>
            <h3 className="text-[18px] font-['JejuMyeongjo'] uppercase tracking-[0.12em] text-black">
              Education
            </h3>
            <p className="mt-3 text-[13px] font-['Instrument_Sans'] capitalize tracking-wide text-zinc-600">
              SLIIT - 2023-2027
            </p>
            <p className="text-[13px] font-['Instrument_Sans'] capitalize tracking-wide text-zinc-600">
              BSc (Hons) in IT Specializing Information Technology
            </p>
          </div>

          <div>
            <h3 className="text-[18px] font-['JejuMyeongjo'] uppercase tracking-[0.12em] text-black">
              Academic Journey
            </h3>
            <div className="mt-5 flex flex-col gap-5">
              {milestones.map(function (item) {
                return (
                  <div key={item.year}>
                    <h4 className="inline-block text-[14px] font-['JejuMyeongjo'] uppercase tracking-[0.12em] text-black underline underline-offset-[3px]">
                      {item.year}
                    </h4>
                    <p className="mt-1 text-[13px] font-['Instrument_Sans'] capitalize leading-[1.7] tracking-wide text-zinc-600">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-tl-2xl rounded-br-2xl bg-black px-8 py-3 text-center text-[13px] font-['JejuMyeongjo'] capitalize tracking-wide text-white"
          >
            View Resume
          </a>
        </div>
      </div>
    </section>
  );
}