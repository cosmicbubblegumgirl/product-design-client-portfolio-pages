import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const workspace = path.dirname(root);
const sourcePages = path.join(workspace, "vercel-apps-github-pages");

const projects = [
  {
    slug: "careflow",
    name: "CareFlow",
    title: "Clinical Triage Console",
    domain: "Healthcare SaaS",
    category: "Complex UX",
    metric: "30% faster nurse decision target",
    summary: "A high-trust triage workspace that turns messy patient intake into nurse-ready decisions.",
    tags: ["Healthcare UX", "Dashboard UX", "Workflow design"],
    color: "#0f766e"
  },
  {
    slug: "ledgerlift",
    name: "LedgerLift",
    title: "Cash Flow Forecasting",
    domain: "Fintech Dashboard",
    category: "Dashboards",
    metric: "Reduce surprise negative-cash events",
    summary: "A forecasting dashboard that helps small businesses understand cash risk before it becomes urgent.",
    tags: ["Fintech UX", "Data visualization", "Decision support"],
    color: "#2f5bea"
  },
  {
    slug: "shiftmate",
    name: "ShiftMate",
    title: "Workforce Scheduling",
    domain: "Operations SaaS",
    category: "SaaS",
    metric: "Improve 24-hour acknowledgement",
    summary: "A manager roster and employee mobile flow for swaps, coverage gaps, and schedule clarity.",
    tags: ["B2B SaaS", "Mobile UX", "Ops workflows"],
    color: "#9b5c20"
  },
  {
    slug: "returnready",
    name: "ReturnReady",
    title: "Reverse Logistics Portal",
    domain: "Ecommerce Operations",
    category: "Commerce",
    metric: "Decrease support contacts per return",
    summary: "A guided return portal that protects customer trust and gives warehouse teams better context.",
    tags: ["Ecommerce UX", "Service design", "Post-purchase"],
    color: "#b44125"
  },
  {
    slug: "learnloop",
    name: "LearnLoop",
    title: "Adaptive Course Builder",
    domain: "Edtech Product",
    category: "Complex UX",
    metric: "Improve course completion",
    summary: "A course builder that adapts learning paths without turning instructors into logic-tree builders.",
    tags: ["Edtech UX", "Authoring tools", "IA"],
    color: "#6d45d8"
  },
  {
    slug: "civiclink",
    name: "CivicLink",
    title: "Resident Service Hub",
    domain: "Govtech Service Design",
    category: "Service Design",
    metric: "Increase first-time submissions",
    summary: "An accessible municipal service hub for routing, tracking, and understanding public requests.",
    tags: ["Accessibility", "Govtech UX", "Forms"],
    color: "#246b3f"
  },
  {
    slug: "greengrid",
    name: "GreenGrid",
    title: "Building Energy Monitor",
    domain: "Climate Tech Dashboard",
    category: "Dashboards",
    metric: "Increase completed energy actions",
    summary: "An energy dashboard that turns facility meter data into prioritized action cards.",
    tags: ["Climate tech", "Dashboard UX", "Alerts"],
    color: "#1d7f49"
  },
  {
    slug: "hiresignal",
    name: "HireSignal",
    title: "Recruiting Pipeline",
    domain: "HR Tech SaaS",
    category: "SaaS",
    metric: "Shorten time in stage",
    summary: "A recruiting workspace for structured feedback, decision hygiene, and candidate communication.",
    tags: ["HR tech UX", "Enterprise SaaS", "Collaboration"],
    color: "#5b4bd6"
  },
  {
    slug: "dwellkit",
    name: "DwellKit",
    title: "Rental Maintenance",
    domain: "Proptech Mobile And Ops",
    category: "Service Design",
    metric: "Increase first-visit fix rate",
    summary: "A renter-to-vendor maintenance flow with guided reporting, triage, and job packets.",
    tags: ["Proptech UX", "Mobile UX", "Ops handoff"],
    color: "#7a5d2d"
  },
  {
    slug: "pantrypilot",
    name: "PantryPilot",
    title: "Grocery Refill Assistant",
    domain: "Consumer Commerce",
    category: "Commerce",
    metric: "Increase repeat basket completion",
    summary: "A grocery refill assistant with pantry memory, substitution controls, and checkout confidence.",
    tags: ["Consumer UX", "Commerce UX", "Personalization"],
    color: "#d18a14"
  }
];

