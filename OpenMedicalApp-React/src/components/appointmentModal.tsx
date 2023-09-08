// Modal.tsx
import ReactModal from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  event: any // Replace 'Appointment' with your event type
}

const Modal: React.FC<ModalProps> = ({ isOpen, onRequestClose, event }) => {
  return (
    <div className="container">
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Event Modal"
        style={{ overlay: { zIndex: 1000 }, content: { zIndex: 1001 } }}
      >
        <div className="modal-dialog modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{event.title}</h5>
            </div>
            <div className="modal-body">
              <p>Start: {event.start.toLocaleString()}</p>
              <p>End: {event.end.toLocaleString()}</p>
              <p>Reason: {event.reason}</p>
              <button className="btn btn-primary" onClick={onRequestClose}>Close</button>
            </div>
          </div>
        </div>x
      </ReactModal>
    </div>
  );
};

export default Modal;
