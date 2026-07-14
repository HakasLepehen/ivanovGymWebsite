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