const categories = ["All", ...Array.from(new Set(projects.map((project) => project.category)))];

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function tags(items) {
  return items.map((tag) => `<span>${esc(tag)}</span>`).join("");
}

function projectCard(project) {
  return `<article class="project-card" data-category="${esc(project.category)}" data-search="${esc(`${project.name} ${project.title} ${project.domain} ${project.summary} ${project.tags.join(" ")}`.toLowerCase())}">
    <a class="shot-link" href="projects/${project.slug}/" aria-label="Open ${esc(project.name)} project website">
      <img src="assets/app-shots/${project.slug}.svg" alt="${esc(project.name)} product website preview" loading="lazy" />
    </a>
    <div class="project-body">
      <div class="project-kicker">
        <span>${esc(project.domain)}</span>
        <strong>${esc(project.metric)}</strong>
      </div>
      <h3>${esc(project.name)} <span>${esc(project.title)}</span></h3>
      <p>${esc(project.summary)}</p>
      <div class="tag-row">${tags(project.tags)}</div>
      <div class="card-actions">
        <a class="button primary small" href="projects/${project.slug}/">View live site</a>
        <button class="button ghost small" type="button" data-open-project="${esc(project.slug)}">Case-study notes</button>
      </div>
    </div>
  </article>`;
}

function logoSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320" role="img" aria-labelledby="title">
  <title id="title">Simone Govender product design portfolio logo</title>
  <rect width="320" height="320" rx="72" fill="#111827"/>
  <circle cx="104" cy="108" r="54" fill="#14b8a6"/>
  <rect x="126" y="80" width="120" height="120" rx="34" fill="#f59e0b"/>
  <path d="M78 224c44-48 96-50 164-14" fill="none" stroke="#f8fafc" stroke-width="22" stroke-linecap="round"/>
  <text x="160" y="176" text-anchor="middle" fill="#fff" font-family="Arial, sans-serif" font-size="74" font-weight="900">SG</text>
</svg>
`;
}

function indexHtml() {
  return `<!doctype html>
