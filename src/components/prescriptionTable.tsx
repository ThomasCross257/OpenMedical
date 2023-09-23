import { useState } from 'react';
import PatientNotes from './PatientNotes'; // Import your PatientNotes component
import EditNotes from './editNotes'; // Import your EditNotes component

interface PatientPrescriptionsProps {
    isDoctorView: boolean;
}

function PrescriptionTable({ isDoctorView }: PatientPrescriptionsProps) {
    const [isPatientNotesModalOpen, setIsPatientNotesModalOpen] = useState(false); // State for PatientNotes modal
    const [isEditNotesModalOpen, setIsEditNotesModalOpen] = useState(false); // State for EditNotes modal
    const emptyEvent = { title: '', start: new Date(), end: new Date(), reason: '' }; // Meant for testing purposes. Will inject a proper event later for the database

    // Function to open the PatientNotes modal
    const openPatientNotesModal = () => {
        setIsPatientNotesModalOpen(true);
    }

    // Function to close the PatientNotes modal
    const openEditNotesModal = () => {
        setIsEditNotesModalOpen(true);
    }

    // Function to open the EditNotes modal
    function closeModal() {
        setIsEditNotesModalOpen(false);
        setIsPatientNotesModalOpen(false);
    }

    return (
        <div className="container">
            {isDoctorView &&
            <div className="dropstart">
              <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Select Patient
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Patient1</a></li>
                <li><a className="dropdown-item" href="#">Patient2</a></li>
                <li><a className="dropdown-item" href="#">Patient3</a></li>
              </ul>
            </div>
            }
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">PatientName</h4>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Prescription</th>
                                <th scope="col">Date</th>
                                <th scope="col">Doctor</th>
                                <th scope="col">Notes</th>
                                {isDoctorView && <th scope="col">Options</th>} {/* Render options column for doctors */}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Medicine</td>
                                <td>01/01/1969</td>
                                <td>Dr. John Smith</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={openPatientNotesModal} // Open the PatientNotes modal when the button is clicked
                                    >
                                        View
                                    </button>
                                </td>
                                {isDoctorView && (
                                    <td>
                                        {/* Render doctor-specific options */}
                                        <button 
                                            type="button" 
                                            className='btn btn-secondary'
                                            onClick={openEditNotesModal}>
                                                Edit Notes
                                                </button>
                                        <button className='btn btn-danger'>End Prescription</button>
                                    </td>
                                )}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Render the PatientNotes modal */}
            <PatientNotes isOpen={isPatientNotesModalOpen} onRequestClose={closeModal} event={emptyEvent} />
            
            {/* Render the EditNotes modal */}
            <EditNotes isOpen={isEditNotesModalOpen} onRequestClose={closeModal} event={emptyEvent} />

        </div>
    );
}

export default PrescriptionTable;
