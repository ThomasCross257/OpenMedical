// @ts-nocheck
import { useState, useEffect } from 'react';
import { getUserInfoFromToken } from '../assets/func/userFunc';
import { Spinner } from 'react-bootstrap';
import PatientNotes from './PatientNotes';
import EditNotes from './editNotes';
import AddPrescription from './AddPrescription';

const Token = getUserInfoFromToken();
const userId = Token?.ID;
const role = Token?.role;

function PrescriptionTable() {
    const [isPatientNotesModalOpen, setIsPatientNotesModalOpen] = useState(false);
    const [isEditNotesModalOpen, setIsEditNotesModalOpen] = useState(false);
    const [isNewPrescriptionOpen, setIsNewPrescriptionOpen] = useState(false);
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patientData, setPatientData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (role === 'Doctor') {
            const fetchPatients = async () => {
                try {
                    const response = await fetch(`https://localhost:7160/api/Doctors/getPatients/${userId}/${role}`);
                    const data = await response.json();
                    setPatients(data);
                    setLoading(false); // Set loading to false once data is fetched
                } catch (error) {
                    console.error('Error fetching patients:', error);
                    setLoading(false); // Set loading to false in case of an error
                }
            };

            fetchPatients();
        }
    }, [userId, role]);

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const response = await fetch(`https://localhost:7160/api/Prescription/getPrescriptions/${userId}/${role}`);
                const data = await response.json();
                setPatientData(data);
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error('Error fetching patient details:', error);
                setLoading(false); // Set loading to false in case of an error
            }
        };

        fetchPatientDetails();
    }, [selectedPatient, userId, role]);

    const openPatientNotesModal = () => {
        setIsPatientNotesModalOpen(true);
    };

    const openEditNotesModal = () => {
        setIsEditNotesModalOpen(true);
    };

    const openNewPrescriptionModal = () => {
        setIsNewPrescriptionOpen(true);
    };

    const closeModal = () => {
        setIsEditNotesModalOpen(false);
        setIsPatientNotesModalOpen(false);
        setIsNewPrescriptionOpen(false);
    };

    return (
        <div className="container">
            {loading ? ( // Display spinner while loading
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100px' }}>
                    <Spinner animation="border" role="status" />
                </div>
            ) : (
                <>
                    <div className="dropstart">
                        {role === 'Doctor' ?
                            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Select Patient
                            </button>
                            : ''}
                        {role === 'Doctor' ?
                            <ul className="dropdown-menu">
                                {patients.map((patient: any) => (
                                    <li key={patient.patientID}>
                                        <a
                                            className="dropdown-item"
                                            href="#"
                                            onClick={() => setSelectedPatient(patient)}
                                        >
                                            {patient.patientFName}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            : ''}
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">
                                {role === 'Doctor' ? (selectedPatient ? selectedPatient.patientFName : 'No patient selected') : Token?.name}
                            </h4>
                            {selectedPatient ? <button type="button" className="btn btn-primary" onClick={openNewPrescriptionModal}>Add Prescription</button> : ''}
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Prescription</th>
                                        <th scope="col">Dosage</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Doctor</th>
                                        <th scope="col">Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedPatient || role === "Patient" && patientData && patientData.map((prescription: any, index: number) => (
                                        <tr key={index}>
                                            <td>{prescription.medication}</td>
                                            <td>{prescription.dosage}</td>
                                            <td>
                                                {new Date(prescription.prescriptionDate).getMonth() + 1}/{new Date(prescription.prescriptionDate).getDate()}/{new Date(prescription.prescriptionDate).getFullYear()}
                                            </td>
                                            <td>{prescription.doctorFName}</td>
                                            <td>
                                                <button type="button" className="btn btn-primary" onClick={openPatientNotesModal}>View Notes</button>
                                                {role === 'Doctor' ? <button type="button" className="btn btn-primary" onClick={openEditNotesModal}>Edit Notes</button> : ''}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {selectedPatient || role === "Patient" && patientData && patientData.map((prescription: any, index: number) => (
                        <div key={index}>
                            <PatientNotes isOpen={isPatientNotesModalOpen} onRequestClose={closeModal} notes={prescription.notes} />
                            <EditNotes isOpen={isEditNotesModalOpen} onRequestClose={closeModal} oldPrescription={prescription} />
                        </div>
                    ))}
                    <AddPrescription isOpen={isNewPrescriptionOpen} onRequestClose={closeModal}
                        userId={userId}
                        patientId={selectedPatient?.patientID}
                        pname={selectedPatient?.patientFName}
                        dname={Token?.name} />
                </>
            )}
        </div>
    );
}

export default PrescriptionTable;
