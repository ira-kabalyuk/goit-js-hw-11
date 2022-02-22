import Notiflix from 'notiflix';
import './sass/main.scss';

import imageTpl from './templates/image-card.hbs';
import { fetchGallery } from './js/fetchGallery';
const INFO_MESSAGE = "We're sorry, but you've reached the end of search results.";
const ERROR_MESSAGE = "Error";


const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

form.addEventListener('submit', renderImages);
loadMoreButton.addEventListener('click', onLoadMore);

let page = 1;
let searchValue = '';
let perPage = 40;


function renderImages(event) {
  event.preventDefault();
  searchValue = event.currentTarget.elements.searchQuery.value;
  fetchGallery(searchValue, page, perPage)
    .then(renderImageCard)   
    .catch(onFetchError);
  resetPage();
  clearArticleGallery();  
}

function renderImageCard(images) {
  const imageCards = images.hits.map((image) => imageTpl(image)).join("");
  gallery.insertAdjacentHTML('beforeend', imageCards);
  console.log(images.hits.length)
 
  if (images.hits.length >= perPage) {
    loadMoreButton.classList.add('visible');
  }
  else {
   loadMoreButton.classList.remove('visible');
      Notiflix.Notify.info(INFO_MESSAGE);
  }
}

function onLoadMore() {
  incrementPage();
  fetchGallery(searchValue, page, perPage)
    .then(renderImageCard)
    .then(incrementPage)
    .catch(onFetchError);
}


function incrementPage() {
   page += 1;
}

function resetPage() {
  page = 1;
}

function clearArticleGallery() {
  gallery.innerHTML = '';
}

function onFetchError() {
    Notiflix.Notify.failure(ERROR_MESSAGE);
}