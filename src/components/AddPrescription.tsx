import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

interface AddPrescriptionProps {
  doctorId: string;
  patientId: string;
  dname: string; // added dname to the interface
  pname: string; // added pname to the interface
  isOpen: boolean;
  onRequestClose: () => void;
}

const AddPrescription: React.FC<AddPrescriptionProps> = ({ doctorId, patientId, dname, pname, isOpen, onRequestClose }) => {
  const [prescriptionDate, setPrescriptionDate] = useState('');
  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [notes, setNotes] = useState('');
  const [dosageMeasurement, setDosageMeasurement] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('https://localhost:7160/api/Doctors/createPrescription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prescriptionDate,
        medication,
        dosage: `${dosage} ${dosageMeasurement}`,
        notes: notes ? notes : 'No notes',
        patientFName: pname,
        doctorFName: dname,
        doctorId,
        patientId,
      }),
    });

    const data = await response.json();
    console.log(data);
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <form onSubmit={handleSubmit} className="g-3">
        <h3>New Prescription</h3>
        <div className="mb-3">
          <label className="form-label">Prescription Date:</label>
          <input required type="date" className="form-control" value={prescriptionDate} onChange={(e) => setPrescriptionDate(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Medication:</label>
          <input required type="text" className="form-control" value={medication} onChange={(e) => setMedication(e.target.value)} />
        </div>
        <div className="mb-3">
          <div className="mb-3">
            <label className="form-label">Dosage:</label>
            <div className="input-group">
              <input type="text" className="form-control" value={dosage} onChange={(e) => setDosage(e.target.value)} />
              <select className="form-select" value={dosageMeasurement} onChange={(e) => setDosageMeasurement(e.target.value)}>
                <option value="">Select measurement</option>
                <option value="mg">mg</option>
                <option value="g">g</option>
                <option value="ml">ml</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Notes:</label>
          <textarea className="form-control" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Add Prescription</button>
      </form>
    </Modal>
  );
};

export default AddPrescription;