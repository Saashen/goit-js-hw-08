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
}

function setActiveLink(nextActiveLink) {
  lightBoxImage.src = nextActiveLink.dataset.source;
  lightBoxImage.alt = nextActiveLink.alt;

  const currentActiveLink = gallery.querySelector('img.active');
  const activeElement = { link: currentActiveLink };
  const activeLink = activeElement.link;

  //Минулий варіант гарний тим, що завантажується одразу потрібна картинка.
  //
  // const currentActiveLink = gallery.querySelector('img.active');
  // if (currentActiveLink) {
  //   currentActiveLink.classList.remove('active');
  // }
  // nextActiveLink.classList.add('active');

  //А тут при повільному інтернеті або занадто швидкому перемиканню,
  //спочатку "висить" стара картинка, а потім уже її замінює нова
  if (activeLink === null) {
    nextActiveLink.classList.add('active');
  } else if (activeLink !== nextActiveLink) {
    activeLink.classList.remove('active');
    nextActiveLink.classList.add('active');
  } else return;
  console.log(nextActiveLink);

  lightBox.classList.add('is-open');
  window.addEventListener('keydown', closeLightBoxByEsc);
  closeLightBoxBtn.addEventListener('click', closeLightBox);
  lightBox.addEventListener('click', closeLightBoxModal);
}

function closeLightBox() {
  lightBox.classList.remove('is-open');
  window.removeEventListener('keydown', closeLightBoxByEsc);
}

function closeLightBoxModal(event) {
  if (event.target !== lightBox.children[1]) return;
  closeLightBox();
}

function closeLightBoxByEsc(event) {
  if (event.code !== 'Escape') return;
  closeLightBox();
}
