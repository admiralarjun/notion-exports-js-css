/* ================================
   NOTION PREMIUM JS (SAFE)
   ================================ */
console.log("Notion premium JS loaded");

document.addEventListener("DOMContentLoaded", () => {
  /* ---- Reading progress bar ---- */
  const progress = document.createElement("div");
  progress.id = "notion-progress-bar";
  progress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    width: 0%;
    background: linear-gradient(90deg, #7aa2f7, #9ece6a);
    z-index: 999999;
    pointer-events: none;
  `;

  document.body.appendChild(progress);

  window.addEventListener("scroll", () => {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;

    if (scrollHeight > 0) {
      const percent = (scrollTop / scrollHeight) * 100;
      progress.style.width = percent + "%";
    }
  });

  /* ---- Copy buttons for code blocks ---- */
  document.querySelectorAll(".code").forEach(block => {
    block.style.position = "relative";

    const btn = document.createElement("button");
    btn.textContent = "Copy";
    btn.style.cssText = `
      position: absolute;
      top: 8px;
      right: 8px;
      background: #7aa2f7;
      color: #020617;
      border: none;
      border-radius: 6px;
      padding: 4px 8px;
      font-size: 12px;
      cursor: pointer;
    `;

    btn.addEventListener("click", () => {
      try {
        navigator.clipboard.writeText(block.innerText);
        btn.textContent = "Copied!";
        setTimeout(() => (btn.textContent = "Copy"), 1200);
      } catch {
        btn.textContent = "Failed";
      }
    });

    block.appendChild(btn);
  });
});
