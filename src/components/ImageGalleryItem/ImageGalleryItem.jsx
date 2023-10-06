import {useState } from 'react';
import '../styles.css';
import { Modal } from 'components/Modal/Modal';

export function ImageGalleryItem ({ id, image, alt, largeImage }) {
  
  const [modal, setModal] = useState(false)

  const handleModalOpen = () => {
    setModal(true)
  };

  const handleModalClose = () => {
     setModal(false)
  };

    return (
      <>
        <li className="ImageGalleryItem" key={id}>
          <img
            className="ImageGalleryItem-image"
            src={image}
            alt={alt}
            onClick={handleModalOpen}
          />
        </li>
        {modal && (
          <Modal
            largeImage={largeImage}
            alt={alt}
            onClose={handleModalClose}
          />
        )}
      </>
    );
}
