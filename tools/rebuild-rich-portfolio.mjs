import { cp, mkdir, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const workspace = path.dirname(root);
const sourceGallery = path.join(workspace, "vercel-apps-github-pages");
const quantumSource = path.join(sourceGallery, "apps", "quantum-portfolio-rebuild");
const customProfileSource = path.join(root, "assets", "quantum", "simone-profile-source.png");

const upworkProfile = "https://www.upwork.com/freelancers/~01f0edf7fdbc830b61";
const currentSite = "https://cosmicbubblegumgirl.github.io/product-design-client-portfolio-pages";
let certificateFiles = [];

const importedProjects = [
  {
    slug: "codies-catch-compass",
    name: "CodiesCatchCompass",
    category: "Fishing Companion",
    link: "https://cosmicbubblegumgirl.github.io/vercel-apps-github-pages/apps/codies-catch-compass/",
    icon: "assets/imported-icons/codies-catch-compass.svg",
    shot: "assets/imported-shots/codies-catch-compass.png",
    summary: "Ramsgate Beach fishing map, conditions, catch tracker, species guide, and private journal.",
    proof: "Shows local product thinking, useful environmental data, and a niche-friendly interface."
  },
  {
    slug: "doodledrift",
    name: "DoodleDrift",
    category: "Creative Community",
    link: "https://cosmicbubblegumgirl.github.io/vercel-apps-github-pages/apps/doodledrift/",
    icon: "assets/imported-icons/doodledrift.svg",
    shot: "assets/imported-shots/doodledrift.png",
    summary: "Art, music, story posts, creative prompts, profiles, and playful browser-based creation tools.",
    proof: "Shows creative direction, community UX, and expressive frontend interaction."
  },
  {
    slug: "aurafit",
    name: "KindStride",
    category: "Wellness Web App",
    link: "https://cosmicbubblegumgirl.github.io/vercel-apps-github-pages/apps/aurafit/",
    icon: "assets/imported-icons/aurafit.svg",
    shot: "assets/imported-shots/aurafit.png",
    summary: "Gentle planning, calorie estimate tools, progress board, private messages, and support flow.",
    proof: "Shows sensitive UX, habit design, user state, and a calm service experience."
  },
  {
    slug: "taskforge",
    name: "SprintSmith",
    category: "Product Ops",
    link: "https://cosmicbubblegumgirl.github.io/vercel-apps-github-pages/apps/taskforge/",
    icon: "assets/imported-icons/taskforge.svg",
    shot: "assets/imported-shots/taskforge.png",
    summary: "Product board, todo sync, Pomodoro tools, plan cards, workspace reports, and activity data.",
    proof: "Shows dashboard design, workflow state, and productivity product UX."
  },
  {
    slug: "vaultpay",
    name: "VaultPay",
    category: "Fintech",
    link: "https://cosmicbubblegumgirl.github.io/vercel-apps-github-pages/apps/vaultpay/",
    icon: "assets/imported-icons/vaultpay.svg",
    shot: "assets/imported-shots/vaultpay.png",
    summary: "Account dashboard, card controls, risk lab, transfer flow, vault sliders, and CSV export.",
    proof: "Shows trust-focused visual hierarchy and financial product interactions."
  },
  {
    slug: "novabite",
    name: "NovaBite",
    category: "Restaurant",
    link: "https://cosmicbubblegumgirl.github.io/vercel-apps-github-pages/apps/novabite/",
    icon: "assets/imported-icons/novabite.svg",
    shot: "assets/imported-shots/novabite.png",
    summary: "Fine-dining menu discovery, custom menu builder, booking flow, and polished launch content.",
    proof: "Shows hospitality conversion UX, visual taste, and booking-centered interaction."
  },
  {
    slug: "deductomatic",
    name: "Deductomatic",
    category: "Tax Tools",
    link: "https://cosmicbubblegumgirl.github.io/deductomatic/",
    icon: "assets/imported-icons/deductomatic.svg",
    shot: "assets/imported-shots/deductomatic.png",
    summary: "South African tax, budgeting, deduction, and planning tools with a calculator-first workflow.",
    proof: "Shows calculator UX, input clarity, and practical data interaction."
  },
  {
    slug: "carbon-crumbs",
    name: "Carbon Crumbs",
    category: "Sustainability",
    link: "https://cosmicbubblegumgirl.github.io/carbon-crumbs/",
    icon: "assets/imported-icons/carbon-crumbs.svg",
    shot: "assets/imported-shots/carbon-crumbs.png",
    summary: "Habit-friendly carbon tracking, local saved state, visual insights, and sustainability nudges.",
    proof: "Shows impact design, local persistence, and approachable climate UX."
  },
  {
    slug: "mind-check",
    name: "Mind Check / Moonbeam Mind",
    category: "Reflection UX",
    link: "https://cosmicbubblegumgirl.github.io/vercel-apps-github-pages/apps/mind-check/",
    icon: "assets/imported-icons/mind-check.svg",
    shot: "assets/imported-shots/mind-check.png",
    summary: "Calm check-in flows, reflection tools, inspiration prompts, and a private browser quiz app.",
    proof: "Shows form UX, emotional design, saved state, and wellness-oriented product thinking."
  }
];

const timeline = [
  ["2014-2018", "Education foundation", "Bachelor of Education foundation that supports clear explanation, research, structure, and user-friendly content."],
  ["2025", "Data and analytics", "Google Data Analytics and Microsoft Power BI learning translated into dashboard thinking and evidence-led product decisions."],
  ["2025", "Frontend and UX", "JavaScript, responsive interfaces, validation, theme systems, and UX writing for polished product experiences."],
  ["2026", "Full stack delivery", "IBM Full-Stack JavaScript pathway covering React, Node, Express, GitHub, containers, microservices, and capstone delivery."],
  ["Now", "Client-ready builds", "A portfolio of published web apps, static products, calculators, dashboards, and service websites."]
];

const proofItems = [
  ["Full stack growth", "IBM Full-Stack JavaScript Developer Professional Certificate, Node and Express, GitHub, DevOps, microservices, and containers."],
  ["UX design", "Google UX Design Professional Certificate plus practical product flows, forms, onboarding, and dashboard UX."],
  ["Data fluency", "Google Data Analytics and Microsoft Power BI signals for dashboards, reporting, and decision-focused interfaces."],
  ["Project management", "Google Project Management certificate and service-minded planning for client-ready delivery."],
  ["Testing awareness", "Software testing and automation learning, with web and mobile testing coursework reflected in stronger handoff thinking."],
  ["Business thinking", "Business Foundations and SAP Technology Consultant learning translated into stakeholder-aware systems thinking."]
];

const badgeItems = [
  "IBM Full-Stack JavaScript Developer Professional Certificate",
  "Application Development using Microservices and Serverless",
  "JavaScript Full Stack Capstone Project",
  "Containers and Kubernetes Essentials",
  "Cloud Native, DevOps, Agile and NoSQL Essentials",
  "Node and Express Essentials",
  "JavaScript Programming Essentials",
  "Software Engineering Essentials",
  "Google Data Analytics Professional Certificate",
  "Google Project Management Professional Certificate",
  "Google UX Design Professional Certificate"
];

const buildLogs = [
  ["Proof-first portfolio", "Turned a project list into a client-facing hub with filters, proof sections, project cards, and live demos."],
  ["Upwork-safe conversion", "Removed direct off-platform contact capture and positioned inquiries as local planning tools with Upwork as the hiring path."],
  ["Live projects", "Connected the public app projects and product websites into one client-viewable project gallery."],
  ["Unique product sites", "Rebuilt the 10 product concepts with distinct visual systems, logos, multi-page navigation, and domain-specific demos."],
  ["Full stack signal", "Reframed the homepage around full stack web development, UX design, product design, and innovative thinking."]
];

const productSites = [
  {
    slug: "careflow",
    name: "CareFlow",
    title: "Clinical Triage Console",
    domain: "Healthcare SaaS",
    category: "Complex UX",
    vibe: "clinical",
    color: "#0f766e",
    accent: "#f97316",
    dark: "#10211f",
    soft: "#ecfdf7",
    icon: "pulse",
    tagline: "A calmer triage command center for busy clinics.",
    summary: "CareFlow ranks patient intakes by urgency, missing context, and nurse handoff readiness.",
    pages: ["Triage", "Patient Intake", "Case Study", "Live Demo"],
    features: ["Risk flags", "Completeness scoring", "Escalation notes", "Audit-friendly handoff"],
    demo: {
      type: "triage",
      label: "Triage Simulator",
      prompt: "Adjust acuity to see how the queue reacts.",
      fields: ["Pain severity", "Wait time", "Missing data"],
      result: "Nurse priority score"
    }
  },
  {
    slug: "ledgerlift",
    name: "LedgerLift",
    title: "Cash Flow Forecasting",
    domain: "Fintech Dashboard",
    category: "Dashboards",
    vibe: "finance",
    color: "#2563eb",
    accent: "#10b981",
    dark: "#111827",
    soft: "#eef4ff",
    icon: "chart",
    tagline: "Cash-flow foresight for small business decisions.",
    summary: "LedgerLift models runway, invoice risk, taxes, and scenario changes in plain language.",
    pages: ["Forecast", "Scenario Lab", "Case Study", "Live Demo"],
    features: ["Runway forecast", "Invoice confidence", "Scenario toggles", "Accountant notes"],
    demo: {
      type: "forecast",
      label: "Runway Calculator",
      prompt: "Move the sliders to model a cash crunch.",
      fields: ["Starting cash", "Expected invoices", "Expenses"],
      result: "Estimated runway"
    }
  },
  {
    slug: "shiftmate",
    name: "ShiftMate",
    title: "Workforce Scheduling",
    domain: "Operations SaaS",
    category: "SaaS",
    vibe: "ops",
    color: "#92400e",
    accent: "#0891b2",
    dark: "#231b12",
    soft: "#fff7ed",
    icon: "grid",
    tagline: "Roster clarity before shift chaos starts.",
    summary: "ShiftMate gives managers coverage insight and employees a mobile-first swap flow.",
    pages: ["Roster", "Swap Flow", "Case Study", "Live Demo"],
    features: ["Coverage gaps", "Swap eligibility", "Overtime risk", "Change digest"],
    demo: {
      type: "schedule",
      label: "Roster Builder",
      prompt: "Assign coverage and watch the risk score change.",
      fields: ["Open shifts", "Overtime risk", "Acknowledgements"],
      result: "Coverage health"
    }
  },
  {
    slug: "returnready",
    name: "ReturnReady",
    title: "Reverse Logistics Portal",
    domain: "Ecommerce Operations",
    category: "Commerce",
    vibe: "commerce",
    color: "#b45309",
    accent: "#0f766e",
    dark: "#261710",
    soft: "#fff7ed",
    icon: "package",
    tagline: "Returns that keep customers and warehouses aligned.",
    summary: "ReturnReady guides shoppers through eligibility, resolution choice, evidence upload, and tracking.",
    pages: ["Returns Portal", "Warehouse View", "Case Study", "Live Demo"],
    features: ["Eligibility clarity", "Exchange-first UX", "Photo evidence", "Intake labels"],
    demo: {
      type: "returns",
      label: "Return Router",
      prompt: "Choose a reason and resolution to route the return.",
      fields: ["Item condition", "Resolution", "Evidence quality"],
      result: "Return path"
    }
  },
  {
    slug: "learnloop",
    name: "LearnLoop",
    title: "Adaptive Course Builder",
    domain: "Edtech Product",
    category: "Complex UX",
    vibe: "learning",
    color: "#7c3aed",
    accent: "#f59e0b",
    dark: "#21143d",
    soft: "#f5f3ff",
    icon: "path",
    tagline: "Adaptive learning without intimidating instructors.",
    summary: "LearnLoop lets trainers build objective-led paths, checkpoints, and learner confidence feedback.",
    pages: ["Course Builder", "Learner Path", "Case Study", "Live Demo"],
    features: ["Objective mapping", "Adaptive checkpoints", "Confidence prompts", "Cohort insights"],
    demo: {
      type: "learning",
      label: "Path Recommender",
      prompt: "Set confidence and quiz score to see the next lesson.",
      fields: ["Quiz score", "Confidence", "Time available"],
      result: "Recommended path"
    }
  },
  {
    slug: "civiclink",
    name: "CivicLink",
    title: "Resident Service Hub",
    domain: "Govtech Service Design",
    category: "Service Design",
    vibe: "civic",
    color: "#166534",
    accent: "#d97706",
    dark: "#102016",
    soft: "#f0fdf4",
    icon: "map",
    tagline: "Public service requests people can actually understand.",
    summary: "CivicLink routes resident issues, supports accessible forms, and shows next-step status.",
    pages: ["Report Issue", "Status Tracker", "Case Study", "Live Demo"],
    features: ["Issue finder", "Accessible forms", "Department routing", "Status language"],
    demo: {
      type: "civic",
      label: "Issue Router",
      prompt: "Pick a request type and see where it routes.",
      fields: ["Issue type", "Urgency", "Location detail"],
      result: "Department route"
    }
  },
  {
    slug: "greengrid",
    name: "GreenGrid",
    title: "Building Energy Monitor",
    domain: "Climate Tech Dashboard",
    category: "Dashboards",
    vibe: "climate",
    color: "#15803d",
    accent: "#0284c7",
    dark: "#0f2116",
    soft: "#ecfdf5",
    icon: "leaf",
    tagline: "Energy data that becomes action, not noise.",
    summary: "GreenGrid turns facility anomalies into prioritized action cards with impact estimates.",
    pages: ["Energy Monitor", "Action Board", "Case Study", "Live Demo"],
    features: ["Anomaly confidence", "Savings estimate", "Owner assignment", "Monthly impact"],
    demo: {
      type: "energy",
      label: "Energy Impact Lab",
      prompt: "Adjust usage and savings to calculate impact.",
      fields: ["Usage spike", "Confidence", "Action effort"],
      result: "Priority score"
    }
  },
  {
    slug: "hiresignal",
    name: "HireSignal",
    title: "Recruiting Pipeline",
    domain: "HR Tech SaaS",
    category: "SaaS",
    vibe: "hr",
    color: "#4f46e5",
    accent: "#0891b2",
    dark: "#171339",
    soft: "#f4f2ff",
    icon: "people",
    tagline: "Hiring decisions with less drift and more evidence.",
    summary: "HireSignal structures feedback, stage ownership, candidate updates, and decision summaries.",
    pages: ["Pipeline", "Scorecards", "Case Study", "Live Demo"],
    features: ["Stage age", "Evidence scorecards", "Decision summary", "Candidate updates"],
    demo: {
      type: "hiring",
      label: "Pipeline Health Check",
      prompt: "Change feedback readiness and stage age to estimate risk.",
      fields: ["Stage age", "Feedback complete", "Candidate updates"],
      result: "Pipeline risk"
    }
  },
  {
    slug: "dwellkit",
    name: "DwellKit",
    title: "Rental Maintenance",
    domain: "Proptech Mobile And Ops",
    category: "Service Design",
    vibe: "property",
    color: "#7c5c2d",
    accent: "#0e7490",
    dark: "#231f18",
    soft: "#faf7ef",
    icon: "home",
    tagline: "Maintenance requests with better context from the start.",
    summary: "DwellKit captures guided issue reports, triage rules, vendor packets, and renter status.",
    pages: ["Renter Report", "Vendor Packet", "Case Study", "Live Demo"],
    features: ["Photo prompts", "Emergency routing", "Access windows", "Resolution status"],
    demo: {
      type: "maintenance",
      label: "Maintenance Triage",
      prompt: "Classify an issue and generate the vendor packet.",
      fields: ["Issue severity", "Photo quality", "Access clarity"],
      result: "Fix readiness"
    }
  },
  {
    slug: "pantrypilot",
    name: "PantryPilot",
    title: "Grocery Refill Assistant",
    domain: "Consumer Commerce",
    category: "Commerce",
    vibe: "grocery",
    color: "#ca8a04",
    accent: "#16a34a",
    dark: "#28200f",
    soft: "#fff8df",
    icon: "basket",
    tagline: "Weekly groceries rebuilt with memory and control.",
    summary: "PantryPilot remembers staples, explains recommendations, and prevents risky substitutions.",
    pages: ["Weekly Refill", "Pantry Memory", "Case Study", "Live Demo"],
    features: ["Staple memory", "Substitution rules", "Checkout confidence", "Delivery feedback"],
    demo: {
      type: "grocery",
      label: "Basket Confidence",
      prompt: "Tune pantry memory and substitutions to score the basket.",
      fields: ["Staples found", "Substitution risk", "Budget fit"],
      result: "Basket confidence"
    }
  }
];

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function safeJson(value) {
  return JSON.stringify(value).replaceAll("</", "<\\/");
}

function pageTitle(project, page) {
  return page === "home" ? `${project.name} | ${project.title}` : `${project.name} | ${page}`;
}

function logoSvg(project) {
  const shapes = {
    pulse: `<path d="M42 164h50l26-72 58 146 34-74h68" fill="none" stroke="${project.color}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>`,
    chart: `<path d="M66 220V96m0 124h190" fill="none" stroke="${project.dark}" stroke-width="16" stroke-linecap="round"/><path d="M88 198c34-64 58-18 88-68 22-38 46-34 76-14" fill="none" stroke="${project.color}" stroke-width="18" stroke-linecap="round"/>`,
    grid: `<rect x="62" y="82" width="196" height="156" rx="24" fill="none" stroke="${project.dark}" stroke-width="14"/><path d="M62 134h196M62 186h196M128 82v156M194 82v156" stroke="${project.color}" stroke-width="12"/>`,
    package: `<path d="M66 104l94-48 94 48-94 50-94-50Z" fill="${project.color}"/><path d="M66 104v110l94 50 94-50V104M160 154v110" fill="none" stroke="${project.dark}" stroke-width="14" stroke-linejoin="round"/>`,
    path: `<circle cx="82" cy="218" r="28" fill="${project.color}"/><circle cx="236" cy="88" r="28" fill="${project.accent}"/><path d="M110 214c74-10 38-112 98-122" fill="none" stroke="${project.dark}" stroke-width="16" stroke-linecap="round" stroke-dasharray="22 18"/>`,
    map: `<path d="M68 86l64-30 56 28 64-28v178l-64 30-56-28-64 28V86Z" fill="none" stroke="${project.dark}" stroke-width="14"/><path d="M132 56v180M188 84v180" stroke="${project.color}" stroke-width="12"/><circle cx="160" cy="148" r="26" fill="${project.accent}"/>`,
    leaf: `<path d="M78 208c6-104 92-160 174-138 10 86-42 168-124 166-24-1-40-10-50-28Z" fill="${project.color}"/><path d="M82 232c44-76 88-118 168-160" fill="none" stroke="${project.dark}" stroke-width="15" stroke-linecap="round"/>`,
    people: `<circle cx="118" cy="116" r="34" fill="${project.color}"/><circle cx="208" cy="116" r="30" fill="${project.accent}"/><path d="M62 230c10-54 48-82 94-82s84 28 94 82" fill="none" stroke="${project.dark}" stroke-width="16" stroke-linecap="round"/>`,
    home: `<path d="M58 150l102-86 102 86v96a12 12 0 0 1-12 12h-58v-70h-64v70H70a12 12 0 0 1-12-12v-96Z" fill="${project.soft}" stroke="${project.dark}" stroke-width="14"/><path d="M112 154h96" stroke="${project.color}" stroke-width="16" stroke-linecap="round"/>`,
    basket: `<path d="M86 118l74-70 74 70" fill="none" stroke="${project.dark}" stroke-width="14" stroke-linecap="round"/><path d="M58 124h204l-24 118H82L58 124Z" fill="${project.color}"/><path d="M112 156v50M160 156v50M208 156v50" stroke="#fff" stroke-width="12" stroke-linecap="round"/>`
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320" role="img" aria-labelledby="title">
  <title id="title">${esc(project.name)} logo</title>
  <rect width="320" height="320" rx="72" fill="${project.soft}"/>
  <circle cx="248" cy="72" r="34" fill="${project.accent}" opacity=".85"/>
  ${shapes[project.icon]}
</svg>`;
}

function shotSvg(project) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" role="img" aria-labelledby="title">
  <title id="title">${esc(project.name)} preview</title>
  <rect width="1200" height="675" fill="${project.soft}"/>
  <rect x="64" y="64" width="1072" height="547" rx="34" fill="#fff" stroke="${project.color}" stroke-opacity=".22" stroke-width="3"/>
  <rect x="104" y="112" width="220" height="58" rx="29" fill="${project.dark}"/>
  <circle cx="136" cy="141" r="18" fill="${project.color}"/>
  <text x="166" y="149" fill="#fff" font-family="Arial, sans-serif" font-weight="800" font-size="24">${esc(project.name)}</text>
  <text x="104" y="250" fill="${project.dark}" font-family="Georgia, serif" font-size="62" font-weight="700">${esc(project.tagline)}</text>
  <rect x="104" y="306" width="470" height="18" rx="9" fill="${project.dark}" opacity=".2"/>
  <rect x="104" y="344" width="390" height="18" rx="9" fill="${project.dark}" opacity=".14"/>
  <rect x="104" y="424" width="156" height="54" rx="27" fill="${project.dark}"/>
  <rect x="282" y="424" width="156" height="54" rx="27" fill="${project.color}"/>
  <g transform="translate(710 135)">
    <rect width="310" height="390" rx="28" fill="${project.dark}"/>
    <rect x="34" y="42" width="118" height="14" rx="7" fill="#fff" opacity=".45"/>
    <rect x="34" y="90" width="230" height="96" rx="22" fill="${project.color}"/>
    <rect x="34" y="220" width="108" height="86" rx="20" fill="${project.accent}"/>
    <rect x="166" y="220" width="108" height="86" rx="20" fill="#fff" opacity=".18"/>
    <rect x="34" y="338" width="196" height="24" rx="12" fill="#fff"/>
  </g>
</svg>`;
}

function tags(items) {
  return items.map((item) => `<span>${esc(item)}</span>`).join("");
}

function importedCard(project) {
  return `<article class="project-card imported" data-type="Live App" data-search="${esc(`${project.name} ${project.category} ${project.summary} ${project.proof}`.toLowerCase())}">
    <a class="shot-link" href="${esc(project.link)}" target="_blank" rel="noreferrer">
      <img src="${esc(project.shot)}" alt="${esc(project.name)} screenshot" loading="lazy" />
    </a>
    <div class="project-body">
      <div class="project-kicker"><span>${esc(project.category)}</span><strong>Published project</strong></div>
      <h3>${esc(project.name)}</h3>
      <p>${esc(project.summary)}</p>
      <p class="proof-line">${esc(project.proof)}</p>
      <a class="button secondary small" href="${esc(project.link)}" target="_blank" rel="noreferrer">View live project</a>
    </div>
  </article>`;
}

function productCard(project) {
  return `<article class="project-card product" data-type="Product Website" data-search="${esc(`${project.name} ${project.title} ${project.domain} ${project.category} ${project.summary} ${project.features.join(" ")}`.toLowerCase())}">
    <a class="shot-link" href="projects/${project.slug}/">
      <img src="assets/app-shots/${project.slug}.svg" alt="${esc(project.name)} preview" loading="lazy" />
    </a>
    <div class="project-body">
      <div class="project-kicker"><span>${esc(project.domain)}</span><strong>${esc(project.category)}</strong></div>
      <h3>${esc(project.name)} <span>${esc(project.title)}</span></h3>
      <p>${esc(project.summary)}</p>
      <div class="tag-row">${tags(project.features.slice(0, 3))}</div>
      <div class="card-actions">
        <a class="button primary small" href="projects/${project.slug}/">Open site</a>
        <a class="button ghost small" href="projects/${project.slug}/case-study.html">Case study</a>
      </div>
    </div>
  </article>`;
}

function indexHtml() {
  return `<!doctype html>
<html lang="en" data-theme="light">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Simone Govender | Full Stack Web Developer, UX Designer & Product Designer</title>
    <meta name="description" content="Upwork-safe portfolio for a full stack web developer, UX designer, product designer, and innovative thinker with live product demos and imported project proof." />
    <link rel="icon" href="assets/sg-logo.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <header class="topbar">
      <a class="brand" href="#top" aria-label="Simone Govender full stack web developer portfolio">
        <img src="assets/sg-logo.svg" alt="SG logo" />
        <span><strong>Simone Govender</strong><small>Full Stack Web Developer, UX Designer, Product Designer & Innovative Thinker</small></span>
      </a>
      <nav aria-label="Portfolio navigation">
        <a href="#proof">Proof</a>
        <a href="#projects">Projects</a>
        <a href="#process">Process</a>
      </nav>
      <button class="theme-toggle" type="button" data-theme-toggle aria-label="Toggle dark and light mode"><span data-theme-icon>Dark</span></button>
    </header>
    <main id="top">
      <section class="hero-section">
        <div class="hero-copy">
          <p class="eyebrow">Upwork-safe portfolio hub</p>
          <h1>Full stack web builds with UX clarity and product design imagination.</h1>
          <p class="lead">I design and build polished, responsive, interactive web products that clients can inspect. This hub combines live app projects, portfolio proof, and product websites with distinct brands, pages, and interactions.</p>
          <div class="hero-actions">
            <a class="button primary" href="#projects">Explore the work</a>
            <a class="button secondary" href="${upworkProfile}" target="_blank" rel="noreferrer">Hire through Upwork</a>
          </div>
          <p class="notice">No direct email, phone, or off-platform contact capture. Spec concepts are clearly framed as portfolio work.</p>
        </div>
        <aside class="hero-console" aria-label="Portfolio metrics">
          <div class="console-top"><span></span><span></span><span></span><strong>Portfolio OS</strong></div>
          <div class="console-grid">
            <article><strong>${importedProjects.length}</strong><span>live app projects</span></article>
            <article><strong>${productSites.length}</strong><span>unique product sites</span></article>
            <article><strong>${badgeItems.length}</strong><span>credential signals</span></article>
            <article><strong>0</strong><span>off-platform contact traps</span></article>
          </div>
          <div class="activity-feed" data-feed></div>
        </aside>
      </section>

      <section id="proof" class="section proof-section">
        <div class="section-heading">
          <p class="eyebrow">Everything from the portfolio, made Upwork-safe</p>
          <h2>Proof, credentials, build logs, and capability signals.</h2>
          <p>The original Quantum portfolio content is folded into this page as proof blocks, minus direct off-platform contact CTAs.</p>
        </div>
        <div class="proof-layout">
          <figure class="portrait-card">
            <img src="assets/quantum/simone-profile.png" alt="Portrait of Simone Govender" />
            <figcaption><strong>Simone Govender</strong><span>Creative full stack web developer with UX, product, data, and teaching foundations.</span></figcaption>
          </figure>
          <div class="proof-grid">${proofItems.map(([title, body]) => `<article><span>Proof</span><h3>${esc(title)}</h3><p>${esc(body)}</p></article>`).join("")}</div>
        </div>
      </section>

      <section class="section">
        <div class="section-heading"><p class="eyebrow">Skill timeline</p><h2>How the stack evolved.</h2></div>
        <div class="timeline-grid">${timeline.map(([date, title, body]) => `<article><span>${esc(date)}</span><h3>${esc(title)}</h3><p>${esc(body)}</p></article>`).join("")}</div>
      </section>

      <section class="section split-section">
        <div>
          <p class="eyebrow">Credential wall</p>
          <h2>Badge and certificate signals.</h2>
          <p>Kept as skill evidence, not as a contact pathway. Verification can happen inside an Upwork conversation if needed.</p>
        </div>
        <div class="badge-cloud">${badgeItems.map((badge) => `<span>${esc(badge)}</span>`).join("")}</div>
      </section>

      <section class="section">
        <div class="section-heading">
          <p class="eyebrow">Certificate gallery</p>
          <h2>Visual proof from the original portfolio.</h2>
          <p>Certificate images from the Quantum portfolio are included here as capability evidence while the hiring conversation remains on Upwork.</p>
        </div>
        <div class="certificate-grid">
          ${certificateFiles.map((file) => `<a class="certificate-card" href="assets/quantum/certificates/${esc(file)}" target="_blank" rel="noreferrer"><img src="assets/quantum/certificates/${esc(file)}" alt="${esc(file.replace(/\.[^.]+$/, "").replaceAll("-", " "))} certificate" loading="lazy"/><span>${esc(file.replace(/\.[^.]+$/, "").replaceAll("-", " "))}</span></a>`).join("")}
        </div>
      </section>

      <section class="section">
        <div class="section-heading"><p class="eyebrow">Build logs</p><h2>Evidence of how I think.</h2></div>
        <div class="log-grid">${buildLogs.map(([title, body]) => `<article><span>Decision</span><h3>${esc(title)}</h3><p>${esc(body)}</p></article>`).join("")}</div>
      </section>

      <section id="projects" class="section project-section">
        <div class="section-heading">
          <p class="eyebrow">Live projects</p>
          <h2>All live builds in one portfolio.</h2>
          <p>Explore public apps and product websites with responsive screens, demos, case-study pages, and client-viewable interactions.</p>
        </div>
        <div class="project-tools">
          <div class="filter-tabs"><button class="active" type="button" data-filter="All">All Projects</button><button type="button" data-filter="Live App">Live Apps</button><button type="button" data-filter="Product Website">Product Websites</button></div>
          <label class="search-box"><span>Search all work</span><input type="search" data-search placeholder="Try fintech, wellness, dashboard, UX..." /></label>
        </div>
        <div class="project-grid" data-project-grid>${[...importedProjects.map(importedCard), ...productSites.map(productCard)].join("")}</div>
      </section>

      <section id="process" class="section process-section">
        <div class="section-heading"><p class="eyebrow">How I work</p><h2>Design sense plus implementation discipline.</h2></div>
        <ol class="process-list">
          <li><span>01</span><strong>Frame the product</strong><p>Clarify the audience, workflow, business goal, constraints, and proof needed.</p></li>
          <li><span>02</span><strong>Design the UX</strong><p>Map flows, screens, states, microcopy, and accessibility concerns before polishing visuals.</p></li>
          <li><span>03</span><strong>Build the experience</strong><p>Create responsive pages, working browser interactions, data persistence, and handoff-ready structure.</p></li>
          <li><span>04</span><strong>Keep it Upwork-safe</strong><p>Use honest portfolio labels and route work conversations through Upwork.</p></li>
        </ol>
      </section>

      <section class="section upwork-section">
        <div><p class="eyebrow">Ready to discuss a project?</p><h2>Start through Upwork.</h2><p>This site is a portfolio and planning aid. It does not collect direct contact information or ask clients to move conversations off-platform.</p></div>
        <a class="button primary" href="${upworkProfile}" target="_blank" rel="noreferrer">Open Upwork profile</a>
      </section>
    </main>
    <footer>
      <img src="assets/sg-logo.svg" alt="" aria-hidden="true" />
      <p><strong>Designed by me, Simone Govender.</strong> Full stack web development, UX design, product design, responsive builds, and client-viewable product demos.</p>
    </footer>
    <script>window.PORTFOLIO_DATA=${safeJson({ importedProjects, productSites })};</script>
    <script src="app.js"></script>
  </body>
</html>`;
}

function mainStyles() {
  return `:root{color-scheme:light;--bg:#f7f5ef;--paper:#fff;--ink:#141717;--muted:#65706c;--line:#d9ddd4;--brand:#0f766e;--brand2:#d97706;--shadow:rgba(20,23,23,.11)}[data-theme=dark]{color-scheme:dark;--bg:#090d10;--paper:#10171b;--ink:#eef7f4;--muted:#9fb0ab;--line:#263236;--brand:#2dd4bf;--brand2:#f59e0b;--shadow:rgba(0,0,0,.38)}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;color:var(--ink);background:radial-gradient(circle at top left,color-mix(in srgb,var(--brand) 18%,transparent),transparent 28rem),radial-gradient(circle at 80% 10%,color-mix(in srgb,var(--brand2) 18%,transparent),transparent 24rem),var(--bg);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}a{color:inherit}.topbar{position:sticky;top:0;z-index:20;display:flex;align-items:center;justify-content:space-between;gap:18px;padding:14px max(18px,calc((100vw - 1180px)/2));background:color-mix(in srgb,var(--paper) 88%,transparent);border-bottom:1px solid var(--line);backdrop-filter:blur(20px)}.brand{display:inline-flex;align-items:center;gap:10px;text-decoration:none;min-width:0}.brand img,footer img{width:44px;height:44px;border-radius:15px;box-shadow:0 14px 30px var(--shadow)}.brand span{display:grid;min-width:0;line-height:1.15}.brand strong{font-size:.98rem}.brand small{max-width:clamp(260px,34vw,560px);color:var(--muted);font-weight:800;line-height:1.2;white-space:normal}nav{display:flex;gap:8px}nav a,.theme-toggle,.button{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:10px 14px;border-radius:999px;font-weight:900;text-decoration:none;white-space:nowrap}nav a{color:var(--muted)}.theme-toggle{border:1px solid var(--line);color:var(--ink);background:var(--paper);cursor:pointer}.hero-section,.section,footer{width:min(1180px,calc(100% - 36px));margin:0 auto}.hero-section{min-height:82vh;display:grid;grid-template-columns:minmax(0,1fr) minmax(390px,.72fr);gap:clamp(28px,6vw,86px);align-items:center;padding:58px 0 34px}.eyebrow{margin:0 0 12px;color:var(--brand);font-size:.78rem;font-weight:950;letter-spacing:0;text-transform:uppercase}h1,h2{margin:0;font-family:Georgia,"Times New Roman",serif;letter-spacing:0;line-height:1.02}h1{max-width:900px;font-size:clamp(3rem,7vw,6.8rem)}h2{font-size:clamp(2rem,4vw,4rem)}.lead,.section-heading p,.hero-copy p:not(.eyebrow),.project-card p,.process-list p,.log-grid p,.timeline-grid p,.proof-grid p,.upwork-section p,footer p{color:var(--muted);line-height:1.68}.lead{max-width:760px;font-size:clamp(1.06rem,1.5vw,1.32rem)}.hero-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:24px}.button{border:0;cursor:pointer}.button.primary{color:#fff;background:var(--ink)}[data-theme=dark] .button.primary{color:#071011;background:#f8fafc}.button.secondary,.button.ghost{color:var(--ink);background:var(--paper);border:1px solid var(--line)}.button.small{min-height:38px;padding:8px 12px;font-size:.9rem}.notice{font-weight:850}.hero-console,.portrait-card,.proof-grid article,.timeline-grid article,.log-grid article,.project-card,.process-list li,.upwork-section,.certificate-card{background:color-mix(in srgb,var(--paper) 94%,transparent);border:1px solid var(--line);border-radius:8px;box-shadow:0 22px 70px var(--shadow)}.console-top{display:flex;align-items:center;gap:8px;min-height:58px;padding:0 20px;color:#fff;background:#111827;border-radius:8px 8px 0 0}.console-top span{width:12px;height:12px;border-radius:50%;background:var(--brand)}.console-top span:nth-child(2){background:var(--brand2)}.console-top span:nth-child(3){background:#fff;opacity:.6}.console-top strong{margin-left:auto}.console-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--line)}.console-grid article{display:grid;gap:4px;padding:20px;background:var(--paper)}.console-grid strong{color:var(--brand);font-size:1.8rem}.console-grid span{color:var(--muted);font-weight:850}.activity-feed{display:grid;gap:10px;padding:18px}.activity-feed article{display:grid;grid-template-columns:10px 1fr;gap:12px;align-items:start;padding:12px;background:color-mix(in srgb,var(--bg) 72%,var(--paper));border-radius:8px}.activity-feed article:before{content:"";width:10px;height:10px;margin-top:7px;border-radius:50%;background:var(--brand)}.activity-feed strong{display:block}.activity-feed span{color:var(--muted);font-size:.9rem}.section{padding:46px 0}.section-heading{max-width:840px;margin-bottom:20px}.proof-layout{display:grid;grid-template-columns:320px 1fr;gap:16px}.portrait-card{margin:0;overflow:hidden}.portrait-card img{display:block;width:100%;aspect-ratio:1;object-fit:cover}.portrait-card figcaption{display:grid;gap:6px;padding:18px}.portrait-card span{color:var(--muted);line-height:1.5}.proof-grid,.timeline-grid,.log-grid,.project-grid,.process-list,.certificate-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.proof-grid article,.timeline-grid article,.log-grid article,.process-list li{padding:22px}.proof-grid span,.timeline-grid span,.log-grid span,.project-kicker span,.process-list span,.certificate-card span{color:var(--brand);font-weight:950;text-transform:uppercase;font-size:.78rem}.certificate-card{display:grid;gap:12px;padding:12px;text-decoration:none;overflow:hidden}.certificate-card img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:6px;border:1px solid var(--line);background:var(--bg)}.split-section{display:grid;grid-template-columns:minmax(0,.78fr) minmax(0,1fr);gap:18px;align-items:start}.badge-cloud{display:flex;flex-wrap:wrap;gap:10px}.badge-cloud span,.tag-row span{display:inline-flex;padding:8px 10px;border-radius:999px;background:color-mix(in srgb,var(--brand) 12%,var(--paper));font-weight:850}.project-tools{display:grid;grid-template-columns:1fr minmax(260px,360px);gap:14px;align-items:end;margin-bottom:16px}.filter-tabs{display:flex;flex-wrap:wrap;gap:8px}.filter-tabs button{min-height:40px;padding:9px 13px;border:1px solid var(--line);border-radius:999px;color:var(--muted);background:var(--paper);font-weight:900;cursor:pointer}.filter-tabs button.active{color:#fff;background:var(--ink)}.search-box{display:grid;gap:7px;color:var(--muted);font-weight:850}.search-box input{width:100%;padding:13px 14px;color:var(--ink);background:var(--paper);border:1px solid var(--line);border-radius:8px;font:inherit}.project-card{overflow:hidden}.project-card[hidden]{display:none}.shot-link img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover;border-bottom:1px solid var(--line)}.project-body{display:grid;gap:12px;padding:18px}.project-kicker{display:flex;justify-content:space-between;gap:12px;align-items:start}.project-kicker strong{color:var(--muted);font-size:.82rem;text-align:right}.project-card h3{margin:0;font-size:1.35rem;line-height:1.12}.project-card h3 span{display:block;color:var(--muted);font-size:1rem;font-weight:800}.proof-line{font-weight:850}.tag-row,.card-actions{display:flex;flex-wrap:wrap;gap:8px}.process-list{padding:0;margin:0;list-style:none}.process-list strong{display:block;margin-top:12px;font-size:1.05rem}.upwork-section{display:flex;justify-content:space-between;gap:24px;align-items:center;padding:28px}footer{display:flex;align-items:center;gap:14px;padding:38px 0 58px}footer p{margin:0}@media(max-width:980px){.topbar{position:static;flex-wrap:wrap}.brand{flex:1 1 100%}.brand small{max-width:100%}nav{order:3;width:100%;overflow-x:auto;padding-bottom:4px}.hero-section,.proof-layout,.split-section,.project-tools,.upwork-section{grid-template-columns:1fr}.project-grid,.proof-grid,.timeline-grid,.log-grid,.process-list,.certificate-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:680px){.hero-section,.section,footer{width:min(430px,calc(100% - 24px))}.hero-section{min-height:auto;padding-top:34px}.hero-actions,.project-grid,.proof-grid,.timeline-grid,.log-grid,.process-list,.console-grid,.certificate-grid{display:grid;grid-template-columns:1fr}.project-kicker{display:grid}.project-kicker strong{text-align:left}}`;
}

function mainJs() {
  return `(()=>{const root=document.documentElement;const saved=localStorage.getItem("sg-portfolio-theme")||"light";root.dataset.theme=saved;const icon=document.querySelector("[data-theme-icon]");function label(){if(icon)icon.textContent=root.dataset.theme==="dark"?"Light":"Dark"}label();document.querySelector("[data-theme-toggle]")?.addEventListener("click",()=>{root.dataset.theme=root.dataset.theme==="dark"?"light":"dark";localStorage.setItem("sg-portfolio-theme",root.dataset.theme);label()});const data=window.PORTFOLIO_DATA||{importedProjects:[],productSites:[]};const feed=document.querySelector("[data-feed]");if(feed){feed.innerHTML=[...data.importedProjects.slice(0,2),...data.productSites.slice(0,2)].map(p=>'<article><div><strong>'+p.name+'</strong><span>'+((p.category||p.domain)||"Project")+'</span></div></article>').join("")}const search=document.querySelector("[data-search]");const cards=Array.from(document.querySelectorAll(".project-card"));let filter="All";function apply(){const q=(search?.value||"").toLowerCase().trim();cards.forEach(card=>{const type=card.dataset.type||"";const hay=card.dataset.search||"";card.hidden=!((filter==="All"||type===filter)&&(!q||hay.includes(q)))})}document.querySelectorAll("[data-filter]").forEach(btn=>btn.addEventListener("click",()=>{filter=btn.dataset.filter||"All";document.querySelectorAll("[data-filter]").forEach(b=>b.classList.toggle("active",b===btn));apply()}));search?.addEventListener("input",apply)})();`;
}

function microStyles() {
  return `:root{color-scheme:light;--brand:#0f766e;--accent:#f97316;--dark:#10211f;--soft:#ecfdf7;--paper:#fff;--ink:#111827;--muted:#66736f;--line:rgba(15,23,42,.14)}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;color:var(--ink);background:var(--soft);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}a{color:inherit}.site-shell{min-height:100vh;background:radial-gradient(circle at 20% 0,color-mix(in srgb,var(--brand) 18%,transparent),transparent 28rem),radial-gradient(circle at 90% 15%,color-mix(in srgb,var(--accent) 20%,transparent),transparent 25rem),var(--soft)}.site-header{position:sticky;top:0;z-index:10;display:flex;align-items:center;justify-content:space-between;gap:18px;padding:14px max(18px,calc((100vw - 1180px)/2));background:color-mix(in srgb,var(--paper) 88%,transparent);border-bottom:1px solid var(--line);backdrop-filter:blur(18px)}.brand{display:flex;align-items:center;gap:10px;text-decoration:none;font-weight:950}.brand img{width:46px;height:46px;border-radius:15px}.brand span{display:grid}.brand small{color:var(--muted);font-weight:850}nav{display:flex;gap:8px;overflow-x:auto}nav a,.button{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:10px 14px;border-radius:999px;text-decoration:none;font-weight:900;white-space:nowrap}.button.primary{color:#fff;background:var(--dark)}.button.secondary{background:var(--paper);border:1px solid var(--line)}.hero,.section,.footer{width:min(1180px,calc(100% - 36px));margin:0 auto}.hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(380px,.85fr);gap:clamp(28px,6vw,80px);align-items:center;min-height:76vh;padding:56px 0}.eyebrow{margin:0 0 12px;color:var(--brand);font-weight:950;text-transform:uppercase;font-size:.78rem}h1,h2{margin:0;font-family:Georgia,"Times New Roman",serif;line-height:1.02}h1{font-size:clamp(3rem,7vw,6.4rem)}h2{font-size:clamp(2rem,4vw,4rem)}p{color:var(--muted);line-height:1.68}.hero-actions,.tag-row{display:flex;flex-wrap:wrap;gap:10px}.tag-row span{padding:8px 10px;border-radius:999px;background:color-mix(in srgb,var(--brand) 12%,#fff);font-weight:850}.visual{background:var(--paper);border:1px solid var(--line);border-radius:16px;box-shadow:0 30px 90px rgba(0,0,0,.12);overflow:hidden}.visual-top{display:flex;gap:8px;align-items:center;min-height:58px;padding:0 18px;background:var(--dark);color:#fff}.visual-top span{width:12px;height:12px;border-radius:50%;background:var(--brand)}.visual-top span:nth-child(2){background:var(--accent)}.visual-top span:nth-child(3){background:#fff;opacity:.65}.visual-body{padding:22px}.motif{display:grid;gap:12px}.motif-card{padding:16px;border-radius:14px;background:var(--soft);border:1px solid var(--line)}.motif-card strong{display:block;color:var(--dark)}.section{padding:42px 0}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.panel{padding:22px;background:var(--paper);border:1px solid var(--line);border-radius:12px;box-shadow:0 18px 44px rgba(0,0,0,.08)}.steps{counter-reset:step;display:grid;gap:12px}.steps article{counter-increment:step}.steps article:before{content:counter(step,decimal-leading-zero);color:var(--brand);font-weight:950}.demo-card{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1fr);gap:18px}.control-stack{display:grid;gap:14px}.control-stack label{display:grid;gap:8px;color:var(--muted);font-weight:850}input[type=range]{width:100%;accent-color:var(--brand)}.result-box{display:grid;place-items:center;min-height:260px;background:linear-gradient(135deg,var(--dark),color-mix(in srgb,var(--brand) 68%,#000));color:#fff;border-radius:14px;text-align:center}.result-box strong{font-size:clamp(3rem,7vw,6rem)}.footer{display:flex;align-items:center;gap:14px;padding:36px 0 58px}.footer img{width:48px;height:48px;border-radius:16px}@media(max-width:880px){.site-header{position:static;flex-wrap:wrap}.brand{flex:1 1 100%}.hero,.demo-card{grid-template-columns:1fr}.grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:620px){.hero,.section,.footer{width:min(430px,calc(100% - 24px))}.hero{min-height:auto;padding-top:34px}.grid{grid-template-columns:1fr}}`;
}

function microJs() {
  return `(()=>{const cfg=window.SITE_CONFIG;if(!cfg)return;const inputs=[...document.querySelectorAll("[data-demo-input]")];const out=document.querySelector("[data-demo-result]");const label=document.querySelector("[data-demo-label]");function render(){const vals=inputs.map(i=>Number(i.value));const avg=Math.round(vals.reduce((a,b)=>a+b,0)/Math.max(vals.length,1));let text=avg+"%";if(cfg.demo.type==="forecast")text=Math.max(7,Math.round(avg/4))+" days";if(cfg.demo.type==="returns")text=avg>72?"Exchange route":avg>45?"Review route":"Support route";if(cfg.demo.type==="learning")text=avg>72?"Advance path":avg>45?"Practice path":"Coach path";if(cfg.demo.type==="civic")text=avg>70?"Priority works":avg>45?"Service desk":"Needs detail";if(cfg.demo.type==="grocery")text=avg+"%";if(out)out.textContent=text;if(label)label.textContent=cfg.demo.result}inputs.forEach(i=>i.addEventListener("input",render));render();document.querySelector("[data-save-demo]")?.addEventListener("click",()=>{const rows=JSON.parse(localStorage.getItem(cfg.slug+"-demo")||"[]");rows.unshift({site:cfg.name,values:inputs.map(i=>i.value),createdAt:new Date().toISOString()});localStorage.setItem(cfg.slug+"-demo",JSON.stringify(rows));const status=document.querySelector("[data-demo-status]");if(status)status.textContent="Saved locally as a working browser data demo."})})();`;
}

function microEnhancements() {
  return `.section-heading{max-width:860px;margin-bottom:18px}.backend-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-bottom:16px}.backend-grid .panel{display:grid;gap:8px}.backend-grid span{color:var(--brand);font-size:.78rem;font-weight:950;text-transform:uppercase}.backend-grid strong{font-size:clamp(2rem,4vw,3.5rem);color:var(--dark)}.workbench{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.85fr);gap:16px}.record-list,.workflow-list{display:grid;gap:10px}.record-row,.workflow-row{display:grid;gap:8px;padding:14px;border:1px solid var(--line);border-radius:12px;background:color-mix(in srgb,var(--soft) 72%,#fff)}.record-row span{color:var(--muted);font-weight:800}.record-row progress{width:100%;height:10px;accent-color:var(--brand)}.workflow-row{grid-template-columns:42px 1fr;align-items:start}.workflow-row>span{display:grid;place-items:center;width:34px;height:34px;border-radius:999px;color:#fff;background:var(--brand);font-weight:950}.workflow-row p{margin:0}.mini-form{display:grid;gap:14px}.mini-form label{display:grid;gap:8px;color:var(--muted);font-weight:850}.mini-form input,.mini-form select{width:100%;padding:12px 13px;border:1px solid var(--line);border-radius:10px;background:#fff;color:var(--ink);font:inherit}.api-preview{max-height:340px;overflow:auto;margin:0;padding:16px;border-radius:12px;background:#0f172a;color:#dbeafe;font-size:.86rem;line-height:1.55}.backend-section code{padding:2px 6px;border-radius:6px;background:color-mix(in srgb,var(--brand) 12%,#fff)}@media(max-width:880px){.backend-grid,.workbench{grid-template-columns:1fr}}`;
}

function microAppJs() {
  return `(()=>{const cfg=window.SITE_CONFIG;if(!cfg)return;const key=cfg.slug+"-records";const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));async function load(){try{const r=await fetch("api.json",{cache:"no-store"});return await r.json()}catch{return null}}function saved(){try{return JSON.parse(localStorage.getItem(key)||"[]")}catch{return[]}}function drawSaved(){const box=document.querySelector("[data-saved-records]");if(!box)return;const rows=saved();box.innerHTML=rows.length?rows.map(row=>'<div class="record-row"><strong>'+esc(row.title)+'</strong><span>'+esc(row.status)+' · saved locally</span><progress max="100" value="'+Number(row.score||72)+'"></progress></div>').join(""):'<p>No local records yet. Add one using the form.</p>'}function draw(data){if(!data)return;document.querySelectorAll("[data-kpi-grid]").forEach(grid=>{grid.innerHTML=(data.metrics||[]).map(m=>'<article class="panel"><span>'+esc(m.label)+'</span><strong>'+esc(m.value)+'</strong></article>').join("")});document.querySelectorAll("[data-record-list]").forEach(list=>{list.innerHTML=[...(data.records||[]),...saved()].map(row=>'<div class="record-row"><strong>'+esc(row.title)+'</strong><span>'+esc(row.status)+' · '+esc(row.updated||"saved locally")+'</span><progress max="100" value="'+Number(row.score||78)+'"></progress></div>').join("")});document.querySelectorAll("[data-workflow-list]").forEach(list=>{list.innerHTML=(data.workflow||[]).map(step=>'<div class="workflow-row"><span>'+esc(step.step)+'</span><p><strong>'+esc(step.title)+'</strong><br/>'+esc(step.detail)+'</p></div>').join("")});const preview=document.querySelector("[data-api-preview]");if(preview)preview.textContent=JSON.stringify(data,null,2)}document.querySelector("[data-record-form]")?.addEventListener("submit",event=>{event.preventDefault();const form=event.currentTarget;const row={title:new FormData(form).get("title")||cfg.name+" record",status:new FormData(form).get("status")||cfg.features?.[0],score:82,updated:"saved locally"};const rows=saved();rows.unshift(row);localStorage.setItem(key,JSON.stringify(rows.slice(0,8)));form.reset();const status=document.querySelector("[data-form-status]");if(status)status.textContent="Record saved to the browser data store.";load().then(draw);drawSaved()});load().then(draw);drawSaved()})();`;
}

function motifItems(project) {
  return {
    clinical: ["Urgent case flagged", "Medication data missing", "Nurse handoff ready"],
    finance: ["Runway forecast", "Invoice confidence", "Tax reserve warning"],
    ops: ["Open supervisor shift", "Swap approved", "Overtime risk"],
    commerce: ["Eligibility clear", "Exchange recommended", "Warehouse intake"],
    learning: ["Objective mapped", "Checkpoint branch", "Confidence check"],
    civic: ["Issue routed", "Photo accepted", "Status updated"],
    climate: ["Weekend spike", "Savings action", "Carbon report"],
    hr: ["Feedback complete", "Stage age risk", "Candidate update"],
    property: ["Leak reported", "Vendor packet", "Tenant status"],
    grocery: ["Staples rebuilt", "Substitution locked", "Basket confidence"]
  }[project.vibe] || project.features;
}

function backendData(project) {
  const records = motifItems(project).map((title, index) => ({
    id: `${project.slug}-${index + 1}`,
    title,
    owner: project.pages[index % project.pages.length],
    status: project.features[index % project.features.length],
    score: 94 - index * 11,
    updated: `${12 + index * 7} min ago`
  }));
  return {
    product: project.name,
    endpoint: `projects/${project.slug}/api.json`,
    backend: "GitHub Pages-compatible JSON data service with browser persistence for write-like interactions.",
    metrics: [
      { label: project.demo.result, value: project.demo.type === "forecast" ? "24 days" : "86%" },
      { label: "Active records", value: String(records.length + project.features.length) },
      { label: "Saved locally", value: "Yes" }
    ],
    records,
    workflow: project.features.map((feature, index) => ({
      step: index + 1,
      title: feature,
      detail: `${project.name} uses ${feature.toLowerCase()} to support ${project.pages[index % project.pages.length].toLowerCase()} decisions.`
    }))
  };
}

function motif(project) {
  return motifItems(project).map((item) => `<article class="motif-card"><strong>${esc(item)}</strong><p>${esc(project.summary)}</p></article>`).join("");
}

function microPage(project, page) {
  const isHome = page === "home";
  const isDemo = page === "demo";
  const isDashboard = page === "dashboard";
  const headline = isHome ? project.tagline : page === "product" ? `${project.name} product experience` : page === "case-study" ? `${project.name} product design case study` : isDashboard ? `${project.name} live dashboard` : project.demo.label;
  const body = isHome ? project.summary : page === "product" ? `Explore the product structure, feature logic, and domain-specific interaction model behind ${project.name}.` : page === "case-study" ? `A spec portfolio project showing UX strategy, interface decisions, metrics, and handoff thinking for ${project.domain}.` : isDashboard ? `A dynamic front end reading a local JSON data layer, rendering live records, and saving client-side state.` : project.demo.prompt;
  const pageContent = isDemo ? demoSection(project) : isDashboard ? dashboardSection(project) : contentSections(project, page);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>${esc(pageTitle(project, isHome ? "home" : headline))}</title><link rel="icon" href="logo.svg" type="image/svg+xml"/><link rel="stylesheet" href="../../assets/microsite.css"/><style>:root{--brand:${project.color};--accent:${project.accent};--dark:${project.dark};--soft:${project.soft}}</style></head><body><div class="site-shell"><header class="site-header"><a class="brand" href="./"><img src="logo.svg" alt="${esc(project.name)} logo"/><span><strong>${esc(project.name)}</strong><small>${esc(project.domain)}</small></span></a><nav><a href="./">Home</a><a href="product.html">Product</a><a href="dashboard.html">Dashboard</a><a href="case-study.html">Case Study</a><a href="demo.html">Demo</a><a href="${currentSite}/">Portfolio hub</a></nav></header><main><section class="hero"><div><p class="eyebrow">${esc(project.category)} / Front end + data layer</p><h1>${esc(headline)}</h1><p>${esc(body)}</p><div class="tag-row">${tags(project.features)}</div><div class="hero-actions"><a class="button primary" href="demo.html">Try ${esc(project.demo.label)}</a><a class="button secondary" href="dashboard.html">Open dashboard</a></div></div><aside class="visual"><div class="visual-top"><span></span><span></span><span></span><strong>${esc(project.pages[0])}</strong></div><div class="visual-body"><div class="motif">${motif(project)}</div></div></aside></section>${pageContent}</main><footer class="footer"><img src="logo.svg" alt="" aria-hidden="true"/><p><strong>${esc(project.name)}</strong><br/>Designed by me, Simone Govender. Concept/spec product website for portfolio use.</p></footer><script>window.SITE_CONFIG=${safeJson(project)}</script><script src="../../assets/microsite.js"></script></div></body></html>`;
}

function contentSections(project, page) {
  const title = page === "case-study" ? "Portfolio case-study framing" : "Purpose-built product pages";
  return `<section class="section"><div class="grid">${project.features.map((feature) => `<article class="panel"><p class="eyebrow">Feature</p><h2>${esc(feature)}</h2><p>${esc(project.summary)}</p></article>`).join("")}</div></section>${backendSection(project)}<section class="section"><div class="demo-card"><div><p class="eyebrow">${esc(title)}</p><h2>Different vibe, different interaction model.</h2><p>This ${esc(project.domain)} concept uses a visual system, pages, and demo mechanics chosen for its audience rather than a generic template.</p></div><div class="steps">${["Frontend routes", "JSON data layer", "Saved browser state", "Case study handoff"].map((p) => `<article class="panel"><strong>${esc(p)}</strong><p>${esc(project.name)} includes ${esc(p.toLowerCase())} as part of the full website build.</p></article>`).join("")}</div></div></section>`;
}

function backendSection(project) {
  const data = backendData(project);
  return `<section class="section backend-section"><div class="section-heading"><p class="eyebrow">Working front end + backend layer</p><h2>Dynamic data rendered from <code>api.json</code>.</h2><p>The live GitHub Pages version uses a static JSON endpoint plus local browser storage to simulate read/write product behavior without collecting client contact details.</p></div><div class="backend-grid" data-kpi-grid>${data.metrics.map((metric) => `<article class="panel"><span>${esc(metric.label)}</span><strong>${esc(metric.value)}</strong></article>`).join("")}</div><div class="workbench"><article class="panel"><p class="eyebrow">API records</p><h2>Live queue</h2><div class="record-list" data-record-list>${data.records.map((record) => `<div class="record-row"><strong>${esc(record.title)}</strong><span>${esc(record.status)} · ${esc(record.updated)}</span><progress max="100" value="${record.score}"></progress></div>`).join("")}</div></article><article class="panel"><p class="eyebrow">Workflow logic</p><h2>Product rules</h2><div class="workflow-list" data-workflow-list>${data.workflow.map((step) => `<div class="workflow-row"><span>${step.step}</span><p><strong>${esc(step.title)}</strong><br/>${esc(step.detail)}</p></div>`).join("")}</div></article></div></section>`;
}

function dashboardSection(project) {
  return `${backendSection(project)}<section class="section"><div class="demo-card"><div class="panel"><p class="eyebrow">Frontend architecture</p><h2>Responsive routes, fetched state, and saved interactions.</h2><p>${esc(project.name)} ships with multiple pages, a shared design system, a JSON data contract, demo controls, and local persistence so the product feels inspectable and alive on GitHub Pages.</p></div><div class="panel"><p class="eyebrow">Backend contract</p><h2>Data model</h2><pre class="api-preview" data-api-preview>{}</pre></div></div></section>`;
}

function demoSection(project) {
  return `<section class="section"><div class="demo-card panel"><div><p class="eyebrow">${esc(project.demo.label)}</p><h2>${esc(project.demo.prompt)}</h2><div class="control-stack">${project.demo.fields.map((field, index) => `<label>${esc(field)}<input type="range" min="10" max="100" value="${60 + index * 10}" data-demo-input /></label>`).join("")}<button class="button primary" type="button" data-save-demo>Save demo state</button><p data-demo-status></p></div></div><div class="result-box"><div><span data-demo-label>${esc(project.demo.result)}</span><strong data-demo-result>0</strong></div></div></div></section><section class="section"><div class="demo-card"><form class="panel mini-form" data-record-form><p class="eyebrow">Write-like backend demo</p><h2>Create a saved record.</h2><label>Record title<input name="title" placeholder="${esc(motifItems(project)[0])}" required /></label><label>Status<select name="status">${project.features.map((feature) => `<option>${esc(feature)}</option>`).join("")}</select></label><button class="button primary" type="submit">Save to browser store</button><p data-form-status></p></form><div class="panel"><p class="eyebrow">Saved records</p><h2>Local data store</h2><div class="record-list" data-saved-records></div></div></div></section>${backendSection(project)}`;
}

async function copyImportedAssets() {
  await mkdir(path.join(root, "assets", "imported-icons"), { recursive: true });
  await mkdir(path.join(root, "assets", "imported-shots"), { recursive: true });
  await mkdir(path.join(root, "assets", "quantum"), { recursive: true });
  await mkdir(path.join(root, "assets", "quantum", "certificates"), { recursive: true });
  for (const project of importedProjects) {
    const iconName = path.basename(project.icon);
    const shotName = path.basename(project.shot);
    await cp(path.join(sourceGallery, "assets", "app-icons", iconName), path.join(root, project.icon));
    await cp(path.join(sourceGallery, "assets", "app-shots", shotName), path.join(root, project.shot));
  }
  const profileSource = existsSync(customProfileSource) ? customProfileSource : path.join(quantumSource, "assets", "simone-profile.png");
  await cp(profileSource, path.join(root, "assets", "quantum", "simone-profile.png"));
  await cp(path.join(quantumSource, "assets", "certificates"), path.join(root, "assets", "quantum", "certificates"), { recursive: true });
  certificateFiles = (await readdir(path.join(quantumSource, "assets", "certificates"))).filter((file) => /\.(png|jpe?g|webp|svg)$/i.test(file));
}

async function main() {
  await mkdir(path.join(root, "assets", "app-icons"), { recursive: true });
  await mkdir(path.join(root, "assets", "app-shots"), { recursive: true });
  await mkdir(path.join(root, "projects"), { recursive: true });
  await copyImportedAssets();
  await writeFile(path.join(root, "index.html"), indexHtml(), "utf8");
  await writeFile(path.join(root, "styles.css"), mainStyles(), "utf8");
  await writeFile(path.join(root, "app.js"), mainJs(), "utf8");
  await writeFile(path.join(root, "assets", "microsite.css"), microStyles() + microEnhancements(), "utf8");
  await writeFile(path.join(root, "assets", "microsite.js"), microJs() + microAppJs(), "utf8");
  await writeFile(path.join(root, "README.md"), `# Simone Govender Full Stack Web Developer Portfolio

Standalone GitHub Pages portfolio hub for Upwork-safe project viewing.

Included:

- Live app projects and product websites displayed together in one project gallery.
- Quantum portfolio proof content folded into the homepage as credentials, timeline, build logs, and capability signals.
- 10 product websites with unique branding, multiple pages, JSON data endpoints, dashboard pages, and interactive demos.
- Dark/light theme toggle, search, filters, and Upwork-safe hiring CTA.
`, "utf8");
  for (const project of productSites) {
    const dir = path.join(root, "projects", project.slug);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, "logo.svg"), logoSvg(project), "utf8");
    await writeFile(path.join(root, "assets", "app-icons", `${project.slug}.svg`), logoSvg(project), "utf8");
    await writeFile(path.join(root, "assets", "app-shots", `${project.slug}.svg`), shotSvg(project), "utf8");
    await writeFile(path.join(dir, "api.json"), JSON.stringify(backendData(project), null, 2), "utf8");
    await writeFile(path.join(dir, "index.html"), microPage(project, "home"), "utf8");
    await writeFile(path.join(dir, "product.html"), microPage(project, "product"), "utf8");
    await writeFile(path.join(dir, "dashboard.html"), microPage(project, "dashboard"), "utf8");
    await writeFile(path.join(dir, "case-study.html"), microPage(project, "case-study"), "utf8");
    await writeFile(path.join(dir, "demo.html"), microPage(project, "demo"), "utf8");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
