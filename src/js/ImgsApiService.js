import axios from 'axios/dist/axios.min.js';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35791759-f811f161bd6e8c93b24d24d20';

const searchParams = new URLSearchParams({
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
});

export default class ImgsApiService {
  #searchQuery;
  #page;

  constructor() {
    this.#searchQuery = '';
    this.#page = 1;
  }

  async fetchImgs() {
    const url = `${BASE_URL}?${searchParams}&q=${this.#searchQuery}&page=${
      this.#page
    }`;

    const response = await axios.get(url);

    this.#incrementPage();

    return response.data;
  }

  #incrementPage() {
    this.#page += 1;
  }

  resetPage() {
    this.#page = 1;
  }

  set query(newQuery) {
    this.#searchQuery = newQuery;
  }

  get query() {
    return this.#searchQuery;
  }
}
