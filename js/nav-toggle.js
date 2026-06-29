// Mobile nav toggle.
// Finds the hamburger button and the nav links, and toggles
// a CSS class on click that shows/hides the links on small screens.

function setupNavToggle() {
  const toggleButton = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  if (!toggleButton || !navLinks) return; // safety check - bail if either is missing

  toggleButton.addEventListener("click", () => {
    navLinks.classList.toggle("nav-open");
  });
}

setupNavToggle();
