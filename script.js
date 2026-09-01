const toggle = document.querySelector(".language-toggle");
const nav = document.querySelector(".nav-links");
const menu = document.querySelector(".menu-button");
const form = document.querySelector("#assessment-form");
const defaultTitle = "DeFI | Your pathway to Germany";
const frenchTitle = "DeFI | Votre parcours vers l’Allemagne";
let language = localStorage.getItem("defi-language") || "en";

function setLanguage(nextLanguage) {
  language = nextLanguage;
  document.documentElement.lang = language;
  document.querySelectorAll("[data-en]").forEach((element) => {
    const translation = element.dataset[language];
    if (!translation) return;
    element.innerHTML = translation;
  });

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

setLanguage(language);
