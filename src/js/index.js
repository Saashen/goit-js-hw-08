import images from './gallery-items.js';

const gallery = document.querySelector('.gallery');

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
}

function setActiveLink(nextActiveLink) {
  const currentActiveLink = gallery.querySelector('img.active');

  if (currentActiveLink) {
    currentActiveLink.classList.remove('active');
  }

  nextActiveLink.classList.add('active');
}
