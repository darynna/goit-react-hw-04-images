import {useEffect } from 'react';
import '../styles.css';

export function Modal({onClose, alt, largeImage}) {

  useEffect(()=>{
    window.addEventListener('keydown', keyClose);
    return ()=>{
      window.removeEventListener('keydown', keyClose);
    }
  })

  const keyClose = e => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleClose = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

    return (
      <div className="Overlay" onClick={handleClose}>
        <div className="Modal">
          <img src={largeImage} alt={alt} />
        </div>
      </div>
    );

}
