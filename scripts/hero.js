document.addEventListener("DOMContentLoaded", function() {
  animateHeroSection();
  observeVisualizationSections();
  initializeD3Visualizations();
});

function animateHeroSection() {
  fadeInElement("hero-title", 300, () => {
    fadeInElement("hero-subtitle", 300, () => {
      fadeInElement("hero-cta", 300);
    });
  });
}

function fadeInElement(elementId, delay, callback) {
  setTimeout(() => {
    document.getElementById(elementId).classList.remove("opacity-0", "translate-y-10");
    if (callback) callback();
  }, delay);
}

function observeVisualizationSections() {
  const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });

  document.querySelectorAll(".visualization-section").forEach((section) => {
    observer.observe(section);
  });

  function handleIntersection(entries, observerInstance) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observerInstance.unobserve(entry.target);
      }
    });
  }
}

function initializeD3Visualizations() {
  // Initialize each visualization when its section becomes visible
  // Example: createWorldMap('#viz-1');
  // Example: createNetworkGraph('#viz-2');
  // etc.
}

function nextSection(index = -1) {
  const allSections = document.querySelectorAll(".visualization-section");
  // If index is provided, scroll to that section
  if (index !== -1) {
    const section = document.getElementById(`section${index}`);
    if (section) {
      allSections.forEach(s => s.classList.remove("visible"));
      section.classList.add("visible");
      section.scrollIntoView({ behavior: "smooth" });
    }
    return;
  }
  // Otherwise, find the currently visible section and go to the next
  let currentIndex = -1;
  allSections.forEach((section, i) => {
    if (section.classList.contains("visible")) {
      currentIndex = i;
    }
  });
  let nextIndex = currentIndex + 1;
  if (nextIndex >= allSections.length) return;
  allSections.forEach(s => s.classList.remove("visible"));
  allSections[nextIndex].classList.add("visible");
  allSections[nextIndex].scrollIntoView({ behavior: "smooth" });
}
