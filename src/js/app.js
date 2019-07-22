import debounce from 'lodash.debounce';
import 'material-design-icons/iconfont/material-icons.css';
import InfiniteScroll from 'infinite-scroll';
import itemsTemplate from '../templates/galleryItems.hbs';
import refs from './refs';

let query;
const feedContainer = document.querySelector('#gallery');

const infScrollInstance = new InfiniteScroll(feedContainer, {
  responseType: 'text',
  history: false,
  path() {
    return `https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?key=13096829-9bcf89c807e99d3d182216fac&q=${query}&image_type=photo&page=${
      this.pageIndex
    }&per_page=12`;
  },
});

infScrollInstance.on('load', response => {
  const image = JSON.parse(response);

  const markup = image.hits.map(image => itemsTemplate(image)).join('');

  const proxyEl = document.createElement('div');
  proxyEl.innerHTML = markup;

  const parsedItems = proxyEl.querySelectorAll('.gallery-item');

  infScrollInstance.appendItems(parsedItems);
});

refs.form.input.addEventListener('input', debounce(onInput, 300));

function onInput(e) {
  refs.imagesList.innerHTML = '';
  infScrollInstance.pageIndex = 1;

  query = e.target.value;

  infScrollInstance.option({
    path() {
      return `https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?key=13096829-9bcf89c807e99d3d182216fac&q=${query}&image_type=photo&page=${
        this.pageIndex
      }&per_page=12`;
    },
  });

  infScrollInstance.loadNextPage();
}
