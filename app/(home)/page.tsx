"use client";

import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useRef } from "react";

import { experiences } from "@/config/experience";
import { Projects } from "@/config/projects";
import { skillGroups } from "@/config/skills";
import { SocialLinks } from "@/config/socials";

import "./portfolio.css";

const RESUME_URL =
  "https://drive.google.com/file/d/1mgEmrs6RghceDPHCXs0sJ2ava00DNnMO/view";
const EMAIL = "adityasahani893@gmail.com";

/* URLs stay in config/socials.ts; this maps them to display labels and to
   outline glyphs. Order is deliberate — email first, CV last. */
const SOCIAL_ORDER = ["Gmail", "Github", "LinkedIn"] as const;
const SOCIAL_LABEL: Record<string, string> = {
  Gmail: "Email",
  Github: "GitHub",
  LinkedIn: "LinkedIn",
};
const SOCIAL_ICON: Record<string, LucideIcon> = {
  Gmail: Mail,
  Github: Github,
  LinkedIn: Linkedin,
};

/** Shared by the hero and the colophon. Icons are 14px outline glyphs in
 *  currentColor, so they read as typography rather than UI chrome. */
const elsewhere = [
  ...SOCIAL_ORDER.flatMap((name) => {
    const social = SocialLinks.find((s) => s.name === name);
    if (!social) return [];
    return [
      { label: SOCIAL_LABEL[name], href: social.link, Icon: SOCIAL_ICON[name] },
    ];
  }),
  { label: "Curriculum vitae", href: RESUME_URL, Icon: ArrowUpRight },
];

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "toolbox", label: "Toolbox" },
  { id: "contact", label: "Contact" },
];

/* ------------------------------------------------------------------
   Colour coding

   Four validated hues carry domain identity (see portfolio.css for the
   validation figures). Toolbox categories map onto them; Cloud and
   Databases share the infrastructure hue, and Core CS stays neutral
   because fundamentals aren't a stack choice.
   ------------------------------------------------------------------ */

type Cat = "lang" | "ai" | "fw" | "infra" | "none";

const CAT_BY_CATEGORY: Record<string, Cat> = {
  Languages: "lang",
  "AI / ML": "ai",
  "Frameworks & Libraries": "fw",
  "Cloud & DevOps": "infra",
  Databases: "infra",
  "Core CS": "none",
};

/** Tech names differ between configs ("Typescript" vs "TypeScript",
 *  "HTML 5" vs "HTML"), so match on a normalised key plus a few aliases
 *  for names that only ever appear in a project or role stack. */
const norm = (s: string) => s.toLowerCase().replace(/[\s._-]/g, "");

const CAT_ALIASES: Record<string, Cat> = {
  html5: "lang",
  css3: "lang",
  sql: "infra",
  mysql: "infra",
  llms: "ai",
  llm: "ai",
  googlegemini: "ai",
  serpapi: "ai",
  tensorflow: "ai",
  pytorch: "ai",
  webgl: "fw",
  graphql: "fw",
  nestjs: "fw",
  expressjs: "fw",
  redux: "fw",
  bootstrap: "fw",
  materialui: "fw",
  netlify: "infra",
  socketio: "fw",
};

const CAT_BY_TECH = new Map<string, Cat>(Object.entries(CAT_ALIASES));
skillGroups.forEach((group) => {
  const cat = CAT_BY_CATEGORY[group.category] ?? "none";
  group.items.forEach((item) => CAT_BY_TECH.set(norm(item), cat));
});

const catOf = (tech: string): Cat => CAT_BY_TECH.get(norm(tech)) ?? "none";

