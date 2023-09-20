import { useState } from 'react';
import PatientNotes from './PatientNotes'; // Import your PatientNotes component

function PatientPrescriptions() {
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const emptyEvent = { title: '', start: new Date(), end: new Date(), reason: '' }; // Meant for testing purposes. Will inject a proper event later for the database


    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    }

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">PatientName</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Prescription</th>
                                <th scope="col">Date</th>
                                <th scope="col">Doctor</th>
                                <th scope="col">Notes</th>
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
                                        onClick={openModal} // Open the modal when the button is clicked
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Render the modal */}
            <PatientNotes isOpen={isModalOpen} onRequestClose={closeModal} event = {emptyEvent} />
        </div>
    );
}

export default PatientPrescriptions;
