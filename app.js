(() => {
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
