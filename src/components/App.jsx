import { GlobalStyle } from 'GlobalStyle';
import { Searchbar } from './Searchbar/Searchbar';
import { List } from './ImageGallery/ImageGallery';
import { LoadMoreButton } from './Button/Button';
import { MainLoader } from './Loader/Loader';
import { Container } from './App.styled';
import { fetchImages } from 'api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [ isError, setIsError] = useState(false);
  

  useEffect(() => {
    if (searchText === '') {
      return;
    }

    async function getImages() {
      const newQuery = searchText.split('/').pop();
      try {
        setIsLoading(true);
        setIsError(false);

        const fetchedImages = await fetchImages(newQuery, page);

        if (fetchedImages.length === 0) {
          toast.error('No more images available');
        } else {
          setImages(prevImages => [...prevImages, ...fetchedImages]);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
        
      }
    }

    getImages();
  }, [searchText, page]);
  

  const handleSubmit = (value) => {
    setImages([]);
    setSearchText(`${Date.now()}/${value}`);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 && <List images={images} />}
      {isLoading && <MainLoader />}
      {images.length > 0 && !isLoading && (
        <LoadMoreButton onClick={handleLoadMore} />
      )}
      <GlobalStyle />
      <ToastContainer />
    </Container>
  );
};