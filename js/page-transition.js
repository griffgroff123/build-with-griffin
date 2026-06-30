// Liquid glass page transition
// Intercepts nav link clicks, shows a frosted glass overlay, then navigates.

(function () {
  // Create the overlay element
  const overlay = document.createElement("div");
  overlay.id = "glass-overlay";
  overlay.innerHTML = `<div class="glass-shimmer"></div>`;
  document.body.appendChild(overlay);

  // Inject styles
  const style = document.createElement("style");
  style.textContent = `
    #glass-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      background: rgba(14, 14, 16, 0.45);
      backdrop-filter: blur(22px) saturate(180%);
      -webkit-backdrop-filter: blur(22px) saturate(180%);
    }

    #glass-overlay.is-visible {
      opacity: 1;
      pointer-events: all;
    }

    #glass-overlay.is-out {
      opacity: 0;
      transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .glass-shimmer {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.06) 0%,
        rgba(255, 255, 255, 0.0) 40%,
        rgba(255, 90, 78, 0.04) 60%,
        rgba(255, 255, 255, 0.05) 100%
      );
      pointer-events: none;
    }

    /* Subtle top highlight edge — like glass catching light */
    #glass-overlay::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
    }

    /* Subtle bottom edge */
    #glass-overlay::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,90,78,0.15), transparent);
    }
  `;
  document.head.appendChild(style);

  // Fade out on page load (handles arriving at a new page)
  window.addEventListener("DOMContentLoaded", () => {
    overlay.classList.add("is-visible");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.classList.add("is-out");
        overlay.classList.remove("is-visible");
        setTimeout(() => overlay.classList.remove("is-out"), 500);
      });
    });
  });

  // Intercept all internal link clicks
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href) return;

    // Skip external links, anchor-only links, and mailto/tel
    const isExternal = link.target === "_blank" || href.startsWith("http") || href.startsWith("//");
    const isAnchor = href.startsWith("#");
    const isSpecial = href.startsWith("mailto") || href.startsWith("tel");
    if (isExternal || isAnchor || isSpecial) return;

    e.preventDefault();

    // Show the glass overlay
    overlay.classList.remove("is-out");
    overlay.classList.add("is-visible");

    // Navigate after the overlay is visible
    setTimeout(() => {
      window.location.href = href;
    }, 420);
  });
})();
