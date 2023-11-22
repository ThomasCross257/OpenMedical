import ReactModal from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  notes: string;
}

const PatientNotes: React.FC<ModalProps> = ({ isOpen, onRequestClose, notes }) => {
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
              <h5 className="modal-title">Notes</h5>
            </div>
            <div className="modal-body">
              <p>{notes}</p>
              <button className="btn btn-primary" onClick={onRequestClose}>Close</button>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default PatientNotes;
