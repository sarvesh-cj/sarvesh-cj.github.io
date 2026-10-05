const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const equations = [...document.querySelectorAll('.eq')];
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const y = window.scrollY;
      equations.forEach((el, i) => {
        const direction = i % 2 ? 1 : -1;
        el.style.marginTop = `${direction * y * (0.018 + i * 0.003)}px`;
      });
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

document.getElementById('year').textContent = new Date().getFullYear();

// Rotating analytical terminal

const terminalScreens = document.querySelectorAll('.terminal-screen');
const terminalFile = document.querySelector('.terminal-file');

let terminalIndex = 0;

if (terminalScreens.length > 1 && terminalFile) {
  setInterval(() => {

    terminalScreens[terminalIndex].classList.remove('active');

    terminalIndex = (terminalIndex + 1) % terminalScreens.length;

    const nextScreen = terminalScreens[terminalIndex];

    nextScreen.classList.add('active');
    terminalFile.textContent = nextScreen.dataset.file;

  }, 5000);
}