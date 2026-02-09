/* =====================================================
   arjun.guru — Minimal Notion Reader Layer
   jQuery + Mark.js
   ===================================================== */

$(function () {
  const $article = $("article.page");
  if (!$article.length) return;

  /* ---------------- Progress bar ---------------- */
  const $progress = $('<div id="kb-progress"></div>').appendTo("body");

  $(window).on("scroll", () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    $progress.css("width", pct + "%");
  });

  /* ---------------- Sidebar ---------------- */
  const $sidebar = $(`
    <aside id="kb-sidebar" class="collapsed">
      <div id="kb-brand">arjun.guru</div>
      <input id="kb-search" placeholder="Search this page">
      <nav id="kb-toc"></nav>
    </aside>
  `).appendTo("body");

  /* ---------------- Floating toggle button ---------------- */
  const $fab = $('<button id="kb-fab" title="Toggle sidebar">☰</button>')
    .appendTo("body");

  $fab.on("click", () => {
    $sidebar.toggleClass("collapsed");
    $fab.text($sidebar.hasClass("collapsed") ? "☰" : "×");
  });

  /* ---------------- TOC generation ---------------- */
  const $toc = $("#kb-toc");
  const headings = [];

  $article.find("h1, h2, h3").each(function () {
    const $h = $(this);

    if (!$h.attr("id")) {
      $h.attr(
        "id",
        $h.text()
          .trim()
          .toLowerCase()
          .replace(/[^\w]+/g, "-")
      );
    }

    const level = this.tagName.toLowerCase();
    const $a = $(`
      <a href="#${$h.attr("id")}" data-level="${level}">
        ${$h.text()}
      </a>
    `);

    $toc.append($a);
    headings.push(this);
  });

  /* ---------------- Active TOC tracking ---------------- */
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          $toc.find("a").removeClass("active");
          $toc.find(`a[href="#${id}"]`).addClass("active");
        }
      });
    },
    {
      rootMargin: "-40% 0px -55% 0px"
    }
  );

  headings.forEach(h => observer.observe(h));

  /* ---------------- Search + highlight (Mark.js) ---------------- */
  const marker = new Mark($article[0]);

  $("#kb-search").on("input", function () {
    const q = this.value.trim();
    marker.unmark({
      done: () => {
        if (q.length > 1) {
          marker.mark(q);
        }
      }
    });
  });

  /* ---------------- External links ---------------- */
  $("a[href^='http']").attr({
    target: "_blank",
    rel: "noopener"
  });

  /* ---------------- Image click zoom ---------------- */
  $article.find("img")
    .css("cursor", "zoom-in")
    .on("click", function () {
      window.open(this.src, "_blank");
    });
});