<html lang="en" data-theme="light">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Simone Govender | Product Design Portfolio</title>
    <meta name="description" content="A sleek product design portfolio with interactive UX case studies, responsive product websites, and client-ready project demos." />
    <link rel="icon" href="assets/sg-logo.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <header class="topbar">
      <a class="brand" href="#top" aria-label="Simone Govender product design portfolio">
        <img src="assets/sg-logo.svg" alt="SG logo" />
        <span>
          <strong>Simone Govender</strong>
          <small>Product Design Portfolio</small>
        </span>
      </a>
      <nav aria-label="Portfolio navigation">
        <a href="#projects">Projects</a>
        <a href="#capabilities">Capabilities</a>
        <a href="#process">Process</a>
        <a href="#contact">Contact</a>
      </nav>
      <button class="theme-toggle" type="button" data-theme-toggle aria-label="Toggle dark and light mode">
        <span data-theme-icon>Dark</span>
      </button>
    </header>

    <main id="top">
      <section class="hero-section">
        <div class="hero-copy">
          <p class="eyebrow">Available for product design, UX/UI, dashboards, and polished web apps</p>
          <h1>Product design projects clients can actually click through.</h1>
          <p class="lead">A standalone portfolio site for sleek, responsive, interactive product concepts. Each project includes a live product website, UX case-study framing, custom logo, and working browser-based data behavior.</p>
          <div class="hero-actions">
            <a class="button primary" href="#projects">View the projects</a>
            <a class="button secondary" href="#contact">Start a project</a>
          </div>
          <p class="designed">Designed by me - Simone Govender</p>
        </div>
        <aside class="hero-console" aria-label="Portfolio metrics">
          <div class="console-top">
            <span></span><span></span><span></span>
            <strong>Client View</strong>
          </div>
          <div class="console-grid">
            <article><strong>10</strong><span>product websites</span></article>
            <article><strong>6</strong><span>UX domains</span></article>
            <article><strong>100%</strong><span>responsive</span></article>
            <article><strong>Live</strong><span>frontend + data demos</span></article>
          </div>
          <div class="activity-feed" data-feed></div>
        </aside>
      </section>

      <section id="capabilities" class="capability-band">
        <article>
          <span>01</span>
          <h2>UX Strategy</h2>
          <p>Problem framing, user flows, information architecture, and success metrics.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Interface Design</h2>
          <p>Clean responsive UI systems, dashboard layouts, product states, and conversion paths.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Interactive Builds</h2>
          <p>Client-viewable product websites with working forms, filters, saved state, and demos.</p>
        </article>
      </section>

      <section id="projects" class="project-section">
        <div class="section-heading">
          <p class="eyebrow">New Product Design Projects</p>
          <h2>Explore the project websites.</h2>
          <p>Filter by category, search by skill, or open any live site to see the full product concept and portfolio section.</p>
        </div>
        <div class="project-tools">
          <div class="filter-tabs" aria-label="Project filters">
            ${categories.map((category) => `<button type="button" class="${category === "All" ? "active" : ""}" data-filter="${esc(category)}">${esc(category)}</button>`).join("")}
          </div>
          <label class="search-box">
            <span>Search projects</span>
            <input type="search" data-search placeholder="Try fintech, dashboard, healthcare, mobile..." />
          </label>
        </div>
        <div class="project-grid" data-project-grid>
          ${projects.map(projectCard).join("")}
        </div>
      </section>

      <section id="process" class="process-section">
        <div class="section-heading">
          <p class="eyebrow">How I Work</p>
          <h2>Clear process, polished output, practical handoff.</h2>
        </div>
        <ol class="process-list">
          <li><span>01</span><strong>Frame the product problem</strong><p>Define audience, workflow, constraints, business goal, and what the design needs to prove.</p></li>
          <li><span>02</span><strong>Map flows and states</strong><p>Shape the journey, empty states, decision points, data states, and handoff requirements.</p></li>
          <li><span>03</span><strong>Design the interface</strong><p>Build responsive screens with strong hierarchy, clean UI, and client-ready visual polish.</p></li>
          <li><span>04</span><strong>Launch a viewable demo</strong><p>Package the project as a working website so clients and employers can click through the idea.</p></li>
        </ol>
      </section>

      <section id="contact" class="contact-section">
        <div>
          <p class="eyebrow">Client Inquiry</p>
          <h2>Tell me what you want designed.</h2>
          <p>This form saves locally in the browser as a working portfolio demo. For real work, send the same brief through your preferred hiring platform.</p>
        </div>
        <form data-inquiry-form>
          <label>Name<input required name="name" placeholder="Your name" /></label>
          <label>Project type<input required name="type" placeholder="Website, dashboard, app, UX redesign..." /></label>
          <label>Project notes<textarea required name="notes" rows="4" placeholder="Describe the product, audience, and goal"></textarea></label>
          <button class="button primary" type="submit">Save inquiry</button>
          <p data-inquiry-status aria-live="polite"></p>
        </form>
      </section>
    </main>

    <dialog class="project-dialog" data-project-dialog>
      <button class="close-button" type="button" data-close-dialog aria-label="Close project notes">Close</button>
      <div data-dialog-content></div>
    </dialog>

    <footer>
      <img src="assets/sg-logo.svg" alt="" aria-hidden="true" />
      <p><strong>Designed by me - Simone Govender.</strong> Product design, UX/UI, responsive frontend builds, and client-viewable project demos.</p>
    </footer>

    <script>
      window.PORTFOLIO_PROJECTS = ${JSON.stringify(projects)};
    </script>
    <script src="app.js"></script>
  </body>
