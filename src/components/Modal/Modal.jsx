import Modal from 'react-modal';
import { LargeModalImage } from './Modal.styled';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const ModalWindow = ({ isOpen, onClose, largeImage, tags }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Modal"
      >
      <div>
        <LargeModalImage src={largeImage} alt={tags} />
      </div>
    </Modal>
  );
};