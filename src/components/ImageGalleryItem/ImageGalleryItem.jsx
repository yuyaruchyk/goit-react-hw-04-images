
import { GalleryImage, Image } from './ImageGalleryItem.styled';
import { ModalWindow } from '../Modal/Modal';

export const GalleryItem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <GalleryImage>
      <Image src={img} alt={tags} onClick={openModal} />
      <ModalWindow
        isOpen={isModalOpen}
        onClose={closeModal}
        largeImage={largeImg}
        tags={tags}
      />
    </GalleryImage>
  );
};
