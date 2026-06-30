// Reveals .reveal elements as they scroll into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Subtle parallax — sections drift slightly as you scroll
// Each .parallax-section moves at a fraction of its offset from viewport center
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const parallaxSections = document.querySelectorAll(
    ".hero, .projects, .pricing, .how-i-work, .why-me-page, .contact-page"
  );

  function applyParallax() {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;

    parallaxSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      // How far the center of the section is from the center of the viewport
      const centerOffset = rect.top + rect.height / 2 - vh / 2;
      // Move it at 6% of that offset — subtle but noticeable
      const shift = centerOffset * 0.06;
      section.style.transform = `translateY(${shift}px)`;
    });
  }

  window.addEventListener("scroll", applyParallax, { passive: true });
  applyParallax(); // run once on load
}
