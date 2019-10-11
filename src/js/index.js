import images from './gallery-items.js';

const gallery = document.querySelector('.gallery');
const lightBox = document.querySelector('.lightbox');
const closeLightBoxBtn = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const lightBoxImage = lightBox.children[1].children[0];

const html = images
  .map(
    ({ preview, original, description }) => `<li class="gallery__item">
<a
  class="gallery__link"
  href="${original}"
>
  <img
    class="gallery__image"
    src="${preview}"
    data-source="${original}"
    alt="${description}"
  />
  <span class="gallery__icon">
    <i class="material-icons">zoom_out_map</i>
  </span>
</a>
</li>`,
  )
  .join('\n');

gallery.insertAdjacentHTML('afterbegin', html);

gallery.addEventListener('click', handleImageClick);

function handleImageClick(event) {
  event.preventDefault();

  const target = event.target;
  if (target.nodeName !== 'IMG') return;
  setActiveLink(target);
  lightBoxImage.scr = target.dataset.source;
  lightBoxImage.alt = target.alt;

  console.log(target.dataset.source);
}

function setActiveLink(nextActiveLink) {
  const currentActiveLink = gallery.querySelector('img.active');
  if (currentActiveLink) {
    currentActiveLink.classList.remove('active');
  }
  nextActiveLink.classList.add('active');

  nextActiveLink.addEventListener('click', openLightBox);
  closeLightBoxBtn.addEventListener('click', closeLightBox);
  lightBox.addEventListener('click', closeLightBoxModal);
}

function openLightBox() {
  lightBox.classList.add('is-open');
  window.addEventListener('keydown', closeLightBoxByEsc);
}

function closeLightBox() {
  lightBox.classList.remove('is-open');
  window.removeEventListener('keydown', closeLightBoxByEsc);
}

function closeLightBoxModal(event) {
  if (event.target !== event.currentTarget) return;
  closeLightBox();
}

function closeLightBoxByEsc(event) {
  if (event.code !== 'Escape') return;
  closeLightBox();
}
