const toggle = document.querySelector(".language-toggle");
const nav = document.querySelector(".nav-links");
const menu = document.querySelector(".menu-button");
const form = document.querySelector("#assessment-form");
const defaultTitle = "DeFI | Deutsch-Freunde Institut";
const frenchTitle = "DeFI | Institut Deutsch-Freunde";
let language = localStorage.getItem("defi-language") || "en";

function setLanguage(nextLanguage) {
  language = nextLanguage;
  document.documentElement.lang = language;
  document.querySelectorAll("[data-en]").forEach((element) => {
    const translation = element.dataset[language];
    if (!translation) return;
    element.innerHTML = translation;
  });
  for (const element of document.querySelectorAll("[data-label-en]")) {
    const label =
      language === "en" ? element.dataset.labelEn : element.dataset.labelFr;
    if (label) element.setAttribute("aria-label", label);
  }

  if (toggle) {
    toggle.textContent = language === "en" ? "FR" : "EN";
  }

  document.title = language === "en" ? defaultTitle : frenchTitle;
  localStorage.setItem("defi-language", language);
}

if (toggle) {
  toggle.addEventListener("click", () =>
    setLanguage(language === "en" ? "fr" : "en"),
  );
}

if (menu && nav) {
  menu.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(isOpen));
  });
}

if (nav) {
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = new FormData(event.currentTarget).get("name") || "friend";
    const message = document.querySelector("#form-message");

    if (message) {
      message.textContent =
        language === "en"
          ? `Thank you, ${name}. A DeFI counsellor will help you choose your next step.`
          : `Merci, ${name}. Un conseiller DeFI vous aidera à choisir votre prochaine étape.`;
    }

    event.currentTarget.reset();
  });
}

const carousel = document.querySelector(".pathway-carousel");

if (carousel) {
  const slides = [...carousel.querySelectorAll(".carousel-slide")];
  const dots = [...carousel.querySelectorAll(".carousel-dot")];
  const previousButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let currentSlide = 0;
  let autoRotation;
  let touchStartX = 0;

  function updateCarousel(nextSlide) {
    currentSlide = (nextSlide + slides.length) % slides.length;
    slides.forEach((slide, index) => {
      const isActive = index === currentSlide;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });
    dots.forEach((dot, index) => {
      const isActive = index === currentSlide;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-selected", String(isActive));
    });
  }

  function stopRotation() {
    window.clearInterval(autoRotation);
  }

  function startRotation() {
    stopRotation();
    if (!reducedMotion.matches) {
      autoRotation = window.setInterval(
        () => updateCarousel(currentSlide + 1),
        5500,
      );
    }
  }

  previousButton?.addEventListener("click", () => {
    updateCarousel(currentSlide - 1);
    startRotation();
  });
  nextButton?.addEventListener("click", () => {
    updateCarousel(currentSlide + 1);
    startRotation();
  });
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      updateCarousel(Number(dot.dataset.slide));
      startRotation();
    });
  });
  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      updateCarousel(currentSlide - 1);
      startRotation();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      updateCarousel(currentSlide + 1);
      startRotation();
    }
  });
  carousel.addEventListener("mouseenter", stopRotation);
  carousel.addEventListener("mouseleave", startRotation);
  carousel.addEventListener("focusin", stopRotation);
  carousel.addEventListener("focusout", (event) => {
    if (!carousel.contains(event.relatedTarget)) startRotation();
  });
  carousel.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].screenX;
      stopRotation();
    },
    { passive: true },
  );
  carousel.addEventListener(
    "touchend",
    (event) => {
      const touchDistance = event.changedTouches[0].screenX - touchStartX;
      if (Math.abs(touchDistance) > 45) {
        updateCarousel(currentSlide + (touchDistance < 0 ? 1 : -1));
      }
      startRotation();
    },
    { passive: true },
  );
  reducedMotion.addEventListener?.("change", startRotation);
  updateCarousel(0);
  startRotation();
}

setLanguage(language);
