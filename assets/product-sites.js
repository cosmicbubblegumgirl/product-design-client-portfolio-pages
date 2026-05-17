(() => {
  const site = window.PRODUCT_SITE;
  if (!site) return;

  const key = "product-site:" + site.slug + ":records";
  const defaults = site.records.map(([type, title, status], index) => ({
    id: site.slug + "-" + (index + 1),
    type,
    title,
    status,
    createdAt: new Date(Date.now() - (index + 1) * 3600000).toISOString()
  }));

  const api = {
    async list() {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaults;
    },
    async save(record) {
      const rows = await this.list();
      rows.unshift({
        id: site.slug + "-" + Date.now(),
        ...record,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem(key, JSON.stringify(rows));
      return rows;
    },
    async reset() {
      localStorage.removeItem(key);
      return defaults;
    }
  };

  const shortDate = (value) =>
    new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(value));

  function recordMarkup(row) {
    return '<article class="record-row"><span>' + row.status + '</span><strong>' + row.type + '</strong><p>' + row.title + '</p><small>' + shortDate(row.createdAt) + '</small></article>';
  }

  async function render() {
    const rows = await api.list();
    document.querySelectorAll("[data-record-list]").forEach((node) => {
      node.innerHTML = rows.slice(0, 3).map(recordMarkup).join("");
    });
    document.querySelectorAll("[data-admin-records]").forEach((node) => {
      node.innerHTML = rows.map(recordMarkup).join("");
    });
    document.querySelectorAll("[data-record-count]").forEach((node) => {
      node.textContent = String(rows.length);
    });
    document.querySelectorAll("[data-api-status]").forEach((node) => {
      node.textContent = "Online";
    });
  }

  document.querySelectorAll("[data-impact-range]").forEach((range) => {
    const value = document.querySelector("[data-impact-value]");
    range.addEventListener("input", () => {
      if (value) value.textContent = range.value + "%";
    });
  });

  const form = document.querySelector("[data-lead-form]");
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const note = String(formData.get("note") || "").trim();
      await api.save({
        type: "Demo request",
        title: name + " (" + email + "): " + note,
        status: "Saved"
      });
      form.reset();
      const status = document.querySelector("[data-form-status]");
      if (status) status.textContent = "Saved to the " + site.name + " backend demo.";
      await render();
    });
  }

  document.querySelectorAll("[data-reset]").forEach((button) => {
    button.addEventListener("click", async () => {
      await api.reset();
      await render();
    });
  });

  document.querySelectorAll("[data-export]").forEach((button) => {
    button.addEventListener("click", async () => {
      const rows = await api.list();
      const blob = new Blob([JSON.stringify({ site: site.name, records: rows }, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = site.slug + "-records.json";
      a.click();
      URL.revokeObjectURL(url);
    });
  });

  render();
})();
