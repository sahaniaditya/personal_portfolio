"use client";

import { useEffect, useRef } from "react";

import { experiences } from "@/config/experience";
import { Projects } from "@/config/projects";
import { skills } from "@/config/skills";
import { SocialLinks } from "@/config/socials";

import "./portfolio.css";

const RESUME_URL =
  "https://drive.google.com/file/d/1mgEmrs6RghceDPHCXs0sJ2ava00DNnMO/view";
const EMAIL = "adityasahani893@gmail.com";
const GITHUB = "https://github.com/sahaniaditya";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** "MMM YYYY". An end date earlier than the start (a sentinel for the
 *  current role in the data) renders as "Present". */
function formatPeriod(start: Date, end: Date | "Present"): string {
  const s = `${MONTHS[start.getMonth()]} ${start.getFullYear()}`;
  if (end === "Present" || end.getTime() < start.getTime()) {
    return `${s} – Present`;
  }
  return `${s} – ${MONTHS[end.getMonth()]} ${end.getFullYear()}`;
}

const navItems = [
  { id: "experience", label: "experience" },
  { id: "skills", label: "skills" },
  { id: "projects", label: "projects" },
  { id: "launches", label: "highlights" },
  { id: "contact", label: "contact" },
];

const heroStats = [
  { value: "8.56", label: "CGPA · IIT Jodhpur" },
  { value: `${Projects.length}+`, label: "projects shipped" },
  { value: "∞", label: "cups of coffee" },
];

// Experience straight from config, with cleaned periods.
const experience = experiences.map((job) => ({
  role: job.position,
  company: job.company,
  period: formatPeriod(job.startDate, job.endDate),
  summary: job.description.join(" "),
  stack: job.skills,
}));

// Flat skill list grouped into categories for the toolbox cards.
const SKILL_GROUPS: { tag: string; category: string; match: string[] }[] = [
  { tag: "~/languages", category: "Languages", match: ["Python", "Typescript", "Javascript", "HTML 5", "CSS 3"] },
  { tag: "~/frontend", category: "Frontend", match: ["React", "Next.js", "Tailwind CSS", "Material UI", "Bootstrap", "Redux", "React Native"] },
  { tag: "~/backend", category: "Backend & Data", match: ["Node.js", "express.js", "MongoDB", "MySQL"] },
  { tag: "~/ai-infra", category: "AI & Cloud", match: ["LLMs", "AWS", "Netlify"] },
];
const skillNames = skills.map((s) => s.name);
const skillGroups = SKILL_GROUPS.map((g) => ({
  tag: g.tag,
  category: g.category,
  items: g.match.filter((m) => skillNames.includes(m)),
}));

// Projects from config.
const projects = Projects.map((p) => ({
  name: p.companyName,
  year: `${p.endDate.getFullYear()}`,
  desc: p.shortDescription,
  tags: p.techStack.slice(0, 3),
  link: p.websiteLink || p.githubLink || "#",
}));

// "Launches" repurposed as shipped-project highlights with real metrics.
const launches = [
  {
    glyph: "◆",
    name: "3D Scene Reconstruction",
    status: "live",
    desc: "Multi-technique 3D reconstruction (Gaussian Splatting, NeRF, SfM, Pix2Vox) deployed as an interactive web demo.",
    metric: "Live",
    metricLabel: "HuggingFace Space",
    link: "https://huggingface.co/spaces/adirathor07/snap2scene",
  },
  {
    glyph: "♪",
    name: "Music Recommender",
    status: "live",
    desc: "Suggests music from facial emotion using custom VGG16 / LeNet models trained on FER-2013.",
    metric: "63.56%",
    metricLabel: "model accuracy",
    link: "https://github.com/sahaniaditya/MusicRecommendationBasedOnFacialExpression",
  },
  {
    glyph: "⚡",
    name: "AI Shopping Assistant",
    status: "shipped",
    desc: "Voice-enabled e-commerce chatbot with deep product research and smart ranking via SerpAPI + Google Gemini.",
    metric: "Gemini",
    metricLabel: "AI-powered",
    link: "https://github.com/sahaniaditya/shopping-assistant",
  },
  {
    glyph: "◇",
    name: "FoodBuddy",
    status: "shipped",
    desc: "Full-stack food ordering platform with auth, saved favorites, price filtering and a cart system.",
    metric: "MERN",
    metricLabel: "full-stack",
    link: "https://github.com/sahaniaditya/FoodBuddy",
  },
];

const socials = [
  ...SocialLinks.map((s) => ({ label: `${s.name} →`, href: s.link })),
  { label: "Résumé →", href: RESUME_URL },
];

const year = new Date().getFullYear();

