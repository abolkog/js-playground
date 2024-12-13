import React from 'react';

interface ModalProps extends React.PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal fade show" style={{ display: 'block' }}>
      <div className="modal-dialog" style={{ maxWidth: 1200 }}>
        <div className="modal-content">
          <div className="modal-header text-white bg-dark">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            >
              <span className="visually-hidden">Close</span>
            </button>
          </div>
          <div
            className="modal-body"
            style={{ maxHeight: '600px', overflowY: 'auto' }}
          >
            <div>{children}</div>
          </div>
          <div className="modal-footer">
            <button
              data-testid="modal-close-btn"
              type="button"
              className="btn btn-primary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
