import axios from 'axios';

const API_KEY = '39758797-2603f3af911ae2369cae9d72d';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (searchText, page) => {
  const response = await axios.get(
    `?q=${searchText}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response;
};