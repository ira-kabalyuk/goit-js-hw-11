const GALLERY_URL = 'https://pixabay.com/api';
const API_KEY = 'key=25755883-425392836cbaa44f717c19250';


export const fetchGallery = async function (name, page, perPage) { 
  const response = await fetch(`${GALLERY_URL}/?${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`);
  const images = await response.json();
  return images;  
};
