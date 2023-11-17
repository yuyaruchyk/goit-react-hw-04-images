import { Component } from 'react';
import { GlobalStyle } from 'GlobalStyle';
import { Searchbar } from './Searchbar/Searchbar';
import { List } from './ImageGallery/ImageGallery';
import { LoadMoreButton } from './Button/Button';
import { MainLoader } from './Loader/Loader';
import { Container } from './App.styled';
import { fetchImages } from 'api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    images: [],
    searchText: '',
    page: 1,
    isLoading: false,
    isError: false,
  };

 handleSubmit = value => {
  if (value.trim() === '') {
    
    toast.error('Please enter a search value');
    return;
  } else {
    this.setState({
      searchText: `${Date.now()}/${value}`,
      page: 1,
      images: [],
    });
  }
};

  handleLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchText, page } = this.state;
    if (prevState.searchText !== searchText || prevState.page !== page) {
      const valueAfterSlash = searchText.split('/').pop();
      try {
        this.setState({ isLoading: true, isError: false });
        const response = await fetchImages(valueAfterSlash, page);
        const newImages = response.data.hits;
        const totalHits = response.data.totalHits;

        if (newImages.length === 0) {
          toast.error('No more images');
        }
        

        else {
          this.setState(prevState => ({
            images: [...prevState.images, ...newImages],
            totalHits,
          }));
        }
      } catch (error) {
        toast.error('Oops! Something went wrong! Try reloading the page!');
        this.setState({ isError: true });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const { images, isLoading, totalHits } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} />
        {images.length > 0 && <List images={images} />}
        {isLoading && <MainLoader />}
        {images.length > 0 && !isLoading && totalHits > images.length && (
          <LoadMoreButton onClick={this.handleLoadMore} />
        )}
        <GlobalStyle />
         <ToastContainer />
      </Container>
    );
  }
}