</html>
`;
}

function styles() {
  return `:root {
  color-scheme: light;
  --bg: #f6f5ef;
  --paper: #ffffff;
  --ink: #141717;
  --muted: #65706c;
  --line: #d9ddd4;
  --brand: #0f766e;
  --brand-2: #d97706;
  --shadow: rgba(20, 23, 23, 0.11);
}

[data-theme="dark"] {
  color-scheme: dark;
  --bg: #090d10;
  --paper: #10171b;
  --ink: #eef7f4;
  --muted: #9fb0ab;
  --line: #263236;
  --brand: #2dd4bf;
  --brand-2: #f59e0b;
  --shadow: rgba(0, 0, 0, 0.38);
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  color: var(--ink);
  background:
    radial-gradient(circle at top left, color-mix(in srgb, var(--brand) 18%, transparent), transparent 28rem),
    radial-gradient(circle at 80% 10%, color-mix(in srgb, var(--brand-2) 18%, transparent), transparent 24rem),
    var(--bg);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
a { color: inherit; }

.topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 14px max(18px, calc((100vw - 1180px) / 2));
  background: color-mix(in srgb, var(--paper) 88%, transparent);
  border-bottom: 1px solid var(--line);
  backdrop-filter: blur(20px);
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  min-width: 0;
}
.brand img, footer img {
  width: 44px;
  height: 44px;
  border-radius: 15px;
  box-shadow: 0 14px 30px var(--shadow);
}
.brand span { display: grid; line-height: 1.15; }
.brand strong { font-size: 0.98rem; }
.brand small { color: var(--muted); font-weight: 800; }
nav { display: flex; gap: 8px; }
nav a, .theme-toggle, .button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 10px 14px;
  border-radius: 999px;
  font-weight: 900;
  text-decoration: none;
  white-space: nowrap;
}
nav a { color: var(--muted); }
.theme-toggle {
  border: 1px solid var(--line);
  color: var(--ink);
  background: var(--paper);
  cursor: pointer;
}

