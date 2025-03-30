// Constants
const SELECTORS = {
  LOADER: "#LOADER",
  SERVICE_CAROUSEL: "#serviceCarousel",
  WHY_CHOOSE_CAROUSEL: "#whyChooseCarousel",
  ACTIVE_CAROUSEL_ITEM: ".carousel-item.active",
  CAROUSEL_INNER: ".our-services .carousel-inner",
  SERVICE_LINKS: "#OUR_SERVICES .slide-link",
  WHY_CHOOSE_LINKS: "#WHY_CHOOSE_SPECTRUM .slide-link",
  FOOTER_LINKS: "footer a",
};

// AOS Configuration
const AOS_CONFIG = {
  duration: 1200,
  easing: "ease-in-out",
  once: false,
};

// Initialize AOS
function initAOS() {
  AOS.init(AOS_CONFIG);
}

// Restart AOS animations for an element
function restartAOSAnimation(element) {
  if (!element) return;
  element.querySelector("h3")?.classList.remove("aos-animate");
  element.querySelector("p")?.classList.remove("aos-animate");
  element.querySelector("img")?.classList.remove("aos-animate");
  void element.querySelector("h3")?.offsetWidth;
  void element.querySelector("p")?.offsetWidth;
  void element.querySelector("img")?.offsetWidth;
  element.querySelector("h3")?.classList.add("aos-animate");
  element.querySelector("p")?.classList.add("aos-animate");
  element.querySelector("img")?.classList.add("aos-animate");

  AOS.refresh();
}

// Update active class based on carousel index
function updateActiveClass(carouselElement, innerSelector) {
  const carouselInner = carouselElement.querySelector(innerSelector);
  if (!carouselInner) return;

  const activeIndex =
    [...carouselElement.querySelectorAll(".carousel-item")].findIndex((item) =>
      item.classList.contains("active")
    ) + 1;

  // Remove existing active-* classes and add new one
  carouselInner.className = carouselInner.className
    .replace(/active-\d+/g, "")
    .trim();
  carouselInner.classList.add(`active-${activeIndex}`);
}

// Handle smooth scrolling to element
function scrollToElement(element, block = "start") {
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block });
  }
}

// Setup carousel event listeners
function setupCarousel(carouselId, innerSelector) {
  const carousel = document.getElementById(carouselId);
  if (!carousel) return;

  carousel.addEventListener("slid.bs.carousel", function () {
    const activeItem = carousel.querySelector(SELECTORS.ACTIVE_CAROUSEL_ITEM);
    restartAOSAnimation(activeItem);
    updateActiveClass(carousel, innerSelector);
  });
}

// Setup navigation links
function setupNavigationLinks(linksSelector, targetId) {
  document.querySelectorAll(linksSelector).forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      scrollToElement(document.getElementById(targetId));
    });
  });
}

// Setup footer links
function setupFooterLinks() {
  document.querySelectorAll(SELECTORS.FOOTER_LINKS).forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const elementId = link.getAttribute("href").substring(1);
      scrollToElement(document.getElementById(elementId));
    });
  });
}

// Initialize on window load
window.addEventListener("load", function () {
  // Hide loader
  document.querySelector(SELECTORS.LOADER)?.classList.add("d-none");

  // Initialize AOS
  initAOS();

  // Setup carousels
  setupCarousel("serviceCarousel", SELECTORS.CAROUSEL_INNER);
  setupCarousel("whyChooseCarousel", SELECTORS.CAROUSEL_INNER);

  // Setup navigation links
  setupNavigationLinks(SELECTORS.SERVICE_LINKS, "serviceCarousel");
  setupNavigationLinks(SELECTORS.WHY_CHOOSE_LINKS, "whyChooseCarousel");

  // Setup footer links
  setupFooterLinks();
});
