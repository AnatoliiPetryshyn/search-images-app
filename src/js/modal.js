import refs from './refs';
import spinner from './spinner';
// модальное окно
refs.imagesList.addEventListener('click', clickFullscreenBtnHandler);

function clickFullscreenBtnHandler(e) {
  if (!e.target.classList.contains('js-fullscreen-btn')) {
    return;
  }

  refs.modal.classList.add('is-open');
  window.addEventListener('keydown', handleKeyPress);

  const currentImg = e.target.previousElementSibling.previousElementSibling;
  spinner.show();
  refs.modalImg.setAttribute('src', `${currentImg.dataset.fullscreen}`);
  refs.modalImg.setAttribute('alt', `${currentImg.alt}`);
  refs.modalImg.addEventListener('load', () => {
    spinner.hide();
  });
}

// закрываем модальное окно
refs.modalContent.addEventListener('click', handleOverlayClick);

function closeModal() {
  refs.modal.classList.remove('is-open');
  refs.modalImg.src = '';
  refs.modalImg.alt = '';
  window.removeEventListener('keydown', handleKeyPress);
}

function handleOverlayClick(event) {
  if (event.target !== event.currentTarget) {
    return;
  }

  closeModal();
}

function handleKeyPress(event) {
  if (event.code !== 'Escape') {
    return;
  }

  closeModal();
}
