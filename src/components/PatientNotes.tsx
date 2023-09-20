// Modal.tsx
import ReactModal from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  event: any;
}

const PatientNotes: React.FC<ModalProps> = ({ isOpen, onRequestClose, event }) => {
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
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eros orci, facilisis a eros ac, luctus fringilla magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus faucibus, nisi et faucibus volutpat, arcu massa tincidunt arcu, non imperdiet libero enim sed ligula. Ut laoreet est nec ligula tristique tristique. Nunc eu pharetra diam. Nunc ullamcorper dolor sit amet rutrum tincidunt. Etiam eu lacinia ante. Nulla imperdiet, neque aliquet pharetra elementum, risus massa vestibulum urna, sed mattis mi nisl vitae erat. Nulla laoreet, sapien a vestibulum vestibulum, nisl augue scelerisque ante, sit amet euismod felis neque vitae erat. Integer interdum luctus tortor, maximus viverra dolor laoreet at. Nunc et nibh vel lorem aliquet eleifend.</p>
              <button className="btn btn-primary" onClick={onRequestClose}>Close</button>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default PatientNotes;
