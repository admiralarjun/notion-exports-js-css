/* =========================================================
   arjun.guru — Notion Premium JS (v1)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- SHELL + SIDEBAR ---------- */
  const article = document.querySelector("article.page");
  if (!article) return;

  const shell = document.createElement("div");
  shell.id = "kb-shell";

  const sidebar = document.createElement("aside");
  sidebar.id = "kb-sidebar";

  sidebar.innerHTML = `
    <div id="kb-brand">arjun<span>.guru</span></div>
    <div id="kb-controls">
      <input id="kb-search" placeholder="Search page…" />
      <div id="kb-toggle">☾</div>
    </div>
    <nav id="kb-toc"></nav>
  `;

  article.parentNode.insertBefore(shell, article);
  shell.appendChild(sidebar);
  shell.appendChild(article);

  /* ---------- FOOTER ---------- */
  const footer = document.createElement("div");
  footer.id = "kb-footer";
  footer.innerText = "Powered by arjun.guru";
  article.appendChild(footer);

  /* ---------- THEME TOGGLE ---------- */
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("kb-theme");
  if (savedTheme) root.classList.toggle("theme-dark", savedTheme === "dark");

  document.getElementById("kb-toggle").onclick = () => {
    root.classList.toggle("theme-dark");
    localStorage.setItem(
      "kb-theme",
      root.classList.contains("theme-dark") ? "dark" : "light"
    );
  };

  /* ---------- PROGRESS BAR ---------- */
  const bar = document.createElement("div");
  bar.id = "kb-progress";
  document.body.appendChild(bar);

  window.addEventListener("scroll", () => {
    const h = document.documentElement;
    bar.style.width =
      (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
  });

  /* ---------- TOC ---------- */
  const toc = document.getElementById("kb-toc");
  article.querySelectorAll("h1, h2, h3").forEach(h => {
    if (!h.id) h.id = h.textContent.replace(/\s+/g, "-").toLowerCase();
    const a = document.createElement("a");
    a.href = `#${h.id}`;
    a.textContent = h.textContent;
    toc.appendChild(a);
  });

  /* ---------- SEARCH (PAGE ONLY) ---------- */
  document.getElementById("kb-search").addEventListener("input", e => {
    const q = e.target.value.toLowerCase();
    article.querySelectorAll("p, li").forEach(el => {
      el.style.opacity = el.textContent.toLowerCase().includes(q) ? "1" : "0.3";
    });
  });

  /* ---------- COPY CODE ---------- */
  document.querySelectorAll(".code").forEach(block => {
    const btn = document.createElement("button");
    btn.textContent = "Copy";
    btn.style.cssText = `
      position:absolute;top:8px;right:8px;
      border:none;border-radius:6px;
      padding:4px 8px;font-size:12px;
      cursor:pointer;
    `;
    btn.onclick = () => {
      navigator.clipboard.writeText(block.innerText);
      btn.textContent = "Copied!";
      setTimeout(() => (btn.textContent = "Copy"), 1200);
    };
    block.appendChild(btn);
  });

  /* ---------- EXTERNAL LINKS ---------- */
  document.querySelectorAll("a[href^='http']").forEach(a => {
    a.target = "_blank";
    a.rel = "noopener";
  });

  /* ---------- IMAGE ZOOM ---------- */
  document.querySelectorAll("figure.image img").forEach(img => {
    img.style.cursor = "zoom-in";
    img.onclick = () => window.open(img.src, "_blank");
  });

  /* ---------- SMOOTH SCROLL ---------- */
  document.querySelectorAll("a[href^='#']").forEach(a => {
    a.onclick = e => {
      e.preventDefault();
      document.querySelector(a.getAttribute("href"))?.scrollIntoView({
        behavior: "smooth"
      });
    };
  });
});
