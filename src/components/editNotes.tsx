import ReactModal from 'react-modal';
import { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  oldPrescription: any;
}


const EditNotes: React.FC<ModalProps> = ({ isOpen, onRequestClose, oldPrescription }) => {
  const [newNotes, setNewNotes] = useState(oldPrescription.notes);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('https://localhost:7160/api/Doctors/updatePrescription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prescriptionId: oldPrescription.prescriptionId,
        notes: newNotes,
        prescriptionDate: oldPrescription.prescriptionDate,
        medication: oldPrescription.medication,
        dosage: oldPrescription.dosage,
        patientFName: oldPrescription.patientFName,
        doctorFName: oldPrescription.doctorFName,
        doctorId: oldPrescription.doctorId,
        patientId: oldPrescription.patientId,
      }),
    });

    const data = await response.json();
    // console.log(data);
    onRequestClose();
  };
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
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">Notes</label>
                  <textarea className="form-control" id="exampleFormControlTextarea1" value={newNotes} onChange={(e) => setNewNotes(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn btn-secondary" onClick={onRequestClose}>Close</button>
              </form>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default EditNotes;
