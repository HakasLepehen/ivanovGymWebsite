const modal = document.getElementById('modal') as HTMLDivElement | null;
const closeBtn = document.getElementById('modalClose') as HTMLButtonElement | null;
const overlay = document.getElementById('modalOverlay') as HTMLDivElement | null;

function closeModal() {
  if (modal) {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  }
}

export function initModal() {
  if (modal) {
    modal.classList.add('is-open');
    modal.removeAttribute('aria-hidden');
  }

  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', closeModal);
}
