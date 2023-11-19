import axios from 'axios';

const ApiKey = '39665010-09a2b6cf277e8f7a3d78ab77d';

axios.defaults.baseURL = `https://pixabay.com/api/`;

export const fetchImages = async (searchText, page) => {
  const response = await axios.get(
    `?q=${searchText}&page=${page}&key=${ApiKey}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};