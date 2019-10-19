import galleryItemsfrom from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.gallery'),
  lightbox: document.querySelector('.lightbox'),
  lightboxContent: document.querySelector('.lightbox__content'),
  lightboxImage: document.querySelector('.lightbox___image'),
};

const setGalleryHTML = arr => arr
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

const selected = {
  elem: null,
};

function handleImageClick(event) {
  event.preventDefault();
  const { target } = event;

  if (selected.elem === target) {
    refs.lightbox.classList.add('is-open');
    selected.elem = target;
    return;
  }

  const image = refs.lightboxImage.cloneNode(false);
  image.src = target.dataset.source;
  image.alt = target.alt;
  refs.lightboxContent.innerHTML = '';
  refs.lightboxContent.appendChild(image);

  refs.lightbox.classList.add('is-open');
}

function closelightbox(event) {
  const { target } = event;

  if (event.type === 'keydown' && event.code !== 'Escape') return;
  if (event.type === 'click' && target.nodeName === 'IMG') return;
  refs.lightbox.classList.remove('is-open');
}

refs.gallery.insertAdjacentHTML('afterbegin', setGalleryHTML(galleryItemsfrom));

refs.gallery.addEventListener('click', handleImageClick);
refs.lightbox.addEventListener('click', closelightbox);
window.addEventListener('keydown', closelightbox);