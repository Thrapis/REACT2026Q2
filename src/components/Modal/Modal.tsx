import { createPortal } from 'react-dom';
import { useEffect } from 'react';

import './Modal.css';

interface ModalProps {
  children: React.ReactNode;
  onClose: VoidFunction;
}

const Modal = ({ children, onClose }: ModalProps) => {
  const handleDropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        onClose();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.addEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return createPortal(
    <div className="modal-drop" onClick={handleDropClick}>
      <div className="modal">
        <button className="modal-close-button" onClick={onClose}>
          X
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>,
    document.body,
    'Modal'
  );
};

export default Modal;