/** Tech tags. Colour is redundant with the label, never the only cue. */
function Tags({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="ed-tags">
      {items.map((tech) => (
        <span key={tech} className="ed-tag" data-cat={catOf(tech)}>
          {tech}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------
   Experience
   ------------------------------------------------------------------ */

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Compact range for the left gutter. Ranges inside one calendar year get
 *  months ("May–Jul 2026"), since bare years would collide when two roles
 *  fall in the same year. Multi-year ranges stay terse ("2025–26"). */
function yearRange(start: Date, end: Date | "Present"): string {
  const from = start.getFullYear();
  if (end === "Present" || end.getTime() < start.getTime()) {
    return `${from} — Present`;
  }

  const to = end.getFullYear();
  if (to !== from) return `${from}–${String(to).slice(2)}`;

  const m1 = MONTHS[start.getMonth()];
  const m2 = MONTHS[end.getMonth()];
  return m1 === m2 ? `${m1} ${from}` : `${m1}–${m2} ${from}`;
}

/** Matches "5+", "3,000+", "63.5%", "2024" — i.e. a claim with a number in it. */
const HAS_METRIC = /\d[\d,]*\+|\d+(\.\d+)?\s?%|\d{3,}/;

const experience = experiences.map((job) => ({
  role: job.position,
  company: job.company,
  companyUrl: job.companyUrl,
  years: yearRange(job.startDate, job.endDate),
  location: job.location,
  summary: job.description.join(" "),
  // Surface the one achievement that carries a real number, if there is one.
  figure: job.achievements.find((a) => HAS_METRIC.test(a)),
  stack: job.skills,
}));

/* ------------------------------------------------------------------
   Selected work

   config/projects.ts holds the source data. This map supplies display
   titles (the config names carry subtitles and repo-style casing that
   don't set well at 22px) and the one metric worth quoting per project.
   ------------------------------------------------------------------ */

const WORK_META: Record<string, { title: string; figure?: string }> = {
  "3d-reconstruction": { title: "Snap2Scene" },
  "shopping-assistant": { title: "AI Shopping Assistant" },
  music: {
    title: "Music Recommendation from Facial Emotion",
    // Aditya's own figure — the repo README doesn't document it.
    figure:
      "Custom VGG16 and LeNet models trained on FER-2013, reaching 63.56% accuracy.",
  },
  "food-buddy": { title: "FoodBuddy" },
  nutrinova: { title: "NutriNova" },
};

const work = Projects.map((p) => {
  const meta = WORK_META[p.id];
  return {
    id: p.id,
    // Fall back to trimming the config subtitle if a project isn't mapped yet.
    title: meta?.title ?? p.companyName.split(" : ")[0],
    years: `${p.endDate.getFullYear()}`,
    summary: p.shortDescription,
    figure: meta?.figure,
    stack: p.techStack.slice(0, 6),
    link: p.websiteLink || p.githubLink,
  };
}).sort((a, b) => Number(b.years) - Number(a.years));

const year = new Date().getFullYear();

export default function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cleanups: Array<() => void> = [];

    /* ---- reveal on scroll (the only motion in the design) ---- */
    const items = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      items.forEach((el) => el.classList.add("is-in"));
    } else if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            el.classList.add("is-in");
            io.unobserve(el);
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
      );
      items.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    } else {
      items.forEach((el) => el.classList.add("is-in"));
    }

    /* ---- nav underline follows the section you're reading ---- */
    const links = Array.from(
      root.querySelectorAll<HTMLElement>("[data-navlink]")
    );
    const sections = links
      .map((link) => ({
        link,
        sec: document.getElementById(link.dataset.navlink || ""),
      }))
      .filter((x): x is { link: HTMLElement; sec: HTMLElement } => !!x.sec);

    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.3;
      let current: HTMLElement | null = null;
      sections.forEach((x) => {
        if (x.sec.offsetTop <= y) current = x.link;
      });
      sections.forEach((x) =>
        x.link.classList.toggle("is-active", x.link === current)
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div className="ed" ref={rootRef}>
      <header className="ed-head">
        <div className="ed-head-inner">
          <a href="#top" className="ed-wordmark">
            Aditya Sahani
          </a>
          <nav className="ed-nav">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} data-navlink={item.id}>
                {item.label}
              </a>
            ))}
            <a href={RESUME_URL} target="_blank" rel="noreferrer">
              CV
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* ---------- opening statement ---------- */}
        <section className="ed-hero">
          <div className="ed-wrap">
            <h1 data-reveal className="ed-hero-statement">
              I build AI agents and the backends that keep them{" "}
              <em>honest</em>.
            </h1>

            <div data-reveal className="ed-hero-now">
              <span className="ed-label ed-hero-now-label">Currently</span>
              <span className="ed-hero-now-value">
                AI Engineer at{" "}
                <a href="https://pattern.com" target="_blank" rel="noreferrer">
                  Pattern
                </a>
                , Pune, India
              </span>
            </div>

            <div data-reveal className="ed-hero-links">
              {elsewhere.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  {...(href.startsWith("mailto:")
                    ? {}
                    : { target: "_blank", rel: "noreferrer" })}
                >
                  <Icon size={14} strokeWidth={1.75} aria-hidden="true" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- about ---------- */}
        <section id="about" className="ed-section">
          <div className="ed-wrap">
            <div data-reveal className="ed-section-head">
              <h2 className="ed-label">About</h2>
            </div>

            <div className="ed-about">
              <div />
              <div data-reveal className="ed-prose">
                <p>
                  I&apos;m a software engineer who works where backend systems
                  meet applied machine learning — and I care most about the part
                  where something stops being a demo and starts being used.
                </p>
                <p>
                  Right now I&apos;m an AI engineer at Pattern, where I first
                  interned on agentic workflows and an auditing pipeline for
                  AI-generated product imagery. Before this I built a
                  supply-chain optimisation platform at Kimaru.ai — replacing
                  manual yarn planning and loom scheduling with an engine that
                  holds up in production — leading a team of five engineering
                  interns to do it. At Quark I shipped LLM systems for Japanese
                  enterprises: retrieval over internal knowledge bases,
                  document intelligence, and an agent that converts 2D CAD
                  drawings into parametric 3D models. Earlier, at Kennemer, I
                  scaled a Django and React platform past three thousand users
                  a day.
                </p>
                <p>
                  I like owning a feature end to end — schema, API, interface —
                  because the interesting problems usually hide in the seams
                  between those layers. I&apos;d rather ship something narrow
                  that works than something broad that demos well.
                </p>
                <p>
                  Outside of work I build things mostly to understand how they
                  work: comparing Gaussian Splatting against NeRF and
                  structure-from-motion for 3D reconstruction, training
                  emotion-recognition models from scratch, and wiring LLMs into
                  places they probably don&apos;t belong <em>yet</em>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- experience ---------- */}
        <section id="experience" className="ed-section">
          <div className="ed-wrap">
            <div data-reveal className="ed-section-head">
              <h2 className="ed-label">Experience</h2>
              <span className="ed-section-note">
                {experience.length} roles, 2024 to present
              </span>
            </div>

            {experience.map((job) => (
              <article
                key={`${job.company}-${job.years}`}
                data-reveal
                className="ed-entry"
              >
                <div className="ed-entry-years">{job.years}</div>
                <div>
                  <h3 className="ed-entry-title">{job.role}</h3>
                  <p className="ed-entry-org">
                    {job.companyUrl ? (
                      <a
                        className="ed-link"
                        href={job.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {job.company}
                      </a>
                    ) : (
                      job.company
                    )}
                    {" — "}
                    {job.location}
                  </p>
                  <p className="ed-entry-body">{job.summary}</p>
                  {job.figure && (
                    <p className="ed-entry-figure">{job.figure}</p>
                  )}
                  <Tags items={job.stack} />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- selected work ---------- */}
        <section id="work" className="ed-section">
          <div className="ed-wrap">
            <div data-reveal className="ed-section-head">
              <h2 className="ed-label">Selected work</h2>
              <span className="ed-section-note">
                {work.length} projects, deployed or open-sourced
              </span>
            </div>

            {work.map((p) => (
              <article key={p.id} data-reveal className="ed-entry">
                <div className="ed-entry-years">{p.years}</div>
                <div>
                  <h3 className="ed-entry-title">
                    {p.link ? (
                      <a href={p.link} target="_blank" rel="noreferrer">
                        {p.title}
                      </a>
                    ) : (
                      p.title
                    )}
                  </h3>
                  <p className="ed-entry-body">{p.summary}</p>
                  {p.figure && <p className="ed-entry-figure">{p.figure}</p>}
                  <Tags items={p.stack} />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- toolbox ---------- */}
        <section id="toolbox" className="ed-section">
          <div className="ed-wrap">
            <div data-reveal className="ed-section-head">
              <h2 className="ed-label">Toolbox</h2>
              <span className="ed-section-note">
                colour = domain, reused on every tag above
              </span>
            </div>

            <dl data-reveal className="ed-defs">
              {skillGroups.map((group) => (
                <div
                  key={group.category}
                  className="ed-def"
                  data-cat={CAT_BY_CATEGORY[group.category] ?? "none"}
                >
                  <dt className="ed-def-term">{group.category}</dt>
                  <dd className="ed-def-items">{group.items.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---------- contact ---------- */}
        <section id="contact" className="ed-contact">
          <div className="ed-wrap">
            <h2 data-reveal className="ed-contact-statement">
              Open to engineering roles and <em>genuinely</em> interesting
              problems.
            </h2>
            <p data-reveal className="ed-contact-body">
              I work across backend, frontend and applied ML — usually where
              those three meet. If you have something in that territory, write
              to me.
            </p>
            <a data-reveal href={`mailto:${EMAIL}`} className="ed-contact-email">
              {EMAIL}
            </a>
            {/* Email is already the large link above, so it's dropped here. */}
            <div data-reveal className="ed-contact-links">
              {elsewhere
                .filter(({ label }) => label !== "Email")
                .map(({ label, href, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer">
                    <Icon size={14} strokeWidth={1.75} aria-hidden="true" />
                    {label}
                  </a>
                ))}
            </div>
          </div>
        </section>

        <div className="ed-wrap">
          <footer className="ed-foot">
            <span>© {year} Aditya Sahani</span>
            <span>Pune, India</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
