import './style.css';

// --- ЛОГИКА ТЕМЫ ---
const themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

function applySystemTheme() {
  const newTheme = themeMediaQuery.matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
}

// Применяем тему при загрузке JS (страховка)
applySystemTheme();

// Слушаем изменения темы в ОС/браузере
themeMediaQuery.addEventListener('change', applySystemTheme);

// --- КНОПКИ МЕНЮ ---

const menuToggle = document.getElementById('menuToggle') as HTMLButtonElement;
const mainNav = document.getElementById('mainNav') as HTMLElement;

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    // Переключаем класс активности
    const isActive = menuToggle.classList.toggle('is-active');
    mainNav.classList.toggle('is-active');

    // Обновляем атрибуты для доступности (скринридеры)
    menuToggle.setAttribute('aria-expanded', String(isActive));
    mainNav.setAttribute('aria-hidden', String(!isActive));

    // Блокируем скролл страницы при открытом меню
    document.body.style.overflow = isActive ? 'hidden' : '';
  });

  // Закрытие меню при клике на ссылку внутри него
  const navLinks = mainNav.querySelectorAll('.hero__nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('is-active');
      mainNav.classList.remove('is-active');
      menuToggle.setAttribute('aria-expanded', 'false');
      mainNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
}