.hero-section, .capability-band, .project-section, .process-section, .contact-section, footer {
  width: min(1180px, calc(100% - 36px));
  margin: 0 auto;
}
.hero-section {
  min-height: 82vh;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(390px, 0.72fr);
  gap: clamp(28px, 6vw, 86px);
  align-items: center;
  padding: 58px 0 34px;
}
.eyebrow {
  margin: 0 0 12px;
  color: var(--brand);
  font-size: 0.78rem;
  font-weight: 950;
  letter-spacing: 0;
  text-transform: uppercase;
}
h1, h2 {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  letter-spacing: 0;
  line-height: 1.02;
}
h1 { max-width: 860px; font-size: clamp(3.1rem, 7vw, 7rem); }
.lead, .section-heading p, .hero-copy p:not(.eyebrow), .project-card p, .process-list p, .contact-section p, footer p {
  color: var(--muted);
  line-height: 1.68;
}
.lead { max-width: 760px; font-size: clamp(1.06rem, 1.5vw, 1.32rem); }
.hero-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
.button { border: 0; cursor: pointer; }
.button.primary { color: #fff; background: var(--ink); }
[data-theme="dark"] .button.primary { color: #071011; background: #f8fafc; }
.button.secondary, .button.ghost { color: var(--ink); background: var(--paper); border: 1px solid var(--line); }
.button.small { min-height: 38px; padding: 8px 12px; font-size: 0.9rem; }
.designed { margin-top: 18px; font-weight: 900; }

.hero-console, .capability-band article, .project-card, .process-list li, .contact-section, .project-dialog {
  background: color-mix(in srgb, var(--paper) 94%, transparent);
  border: 1px solid var(--line);
  border-radius: 8px;
  box-shadow: 0 22px 70px var(--shadow);
}
.console-top {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 58px;
  padding: 0 20px;
  color: #fff;
  background: #111827;
  border-radius: 8px 8px 0 0;
}
.console-top span { width: 12px; height: 12px; border-radius: 50%; background: var(--brand); }
.console-top span:nth-child(2) { background: var(--brand-2); }
.console-top span:nth-child(3) { background: #fff; opacity: 0.6; }
.console-top strong { margin-left: auto; }
.console-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--line); }
.console-grid article { display: grid; gap: 4px; padding: 20px; background: var(--paper); }
.console-grid strong { color: var(--brand); font-size: 1.8rem; }
.console-grid span { color: var(--muted); font-weight: 850; }
.activity-feed { display: grid; gap: 10px; padding: 18px; }
.activity-feed article {
  display: grid;
  grid-template-columns: 10px 1fr;
  gap: 12px;
  align-items: start;
  padding: 12px;
  background: color-mix(in srgb, var(--bg) 72%, var(--paper));
  border-radius: 8px;
}
.activity-feed article::before { content: ""; width: 10px; height: 10px; margin-top: 7px; border-radius: 50%; background: var(--brand); }
.activity-feed strong { display: block; }
.activity-feed span { color: var(--muted); font-size: 0.9rem; }

.capability-band {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  padding: 34px 0;
}
.capability-band article { padding: 22px; }
.capability-band span, .project-kicker span, .portfolio-note span, .process-list span {
  color: var(--brand);
  font-weight: 950;
  text-transform: uppercase;
  font-size: 0.78rem;
}
.capability-band h2 { margin-top: 12px; font-size: 1.3rem; }
.capability-band p { color: var(--muted); line-height: 1.62; }

.project-section, .process-section, .contact-section { padding: 44px 0; }
.section-heading { max-width: 780px; margin-bottom: 20px; }
.section-heading h2, .contact-section h2 { font-size: clamp(2.1rem, 4vw, 4.2rem); }
.project-tools {
  display: grid;
  grid-template-columns: 1fr minmax(260px, 360px);
  gap: 14px;
  align-items: end;
  margin-bottom: 16px;
}
.filter-tabs { display: flex; flex-wrap: wrap; gap: 8px; }
.filter-tabs button {
  min-height: 40px;
  padding: 9px 13px;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--muted);
  background: var(--paper);
  font-weight: 900;
  cursor: pointer;
}
.filter-tabs button.active { color: #fff; background: var(--ink); }
[data-theme="dark"] .filter-tabs button.active { color: #071011; background: #f8fafc; }
.search-box { display: grid; gap: 7px; color: var(--muted); font-weight: 850; }
.search-box input, .contact-section input, .contact-section textarea {
  width: 100%;
  padding: 13px 14px;
  color: var(--ink);
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 8px;
  font: inherit;
}
.project-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
.project-card { overflow: hidden; }
.project-card[hidden] { display: none; }
.shot-link img { display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover; border-bottom: 1px solid var(--line); }
.project-body { display: grid; gap: 12px; padding: 18px; }
.project-kicker { display: flex; justify-content: space-between; gap: 12px; align-items: start; }
.project-kicker strong { color: var(--muted); font-size: 0.82rem; text-align: right; }
.project-card h3 { margin: 0; font-size: 1.35rem; line-height: 1.12; }
.project-card h3 span { display: block; color: var(--muted); font-size: 1rem; font-weight: 800; }
.tag-row, .card-actions { display: flex; flex-wrap: wrap; gap: 8px; }
.tag-row span { padding: 7px 9px; border-radius: 999px; color: var(--ink); background: color-mix(in srgb, var(--brand) 12%, var(--paper)); font-size: 0.82rem; font-weight: 850; }

.process-list { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; padding: 0; margin: 0; list-style: none; }
.process-list li { padding: 22px; }
.process-list strong { display: block; margin-top: 12px; font-size: 1.05rem; }

.contact-section { display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1fr); gap: 24px; padding: 28px; }
.contact-section form { display: grid; gap: 13px; }
.contact-section label { display: grid; gap: 7px; color: var(--muted); font-weight: 850; }
.contact-section textarea { resize: vertical; }
[data-inquiry-status] { min-height: 24px; margin: 0; color: var(--brand); font-weight: 900; }

.project-dialog { width: min(760px, calc(100% - 28px)); color: var(--ink); padding: 0; }
.project-dialog::backdrop { background: rgba(0, 0, 0, 0.58); backdrop-filter: blur(5px); }
.close-button { float: right; margin: 14px; border: 1px solid var(--line); border-radius: 999px; padding: 8px 12px; color: var(--ink); background: var(--paper); font-weight: 900; cursor: pointer; }
.dialog-body { clear: both; padding: 24px; }
.dialog-body h2 { font-size: clamp(2rem, 4vw, 3.5rem); }
.dialog-body p { color: var(--muted); line-height: 1.68; }
.dialog-list { display: grid; gap: 10px; margin-top: 18px; }
.dialog-list article { padding: 14px; border: 1px solid var(--line); border-radius: 8px; }
.dialog-list strong { display: block; margin-bottom: 5px; }

footer { display: flex; align-items: center; gap: 14px; padding: 38px 0 58px; }
footer p { margin: 0; }

@media (max-width: 980px) {
  .topbar { position: static; flex-wrap: wrap; }
  nav { order: 3; width: 100%; overflow-x: auto; padding-bottom: 4px; }
  .hero-section, .contact-section, .project-tools { grid-template-columns: 1fr; }
  .capability-band, .project-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .process-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 680px) {
  .hero-section, .capability-band, .project-section, .process-section, .contact-section, footer {
    width: min(430px, calc(100% - 24px));
  }
  .hero-section { min-height: auto; padding-top: 34px; }
  .hero-actions, .capability-band, .project-grid, .process-list, .console-grid { grid-template-columns: 1fr; display: grid; }
  .project-kicker { display: grid; }
  .project-kicker strong { text-align: left; }
}
`;
}

function appJs() {
  return `(() => {
  const root = document.documentElement;
  const projects = window.PORTFOLIO_PROJECTS || [];
  const savedTheme = localStorage.getItem("sg-product-portfolio-theme") || "light";
  root.dataset.theme = savedTheme;

  const themeButton = document.querySelector("[data-theme-toggle]");
  const themeIcon = document.querySelector("[data-theme-icon]");
  function syncThemeLabel() {
    if (themeIcon) themeIcon.textContent = root.dataset.theme === "dark" ? "Light" : "Dark";
  }
  syncThemeLabel();
  themeButton?.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("sg-product-portfolio-theme", root.dataset.theme);
    syncThemeLabel();
  });

  const feed = document.querySelector("[data-feed]");
  if (feed) {
    feed.innerHTML = projects.slice(0, 4).map((project) =>
      '<article><div><strong>' + project.name + '</strong><span>' + project.domain + ' - ' + project.metric + '</span></div></article>'
    ).join("");
  }

  const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
  const cards = Array.from(document.querySelectorAll(".project-card"));
  const search = document.querySelector("[data-search]");
  let activeFilter = "All";

  function applyFilters() {
    const q = (search?.value || "").trim().toLowerCase();
    cards.forEach((card) => {
      const category = card.dataset.category;
      const haystack = card.dataset.search || "";
      const visible = (activeFilter === "All" || category === activeFilter) && (!q || haystack.includes(q));
      card.hidden = !visible;
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter || "All";
      filterButtons.forEach((item) => item.classList.toggle("active", item === button));
      applyFilters();
    });
  });
  search?.addEventListener("input", applyFilters);

  const dialog = document.querySelector("[data-project-dialog]");
  const dialogContent = document.querySelector("[data-dialog-content]");
  document.querySelectorAll("[data-open-project]").forEach((button) => {
    button.addEventListener("click", () => {
      const project = projects.find((item) => item.slug === button.dataset.openProject);
      if (!project || !dialog || !dialogContent) return;
      dialogContent.innerHTML =
        '<div class="dialog-body">' +
        '<p class="eyebrow">' + project.domain + '</p>' +
        '<h2>' + project.name + ' ' + project.title + '</h2>' +
        '<p>' + project.summary + '</p>' +
        '<div class="dialog-list">' +
        '<article><strong>Primary metric</strong><span>' + project.metric + '</span></article>' +
        '<article><strong>UX signals</strong><span>' + project.tags.join(", ") + '</span></article>' +
        '<article><strong>Client value</strong><span>Live responsive product website, custom logo, portfolio case-study section, and working browser data demo.</span></article>' +
        '</div>' +
        '<p><a class="button primary" href="projects/' + project.slug + '/">Open live project website</a></p>' +
        '</div>';
      dialog.showModal();
    });
  });
  document.querySelector("[data-close-dialog]")?.addEventListener("click", () => dialog?.close());

  const form = document.querySelector("[data-inquiry-form]");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const rows = JSON.parse(localStorage.getItem("sg-product-portfolio-inquiries") || "[]");
    rows.unshift({ ...data, createdAt: new Date().toISOString() });
    localStorage.setItem("sg-product-portfolio-inquiries", JSON.stringify(rows));
    form.reset();
    const status = document.querySelector("[data-inquiry-status]");
    if (status) status.textContent = "Saved locally. Your portfolio demo form is working.";
  });
})();
`;
}

async function copyProjectSites() {
  await mkdir(path.join(root, "projects"), { recursive: true });
  await mkdir(path.join(root, "assets", "app-icons"), { recursive: true });
  await mkdir(path.join(root, "assets", "app-shots"), { recursive: true });

  await cp(path.join(sourcePages, "assets", "product-sites.css"), path.join(root, "assets", "product-sites.css"));
  await cp(path.join(sourcePages, "assets", "product-sites.js"), path.join(root, "assets", "product-sites.js"));

  for (const project of projects) {
    await cp(path.join(sourcePages, "apps", project.slug), path.join(root, "projects", project.slug), { recursive: true });
    await cp(path.join(sourcePages, "assets", "app-icons", `${project.slug}.svg`), path.join(root, "assets", "app-icons", `${project.slug}.svg`));
    await cp(path.join(sourcePages, "assets", "app-shots", `${project.slug}.svg`), path.join(root, "assets", "app-shots", `${project.slug}.svg`));
  }
}

async function main() {
  await mkdir(path.join(root, "assets"), { recursive: true });
  await copyProjectSites();
  await writeFile(path.join(root, ".nojekyll"), "", "utf8");
  await writeFile(path.join(root, "assets", "sg-logo.svg"), logoSvg(), "utf8");
  await writeFile(path.join(root, "index.html"), indexHtml(), "utf8");
  await writeFile(path.join(root, "styles.css"), styles(), "utf8");
  await writeFile(path.join(root, "app.js"), appJs(), "utf8");
  await writeFile(path.join(root, "README.md"), `# Simone Govender Product Design Portfolio

Standalone GitHub Pages site for 10 product design project websites.

## Included

- Sleek responsive homepage
- Dark/light theme toggle
- Project filtering and search
- Interactive case-study modal
- Working inquiry form using localStorage
- 10 live product website demos under \`projects/\`

## Local Preview

Run a static server from this folder and open the generated URL.
`, "utf8");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
