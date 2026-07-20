"use client";

import { motion } from "framer-motion";
import { fadeUp, revealTransition, viewport, staggerDelay } from "@/components/lib/motion";

// Same nav pattern as the other standalone pages — links back to the
// homepage's anchored sections.
const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

const education = [
  {
    title: "BSc (Hons) in IT Specializing in Information Technology.",
    place: "SLIIT",
    date: "Nov 2023 – Oct 2027",
  },
  {
    title: "Diploma in Information Technology.",
    place: "SIBA Campus",
    date: "2020–2021",
  },
  {
    title: "Successfully passed G.C.E A/L (Commerce Stream).",
    place: "Seethadevi Girls' College, Kandy",
    date: "2019",
  },
  {
    title: "Successfully passed G.C.E O/L.",
    place: "Seethadevi Girls' College, Kandy",
    date: "2016",
  },
];

const certifications = [
  { title: "Web Design for Beginners", place: "University of Moratuwa", date: "Dec 2025" },
  { title: "Front-End Web Development", place: "University of Moratuwa", date: "Dec 2025" },
  { title: "Completed Python for Data Science & Machine Learning.", place: "UniAthena", date: "Dec 2025" },
  { title: "Data Scientist Course", place: "Simplilearn", date: "Dec 2025" },
  { title: "Python for Beginners", place: "University of Moratuwa", date: "Dec 2025" },
  { title: "MongoDB Learning", place: "MongoDB University", date: "Dec 2025" },
];

const technicalSkills = [
  "Web Design",
  "Design Thinking",
  "Wireframe Creation",
  "Front End Coding",
  "Backend Tech",
  "Problem-Solving",
  "Computer Literacy",
  "Project Management Tools",
  "Strong Communication",
];

const technicalTools = [
  { label: "Languages", value: "Java, JavaScript, Python, SQL, HTML, CSS" },
  { label: "Frontend", value: "React.js, Next.js, Bootstrap" },
  { label: "Backend", value: "Node.js, Express.js, Spring Boot, JSP" },
  { label: "Databases", value: "MySQL, MongoDB" },
  { label: "Tools", value: "Git, GitHub, Postman, VS Code, IntelliJ IDEA" },
  { label: "Concepts", value: "OOP, REST APIs, DSA, SDLC, Responsive Web Design, Agile" },
];

const uiuxTools = {
  designTools: ["Figma", "Canva"],
  skills: [
    "Wireframing",
    "Prototyping",
    "User-Centered Design",
    "Usability Evaluation",
    "Information Architecture",
  ],
};

const professionalSkills = [
  "Creative Problem Solving",
  "Design Thinking",
  "Attention to Detail",
  "User Empathy",
  "Team Collaboration",
  "Time Management",
  "Structured Documentation",
];

const projects = [
  {
    title: "Torvana – Tour Guide Platform",
    subtitle: "University Group Project",
    points: [
      "Collaborated in a team to design and develop a full-stack travel and tour guide platform that connects tourists with local guides and tourism services.",
      "Implemented responsive user interfaces, RESTful APIs, and database operations to support user management, bookings, and travel-related content.",
      "Participated in version control, feature integration, and testing to ensure a seamless user experience and system reliability.",
    ],
    stack: "Tech Stack: MongoDB, Express.js, React.js, Node.js, GitHub",
  },
  {
    title: "Mobile Application UI/UX Design",
    subtitle: "Solo Project",
    points: [
      "Designed user-centered mobile application interfaces by applying UI/UX principles, wireframing, prototyping, and usability-focused design practices.",
      "Created interactive prototypes and visual design assets to improve user engagement, accessibility, and navigation flow.",
      "Conducted iterative design improvements based on user experience considerations and modern mobile design standards.",
    ],
    stack: "Tools: Figma, Canva",
  },
  {
    title: "Japanese Food Restaurant Mobile Application",
    subtitle: "Solo Project",
    points: [
      "Developed a mobile restaurant application enabling users to browse menus, view food items, and interact with restaurant services through an intuitive interface.",
      "Integrated Firebase for backend services, including data management and real-time application functionality.",
      "Designed and implemented responsive Android screens following modern mobile development and UI design practices.",
    ],
    stack: "Tech Stack: Kotlin, Android Studio, Firebase",
  },
  {
    title: "GitHub Profile Analyzer",
    subtitle: "Solo Project",
    points: [
      "Developed a web-based analytics dashboard that retrieves and visualizes GitHub user data through API integration.",
      "Implemented interactive charts and data visualizations to present repository statistics, contribution activity, and user insights.",
      "Built a responsive and type-safe frontend application using modern React development practices and reusable components.",
    ],
    stack: "Technologies: React, TypeScript, Vite, GitHub API",
  },
];

