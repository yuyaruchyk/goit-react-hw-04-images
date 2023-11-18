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
  const [isError, setIsError] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (searchText === '') {
      return;
    }

    const searchedImages = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetchImages(searchText, page);
        const newImages = response.data.hits;
        const totalHits = response.data.totalHits;

        if (newImages.length === 0) {
          toast.error('No more images');
        } else {
          setImages((prevImages) => [...prevImages, ...newImages]);
          setTotalHits(totalHits);
        }
      } catch (error) {
        toast.error('Oops! Something went wrong! Try reloading the page!');
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    searchedImages(); 

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
      {images.length > 0 && !isLoading && totalHits > images.length && (
        <LoadMoreButton onClick={handleLoadMore} />
      )}
      <GlobalStyle />
      <ToastContainer />
    </Container>
  );
};