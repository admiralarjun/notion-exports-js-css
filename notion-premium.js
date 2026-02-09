/* ================================
   NOTION PREMIUM JS
   ================================ */

/* Reading progress bar */
const progress = document.createElement("div");
progress.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  width: 0%;
  background: linear-gradient(90deg, #7aa2f7, #9ece6a);
  z-index: 9999;
`;
document.body.appendChild(progress);

window.addEventListener("scroll", () => {
  const h = document.documentElement;
  const percent = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progress.style.width = percent + "%";
});

/* Copy button for code blocks */
document.querySelectorAll(".code").forEach(block => {
  const btn = document.createElement("button");
  btn.textContent = "Copy";
  btn.style.cssText = `
    position: absolute;
    top: 10px;
    right: 10px;
    background: #7aa2f7;
    color: #020617;
    border: none;
    border-radius: 6px;
    padding: 4px 8px;
    cursor: pointer;
    font-size: 12px;
  `;

  block.appendChild(btn);

  btn.addEventListener("click", () => {
    navigator.clipboard.writeText(block.innerText);
    btn.textContent = "Copied!";
    setTimeout(() => (btn.textContent = "Copy"), 1200);
  });
});
