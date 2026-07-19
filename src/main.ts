import './style.css';

// --- МЕНЮ ---
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

// --- ФОРМА ---
import IMask from 'imask';
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('consultationForm') as HTMLFormElement;
  const nameInput = document.getElementById('userName') as HTMLInputElement;
  const phoneInput = document.getElementById('userPhone') as HTMLInputElement;

  // 1. Инициализация маски для российского телефона
  const phoneMask = IMask(phoneInput, {
    mask: '+{7} (000) 000-00-00',
    lazy: true,
    placeholderChar: '_',
  });

  // Функция для показа/скрытия ошибки
  const toggleError = (input: HTMLInputElement, isError: boolean) => {
    if (isError) {
      input.classList.add('is-invalid');
      input.setAttribute('aria-invalid', 'true');
    } else {
      input.classList.remove('is-invalid');
      input.setAttribute('aria-invalid', 'false');
    }
  };

  // 2. Обработка отправки формы
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Сбрасываем предыдущие ошибки
    toggleError(nameInput, false);
    toggleError(phoneInput, false);

    // Валидация имени (минимум 2 символа)
    if (nameInput.value.trim().length < 2) {
      toggleError(nameInput, true);
      isValid = false;
    }

    // Валидация телефона (проверяем, полностью ли заполнена маска)
    if (!phoneMask.masked.isComplete) {
      toggleError(phoneInput, true);
      isValid = false;
    }

    if (isValid) {
      // Здесь код отправки данных на сервер (например, fetch)
      console.log('Форма успешно отправлена!', {
        name: nameInput.value,
        phone: phoneMask.value,
      });

      // Очистка формы после успешной отправки
      form.reset();
      phoneMask.updateValue(); // Сброс маски к начальному виду
    }
  });

  // 3. Убираем ошибку, как только пользователь начинает исправлять поле
  [nameInput, phoneInput].forEach((input) => {
    input.addEventListener('input', () => {
      toggleError(input, false);
    });
  });
});

// --- ПЕРЕКЛЮЧЕНИЕ ТЕМЫ ---
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById(
    'themeToggle',
  ) as HTMLButtonElement;
  const THEME_KEY = 'theme';

  if (themeToggle) {
    // Функция применения темы
    const applyTheme = (theme: string) => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(THEME_KEY, theme);
      themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
    };

    // Обработка клика по переключателю
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });

    // Устанавливаем начальное состояние кнопки
    const initialTheme = document.documentElement.getAttribute('data-theme');
    themeToggle.setAttribute('aria-pressed', String(initialTheme === 'dark'));
  }
});