const references = [
  {
    name: "Ms. Sandani Samarakoon",
    role: "Academic Instructor",
    dept: "Department of Information Technology, Faculty of Computing, SLIIT, Malabe, Sri Lanka.",
    qualifications: "BSc (Hons) in Information Technology – Software Engineering",
    phone: "+94 77 365 5801",
    email: "sandani.s@sliit.lk",
  },
  {
    name: "Ms. Wimalki Dilshani",
    role: "Academic Instructor",
    dept: "Department of Information Technology, Faculty of Computing, SLIIT, Malabe, Sri Lanka.",
    qualifications: "BSc (Hons) in Information Technology – Software Engineering",
    phone: "+94 77 403 9675",
    email: "wimalki.d@sliit.lk",
  },
];

const sectionTitle =
  "font-display text-[clamp(20px,1.8vw,34px)] uppercase tracking-[0.12em] text-black border-b border-black pb-2";
const bodyText =
  "font-['Instrument_Sans'] text-[clamp(13px,1vw,17px)] leading-[1.7] text-zinc-600";
const smallLabel =
  "font-['Instrument_Sans'] text-[clamp(12px,0.85vw,15px)] text-zinc-500";

function Section(props: { title: string; children: React.ReactNode; index: number }) {
  return (
    <motion.div
      className="flex flex-col gap-4"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={fadeUp}
      transition={revealTransition(staggerDelay(props.index, 0.06))}
    >
      <h2 className={sectionTitle}>{props.title}</h2>
      {props.children}
    </motion.div>
  );
}

