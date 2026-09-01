const toggle = document.querySelector('.language-toggle');
const nav = document.querySelector('.nav-links');
const menu = document.querySelector('.menu-button');
let language = 'en';

function setLanguage(nextLanguage) {
  language = nextLanguage;
  document.documentElement.lang = language;
  document.querySelectorAll('[data-en]').forEach((element) => {
    element.innerHTML = element.dataset[language];
  });
  toggle.textContent = language === 'en' ? 'FR' : 'EN';
  document.title = language === 'en' ? 'DeFI | Your pathway to Germany' : 'DeFI | Votre parcours vers lâ€™Allemagne';
}

toggle.addEventListener('click', () => setLanguage(language === 'en' ? 'fr' : 'en'));
menu.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', isOpen);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => nav.classList.remove('open')));

document.querySelector('#assessment-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const name = new FormData(event.currentTarget).get('name');
  const message = document.querySelector('#form-message');
  message.textContent = language === 'en'
    ? `Thank you, ${name}. A DeFI counsellor will help you choose your next step.`
    : `Merci, ${name}. Un conseiller DeFI vous aidera Ã  choisir votre prochaine Ã©tape.`;
  event.currentTarget.reset();
});

