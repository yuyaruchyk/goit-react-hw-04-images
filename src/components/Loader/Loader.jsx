import { Circles } from 'react-loader-spinner';
import { Loader } from './Loader.styled';

export const MainLoader = () => {
  return (
    <Loader>
    <Circles
  height="80"
  width="80"
  color="blue"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
    </Loader>
  );
};