export default function ResumePage() {
  return (
    <section className="relative w-full bg-white">
      {/* Nav */}
      <nav className="flex flex-wrap items-center gap-[clamp(16px,1.5vw,36px)] px-[clamp(20px,2.15vw,52px)] pb-[clamp(16px,1.5vw,36px)] pt-[clamp(20px,2.15vw,52px)]">
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

      {/* Header */}
      <div className="bg-black px-[clamp(24px,4vw,80px)] py-[clamp(32px,4vw,64px)] text-center">
        <motion.h1
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={fadeUp}
          transition={revealTransition()}
          className="font-['Inria_Serif'] text-[clamp(32px,4.5vw,72px)] uppercase tracking-[0.15em] text-white"
        >
          Oshani Wijekoon
        </motion.h1>
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={fadeUp}
          transition={revealTransition(0.1)}
          className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-['Instrument_Sans'] text-[clamp(12px,0.9vw,16px)] text-white/80"
        >
          <a href="mailto:oshaniwijekoon28@gmail.com" className="hover:text-white">
            oshaniwijekoon28@gmail.com
          </a>
          <span>|</span>
          <a href="tel:+94775257094" className="hover:text-white">
            +94 77 525 7094
          </a>
          <span>|</span>
          <a
            href="https://www.linkedin.com/in/oshani-wijekoon-81227b343"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            linkedin.com/in/oshani-wijekoon-81227b343
          </a>
          <span>|</span>
          <a
            href="https://github.com/OshaniWijekoon"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            github.com/OshaniWijekoon
          </a>
        </motion.p>

        <motion.a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={fadeUp}
          transition={revealTransition(0.2)}
          className="mt-[clamp(24px,2.5vw,40px)] inline-flex h-[clamp(56px,3.7vw,90px)] w-[clamp(180px,11.9vw,290px)] items-center justify-center rounded-tl-[clamp(12px,0.79vw,19px)] rounded-br-[clamp(12px,0.79vw,19px)] bg-white font-['JejuMyeongjo'] text-[clamp(13px,0.79vw,18px)] capitalize tracking-[0.03em] text-black transition-opacity hover:opacity-80"
        >
          Download PDF
        </motion.a>
      </div>

      {/* Body */}
      <div className="mx-auto flex max-w-[1100px] flex-col gap-[clamp(40px,5vw,80px)] px-[clamp(20px,4vw,64px)] py-[clamp(40px,5vw,80px)]">
        <Section title="Summary" index={0}>
          <p className={bodyText}>
            Motivated third-year IT undergraduate specializing in UI/UX
            design and web development, with practical experience gained
            through academic and personal projects. Passionate about
            combining creativity and technology to develop intuitive user
            experiences and efficient software solutions. Eager to
            contribute strong problem-solving, design-thinking, and
            development skills in a professional environment.
          </p>
        </Section>

        <Section title="Education" index={1}>
          <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
            {education.map(function (item) {
              return (
                <div key={item.title}>
                  <p className="font-['Instrument_Sans'] text-[clamp(14px,1.05vw,18px)] font-semibold text-black">
                    {item.title}
                  </p>
                  <p className={smallLabel}>{item.place}</p>
                  <p className={`${smallLabel} font-semibold`}>{item.date}</p>
                </div>
              );
            })}
          </div>
        </Section>

        <Section title="Certifications" index={2}>
          <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
            {certifications.map(function (item) {
              return (
                <div key={item.title}>
                  <p className="font-['Instrument_Sans'] text-[clamp(14px,1.05vw,18px)] font-semibold text-black">
                    {item.title}
                  </p>
                  <p className={smallLabel}>{item.place}</p>
                  <p className={`${smallLabel} font-semibold`}>{item.date}</p>
                </div>
              );
            })}
          </div>
        </Section>

        <div className="grid grid-cols-1 gap-[clamp(40px,5vw,80px)] sm:grid-cols-2">
          <Section title="Technical Skills" index={3}>
            <ul className={`${bodyText} grid grid-cols-1 gap-1 pl-5 sm:grid-cols-2`}>
              {technicalSkills.map(function (item) {
                return (
                  <li key={item} className="list-disc">
                    {item}
                  </li>
                );
              })}
            </ul>
          </Section>

          <Section title="Technical Tools & Languages" index={4}>
            <ul className={`${bodyText} flex flex-col gap-2 pl-5`}>
              {technicalTools.map(function (item) {
                return (
                  <li key={item.label} className="list-disc">
                    <span className="font-semibold text-black underline">
                      {item.label}
                    </span>
                    : {item.value}
                  </li>
                );
              })}
            </ul>
          </Section>
        </div>

        <div className="grid grid-cols-1 gap-[clamp(40px,5vw,80px)] sm:grid-cols-2">
          <Section title="Technical Tools — UI/UX" index={5}>
            <div className="flex flex-col gap-4">
              <div>
                <p className="font-['Instrument_Sans'] text-[clamp(13px,0.95vw,16px)] font-semibold text-black underline">
                  Design Tools
                </p>
                <ul className={`${bodyText} pl-5`}>
                  {uiuxTools.designTools.map(function (item) {
                    return (
                      <li key={item} className="list-disc">
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <p className="font-['Instrument_Sans'] text-[clamp(13px,0.95vw,16px)] font-semibold text-black underline">
                  Skills
                </p>
                <ul className={`${bodyText} pl-5`}>
                  {uiuxTools.skills.map(function (item) {
                    return (
                      <li key={item} className="list-disc">
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </Section>

          <Section title="Professional Skills" index={6}>
            <ul className={`${bodyText} pl-5`}>
              {professionalSkills.map(function (item) {
                return (
                  <li key={item} className="list-disc">
                    {item}
                  </li>
                );
              })}
            </ul>
          </Section>
        </div>

        <Section title="Projects" index={7}>
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
            {projects.map(function (project) {
              return (
                <div key={project.title}>
                  <p className="font-['Instrument_Sans'] text-[clamp(14px,1.05vw,18px)] font-semibold text-black underline">
                    {project.title}
                  </p>
                  <p className={smallLabel}>{project.subtitle}</p>
                  <ul className={`${bodyText} mt-2 pl-5`}>
                    {project.points.map(function (point) {
                      return (
                        <li key={point} className="list-disc">
                          {point}
                        </li>
                      );
                    })}
                  </ul>
                  <p className="mt-2 font-['Instrument_Sans'] text-[clamp(12px,0.9vw,15px)] font-semibold text-zinc-700">
                    {project.stack}
                  </p>
                </div>
              );
            })}
          </div>
        </Section>

        <Section title="References" index={8}>
          <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
            {references.map(function (ref) {
              return (
                <div key={ref.name}>
                  <p className="font-['Instrument_Sans'] text-[clamp(14px,1.05vw,18px)] font-semibold text-black">
                    {ref.name}
                  </p>
                  <p className={smallLabel}>{ref.role}</p>
                  <p className={smallLabel}>{ref.dept}</p>
                  <p className={smallLabel}>
                    Qualifications: {ref.qualifications}
                  </p>
                  <p className={smallLabel}>Phone: {ref.phone}</p>
                  <p className={smallLabel}>Email: {ref.email}</p>
                </div>
              );
            })}
          </div>
        </Section>

        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={fadeUp}
          transition={revealTransition()}
          className="border-t border-[#d9d9d9] pt-6 font-['Instrument_Sans'] text-[clamp(11px,0.8vw,14px)] italic text-zinc-500"
        >
          I do hereby declare that all the information and facts furnished
          above are true, correct and complete to the best of my belief and
          knowledge.
        </motion.p>
      </div>
    </section>
  );
}