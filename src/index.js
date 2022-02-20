import Notiflix from 'notiflix';
import './sass/main.scss';

import imageTpl from './templates/image-card.hbs';
import { fetchGallery } from './js/fetchGallery';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', renderImages);

function renderImages(event) {
  event.preventDefault();
  const searchValue = event.currentTarget.elements.searchQuery.value;
  fetchGallery(searchValue)
    .then(renderImageCard)
    .catch(error => console.log(error));
}

function renderImageCard(images) {
  const imageCards = images.hits.map((image) => imageTpl(image)).join("");
  gallery.innerHTML = imageCards;
  console.log(imageCards)
}
