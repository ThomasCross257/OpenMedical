import ReactModal from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  event: any;
}

const EditNotes: React.FC<ModalProps> = ({ isOpen, onRequestClose, event }) => {
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
              <form>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Notes</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea>
                </div>
              </form>
              <button className="btn btn-primary" onClick={onRequestClose}>Close</button>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default EditNotes;