export default function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer:fine)").matches;
    const cleanups: Array<() => void> = [];

    // ---- count-up ----
    const countUp = (el: HTMLElement) => {
      if ((el as any)._counted) return;
      const text = (el.textContent || "").trim();
      const m = text.match(/^([^\d-]*)(-?[\d,]*\.?\d+)(.*)$/);
      if (!m) return;
      (el as any)._counted = true;
      const prefix = m[1];
      const suffix = m[3];
      const numStr = m[2].replace(/,/g, "");
      const target = parseFloat(numStr);
      const decimals = (numStr.split(".")[1] || "").length;
      const hasComma = /,/.test(m[2]);
      const fmt = (v: number) => {
        let s = v.toFixed(decimals);
        if (hasComma) s = Number(s).toLocaleString("en-US");
        return prefix + s + suffix;
      };
      if (reduce) { el.textContent = fmt(target); return; }
      const dur = 1100;
      const start = performance.now();
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        el.textContent = fmt(target * ease(p));
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = fmt(target);
      };
      requestAnimationFrame(tick);
    };

    // ---- text scramble ----
    const scramble = (el: HTMLElement, delay: number) => {
      if ((el as any)._scrambled) return;
      (el as any)._scrambled = true;
      const final = el.textContent || "";
      if (reduce) return;
      const chars = "!<>-_\\/[]{}=+*^?#01x";
      const dur = 620;
      const run = () => {
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          const revealed = Math.floor(p * final.length);
          let out = "";
          for (let i = 0; i < final.length; i++) {
            const c = final[i];
            if (i < revealed || c === " " || c === "/" || c === "→") out += c;
            else out += chars[Math.floor(Math.random() * chars.length)];
          }
          el.textContent = out;
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = final;
        };
        requestAnimationFrame(tick);
      };
      window.setTimeout(run, delay);
    };

    // ---- scroll reveal ----
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const pending = new Set(items);
    const reveal = (el: HTMLElement, delay: number) => {
      pending.delete(el);
      el.style.transitionDelay = `${delay}ms`;
      el.classList.add("is-in");
      const targets = [el, ...Array.from(el.querySelectorAll<HTMLElement>("[data-count],[data-scramble]"))];
      targets.forEach((t) => {
        if (t.hasAttribute("data-scramble")) scramble(t, delay);
        if (t.hasAttribute("data-count")) window.setTimeout(() => countUp(t), delay + 120);
      });
    };
    const check = () => {
      const vh = window.innerHeight;
      let batch = 0;
      items.forEach((el) => {
        if (!pending.has(el)) return;
        if (el.getBoundingClientRect().top < vh * 0.92) {
          reveal(el, batch * 70);
          batch++;
        }
      });
    };
    requestAnimationFrame(() => requestAnimationFrame(check));
    const onReveal = () => requestAnimationFrame(check);
    window.addEventListener("scroll", onReveal, { passive: true });
    window.addEventListener("resize", onReveal, { passive: true });
    cleanups.push(() => {
      window.removeEventListener("scroll", onReveal);
      window.removeEventListener("resize", onReveal);
    });
    const safety = window.setTimeout(() => {
      Array.from(pending).forEach((el, i) => reveal(el, i * 40));
    }, 2600);
    cleanups.push(() => window.clearTimeout(safety));

    // ---- scroll spy + progress ----
    const links = Array.from(root.querySelectorAll<HTMLElement>("[data-navlink][data-target]"));
    const sections = links
      .map((l) => ({ link: l, sec: document.getElementById(l.getAttribute("data-target") || "") }))
      .filter((x): x is { link: HTMLElement; sec: HTMLElement } => !!x.sec);
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.32;
      let current: { link: HTMLElement; sec: HTMLElement } | null = null;
      sections.forEach((x) => {
        if (x.sec.offsetTop <= y) current = x;
      });
      sections.forEach((x) => x.link.classList.toggle("is-active", x === current));
      const el = progressRef.current;
      if (el) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
        el.style.width = `${Math.min(100, Math.max(0, pct))}%`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    // ---- 3D tilt ----
    if (fine && !reduce) {
      root.querySelectorAll<HTMLElement>("[data-tilt]").forEach((card) => {
        const onMove = (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          card.style.transition = "transform .08s ease-out, border-color .3s, box-shadow .3s";
          card.style.transform = `perspective(800px) rotateY(${(px * 7).toFixed(2)}deg) rotateX(${(-py * 7).toFixed(2)}deg) translateY(-5px)`;
        };
        const onLeave = () => {
          card.style.transition = "transform .5s cubic-bezier(.2,.7,.2,1), border-color .3s, box-shadow .3s";
          card.style.transform = "none";
        };
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    // ---- cursor spotlight ----
    if (fine && spotRef.current) {
      const spot = spotRef.current;
      let raf: number | null = null;
      let mx = 0, my = 0;
      const move = (e: MouseEvent) => {
        mx = e.clientX; my = e.clientY;
        spot.style.opacity = "1";
        if (!raf) {
          raf = requestAnimationFrame(() => {
            spot.style.left = `${mx}px`;
            spot.style.top = `${my}px`;
            raf = null;
          });
        }
      };
      window.addEventListener("mousemove", move, { passive: true });
      cleanups.push(() => window.removeEventListener("mousemove", move));
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div className="acp" ref={rootRef}>
      {/* ambient background */}
      <div className="acp-grid" />
      <div className="acp-glow acp-glow--1" />
      <div className="acp-glow acp-glow--2" />
      <div className="acp-spot" ref={spotRef} />

      {/* scroll progress */}
      <div className="acp-progress" ref={progressRef} />

      {/* NAV */}
      <nav className="acp-nav">
        <a href="#home" className="acp-brand" data-navlink data-target="home">
          <span className="acp-brand-badge">A</span>
          <span>aditya<span style={{ color: "var(--accent)" }}>.dev</span></span>
        </a>
        <div className="acp-navlinks">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="acp-navlink"
              data-navlink
              data-target={item.id}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <main className="acp-main">
        {/* HERO */}
        <section id="home" className="acp-hero">
          <div>
            <div data-reveal className="acp-badge">
              <span className="acp-badge-dot" />
              available for new work
            </div>
            <p data-reveal data-scramble className="acp-prompt">$ whoami</p>
            <h1 data-reveal className="acp-name">
              Aditya<br />Sahani<span style={{ color: "var(--accent)" }}>.</span>
            </h1>
            <p data-reveal className="acp-role">&lt;Full Stack Developer &amp; AI/ML Engineer /&gt;</p>
            <p data-reveal className="acp-bio">
              Hi, I&apos;m Aditya — a coder, creator, and problem-solver. From
              full-stack apps to AI-driven workflows and computer-vision pipelines,
              I love turning fuzzy ideas into tech that ships and gets used.
            </p>
            <div data-reveal className="acp-cta-row">
              <a href="#projects" className="acp-btn acp-btn--primary">view work →</a>
              <a href={GITHUB} target="_blank" rel="noreferrer" className="acp-btn acp-btn--ghost">github</a>
              <a href={RESUME_URL} target="_blank" rel="noreferrer" className="acp-btn acp-btn--ghost">résumé</a>
            </div>
            <div data-reveal className="acp-stats">
              {heroStats.map((s) => (
                <div key={s.label}>
                  <span data-count className="acp-stat-val">{s.value}</span>
                  {s.label}
                </div>
              ))}
            </div>
          </div>

          {/* terminal card */}
          <div data-reveal className="acp-term-wrap">
            <div className="acp-term-glow" />
            <div className="acp-term">
              <div className="acp-term-bar">
                <span className="acp-dot" style={{ background: "#ff5f56" }} />
                <span className="acp-dot" style={{ background: "#ffbd2e" }} />
                <span className="acp-dot" style={{ background: "#27c93f" }} />
                <span className="acp-term-title">aditya@portfolio: ~</span>
              </div>
              <div className="acp-term-body">
                <div style={{ color: "var(--muted)" }}>
                  <span style={{ color: "var(--accent)" }}>➜</span>{" "}
                  <span style={{ color: "var(--cyan)" }}>~</span> cat profile.json
                </div>
                <div style={{ color: "var(--text)" }}>{"{"}</div>
                <div className="ind"><span style={{ color: "var(--cyan)" }}>&quot;role&quot;</span>: <span style={{ color: "#ffd479" }}>&quot;Full Stack + AI/ML Engineer&quot;</span>,</div>
                <div className="ind"><span style={{ color: "var(--cyan)" }}>&quot;focus&quot;</span>: [<span style={{ color: "#ffd479" }}>&quot;web&quot;</span>, <span style={{ color: "#ffd479" }}>&quot;AI/ML&quot;</span>, <span style={{ color: "#ffd479" }}>&quot;systems&quot;</span>],</div>
                <div className="ind"><span style={{ color: "var(--cyan)" }}>&quot;based&quot;</span>: <span style={{ color: "#ffd479" }}>&quot;IIT Jodhpur, India&quot;</span>,</div>
                <div className="ind"><span style={{ color: "var(--cyan)" }}>&quot;shipping&quot;</span>: <span style={{ color: "var(--accent)" }}>true</span></div>
                <div style={{ color: "var(--text)" }}>{"}"}</div>
                <div style={{ color: "var(--muted)", marginTop: 10 }}>
                  <span style={{ color: "var(--accent)" }}>➜</span>{" "}
                  <span style={{ color: "var(--cyan)" }}>~</span> ./build --status
                </div>
                <div style={{ color: "var(--accent)" }}>
                  ✓ all systems operational<span className="acp-caret" />
                </div>
              </div>
              <div className="acp-scan" />
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="acp-section">
          <div data-reveal className="acp-section-head">
            <p data-scramble className="acp-eyebrow">{"// 01 — experience"}</p>
            <h2 className="acp-h2">Where I&apos;ve shipped</h2>
          </div>
          <div className="acp-timeline">
            {experience.map((job, i) => (
              <div key={`${job.company}-${i}`} data-reveal className="acp-job">
                <span className="acp-job-dot" />
                <div className="acp-job-head">
                  <h3 className="acp-job-role">
                    {job.role} <span style={{ color: "var(--accent)" }}>@ {job.company}</span>
                  </h3>
                  <span className="acp-job-period">{job.period}</span>
                </div>
                <p className="acp-job-summary">{job.summary}</p>
                <div className="acp-chips">
                  {job.stack.map((t) => (
                    <span key={t} className="acp-chip">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="acp-section">
          <div data-reveal className="acp-section-head">
            <p data-scramble className="acp-eyebrow">{"// 02 — skills"}</p>
            <h2 className="acp-h2">Toolbox</h2>
          </div>
          <div className="acp-skill-grid">
            {skillGroups.map((group) => (
              <div key={group.category} data-reveal className="acp-card">
                <span className="acp-card-tag">{group.tag}</span>
                <h3 className="acp-card-cat">{group.category}</h3>
                <div className="acp-chips">
                  {group.items.map((skill) => (
                    <span key={skill} className="acp-chip--plain">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="acp-section">
          <div data-reveal className="acp-section-head">
            <p data-scramble className="acp-eyebrow">{"// 03 — projects"}</p>
            <h2 className="acp-h2">Selected work</h2>
          </div>
          <div className="acp-project-grid">
            {projects.map((p) => (
              <a
                key={p.name}
                href={p.link}
                target="_blank"
                rel="noreferrer"
                data-reveal
                data-tilt
                className="acp-project"
              >
                <div className="acp-project-top">
                  <span className="acp-project-year">{p.year}</span>
                  <span style={{ color: "var(--accent)", fontSize: 18 }}>↗</span>
                </div>
                <h3 className="acp-project-name">{p.name}</h3>
                <p className="acp-project-desc">{p.desc}</p>
                <div className="acp-chips">
                  {p.tags.map((t) => (
                    <span key={t} className="acp-chip">{t}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* LAUNCHES / HIGHLIGHTS */}
        <section id="launches" className="acp-section">
          <div data-reveal className="acp-section-head">
            <p data-scramble className="acp-eyebrow">{"// 04 — highlights"}</p>
            <h2 className="acp-h2">Things I&apos;ve shipped</h2>
            <p className="acp-lede">Projects that made it past the demo — deployed, open-sourced, or used by real people.</p>
          </div>
          <div className="acp-launches">
            {launches.map((l) => (
              <a
                key={l.name}
                href={l.link}
                target="_blank"
                rel="noreferrer"
                data-reveal
                className="acp-launch"
                style={{ textDecoration: "none" }}
              >
                <div className="acp-launch-glyph">{l.glyph}</div>
                <div>
                  <div className="acp-launch-head">
                    <h3 className="acp-launch-name">{l.name}</h3>
                    <span className="acp-launch-status">{l.status}</span>
                  </div>
                  <p className="acp-launch-desc">{l.desc}</p>
                </div>
                <div className="acp-launch-metrics">
                  <div data-count className="acp-launch-metric">{l.metric}</div>
                  <div className="acp-launch-metric-label">{l.metricLabel}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="acp-section" style={{ paddingBottom: 70 }}>
          <div data-reveal className="acp-contact-card">
            <p data-scramble className="acp-eyebrow">{"// 05 — contact"}</p>
            <h2 className="acp-contact-h">Let&apos;s build<br />something good.</h2>
            <p className="acp-contact-p">
              Open to engineering roles, collaborations, and the occasional ambitious side project.
            </p>
            <a href={`mailto:${EMAIL}`} className="acp-contact-btn">ping {EMAIL}</a>
            <div className="acp-socials">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="acp-social">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <footer className="acp-footer">
          <span>© {year} Aditya Sahani</span>
          <span>designed &amp; built with <span className="heart">♥</span> and too much coffee</span>
        </footer>
      </main>
    </div>
  );
}
